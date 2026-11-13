# Modern Link — النظام المحاسبي (SaaS)

نظام محاسبي متعدد العملات، عربي وإنجليزي، يعمل على الويب وأندرويد. كل شركة مشتركة إلها بياناتها المنفصلة، ومستخدمين بصلاحيات، واشتراك (تجريبي ← أساسي/احترافي/مؤسسات).

| الجزء | التقنية |
|---|---|
| السيرفر وقاعدة البيانات وتسجيل الدخول | Supabase (Postgres + Auth + Realtime) |
| الواجهة (ويب) | Vite + JavaScript، تُنشر على GitHub Pages |
| أندرويد | Capacitor — ملف APK يُبنى تلقائياً على GitHub Actions |

---

## 1) تجهيز Supabase (مرة واحدة)

1. أنشئ مشروعاً على <https://supabase.com> (المنطقة الأقرب: Frankfurt أو Mumbai).
2. **SQL Editor** ← الصق محتوى `supabase/migrations/001_init.sql` ← **Run**.
3. **Authentication → URL Configuration**:
   - **Site URL**: رابط نسخة الويب (مثلاً `https://USERNAME.github.io/modernlink-accounting/`).
   - **Redirect URLs**: أضف نفس الرابط.
4. **Project Settings → API**: انسخ `Project URL` و `anon public key`.
5. بعد ما تسجّل أول حساب من التطبيق، اجعل نفسك مدير المنصة (SQL Editor):
   ```sql
   insert into public.platform_admins(user_id)
   select id from auth.users where email = 'بريدك@example.com';
   ```
   بعدها بتظهر لك صفحة **إدارة المنصة** (الشركات، تسجيل الدفعات وتفعيل الاشتراكات، رقم واتساب وبيانات التحويل البنكي).

> اختياري: لإنهاء الاشتراكات المنتهية تلقائياً فعّل إضافة `pg_cron` وشغّل:
> `select cron.schedule('expire-subs','0 * * * *','select public.expire_subscriptions()');`
> (التطبيق والسيرفر يتحققان من تاريخ الانتهاء على كل حال.)

### 1-ب) حسابات الموظفين باسم مستخدم وكلمة مرور (Edge Function)

1. شغّل أيضاً `supabase/migrations/002_custodians_and_monthly_closing.sql` في SQL Editor.
2. **Edge Functions → Deploy a new function** باسم `admin-users`، والصق محتوى `supabase/functions/admin-users/index.ts`.
   (أو عبر Supabase CLI: `supabase functions deploy admin-users`)
3. (اختياري) **Edge Functions → Secrets**: `USERNAME_EMAIL_DOMAIN` — الافتراضي `staff.modernlink.app`. إذا غيّرته، ضع نفس القيمة في GitHub Secret باسم `VITE_USERNAME_EMAIL_DOMAIN`.

بعدها من **الإعدادات ← المستخدمون ← إنشاء مستخدم**: تكتب الاسم واسم المستخدم وكلمة المرور، وتختار الصلاحية. لـ **صاحب العهدة** تحدد المشاريع والصناديق المسندة إليه.

## 2) GitHub (نشر الويب وبناء APK)

1. ارفع المشروع على repository.
2. **Settings → Secrets and variables → Actions** ← أضف:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. **Settings → Pages** ← Source: **GitHub Actions**.
4. أي `push` على `main`:
   - **Deploy web app** ← ينشر نسخة الويب.
   - **Build Android APK** ← يبني `ModernLink-1.0.N.apk` ويضعه في **Releases**.

> الـ anon key مصمم ليكون عاماً؛ الحماية الفعلية عبر سياسات RLS في قاعدة البيانات.

## 3) تثبيت تطبيق أندرويد

حمّل آخر ملف APK من صفحة **Releases** على الموبايل، وافتحه، واسمح بالتثبيت من مصادر غير معروفة. كل نسخة جديدة تُثبّت فوق القديمة (نفس مفتاح التوقيع).

للنشر على Google Play لاحقاً: تحتاج حساب مطوّر ومفتاح توقيع release خاص (بدل `android-signing/debug.keystore`) وبناء `bundleRelease`.

## 4) التطوير محلياً

```bash
npm install
cp .env.example .env   # ضع قيم Supabase
npm run dev
```

## الأدوار والصلاحيات

| الدور | الصلاحية |
|---|---|
| المالك (owner) | كل شيء، ولا يمكن حذفه |
| مدير (admin) | كل شيء: المستخدمون، الإعدادات، الإقفال |
| محاسب (accountant) | تسجيل وتعديل القيود |
| صاحب عهدة (member) | يرى ويسجّل فقط على الصناديق والمشاريع المسندة إليه (مصروف، إيراد، تحويل، دفعة، تحصيل)، ولا يرى الموظفين والرواتب ولا باقي الصناديق |
| مشاهد (viewer) | عرض وتصدير فقط |

- عند انتهاء الاشتراك تبقى البيانات **للعرض والتصدير فقط** حتى التجديد.
- **الجرد الشهري**: لكل صندوق كل شهر — الافتتاحي، الوارد، الصادر، الرصيد الدفتري. صاحب العهدة يرفع المبلغ المعدود، والمدير يعتمد (مع تسجيل الفرق كتسوية جرد تلقائياً) أو يرجعه. الشهر المعتمد يُقفل قيود ذلك الصندوق في قاعدة البيانات. كشف PDF بتوقيع صاحب العهدة والمحاسب والمدير المالي.
- القيود المؤرخة قبل تاريخ الإقفال **محمية في قاعدة البيانات نفسها** (trigger)، وليس فقط في الواجهة.
- عدد المستخدمين محكوم بحد الباقة (جدول `plans`). لتغيير الأسعار أو الحدود عدّل جدول `plans` من Supabase.

## بنية المشروع

```
supabase/migrations/001_init.sql   الجداول، RLS، الاشتراكات، الدوال
supabase/migrations/002_…sql       أصحاب العهد، الإسناد، الجرد الشهري
supabase/functions/admin-users     إنشاء مستخدمين باسم مستخدم وكلمة مرور
src/main.js                        التطبيق (الواجهة، المحاسبة، التقارير)
src/supa.js                        اتصال Supabase
src/styles.css                     التصميم
assets/                            أيقونة وشاشة بداية أندرويد
.github/workflows/                 نشر الويب وبناء APK
test/                              نسخة وهمية من Supabase لاختبار الواجهة
```
