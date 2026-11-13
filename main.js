import './styles.css';
import { sb, configured } from './supa.js';
import { Capacitor } from '@capacitor/core';

const LOGO=new URL('logo.jpg',document.baseURI).href;
/* ============ i18n ============ */
let LANG='ar';try{LANG=localStorage.getItem('ml_lang')||'ar'}catch(e){}
const AR={
"Monthly reconciliation":"الجرد الشهري",
"Custodian":"صاحب عهدة",
"Sees and records only the cash boxes and projects assigned to them":"يرى ويسجّل فقط على الصناديق والمشاريع المسندة إليه",
"Email or username":"البريد الإلكتروني أو اسم المستخدم",
"Create user":"إنشاء مستخدم",
"Username":"اسم المستخدم",
"Letters, numbers, dot or dash (3–32)":"أحرف إنجليزية وأرقام ونقطة أو شرطة (3–32)",
"Assigned projects":"المشاريع المسندة",
"Assigned cash boxes":"الصناديق المسندة",
"Assignments":"الإسناد",
"Change password":"تغيير كلمة المرور",
"User created":"تم إنشاء المستخدم",
"Username already taken":"اسم المستخدم مستخدم مسبقاً",
"Invalid username":"اسم مستخدم غير صالح",
"Password must be at least 8 characters":"كلمة المرور يجب أن تكون 8 أحرف على الأقل",
"Projects & cash boxes":"المشاريع والصناديق",
"Or invite by email":"أو دعوة عبر البريد",
"Edit assignments — {n}":"تعديل الإسناد — {n}",
"All (no restriction)":"الكل (بدون تقييد)",
"Staff log in with this username and password.":"يدخل الموظف باسم المستخدم وكلمة المرور هذه.",
"Month":"الشهر",
"Cash boxes":"الصناديق",
"Submitted":"بانتظار الاعتماد",
"Approved":"معتمد",
"Returned":"مُعاد للمراجعة",
"Not submitted":"لم يُرفع",
"Opening":"الافتتاحي",
"Book balance":"الرصيد الدفتري",
"Counted":"المعدود",
"Difference":"الفرق",
"Submit count":"رفع الجرد",
"Edit count":"تعديل الجرد",
"Approve":"اعتماد",
"Return":"إرجاع",
"Reopen":"إعادة فتح",
"Total differences":"إجمالي الفروقات",
"Count submitted":"تم رفع الجرد",
"Month approved and closed":"تم اعتماد الشهر وإقفاله",
"Returned for review":"تمت الإعادة للمراجعة",
"Post the difference as a cash-count adjustment":"تسجيل الفرق كتسوية جرد",
"Review note":"ملاحظة المراجعة",
"Approve month — {a} — {m}":"اعتماد شهر — {a} — {m}",
"Count for {a} — {m}":"جرد {a} — {m}",
"This month is closed for this cash box":"هذا الشهر مقفل لهذا الصندوق",
"Approving closes the month for this cash box: its entries for the month can no longer change.":"الاعتماد يقفل الشهر لهذا الصندوق، ولا يمكن تعديل قيوده لهذا الشهر بعد ذلك.",
"Count the cash in hand at the end of the month and enter the amount.":"عدّ النقد الموجود فعلياً في نهاية الشهر وأدخل المبلغ.",
"Cash box statement — {a} — {m}":"كشف صندوق — {a} — {m}",
"Closing balance":"الرصيد الختامي",
"Custodian signature":"توقيع صاحب العهدة",
"Movements in the month":"حركات الشهر",
"In this month":"وارد هذا الشهر",
"Out this month":"صادر هذا الشهر",
"My cash boxes":"صناديقي",
"Status of the month":"حالة الشهر",
"Sign in":"تسجيل الدخول",
"Email":"البريد الإلكتروني",
"Password":"كلمة المرور",
"Create a company account":"إنشاء حساب شركة",
"Forgot password?":"نسيت كلمة المرور؟",
"Company name":"اسم الشركة",
"At least 8 characters":"8 أحرف على الأقل",
"Start free trial":"ابدأ التجربة المجانية",
"I already have an account":"لدي حساب بالفعل",
"Reset password":"استعادة كلمة المرور",
"Send reset link":"إرسال رابط الاستعادة",
"Back to sign in":"العودة لتسجيل الدخول",
"Set a new password":"تعيين كلمة مرور جديدة",
"New password":"كلمة المرور الجديدة",
"Check your email":"تحقق من بريدك الإلكتروني",
"We sent a link to {e}. Open it to continue, then sign in.":"أرسلنا رابطاً إلى {e}. افتحه للمتابعة ثم سجّل الدخول.",
"Create your company":"إنشاء شركتك",
"Your account is not linked to any company yet. Create one, or ask your company admin to invite {e}.":"حسابك غير مرتبط بأي شركة بعد. أنشئ شركة جديدة، أو اطلب من مدير شركتك دعوة {e}.",
"Create company":"إنشاء الشركة",
"Multi-currency accounting for companies working across several countries.":"نظام محاسبي متعدد العملات للشركات العاملة في أكثر من دولة.",
"Expenses, revenue and transfers in every currency, with USD reporting":"المصروفات والإيرادات والتحويلات بكل العملات مع تقارير بالدولار",
"Employees, salaries, advances and installments":"الموظفون والرواتب والسلف والأقساط",
"Suppliers, customers and partners balances":"أرصدة الموردين والعملاء والشركاء",
"Income statement, financial position, PDF and Excel":"قائمة الدخل والمركز المالي وتصدير PDF وExcel",
"Arabic and English, on the web and Android":"عربي وإنجليزي، على الويب والأندرويد",
"Plans":"الباقات",
"Free for {d} days":"مجاناً لمدة {d} يوماً",
"{p} USD / month · up to {u} users":"{p} دولار شهرياً · حتى {u} مستخدمين",
"Wrong email or password":"البريد أو كلمة المرور غير صحيحة",
"Please confirm your email first":"يرجى تأكيد بريدك الإلكتروني أولاً",
"This email is already registered":"هذا البريد مسجّل مسبقاً",
"No internet connection":"لا يوجد اتصال بالإنترنت",
"Company limit reached":"وصلت للحد الأقصى من الشركات",
"Password updated":"تم تحديث كلمة المرور",
"Sign out":"تسجيل الخروج",
"Subscription expired — data is read only":"انتهى الاشتراك — البيانات للعرض فقط",
"Owner":"المالك",
"Administrator":"مدير",
"Accountant":"محاسب",
"Viewer":"مشاهد",
"Full access including users and settings":"صلاحيات كاملة تشمل المستخدمين والإعدادات",
"Records and edits entries":"يسجّل القيود ويعدّلها",
"View and export only":"عرض وتصدير فقط",
"Your subscription has ended. Data is read only until it is renewed.":"انتهى اشتراككم. البيانات متاحة للعرض فقط حتى التجديد.",
"Renew subscription":"تجديد الاشتراك",
"Free trial — {d} day(s) left.":"فترة تجريبية — متبقي {d} يوم.",
"Subscribe":"اشترك الآن",
"Subscription renews in {d} day(s).":"ينتهي الاشتراك خلال {d} يوم.",
"Users":"المستخدمون",
"Your role":"صلاحيتك",
"Invite a user":"دعوة مستخدم",
"Role":"الصلاحية",
"Send invitation":"إرسال الدعوة",
"The user signs up with the same email and joins the company automatically.":"يسجّل المستخدم بنفس البريد فينضم للشركة تلقائياً.",
"Remove":"إزالة",
"Pending invitation":"دعوة معلّقة",
"Invitation sent":"تم إرسال الدعوة",
"User limit reached for your plan":"وصلت للحد الأقصى من المستخدمين في باقتك",
"Already a member":"المستخدم عضو مسبقاً",
"Enter a valid email":"أدخل بريداً إلكترونياً صحيحاً",
"Remove this user from the company?":"إزالة هذا المستخدم من الشركة؟",
"Yes, remove":"نعم، أزل",
"Current plan":"الباقة الحالية",
"Valid until":"صالح حتى",
"Free trial":"تجريبي",
"Active plan":"فعّال",
"Expired":"منتهي",
"Canceled":"ملغى",
"Plan":"الباقة",
"Monthly price":"السعر الشهري",
"How to subscribe or renew":"طريقة الاشتراك أو التجديد",
"Transfer the amount, then send the receipt with your company name. Your subscription is activated once payment is confirmed.":"حوّل قيمة الاشتراك ثم أرسل الإيصال مع اسم شركتك، ويتم تفعيل الاشتراك فور تأكيد الدفع.",
"Subscription for {c}":"اشتراك لشركة {c}",
"Payment history":"سجل المدفوعات",
"Months":"عدد الأشهر",
"Reference":"المرجع",
"General":"عام",
"Subscription":"الاشتراك",
"Platform admin":"إدارة المنصة",
"Companies":"الشركات",
"Active subscriptions":"اشتراكات فعّالة",
"Monthly recurring revenue":"الإيراد الشهري المتكرر",
"Company":"الشركة",
"Record payment":"تسجيل دفعة",
"Platform settings":"إعدادات المنصة",
"WhatsApp number":"رقم واتساب",
"Contact email":"بريد التواصل",
"Trial days":"أيام التجربة",
"Bank transfer details (shown to customers)":"بيانات التحويل البنكي (تظهر للعملاء)",
"Payment method":"طريقة الدفع",
"Bank transfer":"تحويل بنكي",
"Enter a valid date":"أدخل تاريخاً صحيحاً",
"Switch company":"تبديل الشركة",
"Saved file to share":"تم تجهيز الملف للمشاركة",
'Modern Link for Telecommunications and IT Services':'مودرن لينك للاتصالات وخدمات تقنية المعلومات','Internal accounting system':'النظام المحاسبي الداخلي',
'Dashboard':'الرئيسية','Entries':'القيود والحركات','Employees':'الموظفون','Reports':'التقارير','Cash & banks':'الصناديق والبنوك','Parties':'الجهات والشركاء','Projects':'المشاريع','Settings':'الإعدادات','Menu':'القائمة','Home':'الرئيسية',
'Loading…':'جارِ التحميل…','Saved to cloud':'محفوظ سحابياً','Read only':'عرض فقط','Demo mode — not saved':'وضع تجريبي — لا يتم الحفظ','Data unreachable':'تعذّر الوصول للبيانات','Connection lost':'انقطع الاتصال',
'All rights reserved':'جميع الحقوق محفوظة',
'Expense':'مصروف','Income':'إيراد','Employee advance':'سلفة موظف','Salary':'راتب','Advance repayment':'سداد سلفة','Transfer':'تحويل بين الصناديق','Supplier bill (credit)':'فاتورة مورد (آجل)','Customer invoice (credit)':'فاتورة عميل (آجل)','Payment to party':'دفعة لجهة','Receipt from party':'تحصيل من جهة','Partner deposit / funding':'إيداع شريك / تمويل','Partner drawings':'مسحوبات شريك','Cash count adjustment':'تسوية جرد','Outgoing payment':'دفعة صادرة',
'Supplier':'مورد','Customer':'عميل','Partner / financier':'شريك / ممول','Other':'أخرى',
'Cash box':'صندوق نقدي','Bank account':'حساب بنكي','Wallet / exchange office':'محفظة / صرّاف','Custody (held by person)':'عهدة لدى شخص',
'Syria':'سوريا','Jordan':'الأردن','Palestine':'فلسطين','Saudi Arabia':'السعودية',
'Rent':'إيجار','Materials & goods':'مواد وبضاعة','Transport & fuel':'مواصلات ووقود','Electricity & water':'كهرباء وماء','Telecom & internet':'اتصالات وإنترنت','Hospitality':'ضيافة','Maintenance':'صيانة','Government fees & taxes':'رسوم حكومية وضرائب','Bank & transfer fees':'عمولات بنكية وتحويلات','Marketing':'تسويق',
'Sales':'مبيعات','Services':'خدمات','Contracts & projects':'عقود ومشاريع',
'Salaries & wages':'رواتب وأجور','Cash count differences':'فروقات جرد الصناديق','Uncategorized':'غير مصنّف','No project':'بدون مشروع','Unspecified':'غير محدد',
'US Dollar':'دولار أمريكي','Jordanian Dinar':'دينار أردني','Saudi Riyal':'ريال سعودي','Israeli Shekel':'شيكل','Syrian Pound':'ليرة سورية',
'This month':'هذا الشهر','Last month':'الشهر الماضي','Last 3 months':'آخر 3 أشهر','This year':'هذه السنة','Last year':'السنة الماضية','All periods':'كل الفترات','Custom period':'فترة مخصّصة',
'New entry':'قيد جديد','Export Excel':'تصدير Excel','Export PDF':'تصدير PDF','Pay monthly salaries':'صرف رواتب الشهر','New employee':'موظف جديد','New account':'صندوق / حساب جديد','New party':'جهة جديدة','New project':'مشروع جديد','Edit':'تعديل','Delete':'حذف','Save':'حفظ','Cancel':'إلغاء','Close':'إغلاق','View all':'عرض الكل','Clear filters':'مسح الفلاتر','Cash count':'جرد','Statement':'كشف حساب',
'System setup':'تهيئة النظام','Complete these steps to start using the system:':'لبدء استخدام النظام، أكمل الخطوات التالية:','Review exchange rates against the US dollar.':'مراجعة أسعار الصرف مقابل الدولار.','Add cash boxes and bank accounts with opening balances.':'إضافة الصناديق والحسابات البنكية مع أرصدتها الافتتاحية.','Add projects, employees and parties.':'إضافة المشاريع والموظفين والجهات.','Start recording entries.':'البدء بتسجيل القيود.','Exchange rates':'أسعار الصرف',
'Cash balances':'أرصدة الصناديق','Account':'الصندوق / الحساب','Currency':'العملة','Balance':'الرصيد','USD equivalent':'المعادل بالدولار','Total':'الإجمالي',
'Key figures — {m}':'المؤشرات — {m}','Revenue for the month':'إيرادات الشهر','Expenses for the month':'مصروفات الشهر','Net for the month':'صافي الشهر','Outstanding employee advances':'سلف قائمة على الموظفين','Receivables (owed to us)':'ذمم مدينة (مستحق لنا)','Payables (we owe)':'ذمم دائنة (مستحق علينا)','Partner & funding balances':'أرصدة الشركاء والتمويل',
'Alerts':'تنبيهات','Salaries for {m} not yet paid for {n} employee(s): {list}':'رواتب {m} غير مصروفة لـ {n} موظف: {list}','Negative balance in: {list}':'رصيد سالب في: {list}','Books are closed up to {d}. Earlier entries cannot be changed.':'الدفاتر مقفلة حتى {d}، ولا يمكن تعديل القيود السابقة لهذا التاريخ.','Latest entries':'آخر القيود',
'Date':'التاريخ','Doc. no.':'رقم المستند','Type':'النوع','Description':'البيان','Project':'المشروع','In':'وارد','Out':'صادر','≈ USD':'≈ بالدولار','No entries':'لا توجد قيود','No matching entries':'لا توجد قيود مطابقة','credit':'آجل','closed':'مقفل',
'Search (name, description, doc. no.)':'بحث (اسم، بيان، رقم مستند)','Period':'الفترة','From':'من','To':'إلى','All types':'كل الأنواع','All accounts':'كل الصناديق','All projects':'كل المشاريع','All employees':'كل الموظفين','All parties':'كل الجهات','Filter':'تصفية',
'{n} entries · expenses {e} · revenue {r}':'{n} قيد · مصروفات {e} · إيرادات {r}','Running balance is shown for the selected account.':'يظهر الرصيد التراكمي للصندوق المحدد.',
'Name':'الاسم','Position':'الوظيفة','Monthly salary':'الراتب الشهري','Advances balance':'رصيد السلف','Salary {m}':'راتب {m}','Status':'الحالة','Paid':'مصروف','Not paid':'غير مصروف','Active':'على رأس عمله','Suspended':'موقوف','Active employees':'الموظفون الفعّالون','Monthly payroll':'كتلة الرواتب الشهرية','Total outstanding advances':'إجمالي السلف القائمة','Salaries paid for {m}':'رواتب {m} المصروفة','No employees yet':'لا يوجد موظفون بعد',
'Employee information':'بيانات الموظف','Phone':'الهاتف','Start date':'تاريخ المباشرة','Salaries paid this year':'رواتب هذه السنة','Total advances taken':'مجموع السلف المأخوذة','New advance':'سلفة جديدة','Pay salary':'صرف راتب','Repayment':'سداد سلفة','Salaries — last 6 months':'الرواتب — آخر 6 أشهر','Month':'الشهر','Net paid':'الصافي المدفوع','Advance deduction':'خصم السلفة','Payslip':'قسيمة راتب','Account statement':'كشف الحساب','None':'لا يوجد',
'Opening balance':'الرصيد الافتتاحي','Country':'الدولة','Entries count':'عدد القيود','Cash count: count the actual cash and the system records the difference as an adjustment.':'الجرد: أدخل النقد المعدود فعلياً ويسجّل النظام الفرق كتسوية جرد.','No accounts yet':'لا توجد صناديق بعد',
'All':'الكل','Owed to us {v}':'لنا {v}','We owe {v}':'علينا {v}','Partner balance {v}':'رصيده {v}','Overdrawn {v}':'مسحوب زيادة {v}','Settled':'مسدّد','No parties yet':'لا توجد جهات بعد','Bill from him (credit)':'فاتورة منه (آجل)','Payment to him':'دفعة له','Invoice to him (credit)':'فاتورة له (آجل)','Receipt from him':'تحصيل منه','Deposit / funding':'إيداع / تمويل','Drawings':'مسحوبات','Current balance':'الرصيد الحالي',
'Employees count':'عدد الموظفين','Revenue (YTD)':'الإيرادات (هذه السنة)','Expenses (YTD)':'المصروفات (هذه السنة)','Net':'الصافي','Closed':'مغلق','No projects yet':'لا توجد مشاريع بعد',
'Summary':'الملخص','Income statement':'قائمة الدخل','Financial position':'المركز المالي','Projects & countries':'المشاريع والدول','Currencies':'العملات','Display currency':'عملة العرض','Period: {p} · Currency: {c}':'الفترة: {p} · العملة: {c}','{a} to {b}':'{a} إلى {b}',
'Revenue':'الإيرادات','Expenses (incl. salaries)':'المصروفات (شاملة الرواتب)','Net profit / (loss)':'صافي الربح / (الخسارة)','Advances paid / recovered':'سلف مصروفة / مستردة','Last 12 months':'آخر 12 شهراً','Expenses':'المصروفات','Total revenue':'إجمالي الإيرادات','Total expenses':'إجمالي المصروفات',
'Credit invoices and bills are recognised on their date. Advances are receivables, not expenses; payments and receipts settle balances.':'الفواتير الآجلة تُثبت بتاريخها. السلف ذمم على الموظفين وليست مصروفاً، والدفعات والتحصيلات تسوية للأرصدة.',
'As of {d}, at current exchange rates':'كما في {d} بأسعار الصرف الحالية','Assets':'الأصول','Cash and banks':'النقد في الصناديق والبنوك','Employee advances':'سلف الموظفين','Total assets':'إجمالي الأصول','Liabilities and equity':'الالتزامات وحقوق الملكية','Opening balances':'أرصدة افتتاحية','Retained earnings & FX differences':'أرباح (خسائر) متراكمة وفروقات عملة',
'By project':'حسب المشروع','By country':'حسب الدولة','No data':'لا توجد بيانات','Cash in':'نقد داخل','Cash out':'نقد خارج','Current balance ':'الرصيد الحالي','Actual cash movement per currency, without conversion.':'حركة النقد الفعلية بكل عملة كما هي دون تحويل.','Employee':'الموظف','Salaries in period':'رواتب الفترة','Advances in period':'سلف الفترة','Advances balance now':'رصيد السلف الحالي',
'Currencies and exchange rates':'العملات وأسعار الصرف','Units of each currency per 1 US dollar. The rate is stored with every entry, so changing it later does not affect past entries.':'عدد وحدات كل عملة مقابل 1 دولار. يُحفظ السعر مع كل قيد، فتغييره لاحقاً لا يؤثر على القيود السابقة.','Code':'الرمز','Symbol':'العلامة','Per 1 USD':'لكل 1 دولار','Add currency':'إضافة عملة',
'Categories':'البنود','Expense categories (one per line)':'بنود المصروفات (بند في كل سطر)','Revenue categories (one per line)':'بنود الإيرادات (بند في كل سطر)','Save settings':'حفظ الإعدادات','Period closing':'إقفال الفترة','After reviewing a month and closing it, no entry dated on or before the closing date can be added, edited or deleted.':'بعد مراجعة الشهر وإقفاله، لا يمكن إضافة أو تعديل أو حذف أي قيد بتاريخ يسبق تاريخ الإقفال أو يساويه.','Closing date':'تاريخ الإقفال','End of last month':'نهاية الشهر الماضي','Close books':'إقفال','Reopen':'إلغاء الإقفال','Backup and export':'النسخ الاحتياطي والتصدير','Full Excel workbook':'ملف Excel كامل','JSON backup':'نسخة احتياطية JSON','Take a backup every month and keep it safe.':'يُنصح بأخذ نسخة احتياطية شهرياً.',
'Confirmation':'تأكيد','Yes, delete':'نعم، احذف','Yes, close':'نعم، أقفل','Yes, reopen':'نعم، ألغِ الإقفال',
'Edit account':'تعديل صندوق / حساب','Account name':'اسم الصندوق / الحساب','e.g. Damascus cash — USD':'مثال: صندوق دمشق — دولار','Notes':'ملاحظات','Edit project':'تعديل مشروع','Project name':'اسم المشروع','Edit employee':'تعديل موظف','Full name':'الاسم الكامل','Salary currency':'عملة الراتب','Suspended / left':'موقوف / ترك العمل','Edit party':'تعديل جهة','Default currency':'العملة الافتراضية','Opening balance (+ owed to us, − we owe)':'رصيد افتتاحي (+ لنا، − علينا)',
'Edit entry':'تعديل قيد','View entry':'عرض قيد','Entry type':'نوع القيد','Common':'الأكثر استخداماً','Receivables, payables and partners':'الذمم والشركاء','From account':'من صندوق / حساب','To account':'إلى صندوق / حساب','Exchange rate (per 1 USD)':'سعر الصرف (لكل 1 دولار)','Optional':'اختياري','Party':'الجهة','— select —':'— اختر —','— none —':'— بدون —','For month':'عن شهر','Basic salary':'الراتب الأساسي','Bonus / overtime':'مكافأة / إضافي','Deductions':'خصومات','Deduct from advances':'خصم من السلف','Amount':'المبلغ','Net paid in cash':'الصافي المدفوع نقداً','Amount transferred':'المبلغ المحوَّل','Amount received':'المبلغ المستلم','Monthly installment':'القسط الشهري للسداد','Direction':'الاتجاه','Increase':'زيادة','Decrease':'نقص','Category':'البند','Description / notes':'البيان / ملاحظات','Salary details':'تفاصيل الراتب','This entry is in a closed period (up to {d}).':'هذا القيد ضمن فترة مقفلة (حتى {d}).','Salary {s} · advances: {a}':'الراتب {s} · سلف عليه: {a}','Balance: {b}':'الرصيد: {b}',
'Cash count — {a}':'جرد — {a}','Book balance':'الرصيد الدفتري','Counted amount':'المبلغ المعدود','Count date':'تاريخ الجرد','Matches':'مطابق','Surplus {v}':'زيادة {v}','Shortage {v}':'عجز {v}','Record count':'تسجيل الجرد','e.g. month-end count':'مثال: جرد نهاية الشهر','Count: counted {v}':'جرد: المعدود {v}',
'Payment date':'تاريخ الصرف','All projects ':'كل المشاريع','Bonus':'مكافأة','Deduction':'خصم','Net':'الصافي','Pay selected salaries':'صرف الرواتب المحددة','{n} employee(s)':'{n} موظف','Paying… {a}/{b}':'جارِ الصرف… {a}/{b}','Salaries {m}':'رواتب {m}',
'Payslip — {m}':'قسيمة راتب — {m}','Employee name':'اسم الموظف','Paid from':'جهة الصرف','Item':'البيان','Advance deduction ':'استقطاع من السلف','Net paid ':'صافي المستحق المصروف','Remaining advances after this payment':'رصيد السلف المتبقي بعد هذه الدفعة','Recipient signature':'توقيع المستلم','Accountant':'المحاسب','Finance manager':'المدير المالي','Issue date':'تاريخ الإصدار','No.':'الرقم','Document issued by the internal accounting system':'مستند صادر من النظام المحاسبي الداخلي','Download PDF':'تنزيل PDF','Employee statement — {n}':'كشف حساب موظف — {n}','Statement — {n}':'كشف حساب — {n}','Subject':'البيان','Number of entries':'عدد القيود','Overtime / bonus':'مكافأة / عمل إضافي','Administrative deductions':'خصومات إدارية',
'Saved':'تم الحفظ','Entry recorded':'تم تسجيل القيد','Entry updated':'تم تعديل القيد','Deleted':'تم الحذف','Could not save, try again':'تعذّر الحفظ، حاول مجدداً','You do not have permission to edit':'ليس لديك صلاحية التعديل','Storage is full — export a backup and remove old data':'امتلأت سعة التخزين — صدّر نسخة واحذف القديم','Could not delete':'تعذّر الحذف',
'Add a cash box or account first':'أضف صندوقاً أو حساباً أولاً','Enter a valid amount':'أدخل مبلغاً صحيحاً','Select the employee':'اختر الموظف','Select the party':'اختر الجهة','Add the party first from the Parties page':'أضف الجهة أولاً من صفحة الجهات','Date is in a closed period (up to {d})':'التاريخ ضمن فترة مقفلة (حتى {d})','Advance deduction exceeds the advance balance in this currency':'خصم السلفة أكبر من رصيد السلف بهذه العملة','Warning: salary for this month already recorded':'تنبيه: راتب هذا الشهر مسجّل مسبقاً','Confirm anyway':'تأكيد رغم ذلك','Amount exceeds the advance balance in this currency':'المبلغ أكبر من رصيد السلف بهذه العملة','Select a different account to transfer to':'اختر صندوقاً مختلفاً للتحويل إليه','Enter the amount received':'أدخل المبلغ المستلم',
'Enter the account name':'أدخل اسم الصندوق','Cannot delete an account with entries':'لا يمكن حذف صندوق عليه قيود','Delete this account?':'حذف هذا الصندوق؟','Enter the project name':'أدخل اسم المشروع','Project has entries — mark it as closed instead':'المشروع عليه قيود — اجعله مغلقاً بدلاً من الحذف','Delete this project?':'حذف هذا المشروع؟','Enter the employee name':'أدخل اسم الموظف','Employee has entries — mark as suspended instead':'الموظف عليه قيود — اجعله موقوفاً بدلاً من الحذف','Delete this employee?':'حذف هذا الموظف؟','Enter the name':'أدخل الاسم','Party has entries':'الجهة عليها قيود','Delete this party?':'حذف هذه الجهة؟','Delete this entry permanently?':'حذف هذا القيد نهائياً؟',
'Enter the counted amount':'أدخل المبلغ المعدود','Cash box matches':'الصندوق مطابق','Count difference recorded':'تم تسجيل فرق الجرد','No employees with salaries':'لا يوجد موظفون برواتب','No employee selected':'لم يتم تحديد أي موظف','Advance deduction for {n} exceeds their balance':'خصم السلفة لـ {n} أكبر من رصيده','Net for {n} is invalid':'صافي {n} غير صحيح','{n} salaries paid':'تم صرف {n} راتب',
'Exchange rate must be greater than zero':'سعر الصرف يجب أن يكون أكبر من صفر','Duplicate currency code':'رمز عملة مكرر','Settings saved':'تم حفظ الإعدادات','Currency is in use':'العملة مستخدمة','Select a closing date':'اختر تاريخ الإقفال','Close all entries up to {d}?':'إقفال جميع القيود حتى {d}؟','Books closed':'تم الإقفال','Reopen closed periods for editing?':'إلغاء الإقفال والسماح بتعديل الفترات السابقة؟','Books reopened':'تم إلغاء الإقفال',
'Download is not available in this view':'التنزيل غير متاح في هذا العرض','Downloaded':'تم التنزيل','Wait a moment and try again':'انتظر قليلاً ثم أعد المحاولة','Download failed':'تعذّر التنزيل','Preparing PDF…':'جارِ تجهيز PDF…','Could not load the PDF library':'تعذّر تحميل مكتبة PDF','Could not create the PDF':'تعذّر إنشاء PDF','Preparing Excel…':'جارِ تجهيز Excel…','Could not load the Excel library':'تعذّر تحميل مكتبة Excel',
'Accounts':'الصناديق','Employees ':'الموظفون','Exchange rate':'سعر الصرف','USD':'بالدولار','Salary month':'شهر الراتب','Basic':'الأساسي','Received amount':'المبلغ المستلم','Opening':'الافتتاحي','Advances (USD)':'رصيد السلف بالدولار','Details':'التفاصيل','Balance USD (+ owed to us)':'الرصيد بالدولار (+ لنا)','Revenue USD':'إيرادات الفترة $','Expenses USD':'مصروفات الفترة $','Net USD':'الصافي $','Transactions':'الحركات',
'E-services':'الخدمات','Overview':'نظرة عامة','Record expenses, revenue and payments':'تسجيل المصروفات والإيرادات والدفعات','Pay all salaries in one step':'صرف رواتب جميع الموظفين دفعة واحدة','Give an advance with monthly installments':'صرف سلفة مع تحديد قسط شهري','Move money between cash boxes and currencies':'نقل الأموال بين الصناديق والعملات','Record a purchase on credit':'تسجيل مشتريات آجلة على مورد','Count a cash box and record the difference':'جرد الصندوق وتسجيل الفرق','Income statement, financial position and more':'قائمة الدخل والمركز المالي وغيرها','Full workbook of all records':'ملف كامل بجميع السجلات','Performance summary':'ملخص الأداء المالي','Statement of financial position':'قائمة المركز المالي','Projects and countries report':'تقرير المشاريع والدول','Currency movement report':'تقرير حركة العملات','Employees report':'تقرير الموظفين','report':'تقرير','payslip':'قسيمة','statement':'كشف','entries':'قيود','accounts':'حسابات','backup':'نسخة-احتياطية'
};
const t=(k,p)=>{let s=LANG==='ar'?(AR[k]??k):k;if(p)for(const x in p)s=s.split('{'+x+'}').join(p[x]);return s;};
const LOC=()=>LANG==='ar'?'ar-JO-u-nu-latn':'en-GB';
const ORG=()=>LANG==='ar'?AR['Modern Link for Telecommunications and IT Services']:'Modern Link for Telecommunications and IT Services';

/* ============ constants ============ */
const DEF_CURR=[{code:'USD',name:'US Dollar',sym:'$',rate:1},{code:'JOD',name:'Jordanian Dinar',sym:'JD',rate:0.709},{code:'SAR',name:'Saudi Riyal',sym:'SAR',rate:3.75},{code:'ILS',name:'Israeli Shekel',sym:'₪',rate:3.7},{code:'SYP',name:'Syrian Pound',sym:'SYP',rate:13000}];
const DEF_ECATS=['Rent','Materials & goods','Transport & fuel','Electricity & water','Telecom & internet','Hospitality','Maintenance','Government fees & taxes','Bank & transfer fees','Marketing','Other'];
const DEF_ICATS=['Sales','Services','Contracts & projects','Other'];
const COUNTRIES={SY:'Syria',JO:'Jordan',PS:'Palestine',SA:'Saudi Arabia',OT:'Other'};
const PKINDS={supplier:'Supplier',customer:'Customer',partner:'Partner / financier',other:'Other'};
const AKINDS={cash:'Cash box',bank:'Bank account',wallet:'Wallet / exchange office',custody:'Custody (held by person)'};
const TYPES={
 expense:{l:'Expense',cash:-1,pl:-1},income:{l:'Income',cash:1,pl:1},advance:{l:'Employee advance',cash:-1},salary:{l:'Salary',cash:-1,pl:-1},repay:{l:'Advance repayment',cash:1},transfer:{l:'Transfer',cash:-1},
 bill:{l:'Supplier bill (credit)',cash:0,pl:-1,party:-1},invoice:{l:'Customer invoice (credit)',cash:0,pl:1,party:1},pay:{l:'Payment to party',cash:-1,party:1},receive:{l:'Receipt from party',cash:1,party:-1},
 capital:{l:'Partner deposit / funding',cash:1,party:-1},draw:{l:'Partner drawings',cash:-1,party:1},adjust:{l:'Cash count adjustment'},payment:{l:'Outgoing payment',cash:-1}};
const MAIN_T=['expense','income','advance','salary','repay','transfer'],MORE_T=['bill','invoice','pay','receive','capital','draw'];
const HAS={account:t=>!['bill','invoice'].includes(t),party:t=>['bill','invoice','pay','receive','capital','draw'].includes(t),emp:t=>['advance','salary','repay'].includes(t),
 project:t=>['expense','income','bill','invoice','advance','salary'].includes(t),ecat:t=>['expense','bill'].includes(t),icat:t=>['income','invoice'].includes(t)};
const NAV=[['dash','Dashboard'],['txns','Entries'],['staff','Employees'],['accounts','Cash & banks'],['parties','Parties'],['projects','Projects'],['reports','Reports'],['setup','Settings']];
const LIB={xlsx:'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',h2c:'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',pdf:'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'};

const ICP={
home:'<path class="b" d="M5 11v9h14v-9l-7-6z"/><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v10h14V10"/><rect class="a" x="10" y="14" width="4" height="6" rx=".5"/>',
txns:'<path class="b" d="M6 3h9l4 4v14H6z"/><path d="M6 3h9l4 4v14H6zM15 3v4h4"/><path d="M9 11h7M9 14.5h7M9 18h4"/><circle class="a" cx="18" cy="18" r="3.2"/>',
staff:'<circle class="b" cx="9" cy="8" r="3.5"/><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.6-3.6 3.2-5.6 6.5-5.6s5.9 2 6.5 5.6"/><circle class="a" cx="17" cy="9" r="2.6"/><path d="M15.8 14.6c2.7.2 4.6 2 5.2 5.4"/>',
accounts:'<path class="b" d="M3 9.5h18v2H3z"/><path d="M3 9.5 12 4l9 5.5M4.5 11.5V18M9.5 11.5V18M14.5 11.5V18M19.5 11.5V18M3 20.5h18"/><circle class="a" cx="12" cy="7.6" r="1.6"/>',
parties:'<rect class="b" x="3" y="7" width="18" height="12" rx="2"/><rect x="3" y="7" width="18" height="12" rx="2"/><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18"/><rect class="a" x="10" y="11" width="4" height="3.2" rx=".6"/>',
projects:'<path class="b" d="M3 7h18v12H3z"/><path d="M3 6.5a1.5 1.5 0 0 1 1.5-1.5h4.3l2 2.2h8.7A1.5 1.5 0 0 1 21 8.7V18a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18z"/><path class="a" d="M8 13.5h8v2.2H8z"/>',
reports:'<rect class="b" x="4" y="3" width="16" height="18" rx="2"/><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 17v-4M12 17V8M16 17v-6"/><rect class="a" x="10.8" y="8" width="2.4" height="9" rx=".6"/>',
setup:'<circle class="b" cx="12" cy="12" r="7"/><path d="M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.9 1.9M16.6 16.6l1.9 1.9M5.5 18.5l1.9-1.9M16.6 7.4l1.9-1.9"/><circle cx="12" cy="12" r="5.2"/><circle class="a" cx="12" cy="12" r="2.2"/>',
salary:'<rect class="b" x="2.5" y="6" width="19" height="12" rx="2"/><rect x="2.5" y="6" width="19" height="12" rx="2"/><circle class="a" cx="12" cy="12" r="2.8"/><path d="M6 9.5v.01M18 14.5v.01"/>',
advance:'<path class="b" d="M3 15h4l4-2h3.5a1.5 1.5 0 0 1 0 3H11"/><path d="M2.5 14.5H6l4.2-2h4.3a1.6 1.6 0 0 1 0 3.2H11M6.5 18.5l3.5 1.5h5l6-4.6a1.6 1.6 0 0 0-2.1-2.3l-3.4 2.4"/><circle class="a" cx="15.5" cy="6.5" r="3.3"/>',
count:'<rect class="b" x="5" y="3" width="14" height="18" rx="2"/><rect x="5" y="3" width="14" height="18" rx="2"/><rect class="a" x="8" y="6" width="8" height="3.4" rx=".6"/><path d="M8.5 13h.01M12 13h.01M15.5 13h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01"/>',
transfer:'<circle class="b" cx="12" cy="12" r="9"/><path d="M7 9h10l-3-3M17 15H7l3 3"/><circle class="a" cx="12" cy="12" r="1.6"/>',
excel:'<rect class="b" x="3" y="4" width="18" height="16" rx="2"/><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14.5h18M9 9v11"/><path class="a" d="M3.8 4.8h16.4V9H3.8z"/>',
lock:'<rect class="b" x="5" y="10.5" width="14" height="10" rx="2"/><rect x="5" y="10.5" width="14" height="10" rx="2"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle class="a" cx="12" cy="15.5" r="1.8"/>',
invoice:'<path class="b" d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z"/><path d="M6 3h12v18l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4L6 21z"/><path d="M9 8h6M9 11.5h6"/><circle class="a" cx="12" cy="16" r="1.8"/>',
alert:'<path class="b" d="M12 3.5 21 19.5H3z"/><path d="M12 3.5 21 19.5H3zM12 10v4"/><circle class="a" cx="12" cy="16.8" r="1.1"/>',
info:'<circle class="b" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="9"/><path d="M12 11v5.5"/><circle class="a" cx="12" cy="7.8" r="1.2"/>',
pdf:'<path class="b" d="M6 3h9l4 4v14H6z"/><path d="M6 3h9l4 4v14H6zM15 3v4h4"/><path class="a" d="M8.5 12.5h8v5h-8z"/>',
plus:'<circle class="b" cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>'};
const IC=(n,cls='')=>`<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICP[n]||''}</svg>`;
const NAVIC={recon:'count',dash:'home',txns:'txns',staff:'staff',accounts:'accounts',parties:'parties',projects:'projects',reports:'reports',setup:'setup'};
/* ============ state ============ */
const S={accounts:[],projects:[],employees:[],parties:[],txns:[],cfg:null,view:'dash',emp:null,party:null,pk:'',
 f:{period:'month',from:'',to:'',project:'',type:'',account:'',emp:'',party:'',q:''},rp:{period:'year',from:'',to:'',tab:'sum',dc:'USD'},setTab:'general',team:null,payments:null,admin:null};
let db=null,canWrite=true,loaded=false,syncKey='Loading…',syncCls='';
const COLS=['accounts','projects','employees','parties','txns'];

/* ============ helpers ============ */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const today=()=>new Date().toLocaleDateString('en-CA');
const ym=(d=new Date())=>d.toLocaleDateString('en-CA').slice(0,7);
const sum=(a,f)=>a.reduce((s,x)=>s+(+f(x)||0),0);
const currs=()=>S.cfg&&S.cfg.currencies&&S.cfg.currencies.length?S.cfg.currencies:DEF_CURR;
const ecats=()=>S.cfg&&S.cfg.categories&&S.cfg.categories.length?S.cfg.categories:DEF_ECATS;
const icats=()=>S.cfg&&S.cfg.incomeCats&&S.cfg.incomeCats.length?S.cfg.incomeCats:DEF_ICATS;
const cur=c=>currs().find(x=>x.code===c);
const curName=c=>t((cur(c)||{}).name||c);
const rate=c=>(cur(c)&&+cur(c).rate)||1;
const dec=c=>rate(c)>=500?0:2;
const fN=(n,d=2)=>(+n||0).toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d});
const rnd=(n,c)=>+(+n||0).toFixed(dec(c));
const money=(n,c,cls='')=>`<span class="num ${cls}" dir="ltr">${fN(n,dec(c))} ${esc((cur(c)||{}).sym||c)}</span>`;
const usdH=(n,cls='')=>money(n,'USD',cls);
const sgn=n=>n<-0.005?'neg':'';
const byId=(a,id)=>id?a.find(x=>x.id===id):undefined;
const nm=(a,id)=>(byId(a,id)||{}).name||'';
const accName=id=>nm(S.accounts,id)||'—',prjName=id=>nm(S.projects,id),empName=id=>nm(S.employees,id),ptyName=id=>nm(S.parties,id);
const ctry=c=>c?t(COUNTRIES[c]||c):'';
const tRate=t=>+t.rate||rate(t.currency);
const tUsd=t=>(+t.amount||0)/tRate(t);
const lockDate=()=>(S.cfg&&S.cfg.lockDate)||'';
const locked=d=>!!lockDate()&&d<=lockDate();
const tl=k=>t((TYPES[k]||{}).l||k);
function period(p,from,to){const d=new Date(),y=d.getFullYear(),m=d.getMonth(),f=(Y,M,D)=>new Date(Y,M,D).toLocaleDateString('en-CA');
 if(p==='month')return[f(y,m,1),f(y,m+1,0)];if(p==='last')return[f(y,m-1,1),f(y,m,0)];if(p==='q')return[f(y,m-2,1),f(y,m+1,0)];if(p==='year')return[f(y,0,1),f(y,11,31)];if(p==='lyear')return[f(y-1,0,1),f(y-1,11,31)];
 if(p==='custom')return[from||'0000-01-01',to||'9999-12-31'];return['0000-01-01','9999-12-31'];}
const inR=(d,r)=>(d||'')>=r[0]&&(d||'')<=r[1];
function toast(k,p){const el=$('#toast');el.textContent=t(k,p);el.classList.add('on');clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('on'),2600);}
const sorted=a=>[...a].sort((x,y)=>(y.date||'').localeCompare(x.date||'')||(y.createdAt||0)-(x.createdAt||0));
const monLbl=m=>{try{return new Date(m+'-01T00:00').toLocaleDateString(LOC(),{month:'long',year:'numeric'})}catch(e){return m}};
const fD=d=>d||'';

/* ============ accounting engine ============ */
function cashFx(t,aid){let v=0;if(t.account===aid){if(t.type==='adjust')v+=(+t.dir||1)*(+t.amount||0);else v+=((TYPES[t.type]||{}).cash||0)*(+t.amount||0);}
 if(t.type==='transfer'&&t.toAccount===aid)v+=+t.toAmount||0;return v;}
const accBal=a=>(+a.opening||0)+sum(S.txns,t=>cashFx(t,a.id));
const accUsd=a=>accBal(a)/rate(a.currency);
const isRev=t=>(TYPES[t.type]||{}).pl===1||(t.type==='adjust'&&+t.dir>0);
const isExp=t=>(TYPES[t.type]||{}).pl===-1||t.type==='payment'||(t.type==='adjust'&&+t.dir<0);
const plAmt=t=>(+t.amount||0)+(t.type==='salary'?(+t.deduct||0):0);
const plUsd=t=>plAmt(t)/tRate(t);
const plCat=x=>x.type==='salary'?t('Salaries & wages'):x.type==='adjust'?t('Cash count differences'):(x.category?t(x.category):t('Uncategorized'));
function advByCur(eid){const r={};for(const x of S.txns){if(x.employee!==eid)continue;const c=x.currency;let v=0;
 if(x.type==='advance')v=+x.amount;else if(x.type==='repay')v=-x.amount;else if(x.type==='salary')v=-(+x.deduct||0);if(v)r[c]=(r[c]||0)+v;}
 for(const k in r)if(Math.abs(r[k])<0.005)delete r[k];return r;}
const advUsd=eid=>{const r=advByCur(eid);return sum(Object.keys(r),k=>r[k]/rate(k));};
const multi=(r,empty)=>{const k=Object.keys(r);return k.length?k.map(c=>money(r[c],c)).join(' + '):`<span class="mut">${empty||t('None')}</span>`;};
const paidMonth=(eid,m)=>S.txns.some(x=>x.type==='salary'&&x.employee===eid&&x.month===m);
function lastInst(eid,c){const a=sorted(S.txns.filter(x=>x.type==='advance'&&x.employee===eid&&x.currency===c&&+x.installment));return a.length?+a[0].installment:0;}
function suggestDeduct(eid,c){const o=advByCur(eid)[c]||0;if(o<=0)return 0;const i=lastInst(eid,c);return rnd(i?Math.min(i,o):0,c);}
function ptyByCur(pid){const r={},p=byId(S.parties,pid);if(p&&+p.opening)r[p.currency||'USD']=+p.opening;
 for(const x of S.txns){if(x.party!==pid)continue;const e=(TYPES[x.type]||{}).party;if(!e)continue;r[x.currency]=(r[x.currency]||0)+e*(+x.amount);}
 for(const k in r)if(Math.abs(r[k])<0.005)delete r[k];return r;}
const ptyUsd=pid=>{const r=ptyByCur(pid);return sum(Object.keys(r),k=>r[k]/rate(k));};
function ptyBal(pid){const p=byId(S.parties,pid)||{},r=ptyByCur(pid),k=Object.keys(r);if(!k.length)return`<span class="mut">${t('Settled')}</span>`;
 return k.map(c=>{const v=r[c];if(p.kind==='partner')return v<0?t('Partner balance {v}',{v:money(-v,c)}):`<span class="neg">${t('Overdrawn {v}',{v:money(v,c)})}</span>`;
  return v>0?`<span class="pos">${t('Owed to us {v}',{v:money(v,c)})}</span>`:`<span class="neg">${t('We owe {v}',{v:money(-v,c)})}</span>`}).join('<br>');}

/* ============ data layer (Supabase) ============ */
let ORGID=null,chan=null,rq=0;
const ME={assign:{projects:[],accounts:[]},user:null,orgs:[],role:null,sub:null,plans:[],active:false,isAdmin:false,platform:null};
const rowOf=r=>({...(r.data||{}),id:r.id});
function rerender(){if(rq)return;rq=requestAnimationFrame(()=>{rq=0;const ae=document.activeElement;if(ae&&ae.closest&&ae.closest('#view')&&ae.dataset&&ae.dataset.f&&S.view==='txns'){renderTxList();return;}render();});}
function upsertLocal(col,rec){const a=S[col],i=a.findIndex(x=>x.id===rec.id);if(i>=0)a[i]=rec;else a.push(rec);rerender();}
function removeLocal(col,id){const a=S[col],i=a.findIndex(x=>x.id===id);if(i>=0){a.splice(i,1);rerender();}}
function computeAccess(){const s=ME.sub;ME.active=!!s&&['trialing','active'].includes(s.status)&&new Date(s.current_period_end)>new Date();canWrite=ME.active&&['owner','admin','accountant','member'].includes(ME.role);}
const isScoped=()=>ME.role==='member';
const visAccounts=()=>isScoped()?S.accounts.filter(a=>ME.assign.accounts.includes(a.id)):S.accounts;
const canMaster=()=>ME.active&&['owner','admin','accountant'].includes(ME.role);
const canManage=()=>['owner','admin'].includes(ME.role);
function dbErr(e){const m=(e&&(e.message||''))+' '+(e&&e.code||'');
 if(m.includes('period_locked'))return toast('Date is in a closed period (up to {d})',{d:lockDate()});
 if(m.includes('month_closed'))return toast('This month is closed for this cash box');
 if(m.includes('42501')||m.toLowerCase().includes('row-level security'))return toast(ME.active?'You do not have permission to edit':'Subscription expired — data is read only');
 if(m.includes('Failed to fetch')||m.includes('NetworkError'))return toast('No internet connection');
 toast('Could not save, try again');}
async function put(col,id,data){
 if(!canWrite){toast(ME.active?'You do not have permission to edit':'Subscription expired — data is read only');return false;}
 const nid=id||crypto.randomUUID();
 const {error}=id?await sb.from(col).update({data}).eq('id',id):await sb.from(col).insert({id:nid,org_id:ORGID,data});
 if(error){dbErr(error);return false;}
 upsertLocal(col,{...data,id:nid});return true;}
async function del(col,id){const {error}=await sb.from(col).delete().eq('id',id);if(error)return dbErr(error);removeLocal(col,id);toast('Deleted');}
async function saveCfg(patch){const cfg={...(S.cfg||{}),...patch,updatedAt:Date.now()};
 const {error}=await sb.from('org_settings').upsert({org_id:ORGID,data:cfg});if(error){dbErr(error);return false;}S.cfg=cfg;render();return true;}
function setSync(k,c){syncKey=k;syncCls=c||'';$('#st').textContent=t(k);$('#dot').className=syncCls;}
async function loadAll(col){let out=[],from=0;for(;;){const {data,error}=await sb.from(col).select('id,data').eq('org_id',ORGID).order('created_at').range(from,from+999);if(error)throw error;out=out.concat(data);if(data.length<1000)break;from+=1000;}return out.map(rowOf);}
async function fetchOrgs(){const {data,error}=await sb.from('memberships').select('role, projects, accounts, org:organizations(id,name,country)').eq('user_id',ME.user.id);if(error)throw error;
 return (data||[]).filter(r=>r.org).map(r=>({id:r.org.id,name:r.org.name,country:r.org.country,role:r.role,projects:r.projects||[],accounts:r.accounts||[]})).sort((a,b)=>a.name.localeCompare(b.name));}
async function loadSub(){const {data}=await sb.from('subscriptions').select('*').eq('org_id',ORGID).maybeSingle();ME.sub=data;computeAccess();}
async function openOrg(id){
 if(chan){sb.removeChannel(chan);chan=null;}
 ORGID=id;try{localStorage.setItem('ml_org',id)}catch(e){}
 const o=ME.orgs.find(x=>x.id===id);ME.role=o?o.role:null;ME.assign={projects:(o&&o.projects)||[],accounts:(o&&o.accounts)||[]};S.closings=null;if(ME.role==='member'&&!['dash','txns','accounts','recon'].includes(S.view))S.view='dash';
 COLS.forEach(c=>S[c]=[]);S.cfg=null;S.emp=null;S.party=null;S.team=null;S.payments=null;loaded=false;setSync('Loading…','');showApp();render();
 try{
  await loadSub();
  const [cfg,...cols]=await Promise.all([sb.from('org_settings').select('data').eq('org_id',ORGID).maybeSingle(),...COLS.map(loadAll)]);
  S.cfg=cfg.data?cfg.data.data:null;COLS.forEach((c,i)=>S[c]=cols[i]);loaded=true;
 }catch(e){setSync('Data unreachable','bad');dbErr(e);render();return;}
 chan=sb.channel('org-'+ORGID);
 for(const col of COLS){
  chan.on('postgres_changes',{event:'INSERT',schema:'public',table:col,filter:`org_id=eq.${ORGID}`},p=>upsertLocal(col,rowOf(p.new)));
  chan.on('postgres_changes',{event:'UPDATE',schema:'public',table:col,filter:`org_id=eq.${ORGID}`},p=>upsertLocal(col,rowOf(p.new)));
  chan.on('postgres_changes',{event:'DELETE',schema:'public',table:col},p=>p.old&&removeLocal(col,p.old.id));}
 chan.on('postgres_changes',{event:'*',schema:'public',table:'account_closings',filter:`org_id=eq.${ORGID}`},()=>{if(S.closings){S.closings=null;rerender();}});
 chan.on('postgres_changes',{event:'*',schema:'public',table:'org_settings',filter:`org_id=eq.${ORGID}`},p=>{if(p.new&&p.new.data){S.cfg=p.new.data;rerender();}});
 chan.on('postgres_changes',{event:'*',schema:'public',table:'subscriptions',filter:`org_id=eq.${ORGID}`},p=>{if(p.new&&p.new.org_id){ME.sub=p.new;computeAccess();rerender();}});
 chan.subscribe(st=>{if(st==='SUBSCRIBED')setSync(canWrite?'Saved to cloud':'Read only','ok');else if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')setSync('Connection lost','bad');});
 setSync(canWrite?'Saved to cloud':'Read only','ok');render();}

/* ============ auth ============ */
let AUTH='login',authMsg='';
const USER_DOMAIN=import.meta.env.VITE_USERNAME_EMAIL_DOMAIN||'staff.modernlink.app';
async function boot(){
 applyLang();
 if(!configured){document.body.classList.add('auth');$('#view').innerHTML=`<div class="auth-wrap"><div class="auth-card"><h2>Setup required</h2><p>Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see README).</p></div></div>`;return;}
 sb.from('plans').select('*').order('sort').then(({data})=>{ME.plans=data||[];if(!ME.user)renderAuth();});
 sb.auth.onAuthStateChange((ev,session)=>{
  if(ev==='PASSWORD_RECOVERY'){AUTH='reset';renderAuth();}
  else if(ev==='SIGNED_OUT'){if(chan){sb.removeChannel(chan);chan=null;}ME.user=null;ORGID=null;COLS.forEach(c=>S[c]=[]);AUTH='login';renderAuth();}
 });
 const {data:{session}}=await sb.auth.getSession();
 if(session&&AUTH!=='reset')await afterLogin(session.user);else renderAuth();}
async function afterLogin(user){
 ME.user=user;const md=user.user_metadata||{};
 try{
  await sb.rpc('accept_invitations',{p_full_name:md.full_name||null});
  ME.orgs=await fetchOrgs();
  if(!ME.orgs.length&&md.company&&!md.company_created){
   const {error}=await sb.rpc('create_organization',{p_name:md.company,p_country:md.country||null,p_full_name:md.full_name||null});
   if(!error){await sb.auth.updateUser({data:{company_created:true}});ME.orgs=await fetchOrgs();}}
  const [a,p]=await Promise.all([sb.from('platform_admins').select('user_id').eq('user_id',user.id),sb.from('platform_settings').select('*').maybeSingle()]);
  ME.isAdmin=!!(a.data&&a.data.length);ME.platform=p.data||{};
 }catch(e){authMsg=t('No internet connection');AUTH='login';renderAuth();return;}
 if(!ME.orgs.length){AUTH='noorg';renderAuth();return;}
 let last=null;try{last=localStorage.getItem('ml_org')}catch(e){}
 await openOrg((ME.orgs.find(o=>o.id===last)||ME.orgs[0]).id);}
function showApp(){document.body.classList.remove('auth');$('#menuB').hidden=false;$('#outB').hidden=false;
 const sel=$('#orgSel');sel.hidden=ME.orgs.length<2;sel.innerHTML=ME.orgs.map(o=>`<option value="${o.id}" ${o.id===ORGID?'selected':''}>${esc(o.name)}</option>`).join('');
 $('#who').textContent=ME.user?((ME.user.user_metadata||{}).username||ME.user.email):'';}
function planLine(p){return `<li><b>${esc(LANG==='ar'?p.name_ar:p.name_en)}</b> — ${p.code==='trial'?t('Free for {d} days',{d:(ME.platform&&ME.platform.trial_days)||14}):t('{p} USD / month · up to {u} users',{p:fN(p.price_usd,0),u:p.max_users})}</li>`;}
function renderAuth(){
 document.body.classList.add('auth');$('#menuB').hidden=true;$('#outB').hidden=AUTH!=='noorg';$('#orgSel').hidden=true;$('#who').textContent='';
 const F={
  login:`<h2>${t('Sign in')}</h2><form id="af"><label>${t('Email or username')}<input id="ae" required autocomplete="username" dir="ltr" autocapitalize="none"></label><label>${t('Password')}<input type="password" id="ap" required autocomplete="current-password" dir="ltr"></label><button class="btn p wide">${t('Sign in')}</button></form>
   <div class="auth-links"><button class="lnk" data-a="auth" data-id="signup">${t('Create a company account')}</button><button class="lnk" data-a="auth" data-id="forgot">${t('Forgot password?')}</button></div>`,
  signup:`<h2>${t('Create a company account')}</h2><form id="af"><label>${t('Company name')}<input id="ac" required minlength="2"></label><label>${t('Country')}<select id="ay">${dictOpts(COUNTRIES,'JO')}</select></label><label>${t('Full name')}<input id="an" required></label><label>${t('Email')}<input type="email" id="ae" required autocomplete="email" dir="ltr"></label><label>${t('Password')} <span class="h">${t('At least 8 characters')}</span><input type="password" id="ap" required minlength="8" autocomplete="new-password" dir="ltr"></label><button class="btn p wide">${t('Start free trial')}</button></form>
   <div class="auth-links"><button class="lnk" data-a="auth" data-id="login">${t('I already have an account')}</button></div>`,
  forgot:`<h2>${t('Reset password')}</h2><form id="af"><label>${t('Email')}<input type="email" id="ae" required dir="ltr"></label><button class="btn p wide">${t('Send reset link')}</button></form><div class="auth-links"><button class="lnk" data-a="auth" data-id="login">${t('Back to sign in')}</button></div>`,
  reset:`<h2>${t('Set a new password')}</h2><form id="af"><label>${t('New password')}<input type="password" id="ap" required minlength="8" dir="ltr"></label><button class="btn p wide">${t('Save')}</button></form>`,
  sent:`<h2>${t('Check your email')}</h2><p>${t('We sent a link to {e}. Open it to continue, then sign in.',{e:'<b dir="ltr">'+esc(authMsg)+'</b>'})}</p><div class="auth-links"><button class="lnk" data-a="auth" data-id="login">${t('Back to sign in')}</button></div>`,
  noorg:`<h2>${t('Create your company')}</h2><p class="mut">${t('Your account is not linked to any company yet. Create one, or ask your company admin to invite {e}.',{e:'<b dir="ltr">'+esc(ME.user?ME.user.email:'')+'</b>'})}</p><form id="af"><label>${t('Company name')}<input id="ac" required minlength="2"></label><label>${t('Country')}<select id="ay">${dictOpts(COUNTRIES,'JO')}</select></label><button class="btn p wide">${t('Create company')}</button></form>`};
 const msg=AUTH!=='sent'&&authMsg?`<div class="note-box err">${esc(authMsg)}</div>`:'';
 $('#view').innerHTML=`<div class="auth-wrap"><div class="auth-side"><img src="./logo.jpg" alt=""><h1>${t('Internal accounting system')}</h1><p>${t('Multi-currency accounting for companies working across several countries.')}</p>
  <ul class="feat"><li>${t('Expenses, revenue and transfers in every currency, with USD reporting')}</li><li>${t('Employees, salaries, advances and installments')}</li><li>${t('Suppliers, customers and partners balances')}</li><li>${t('Income statement, financial position, PDF and Excel')}</li><li>${t('Arabic and English, on the web and Android')}</li></ul>
  ${ME.plans.length?`<h3>${t('Plans')}</h3><ul class="plans">${ME.plans.map(planLine).join('')}</ul>`:''}</div>
  <div class="auth-card">${msg}${F[AUTH]||F.login}</div></div>`;
 const f=$('#af');if(f)f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector('button');b.disabled=true;authMsg='';
  const v=id=>{const el=$('#'+id);return el?el.value.trim():''};let r;
  try{
   if(AUTH==='login'){const lg=v('ae');r=await sb.auth.signInWithPassword({email:lg.includes('@')?lg:lg.toLowerCase()+'@'+USER_DOMAIN,password:$('#ap').value});if(r.error)throw r.error;await afterLogin(r.data.user);return;}
   if(AUTH==='signup'){r=await sb.auth.signUp({email:v('ae'),password:$('#ap').value,options:{emailRedirectTo:location.origin+location.pathname,data:{full_name:v('an'),company:v('ac'),country:v('ay')}}});if(r.error)throw r.error;
    if(r.data.session){await afterLogin(r.data.user);return;}authMsg=v('ae');AUTH='sent';renderAuth();return;}
   if(AUTH==='forgot'){r=await sb.auth.resetPasswordForEmail(v('ae'),{redirectTo:location.origin+location.pathname});if(r.error)throw r.error;authMsg=v('ae');AUTH='sent';renderAuth();return;}
   if(AUTH==='reset'){r=await sb.auth.updateUser({password:$('#ap').value});if(r.error)throw r.error;toast('Password updated');AUTH='login';const {data:{session}}=await sb.auth.getSession();if(session)await afterLogin(session.user);else renderAuth();return;}
   if(AUTH==='noorg'){r=await sb.rpc('create_organization',{p_name:v('ac'),p_country:v('ay'),p_full_name:(ME.user.user_metadata||{}).full_name||null});if(r.error)throw r.error;ME.orgs=await fetchOrgs();await openOrg(r.data);return;}
  }catch(err){const m=String(err.message||err);
   authMsg=m.includes('Invalid login')?t('Wrong email or password'):m.includes('not confirmed')?t('Please confirm your email first'):m.includes('already registered')?t('This email is already registered'):m.includes('Failed to fetch')?t('No internet connection'):m.includes('too_many_organizations')?t('Company limit reached'):m;
   b.disabled=false;renderAuth();}};}

/* ============ shell ============ */
function applyLang(){const h=document.documentElement;h.lang=LANG;h.dir=LANG==='ar'?'rtl':'ltr';
 document.title=(LANG==='ar'?'مودرن لينك — ':'Modern Link — ')+t('Internal accounting system');
 $('#orgN').textContent=ORG();$('#orgS').textContent=LANG==='ar'?'Modern Link · '+t('Internal accounting system'):t('Internal accounting system');
 $('#langB').textContent=LANG==='ar'?'English':'العربية';$('#outB').textContent=t('Sign out');$('#menuB').textContent='☰ '+t('Menu');$('#st').textContent=t(syncKey);$('#dot').className=syncCls;
 $('#foot1').textContent=`© ${new Date().getFullYear()} ${ORG()} — ${t('All rights reserved')}`;$('#foot2').textContent=t('Internal accounting system');}
const navItems=()=>{if(isScoped())return [['dash','Dashboard'],['txns','Entries'],['accounts','Cash & banks'],['recon','Monthly reconciliation']];const n=[...NAV];n.splice(4,0,['recon','Monthly reconciliation']);return ME.isAdmin?[...n,['admin','Platform admin']]:n;};
NAVIC.admin='parties';
function go(v){S.view=v;if(v!=='staff')S.emp=null;if(v!=='parties')S.party=null;try{history.replaceState(null,'','#'+v)}catch(e){}closeModal();render();window.scrollTo(0,0);}
window.addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(ME.user&&ORGID&&navItems().some(x=>x[0]===h)&&h!==S.view)go(h);});
{const h=location.hash.slice(1);if(NAV.some(x=>x[0]===h))S.view=h;}
const B=(a,lbl,cls='',id='')=>`<button class="btn ${cls}" data-a="${a}" ${id!==''?`data-id="${esc(id)}"`:''}>${lbl}</button>`;
function headActs(){const w=canWrite,v=S.view;
 if(v==='dash')return w?B('newTx','+ '+t('New entry'),'p'):'';
 if(v==='txns')return B('xlsTx',t('Export Excel'))+(w?B('newTx','+ '+t('New entry'),'p'):'');
 if(v==='staff'){if(S.emp)return (w?B('editEmp',t('Edit'),'',S.emp):'')+B('empStmt',t('Statement'))+B('xlsEmp',t('Export Excel'));return w?B('newEmp','+ '+t('New employee'))+B('payroll',t('Pay monthly salaries'),'p'):'';}
 if(v==='accounts')return w?B('newTx',t('Transfer'),'','transfer')+(canMaster()?B('newAcc','+ '+t('New account'),'p'):''):'';
 if(v==='parties'){if(S.party)return (w?B('editPty',t('Edit'),'',S.party):'')+B('ptyStmt',t('Statement'));return w?B('newPty','+ '+t('New party'),'p'):'';}
 if(v==='projects')return w?B('newPrj','+ '+t('New project'),'p'):'';
 if(v==='reports')return B('repPdf',t('Export PDF'))+B('xlsAll',t('Export Excel'));return '';}
function render(){
 if(!ME.user||!ORGID){if(!document.body.classList.contains('auth'))renderAuth();return;}
 showApp();
 $('#nav .w').innerHTML=navItems().map(([k,l])=>`<button data-a="go" data-id="${k}" class="${S.view===k?'on':''}">${IC(NAVIC[k])}${t(l)}</button>`).join('');
 if(!navItems().some(x=>x[0]===S.view))S.view='dash';
 const n=navItems().find(x=>x[0]===S.view),sub=S.view==='staff'&&S.emp?empName(S.emp):S.view==='parties'&&S.party?ptyName(S.party):'';
 $('#ttl').textContent=sub||t(n[1]);
 $('#crumb').innerHTML=`<a data-a="go" data-id="dash">${t('Home')}</a>`+(S.view!=='dash'?` / ${sub?`<a data-a="go" data-id="${S.view}">${t(n[1])}</a> / ${esc(sub)}`:t(n[1])}`:'');
 $('#hacts').innerHTML=headActs();
 const V={dash:vDash,txns:vTxns,staff:vStaff,accounts:vAccounts,parties:vParties,projects:vProjects,reports:vReports,setup:vSetupTabs,admin:vAdmin,recon:vRecon}[S.view];
 $('#view').innerHTML=(S.view!=='admin'?subBanner():'')+(loaded||S.view==='admin'?V():`<div class="empty">${t('Loading…')}</div>`);if(S.view==='txns')renderTxList();}

/* ============ shared renderers ============ */
const PNK={'Currencies and exchange rates':'salary','Categories':'projects','Period closing':'lock','Backup and export':'excel','System setup':'setup','Last 12 months':'reports','Filter':'setup','Income statement':'reports','Statement of financial position':'accounts','Cash balances':'accounts','By project':'projects','By country':'parties','Currencies':'salary','Employees':'staff'};
const pn=(title,body,opts={})=>(opts.ic||(opts.ic=PNK[Object.keys(PNK).find(k=>t(k)===title)]),`<section class="pn">${title!==null?`<div class="pn-h">${opts.ic?IC(opts.ic):''}<span class="sp">${title}</span>${opts.note?`<span class="note">${opts.note}</span>`:''}${opts.act||''}</div>`:''}<div class="pn-b ${opts.flush?'flush':''}">${body}</div></section>`);
const opt=(arr,sel)=>arr.map(x=>`<option value="${esc(x.id)}" ${x.id===sel?'selected':''}>${esc(x.name)}</option>`).join('');
const currOpts=sel=>currs().map(c=>`<option value="${esc(c.code)}" ${c.code===sel?'selected':''}>${esc(c.code)} — ${esc(curName(c.code))}</option>`).join('');
const dictOpts=(D,sel,blank)=>(blank!==undefined?`<option value="">${blank}</option>`:'')+Object.entries(D).map(([k,l])=>`<option value="${k}" ${k===sel?'selected':''}>${t(l)}</option>`).join('');
const PERIODS=[['month','This month'],['last','Last month'],['q','Last 3 months'],['year','This year'],['lyear','Last year'],['all','All periods'],['custom','Custom period']];
const periodSel=(key,v)=>`<select data-f="${key}">${PERIODS.map(([k,l])=>`<option value="${k}" ${v===k?'selected':''}>${t(l)}</option>`).join('')}</select>`;
function desc(x){const p=[];if(x.type==='transfer')p.push(accName(x.account)+' ← '+accName(x.toAccount));
 if(x.employee)p.push(empName(x.employee));if(x.party)p.push(ptyName(x.party));if(x.category&&x.type!=='salary')p.push(t(x.category));if(x.type==='salary'&&x.month)p.push(t('Salary {m}',{m:monLbl(x.month)}));
 if(x.note)p.push(x.note);return p.map(esc).join(' — ');}
function flows(x,aid){const T=TYPES[x.type]||{};let a=+x.amount||0,c=x.currency;
 if(x.type==='transfer'&&aid&&x.toAccount===aid&&x.account!==aid)return{i:+x.toAmount||0,o:0,c:x.toCurrency||c};
 if(x.type==='adjust')return +x.dir>0?{i:a,o:0,c}:{i:0,o:a,c};
 const dir=T.cash||(T.pl||0);return dir>0?{i:a,o:0,c}:{i:0,o:a,c};}
function txTable(L,opts={}){const bal=opts.bal;let run={};
 if(bal){const a=byId(S.accounts,bal);let b=+a.opening||0;[...S.txns].sort((x,y)=>(x.date||'').localeCompare(y.date||'')||(x.createdAt||0)-(y.createdAt||0)).forEach(x=>{const v=cashFx(x,bal);if(v||x.account===bal||x.toAccount===bal){b+=v;run[x.id]=b;}});}
 const ac=bal?(byId(S.accounts,bal)||{}).currency:null;
 const head=`<tr><th>${t('Date')}</th><th class="m-hide">${t('Doc. no.')}</th><th>${t('Type')}</th><th>${t('Description')}</th>${opts.noAcc?'':`<th class="m-hide">${t('Account')}</th>`}<th class="m-hide">${t('Project')}</th><th class="n m-hide">${t('In')}</th><th class="n m-hide">${t('Out')}</th><th class="n m-show">${t('Amount')}</th>${bal?`<th class="n">${t('Balance')}</th>`:`<th class="n m-hide">${t('≈ USD')}</th>`}</tr>`;
 const rows=L.map(x=>{const f=flows(x,bal),cr=!HAS.account(x.type);
  return `<tr class="cl" data-a="editTx" data-id="${x.id}"><td class="num" style="white-space:nowrap">${fD(x.date)}</td><td class="m-hide">${esc(x.ref||'')}</td><td>${tl(x.type)}${cr?` <span class="tag">${t('credit')}</span>`:''}${locked(x.date)?` <span class="tag">${t('closed')}</span>`:''}</td><td>${desc(x)}</td>${opts.noAcc?'':`<td class="m-hide">${cr?'—':esc(accName(x.account))}</td>`}<td class="m-hide">${esc(prjName(x.project))}</td>
  <td class="n m-hide">${f.i?money(f.i,f.c,'pos'):''}</td><td class="n m-hide">${f.o?money(f.o,f.c,'neg'):''}</td><td class="n m-show">${f.i?money(f.i,f.c,'pos'):money(-f.o,f.c,'neg')}</td>${bal?`<td class="n">${run[x.id]!==undefined?money(run[x.id],ac,sgn(run[x.id])):''}</td>`:`<td class="n m-hide mut">${f.c!=='USD'?usdH((f.i||f.o)/((f.c===x.currency)?tRate(x):rate(f.c))):''}</td>`}</tr>`}).join('');
 return `<div class="tw"><table>${head}${rows||`<tr><td colspan="9" class="empty">${opts.empty||t('No entries')}</td></tr>`}</table></div>`;}

/* ============ views ============ */
const SVCS=()=>[
 ['newTx','txns','New entry','Record expenses, revenue and payments',''],['payroll','salary','Pay monthly salaries','Pay all salaries in one step',''],
 ['newTx','advance','Employee advance','Give an advance with monthly installments','advance'],['newTx','transfer','Transfer','Move money between cash boxes and currencies','transfer'],
 ['newTx','invoice','Supplier bill (credit)','Record a purchase on credit','bill'],['go','count','Cash count','Count a cash box and record the difference','accounts'],
 ['go','reports','Reports','Income statement, financial position and more','reports'],['xlsAll','excel','Export Excel','Full workbook of all records','']];
function vDash(){
 if(!S.accounts.length&&!S.employees.length&&!S.txns.length)return pn(t('System setup'),`<p style="margin-top:0">${t('Complete these steps to start using the system:')}</p><ol class="steps"><li>${t('Review exchange rates against the US dollar.')} <button class="lnk" data-a="go" data-id="setup">${t('Exchange rates')}</button></li><li>${t('Add cash boxes and bank accounts with opening balances.')} <button class="lnk" data-a="newAcc">${t('New account')}</button></li><li>${t('Add projects, employees and parties.')} <button class="lnk" data-a="newPrj">${t('New project')}</button> · <button class="lnk" data-a="newEmp">${t('New employee')}</button> · <button class="lnk" data-a="newPty">${t('New party')}</button></li><li>${t('Start recording entries.')}</li></ol>`);
 const m=period('month'),tm=S.txns.filter(x=>inR(x.date,m)),mm=ym();
 const inc=sum(tm.filter(isRev),plUsd),exp=sum(tm.filter(isExp),plUsd),cash=sum(visAccounts(),accUsd),adv=sum(S.employees,e=>advUsd(e.id));
 const pr=S.parties.filter(p=>p.kind!=='partner').map(p=>ptyUsd(p.id)),recv=sum(pr,v=>v>0?v:0),pay=sum(pr,v=>v<0?-v:0),peq=-sum(S.parties.filter(p=>p.kind==='partner'),p=>ptyUsd(p.id));
 const unpaid=S.employees.filter(e=>e.active!==false&&+e.salary&&!paidMonth(e.id,mm)),neg=visAccounts().filter(a=>accBal(a)<-0.005);
 let alerts='';
 if(lockDate())alerts+=`<div class="note-box info">${IC('lock')}<span class="sp">${t('Books are closed up to {d}. Earlier entries cannot be changed.',{d:lockDate()})}</span></div>`;
 if(unpaid.length)alerts+=`<div class="note-box">${IC('alert')}<span class="sp">${t('Salaries for {m} not yet paid for {n} employee(s): {list}',{m:monLbl(mm),n:unpaid.length,list:unpaid.slice(0,8).map(e=>esc(e.name)).join(LANG==='ar'?'، ':', ')})}</span>${canWrite?B('payroll',t('Pay monthly salaries'),'sm'):''}</div>`;
 if(neg.length)alerts+=`<div class="note-box err">${IC('alert')}<span class="sp">${t('Negative balance in: {list}',{list:neg.map(a=>esc(a.name)).join(', ')})}</span></div>`;
 const accT=`<div class="tw"><table><tr><th>${t('Account')}</th><th class="m-hide">${t('Country')}</th><th class="n">${t('Balance')}</th><th class="n">${t('USD equivalent')}</th></tr>${visAccounts().map(a=>{const b=accBal(a);return `<tr class="cl" data-a="accTx" data-id="${a.id}"><td>${esc(a.name)}</td><td class="m-hide">${ctry(a.country)}</td><td class="n">${money(b,a.currency,sgn(b))}</td><td class="n">${usdH(b/rate(a.currency))}</td></tr>`}).join('')}<tr class="tot"><td>${t('Total')}</td><td class="m-hide"></td><td></td><td class="n">${usdH(cash)}</td></tr></table></div>`;
 const kv=`<table class="kv"><tr><th>${t('Revenue for the month')}</th><td>${usdH(inc)}</td></tr><tr><th>${t('Expenses for the month')}</th><td>${usdH(exp)}</td></tr><tr><th>${t('Net for the month')}</th><td>${usdH(inc-exp,sgn(inc-exp))}</td></tr><tr><th>${t('Outstanding employee advances')}</th><td>${usdH(adv)}</td></tr><tr><th>${t('Receivables (owed to us)')}</th><td>${usdH(recv)}</td></tr><tr><th>${t('Payables (we owe)')}</th><td>${usdH(pay)}</td></tr><tr><th>${t('Partner & funding balances')}</th><td>${usdH(peq)}</td></tr></table>`;
 if(isScoped()){const mine=visAccounts().map(a=>a.id),fl=x=>sum(mine,id=>cashFx(x,id));const inM=sum(tm,x=>Math.max(0,fl(x))/tRate(x)),outM=sum(tm,x=>Math.max(0,-fl(x))/tRate(x));
  return alerts+`<div class="cols">${pn(t('My cash boxes'),accT,{ic:'accounts',flush:true})}${pn(t('Key figures — {m}',{m:monLbl(mm)}),`<table class="kv"><tr><th>${t('In this month')}</th><td>${usdH(inM)}</td></tr><tr><th>${t('Out this month')}</th><td>${usdH(outM)}</td></tr></table><div style="padding:10px 12px">${canWrite?B('newTx','+ '+t('New entry'),'p sm'):''} ${B('go',t('Monthly reconciliation'),'sm','recon')}</div>`,{ic:'reports',flush:true})}</div>`+pn(t('Latest entries'),txTable(sorted(S.txns).slice(0,10)),{ic:'txns',flush:true,act:B('go',t('View all'),'sm','txns')});}
 return alerts+(canWrite?`<div class="sech">${t('E-services')}</div><div class="svc">${SVCS().map(([a,ic,l,d,id])=>`<button data-a="${a}" ${id?`data-id="${id}"`:''}>${IC(ic)}<b>${t(l)}</b><small>${t(d)}</small></button>`).join('')}</div>`:'')+`<div class="sech">${t('Overview')}</div><div class="cols">${pn(t('Cash balances'),accT,{ic:'accounts',flush:true,act:B('go',t('View all'),'sm','accounts')})}${pn(t('Key figures — {m}',{m:monLbl(mm)}),kv,{ic:'reports',flush:true})}</div>`+
  pn(t('Latest entries'),txTable(sorted(S.txns).slice(0,10)),{ic:'txns',flush:true,act:B('go',t('View all'),'sm','txns')});}

function filtTx(){const f=S.f,r=period(f.period,f.from,f.to),q=f.q.trim().toLowerCase();
 return sorted(S.txns.filter(x=>inR(x.date,r)&&(!f.project||x.project===f.project)&&(!f.type||x.type===f.type)&&(!f.account||x.account===f.account||x.toAccount===f.account)&&(!f.emp||x.employee===f.emp)&&(!f.party||x.party===f.party)
  &&(!q||[x.note,x.ref,x.category&&t(x.category),empName(x.employee),ptyName(x.party),prjName(x.project),accName(x.account),x.amount].join(' ').toLowerCase().includes(q))));}
function vTxns(){const f=S.f;
 return `<section class="pn"><details class="flt" ${window.innerWidth>820||S.f.q||S.f.type||S.f.account||S.f.project||S.f.emp||S.f.party?'open':''}><summary>${t('Filter')}</summary><div class="pn-b"><div class="fl"><label class="wide">${t('Search (name, description, doc. no.)')}<input data-f="q" value="${esc(f.q)}"></label><label>${t('Period')}${periodSel('period',f.period)}</label>
 ${f.period==='custom'?`<label>${t('From')}<input type="date" data-f="from" value="${esc(f.from)}"></label><label>${t('To')}<input type="date" data-f="to" value="${esc(f.to)}"></label>`:''}
 <label>${t('Type')}<select data-f="type"><option value="">${t('All types')}</option>${Object.keys(TYPES).filter(k=>k!=='payment').map(k=>`<option value="${k}" ${f.type===k?'selected':''}>${tl(k)}</option>`).join('')}</select></label>
 <label>${t('Account')}<select data-f="account"><option value="">${t('All accounts')}</option>${opt(visAccounts(),f.account)}</select></label>
 <label>${t('Project')}<select data-f="project"><option value="">${t('All projects')}</option>${opt(S.projects,f.project)}</select></label>
 ${isScoped()?'':`<label>${t('Employee')}<select data-f="emp"><option value="">${t('All employees')}</option>${opt(S.employees,f.emp)}</select></label>`}
 <label>${t('Party')}<select data-f="party"><option value="">${t('All parties')}</option>${opt(S.parties,f.party)}</select></label>
 <div>${B('clrF',t('Clear filters'),'sm')}</div></div></div></details></section><div id="txl"></div>`;}
function renderTxList(){const el=$('#txl');if(!el)return;const L=filtTx();
 el.innerHTML=pn(t('{n} entries · expenses {e} · revenue {r}',{n:L.length,e:usdH(sum(L.filter(isExp),plUsd)),r:usdH(sum(L.filter(isRev),plUsd))}),txTable(L,{bal:S.f.account||null,empty:t('No matching entries')}),{flush:true,note:S.f.account?t('Running balance is shown for the selected account.'):''});}

function vStaff(){
 if(S.emp){const e=byId(S.employees,S.emp);if(e)return vEmp(e);S.emp=null;}
 const mm=ym(),act=S.employees.filter(e=>e.active!==false),tot=sum(act,e=>(+e.salary||0)/rate(e.salaryCurrency||'USD'));
 const L=[...S.employees].sort((a,b)=>(a.active===false)-(b.active===false)||(a.name||'').localeCompare(b.name||'',LANG));
 return `<div class="stats"><div>${IC('staff')}<span>${t('Active employees')}</span><b>${act.length}</b></div><div>${IC('salary')}<span>${t('Monthly payroll')}</span><b>${usdH(tot)}</b></div><div>${IC('advance')}<span>${t('Total outstanding advances')}</span><b>${usdH(sum(S.employees,e=>advUsd(e.id)))}</b></div><div>${IC('invoice')}<span>${t('Salaries paid for {m}',{m:monLbl(mm)})}</span><b class="num" dir="ltr">${act.filter(e=>paidMonth(e.id,mm)).length} / ${act.filter(e=>+e.salary).length}</b></div></div>`+
 pn(null,`<div class="tw"><table><tr><th>${t('Name')}</th><th class="m-hide">${t('Position')}</th><th class="m-hide">${t('Project')}</th><th class="n">${t('Monthly salary')}</th><th class="n">${t('Advances balance')}</th><th>${t('Salary {m}',{m:monLbl(mm)})}</th><th class="m-hide">${t('Status')}</th></tr>
 ${L.map(e=>`<tr class="cl" data-a="openEmp" data-id="${e.id}"><td>${esc(e.name)}</td><td class="m-hide">${esc(e.role||'')}</td><td class="m-hide">${esc(prjName(e.project))}</td><td class="n">${money(e.salary,e.salaryCurrency||'USD')}</td><td class="n">${multi(advByCur(e.id),'—')}</td><td>${+e.salary&&e.active!==false?(paidMonth(e.id,mm)?`<span class="tag ok">${t('Paid')}</span>`:`<span class="tag no">${t('Not paid')}</span>`):'—'}</td><td class="m-hide">${e.active===false?t('Suspended'):t('Active')}</td></tr>`).join('')||`<tr><td colspan="7" class="empty">${t('No employees yet')}</td></tr>`}</table></div>`,{flush:true});}
function vEmp(e){const L=sorted(S.txns.filter(x=>x.employee===e.id)),sc=e.salaryCurrency||'USD',yr=period('year');
 const sal=L.filter(x=>x.type==='salary'&&inR(x.date,yr)),advs=L.filter(x=>x.type==='advance');
 const months=[];{const d=new Date();for(let i=0;i<6;i++)months.push(ym(new Date(d.getFullYear(),d.getMonth()-i,1)));}
 const info=`<table class="kv"><tr><th>${t('Position')}</th><td>${esc(e.role||'—')}</td></tr><tr><th>${t('Project')}</th><td>${esc(prjName(e.project)||'—')}</td></tr><tr><th>${t('Phone')}</th><td dir="ltr">${esc(e.phone||'—')}</td></tr><tr><th>${t('Start date')}</th><td>${esc(e.start||'—')}</td></tr><tr><th>${t('Status')}</th><td>${e.active===false?t('Suspended'):t('Active')}</td></tr><tr><th>${t('Monthly salary')}</th><td>${money(e.salary,sc)}</td></tr></table>`;
 const fin=`<table class="kv"><tr><th>${t('Advances balance')}</th><td>${multi(advByCur(e.id))}</td></tr><tr><th>${t('USD equivalent')}</th><td>${usdH(advUsd(e.id))}</td></tr><tr><th>${t('Salaries paid this year')}</th><td>${usdH(sum(sal,plUsd))} <span class="mut small">(${sal.length})</span></td></tr><tr><th>${t('Total advances taken')}</th><td>${usdH(sum(advs,tUsd))} <span class="mut small">(${advs.length})</span></td></tr></table>`
 +(canWrite?`<div class="fl" style="padding:10px 12px;border-top:1px solid var(--line2)">${B('empTx',t('New advance'),'sm','advance')}${B('empTx',t('Pay salary'),'sm p','salary')}${B('empTx',t('Repayment'),'sm','repay')}</div>`:'');
 const salT=`<div class="tw"><table><tr><th>${t('Month')}</th><th>${t('Status')}</th><th class="n">${t('Net paid')}</th><th class="n">${t('Advance deduction')}</th><th></th></tr>${months.map(m=>{const s=L.filter(x=>x.type==='salary'&&x.month===m);return `<tr><td>${monLbl(m)}</td><td>${s.length?`<span class="tag ok">${t('Paid')}</span>`:`<span class="tag no">${t('Not paid')}</span>`}</td><td class="n">${s.map(x=>money(x.amount,x.currency)).join(' + ')||'—'}</td><td class="n">${s.filter(x=>+x.deduct).map(x=>money(x.deduct,x.currency)).join(' + ')||'—'}</td><td>${s.length?`<button class="lnk" data-a="slip" data-id="${s[0].id}">${t('Payslip')}</button>`:''}</td></tr>`}).join('')}</table></div>`;
 return `<div class="cols eq">${pn(t('Employee information'),info,{ic:'staff',flush:true})}${pn(t('Advances balance'),fin,{ic:'advance',flush:true})}</div>`+pn(t('Salaries — last 6 months'),salT,{ic:'salary',flush:true})+pn(t('Account statement'),txTable(L),{ic:'txns',flush:true});}

function vAccounts(){const tot=sum(visAccounts(),accUsd),cw=canMaster();
 return pn(null,`<div class="tw"><table><tr><th>${t('Account')}</th><th class="m-hide">${t('Type')}</th><th class="m-hide">${t('Country')}</th><th>${t('Currency')}</th><th class="n m-hide">${t('Opening balance')}</th><th class="n">${t('Balance')}</th><th class="n">${t('USD equivalent')}</th><th class="n m-hide">${t('Entries count')}</th>${canWrite?'<th></th>':''}</tr>
 ${visAccounts().map(a=>{const b=accBal(a);return `<tr class="cl" data-a="accTx" data-id="${a.id}"><td>${esc(a.name)}</td><td class="m-hide">${t(AKINDS[a.kind]||a.kind||'')}</td><td class="m-hide">${ctry(a.country)}</td><td>${esc(a.currency)}</td><td class="n m-hide">${money(a.opening,a.currency)}</td><td class="n">${money(b,a.currency,sgn(b))}</td><td class="n">${usdH(b/rate(a.currency))}</td><td class="n m-hide">${S.txns.filter(x=>x.account===a.id||x.toAccount===a.id).length}</td>${canWrite?`<td class="n">${B('count',t('Cash count'),'sm',a.id)} ${cw?B('editAcc',t('Edit'),'sm',a.id):''}</td>`:''}</tr>`}).join('')||`<tr><td colspan="9" class="empty">${t('No accounts yet')}</td></tr>`}
 ${visAccounts().length?`<tr class="tot"><td colspan="2">${t('Total')}</td><td class="m-hide" colspan="3"></td><td></td><td class="n">${usdH(tot)}</td><td class="m-hide"></td>${canWrite?'<td></td>':''}</tr>`:''}</table></div>`,{flush:true})+`<p class="mut small">${t('Cash count: count the actual cash and the system records the difference as an adjustment.')}</p>`;}

function vParties(){
 if(S.party){const p=byId(S.parties,S.party);if(p)return vParty(p);S.party=null;}
 const L=S.parties.filter(p=>!S.pk||p.kind===S.pk).sort((a,b)=>(a.name||'').localeCompare(b.name||'',LANG));
 const pr=S.parties.filter(p=>p.kind!=='partner').map(p=>ptyUsd(p.id));
 return `<div class="stats"><div>${IC('invoice')}<span>${t('Receivables (owed to us)')}</span><b>${usdH(sum(pr,v=>v>0?v:0))}</b></div><div>${IC('parties')}<span>${t('Payables (we owe)')}</span><b>${usdH(sum(pr,v=>v<0?-v:0))}</b></div><div>${IC('accounts')}<span>${t('Partner & funding balances')}</span><b>${usdH(-sum(S.parties.filter(p=>p.kind==='partner'),p=>ptyUsd(p.id)))}</b></div></div>
 <div class="tabs"><button data-a="pk" data-id="" class="${!S.pk?'on':''}">${t('All')}</button>${Object.entries(PKINDS).map(([k,l])=>`<button data-a="pk" data-id="${k}" class="${S.pk===k?'on':''}">${t(l)}</button>`).join('')}</div>`+
 pn(null,`<div class="tw"><table><tr><th>${t('Name')}</th><th>${t('Type')}</th><th class="m-hide">${t('Phone')}</th><th class="n">${t('Balance')}</th><th class="n m-hide">${t('USD equivalent')}</th></tr>${L.map(p=>`<tr class="cl" data-a="openPty" data-id="${p.id}"><td>${esc(p.name)}</td><td>${t(PKINDS[p.kind]||'')}</td><td class="m-hide" dir="ltr">${esc(p.phone||'')}</td><td class="n">${ptyBal(p.id)}</td><td class="n m-hide">${usdH(ptyUsd(p.id))}</td></tr>`).join('')||`<tr><td colspan="5" class="empty">${t('No parties yet')}</td></tr>`}</table></div>`,{flush:true});}
function vParty(p){const L=sorted(S.txns.filter(x=>x.party===p.id));
 const acts=canWrite?(p.kind==='partner'?B('ptyTx',t('Deposit / funding'),'sm p','capital')+B('ptyTx',t('Drawings'),'sm','draw'):B('ptyTx',t('Bill from him (credit)'),'sm','bill')+B('ptyTx',t('Payment to him'),'sm','pay')+B('ptyTx',t('Invoice to him (credit)'),'sm','invoice')+B('ptyTx',t('Receipt from him'),'sm','receive')):'';
 return pn(t(PKINDS[p.kind]||''),`<table class="kv"><tr><th>${t('Current balance')}</th><td>${ptyBal(p.id)}</td></tr><tr><th>${t('Phone')}</th><td dir="ltr">${esc(p.phone||'—')}</td></tr><tr><th>${t('Default currency')}</th><td>${esc(p.currency||'USD')}</td></tr></table>${acts?`<div class="fl" style="padding:10px 12px;border-top:1px solid var(--line2)">${acts}</div>`:''}`,{flush:true})+pn(t('Account statement'),txTable(L),{ic:'txns',flush:true});}

function vProjects(){const yr=period('year');
 return pn(null,`<div class="tw"><table><tr><th>${t('Project name')}</th><th>${t('Country')}</th><th class="m-hide">${t('Status')}</th><th class="n m-hide">${t('Employees count')}</th><th class="n">${t('Revenue (YTD)')}</th><th class="n">${t('Expenses (YTD)')}</th><th class="n">${t('Net')}</th>${canWrite?'<th></th>':''}</tr>
 ${S.projects.map(p=>{const L=S.txns.filter(x=>x.project===p.id&&inR(x.date,yr)),i=sum(L.filter(isRev),plUsd),e=sum(L.filter(isExp),plUsd);return `<tr class="cl" data-a="prjTx" data-id="${p.id}"><td>${esc(p.name)}</td><td>${ctry(p.country)}</td><td class="m-hide">${p.status==='closed'?t('Closed'):t('Active')}</td><td class="n m-hide">${S.employees.filter(x=>x.project===p.id&&x.active!==false).length}</td><td class="n">${usdH(i)}</td><td class="n">${usdH(e)}</td><td class="n">${usdH(i-e,sgn(i-e))}</td>${canWrite?`<td class="n">${B('editPrj',t('Edit'),'sm',p.id)}</td>`:''}</tr>`}).join('')||`<tr><td colspan="8" class="empty">${t('No projects yet')}</td></tr>`}</table></div>`,{flush:true});}

/* ---------- reports ---------- */
const RTABS=[['sum','Summary','Performance summary'],['pl','Income statement','Income statement'],['bs','Financial position','Statement of financial position'],['prj','Projects & countries','Projects and countries report'],['cur','Currencies','Currency movement report'],['emp','Employees','Employees report']];
function vReports(){const R=S.rp;
 return pn(t('Filter'),`<div class="fl"><label>${t('Period')}${periodSel('rp.period',R.period)}</label>${R.period==='custom'?`<label>${t('From')}<input type="date" data-f="rp.from" value="${esc(R.from)}"></label><label>${t('To')}<input type="date" data-f="rp.to" value="${esc(R.to)}"></label>`:''}
 <label>${t('Display currency')}<select data-f="rp.dc">${currs().map(c=>`<option value="${esc(c.code)}" ${c.code===R.dc?'selected':''}>${esc(curName(c.code))}</option>`).join('')}</select></label></div>`)+
 `<div class="tabs">${RTABS.map(([k,l])=>`<button data-a="rtab" data-id="${k}" class="${R.tab===k?'on':''}">${t(l)}</button>`).join('')}</div><div id="rep">${repBody()}</div>`;}
function repBody(){const R=S.rp,dc=R.dc,r=period(R.period,R.from,R.to),L=S.txns.filter(x=>inR(x.date,r));
 const X=(u,cls='')=>money(u*rate(dc),dc,cls||sgn(u));
 const head=`<p class="mut small" style="margin:0 0 10px">${t('Period: {p} · Currency: {c}',{p:r[0]==='0000-01-01'?t('All periods'):t('{a} to {b}',{a:r[0],b:r[1]}),c:esc(curName(dc))})}</p>`;
 const rev=sum(L.filter(isRev),plUsd),exp=sum(L.filter(isExp),plUsd);
 if(R.tab==='sum'){const mon=[];{const d=new Date();for(let i=11;i>=0;i--){const m=ym(new Date(d.getFullYear(),d.getMonth()-i,1));const T=S.txns.filter(x=>(x.date||'').startsWith(m));mon.push({m,i:sum(T.filter(isRev),plUsd),e:sum(T.filter(isExp),plUsd)})}}
  const mm=Math.max(1,...mon.map(x=>Math.max(x.i,x.e))),W=720,H=180,bw=W/12,rtl=LANG==='ar';
  const svg=`<svg viewBox="0 0 ${W} ${H+26}" width="100%" style="direction:ltr;font-family:Noto Sans,Arial">${[.25,.5,.75,1].map(f=>`<line x1="0" x2="${W}" y1="${H-H*f}" y2="${H-H*f}" stroke="#eee"/>`).join('')}${mon.map((x,i)=>{const hi=x.i/mm*H,he=x.e/mm*H,X0=(rtl?11-i:i)*bw;return `<rect x="${X0+bw*.18}" y="${H-hi}" width="${bw*.3}" height="${hi}" fill="#2ab3a8"><title>${x.m}: ${fN(x.i*rate(dc))}</title></rect><rect x="${X0+bw*.52}" y="${H-he}" width="${bw*.3}" height="${he}" fill="#62b34f"><title>${x.m}: ${fN(x.e*rate(dc))}</title></rect><text x="${X0+bw/2}" y="${H+17}" font-size="11" text-anchor="middle" fill="#666">${x.m.slice(5)}/${x.m.slice(2,4)}</text>`}).join('')}<line x1="0" x2="${W}" y1="${H}" y2="${H}" stroke="#999"/></svg>`;
  const advG=sum(L.filter(x=>x.type==='advance'),tUsd),advR=sum(L.filter(x=>x.type==='repay'),tUsd)+sum(L.filter(x=>x.type==='salary'),x=>(+x.deduct||0)/tRate(x));
  return head+`<div class="stats"><div>${IC('salary')}<span>${t('Revenue')}</span><b>${X(rev)}</b></div><div>${IC('invoice')}<span>${t('Expenses (incl. salaries)')}</span><b>${X(exp)}</b></div><div>${IC('reports')}<span>${t('Net profit / (loss)')}</span><b>${X(rev-exp)}</b></div><div>${IC('advance')}<span>${t('Advances paid / recovered')}</span><b>${X(advG)} / ${X(advR)}</b></div></div>`+
   pn(t('Last 12 months'),svg+`<div class="small mut"><span style="display:inline-block;width:10px;height:10px;background:#2ab3a8"></span> ${t('Revenue')} &nbsp; <span style="display:inline-block;width:10px;height:10px;background:#62b34f"></span> ${t('Expenses')}</div>`);}
 if(R.tab==='pl'){const g=a=>{const o={};a.forEach(x=>{const k=plCat(x);o[k]=(o[k]||0)+plUsd(x)});return Object.entries(o).sort((a,b)=>b[1]-a[1]);};const RV=g(L.filter(isRev)),EX=g(L.filter(isExp));
  return head+pn(t('Income statement'),`<div class="tw"><table><tr class="sub"><td colspan="2">${t('Revenue')}</td></tr>${RV.map(([k,v])=>`<tr><td style="padding-inline-start:22px">${esc(k)}</td><td class="n">${X(v)}</td></tr>`).join('')||`<tr><td colspan="2" class="mut">${t('None')}</td></tr>`}<tr class="tot"><td>${t('Total revenue')}</td><td class="n">${X(rev)}</td></tr>
  <tr class="sub"><td colspan="2">${t('Expenses')}</td></tr>${EX.map(([k,v])=>`<tr><td style="padding-inline-start:22px">${esc(k)}</td><td class="n">${X(v)}</td></tr>`).join('')||`<tr><td colspan="2" class="mut">${t('None')}</td></tr>`}<tr class="tot"><td>${t('Total expenses')}</td><td class="n">${X(exp)}</td></tr>
  <tr class="tot"><td>${t('Net profit / (loss)')}</td><td class="n">${X(rev-exp)}</td></tr></table></div>`,{flush:true})+`<p class="mut small">${t('Credit invoices and bills are recognised on their date. Advances are receivables, not expenses; payments and receipts settle balances.')}</p>`;}
 if(R.tab==='bs'){const cash=sum(S.accounts,accUsd),adv=sum(S.employees,e=>advUsd(e.id)),np=S.parties.filter(p=>p.kind!=='partner').map(p=>ptyUsd(p.id));
  const recv=sum(np,v=>v>0?v:0),pay=sum(np,v=>v<0?-v:0),peq=-sum(S.parties.filter(p=>p.kind==='partner'),p=>ptyUsd(p.id)),assets=cash+adv+recv,
   opn=sum(S.accounts,a=>(+a.opening||0)/rate(a.currency))+sum(S.parties.filter(p=>p.kind!=='partner'),p=>(+p.opening||0)/rate(p.currency||'USD')),ret=assets-pay-peq-opn;
  const row=(l,v,ind)=>`<tr><td ${ind?'style="padding-inline-start:22px"':''}>${l}</td><td class="n">${X(v)}</td></tr>`;
  return `<p class="mut small" style="margin:0 0 10px">${t('As of {d}, at current exchange rates',{d:today()})} · ${esc(curName(dc))}</p>`+pn(t('Statement of financial position'),`<div class="tw"><table><tr class="sub"><td colspan="2">${t('Assets')}</td></tr>${row(t('Cash and banks'),cash,1)}${row(t('Employee advances'),adv,1)}${row(t('Receivables (owed to us)'),recv,1)}<tr class="tot"><td>${t('Total assets')}</td><td class="n">${X(assets)}</td></tr>
  <tr class="sub"><td colspan="2">${t('Liabilities and equity')}</td></tr>${row(t('Payables (we owe)'),pay,1)}${row(t('Partner & funding balances'),peq,1)}${row(t('Opening balances'),opn,1)}${row(t('Retained earnings & FX differences'),ret,1)}<tr class="tot"><td>${t('Total')}</td><td class="n">${X(pay+peq+opn+ret)}</td></tr></table></div>`,{flush:true})+
  pn(t('Cash balances'),`<div class="tw"><table><tr><th>${t('Account')}</th><th class="n">${t('Balance')}</th><th class="n">${t('USD equivalent')}</th></tr>${S.accounts.map(a=>`<tr><td>${esc(a.name)}</td><td class="n">${money(accBal(a),a.currency)}</td><td class="n">${X(accUsd(a))}</td></tr>`).join('')}</table></div>`,{flush:true});}
 if(R.tab==='prj'){const grp=k=>{const g={};L.forEach(x=>{if(!isRev(x)&&!isExp(x))return;const key=k(x);g[key]=g[key]||{i:0,e:0};if(isRev(x))g[key].i+=plUsd(x);else g[key].e+=plUsd(x);});return Object.entries(g).sort((a,b)=>b[1].e-a[1].e);};
  const tbl=rows=>`<div class="tw"><table><tr><th></th><th class="n">${t('Revenue')}</th><th class="n">${t('Expenses')}</th><th class="n">${t('Net')}</th></tr>${rows.map(([k,v])=>`<tr><td>${esc(k)}</td><td class="n">${X(v.i)}</td><td class="n">${X(v.e)}</td><td class="n">${X(v.i-v.e)}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">${t('No data')}</td></tr>`}${rows.length?`<tr class="tot"><td>${t('Total')}</td><td class="n">${X(sum(rows,x=>x[1].i))}</td><td class="n">${X(sum(rows,x=>x[1].e))}</td><td class="n">${X(sum(rows,x=>x[1].i-x[1].e))}</td></tr>`:''}</table></div>`;
  return head+pn(t('By project'),tbl(grp(x=>prjName(x.project)||t('No project'))),{flush:true})+pn(t('By country'),tbl(grp(x=>ctry((byId(S.projects,x.project)||{}).country||(byId(S.accounts,x.account)||{}).country)||t('Unspecified'))),{flush:true});}
 if(R.tab==='cur'){const cs={};const add=(c,k,v)=>{cs[c]=cs[c]||{i:0,o:0};cs[c][k]+=v;};L.forEach(x=>{const T=TYPES[x.type]||{},v=+x.amount||0;
   if(x.type==='adjust')add(x.currency,+x.dir>0?'i':'o',v);else if(T.cash>0)add(x.currency,'i',v);else if(T.cash<0)add(x.currency,'o',v);if(x.type==='transfer'&&x.toCurrency)add(x.toCurrency,'i',+x.toAmount||0);});
  const bal={};S.accounts.forEach(a=>{bal[a.currency]=(bal[a.currency]||0)+accBal(a)});const keys=[...new Set([...Object.keys(cs),...Object.keys(bal)])];
  return head+pn(t('Currencies'),`<div class="tw"><table><tr><th>${t('Currency')}</th><th class="n">${t('Cash in')}</th><th class="n">${t('Cash out')}</th><th class="n">${t('Balance')}</th><th class="n">${t('USD equivalent')}</th></tr>${keys.map(c=>`<tr><td>${esc(curName(c))}</td><td class="n">${money((cs[c]||{}).i||0,c)}</td><td class="n">${money((cs[c]||{}).o||0,c)}</td><td class="n">${money(bal[c]||0,c)}</td><td class="n">${X((bal[c]||0)/rate(c))}</td></tr>`).join('')||`<tr><td colspan="5" class="empty">${t('No data')}</td></tr>`}</table></div>`,{flush:true})+`<p class="mut small">${t('Actual cash movement per currency, without conversion.')}</p>`;}
 if(R.tab==='emp'){const rows=S.employees.map(e=>{const T=L.filter(x=>x.employee===e.id);return{e,s:sum(T.filter(x=>x.type==='salary'),plUsd),a:sum(T.filter(x=>x.type==='advance'),tUsd),b:advUsd(e.id)}}).filter(x=>x.s||x.a||x.b);
  return head+pn(t('Employees'),`<div class="tw"><table><tr><th>${t('Employee')}</th><th class="n">${t('Salaries in period')}</th><th class="n">${t('Advances in period')}</th><th class="n">${t('Advances balance now')}</th></tr>${rows.map(x=>`<tr><td>${esc(x.e.name)}</td><td class="n">${X(x.s)}</td><td class="n">${X(x.a)}</td><td class="n">${X(x.b)}</td></tr>`).join('')||`<tr><td colspan="4" class="empty">${t('No data')}</td></tr>`}${rows.length?`<tr class="tot"><td>${t('Total')}</td><td class="n">${X(sum(rows,x=>x.s))}</td><td class="n">${X(sum(rows,x=>x.a))}</td><td class="n">${X(sum(rows,x=>x.b))}</td></tr>`:''}</table></div>`,{flush:true});}
 return '';}

/* ---------- settings ---------- */
function vSetup(){const C=currs(),w=canManage()&&ME.active;
 return pn(t('Currencies and exchange rates'),`<p class="mut small" style="margin-top:0">${t('Units of each currency per 1 US dollar. The rate is stored with every entry, so changing it later does not affect past entries.')}</p>
 <div class="tw"><table id="ctab"><tr><th>${t('Code')}</th><th>${t('Name')}</th><th>${t('Symbol')}</th><th>${t('Per 1 USD')}</th><th></th></tr>
 ${C.map((c,i)=>`<tr data-i="${i}"><td><input value="${esc(c.code)}" data-k="code" style="width:80px" ${c.code==='USD'?'disabled':''}></td><td><input value="${esc(t(c.name))}" data-k="name"></td><td><input value="${esc(c.sym)}" data-k="sym" style="width:70px"></td><td><input type="number" step="any" value="${esc(c.rate)}" data-k="rate" style="width:120px" ${c.code==='USD'?'disabled':''}></td><td>${c.code!=='USD'&&w?B('rmCur','×','sm d',i):''}</td></tr>`).join('')}</table></div>
 ${w?`<div style="margin-top:8px">${B('addCur','+ '+t('Add currency'),'sm')}</div>`:''}`)+
 pn(t('Categories'),`<div class="fg"><label>${t('Expense categories (one per line)')}<textarea id="ecats" rows="9">${esc(ecats().map(x=>t(x)).join('\n'))}</textarea></label><label>${t('Revenue categories (one per line)')}<textarea id="icats" rows="9">${esc(icats().map(x=>t(x)).join('\n'))}</textarea></label></div>${w?`<div style="margin-top:10px">${B('saveCfg',t('Save settings'),'p')}</div>`:''}`)+
 pn(t('Period closing'),`<p class="mut small" style="margin-top:0">${t('After reviewing a month and closing it, no entry dated on or before the closing date can be added, edited or deleted.')}</p>
 <div class="fl"><label style="flex:0 1 200px">${t('Closing date')}<input type="date" id="lockd" value="${esc(lockDate())}"></label><div>${B('lockLast',t('End of last month'))}</div>${w?`<div>${B('saveLock',t('Close books'),'p')}</div>${lockDate()?`<div>${B('unlock',t('Reopen'),'d')}</div>`:''}`:''}</div>`)+
 pn(t('Backup and export'),`<div class="fl">${B('xlsAll',t('Full Excel workbook'))}${B('backup',t('JSON backup'))}</div><p class="mut small">${t('Take a backup every month and keep it safe.')}</p>`);}

/* ============ SaaS: users, subscription, platform admin ============ */
const ROLES={owner:'Owner',admin:'Administrator',accountant:'Accountant',viewer:'Viewer',member:'Custodian'};
const ROLE_D={admin:'Full access including users and settings',accountant:'Records and edits entries',member:'Sees and records only the cash boxes and projects assigned to them',viewer:'View and export only'};
const daysLeft=()=>ME.sub?Math.ceil((new Date(ME.sub.current_period_end)-new Date())/864e5):0;
const planName=c=>{const p=ME.plans.find(x=>x.code===c);return p?(LANG==='ar'?p.name_ar:p.name_en):c;};
function subBanner(){if(!ME.sub)return'';const d=daysLeft();
 if(!ME.active)return `<div class="note-box err">${IC('lock')}<span class="sp">${t('Your subscription has ended. Data is read only until it is renewed.')}</span>${B('setTab',t('Renew subscription'),'sm','billing')}</div>`;
 if(ME.sub.status==='trialing')return `<div class="note-box info">${IC('info')}<span class="sp">${t('Free trial — {d} day(s) left.',{d})}</span>${canManage()?B('setTab',t('Subscribe'),'sm','billing'):''}</div>`;
 if(d<=7)return `<div class="note-box">${IC('alert')}<span class="sp">${t('Subscription renews in {d} day(s).',{d})}</span>${canManage()?B('setTab',t('Renew subscription'),'sm','billing'):''}</div>`;return '';}
async function loadTeam(){const [m,i]=await Promise.all([sb.from('memberships').select('*').eq('org_id',ORGID).order('created_at'),canManage()?sb.from('invitations').select('*').eq('org_id',ORGID).order('created_at'):Promise.resolve({data:[]})]);
 S.team={members:m.data||[],invites:i.data||[]};render();}
async function loadPayments(){const {data}=await sb.from('payments').select('*').eq('org_id',ORGID).order('created_at',{ascending:false});S.payments=data||[];render();}
function vTeam(){if(!S.team){loadTeam();return `<div class="empty">${t('Loading…')}</div>`;}
 const lim=(ME.plans.find(p=>p.code===(ME.sub||{}).plan)||{}).max_users||0,used=S.team.members.length+S.team.invites.length,m=canManage();
 return `<div class="stats"><div>${IC('staff')}<span>${t('Users')}</span><b class="num" dir="ltr">${used} / ${lim}</b></div><div>${IC('invoice')}<span>${t('Your role')}</span><b>${t(ROLES[ME.role]||'')}</b></div></div>`+
 (m?pn(t('Create user'),`<div class="fl"><div style="flex:1;min-width:200px" class="mut small">${t('Staff log in with this username and password.')} ${Object.entries(ROLE_D).map(([k,d])=>`<b>${t(ROLES[k])}</b>: ${t(d)}`).join(' · ')}</div><div>${B('newUser','+ '+t('Create user'),'p')}</div></div>
  <details style="margin-top:10px"><summary class="lnk" style="cursor:pointer">${t('Or invite by email')}</summary><div class="fl" style="margin-top:8px"><label class="wide">${t('Email')}<input id="ie" type="email" dir="ltr"></label><label>${t('Role')}<select id="ir">${['accountant','member','viewer','admin'].map(r=>`<option value="${r}">${t(ROLES[r])}</option>`).join('')}</select></label><div>${B('invite',t('Send invitation'))}</div></div></details>`,{ic:'plus'}):'')+
 pn(t('Users'),`<div class="tw"><table><tr><th>${t('Name')}</th><th>${t('Email or username')}</th><th>${t('Role')}</th><th class="m-hide">${t('Projects & cash boxes')}</th>${m?'<th></th>':''}</tr>${S.team.members.map(x=>`<tr><td>${esc(x.full_name||'—')}</td><td dir="ltr" style="text-align:start">${esc(userLabel(x))}</td><td>${m&&x.role!=='owner'&&x.user_id!==ME.user.id?`<select data-a2="role" data-id="${x.user_id}" style="width:auto">${['admin','accountant','member','viewer'].map(r=>`<option value="${r}" ${x.role===r?'selected':''}>${t(ROLES[r])}</option>`).join('')}</select>`:t(ROLES[x.role]||x.role)}</td><td class="m-hide">${scopeTxt(x)}</td>${m?`<td class="n">${x.role==='member'?B('assign',t('Assignments'),'sm',x.user_id):''} ${x.username&&x.role!=='owner'?B('pw',t('Change password'),'sm',x.user_id):''} ${x.role!=='owner'&&x.user_id!==ME.user.id?B('rmMember',t('Remove'),'sm d',x.user_id):''}</td>`:''}</tr>`).join('')}
 ${S.team.invites.map(x=>`<tr><td class="mut">${t('Pending invitation')}</td><td dir="ltr" style="text-align:start">${esc(x.email)}</td><td>${t(ROLES[x.role])}</td><td class="m-hide"></td>${m?`<td class="n">${B('rmInvite',t('Cancel'),'sm',x.id)}</td>`:''}</tr>`).join('')}</table></div>`,{flush:true,ic:'staff'});}
function vBilling(){if(S.payments===null&&canManage()){S.payments=[];loadPayments();}
 const s=ME.sub||{},pl=ME.platform||{},st={trialing:'Free trial',active:'Active plan',expired:'Expired',canceled:'Canceled'}[s.status]||'';
 const wa=(pl.contact_whatsapp||'').replace(/[^\d]/g,'');
 return `<div class="stats"><div>${IC('invoice')}<span>${t('Current plan')}</span><b>${esc(planName(s.plan))}</b></div><div>${IC(ME.active?'info':'lock')}<span>${t('Status')}</span><b class="${ME.active?'pos':'neg'}">${t(st)}</b></div><div>${IC('reports')}<span>${t('Valid until')}</span><b class="num">${s.current_period_end?new Date(s.current_period_end).toLocaleDateString('en-CA'):'—'}</b></div></div>`+
 pn(t('Plans'),`<div class="tw"><table><tr><th>${t('Plan')}</th><th class="n">${t('Users')}</th><th class="n">${t('Monthly price')}</th></tr>${ME.plans.filter(p=>p.code!=='trial').map(p=>`<tr ${p.code===s.plan?'class="sub"':''}><td>${esc(LANG==='ar'?p.name_ar:p.name_en)}</td><td class="n">${p.max_users}</td><td class="n">${usdH(p.price_usd)}</td></tr>`).join('')}</table></div>`,{flush:true,ic:'salary'})+
 pn(t('How to subscribe or renew'),`<p style="margin-top:0">${t('Transfer the amount, then send the receipt with your company name. Your subscription is activated once payment is confirmed.')}</p>
 ${pl.bank_details?`<pre class="bank">${esc(pl.bank_details)}</pre>`:''}<div class="fl">${wa?`<a class="btn p" href="https://wa.me/${wa}?text=${encodeURIComponent(t('Subscription for {c}',{c:(ME.orgs.find(o=>o.id===ORGID)||{}).name||''}))}" target="_blank" rel="noopener">WhatsApp: <span dir="ltr">+${wa}</span></a>`:''}${pl.contact_email?`<a class="btn" href="mailto:${esc(pl.contact_email)}">${esc(pl.contact_email)}</a>`:''}</div>`,{ic:'info'})+
 (canManage()&&S.payments&&S.payments.length?pn(t('Payment history'),`<div class="tw"><table><tr><th>${t('Date')}</th><th>${t('Plan')}</th><th class="n">${t('Months')}</th><th class="n">${t('Amount')}</th><th>${t('Reference')}</th></tr>${S.payments.map(p=>`<tr><td class="num">${p.created_at.slice(0,10)}</td><td>${esc(planName(p.plan))}</td><td class="n">${p.months}</td><td class="n num">${fN(p.amount)} ${esc(p.currency)}</td><td>${esc(p.reference||'')}</td></tr>`).join('')}</table></div>`,{flush:true,ic:'txns'}):'');}
function vSetupTabs(){const tab=S.setTab||'general';
 return `<div class="tabs">${[['general','General'],['team','Users'],['billing','Subscription']].map(([k,l])=>`<button data-a="setTab" data-id="${k}" class="${tab===k?'on':''}">${t(l)}</button>`).join('')}</div>`+(tab==='team'?vTeam():tab==='billing'?vBilling():vSetup());}
async function loadAdmin(){const [o,p]=await Promise.all([sb.rpc('admin_list_orgs'),sb.from('platform_settings').select('*').maybeSingle()]);S.admin={orgs:o.data||[],err:o.error};ME.platform=p.data||ME.platform;render();}
function vAdmin(){if(!ME.isAdmin)return `<div class="empty">—</div>`;if(!S.admin){loadAdmin();return `<div class="empty">${t('Loading…')}</div>`;}
 const O=S.admin.orgs,now=new Date(),act=O.filter(o=>['trialing','active'].includes(o.status)&&new Date(o.current_period_end)>now),pl=ME.platform||{};
 const mrr=sum(O.filter(o=>o.status==='active'&&new Date(o.current_period_end)>now),o=>(ME.plans.find(p=>p.code===o.plan)||{}).price_usd||0);
 return `<div class="stats"><div>${IC('parties')}<span>${t('Companies')}</span><b>${O.length}</b></div><div>${IC('info')}<span>${t('Active subscriptions')}</span><b>${act.length}</b></div><div>${IC('salary')}<span>${t('Monthly recurring revenue')}</span><b>${usdH(mrr)}</b></div></div>`+
 pn(t('Companies'),`<div class="tw"><table><tr><th>${t('Company')}</th><th>${t('Owner')}</th><th class="n">${t('Users')}</th><th class="n m-hide">${t('Entries count')}</th><th>${t('Plan')}</th><th>${t('Status')}</th><th>${t('Valid until')}</th><th></th></tr>
 ${O.map(o=>{const live=['trialing','active'].includes(o.status)&&new Date(o.current_period_end)>now;return `<tr><td>${esc(o.name)}<div class="mut small">${ctry(o.country)} · ${String(o.created_at).slice(0,10)}</div></td><td dir="ltr" style="text-align:start">${esc(o.owner_email||'')}</td><td class="n">${o.members}</td><td class="n m-hide">${o.txns}</td><td>${esc(planName(o.plan))}</td><td><span class="tag ${live?'ok':'no'}">${live?t(o.status==='trialing'?'Free trial':'Active plan'):t('Expired')}</span></td><td class="num">${o.current_period_end?String(o.current_period_end).slice(0,10):'—'}</td><td class="n">${B('admPay',t('Record payment'),'sm p',o.org_id)} ${B('admSet',t('Edit'),'sm',o.org_id)}</td></tr>`}).join('')||`<tr><td colspan="8" class="empty">—</td></tr>`}</table></div>`,{flush:true,ic:'parties'})+
 pn(t('Platform settings'),`<div class="fg"><label>${t('WhatsApp number')}<input id="pw" dir="ltr" value="${esc(pl.contact_whatsapp||'')}" placeholder="+9627XXXXXXXX"></label><label>${t('Contact email')}<input id="pe" dir="ltr" value="${esc(pl.contact_email||'')}"></label><label>${t('Trial days')}<input id="pt2" type="number" value="${esc(pl.trial_days||14)}"></label><label class="full">${t('Bank transfer details (shown to customers)')}<textarea id="pb" rows="4">${esc(pl.bank_details||'')}</textarea></label></div><div style="margin-top:10px">${B('admSaveP',t('Save settings'),'p')}</div>`,{ic:'setup'});}
function admPay(oid){const o=S.admin.orgs.find(x=>x.org_id===oid);
 openModal(t('Record payment')+' — '+esc(o.name),`<div class="fg"><label>${t('Plan')}<select id="xp">${ME.plans.filter(p=>p.code!=='trial').map(p=>`<option value="${p.code}" ${p.code===o.plan?'selected':''}>${esc(LANG==='ar'?p.name_ar:p.name_en)} — ${fN(p.price_usd,0)}$</option>`).join('')}</select></label><label>${t('Months')}<input id="xm" type="number" min="1" max="36" value="1"></label>
 <label>${t('Amount')}<input id="xa" type="number" step="any"></label><label>${t('Currency')}<input id="xc" value="USD" dir="ltr"></label><label>${t('Payment method')}<input id="xw" placeholder="${t('Bank transfer')}"></label><label>${t('Reference')}<input id="xr"></label></div>`,
 `<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{const q=id=>m.querySelector('#'+id);
 const fill=()=>{const p=ME.plans.find(x=>x.code===q('xp').value);q('xa').value=(p?p.price_usd:0)*(+q('xm').value||1);};q('xp').onchange=fill;q('xm').oninput=fill;fill();
 q('sv').onclick=async()=>{q('sv').disabled=true;const {error}=await sb.rpc('admin_record_payment',{p_org:oid,p_plan:q('xp').value,p_months:+q('xm').value||1,p_amount:+q('xa').value||0,p_currency:q('xc').value||'USD',p_method:q('xw').value||null,p_reference:q('xr').value||null});
  if(error){q('sv').disabled=false;return toast('Could not save, try again');}closeModal();toast('Saved');S.admin=null;render();};});}
function admSet(oid){const o=S.admin.orgs.find(x=>x.org_id===oid);
 openModal(t('Edit')+' — '+esc(o.name),`<div class="fg"><label>${t('Plan')}<select id="xp">${ME.plans.map(p=>`<option value="${p.code}" ${p.code===o.plan?'selected':''}>${esc(LANG==='ar'?p.name_ar:p.name_en)}</option>`).join('')}</select></label><label>${t('Status')}<select id="xs">${['trialing','active','expired','canceled'].map(s=>`<option value="${s}" ${s===o.status?'selected':''}>${t({trialing:'Free trial',active:'Active plan',expired:'Expired',canceled:'Canceled'}[s])}</option>`).join('')}</select></label>
 <label>${t('Valid until')}<input id="xd" type="date" value="${o.current_period_end?String(o.current_period_end).slice(0,10):''}"></label><label>${t('Notes')}<input id="xn"></label></div>`,`<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{const q=id=>m.querySelector('#'+id);
 q('sv').onclick=async()=>{if(!q('xd').value)return toast('Enter a valid date');const {error}=await sb.rpc('admin_set_subscription',{p_org:oid,p_plan:q('xp').value,p_status:q('xs').value,p_until:new Date(q('xd').value+'T23:59:59').toISOString(),p_notes:q('xn').value||null});
  if(error)return toast('Could not save, try again');closeModal();toast('Saved');S.admin=null;render();};});}

/* ============ staff users & assignments ============ */
const chkList=(name,items,sel)=>items.length?`<div class="chk">${items.map(x=>`<label><input type="checkbox" name="${name}" value="${x.id}" ${sel.includes(x.id)?'checked':''}> ${esc(x.name)}${x.currency?` <span class="mut small">(${esc(x.currency)})</span>`:''}</label>`).join('')}</div>`:`<span class="mut small">—</span>`;
const chkVals=(m,name)=>[...m.querySelectorAll(`input[name="${name}"]:checked`)].map(i=>i.value);
const fnErr=async(error,data)=>{let code=(data&&data.error)||'';if(!code&&error&&error.context&&error.context.json){try{code=(await error.context.json()).error}catch(e){}}return code||(error&&error.message)||'';};
function createUserForm(){
 openModal(t('Create user'),`<div class="fg"><label>${t('Full name')}<input id="un"></label><label>${t('Username')}<input id="uu" dir="ltr" autocapitalize="none" placeholder="ahmad.k"><span class="h">${t('Letters, numbers, dot or dash (3–32)')}</span></label>
 <label>${t('Password')}<input id="up" type="text" dir="ltr" autocomplete="new-password"><span class="h">${t('At least 8 characters')}</span></label><label>${t('Role')}<select id="ur">${['member','accountant','viewer','admin'].map(r=>`<option value="${r}">${t(ROLES[r])}</option>`).join('')}</select></label>
 <div class="sec full" data-sc>${t('Assigned projects')}</div><div class="full" data-sc>${chkList('pj',S.projects,[])}</div><div class="sec full" data-sc>${t('Assigned cash boxes')}</div><div class="full" data-sc>${chkList('ac',S.accounts,[])}</div>
 <p class="mut small full" style="margin:0">${t('Staff log in with this username and password.')}</p></div>`,
 `<button class="btn p" id="sv">${t('Create user')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{const q=id=>m.querySelector('#'+id);
 const sc=()=>m.querySelectorAll('[data-sc]').forEach(el=>el.style.display=q('ur').value==='member'?'':'none');q('ur').onchange=sc;sc();
 q('sv').onclick=async()=>{const u=q('uu').value.trim().toLowerCase();if(!/^[a-z0-9._-]{3,32}$/.test(u))return toast('Invalid username');if(q('up').value.length<8)return toast('Password must be at least 8 characters');
  const role=q('ur').value;q('sv').disabled=true;
  const {data,error}=await sb.functions.invoke('admin-users',{body:{action:'create',org_id:ORGID,username:u,password:q('up').value,full_name:q('un').value.trim(),role,projects:role==='member'?chkVals(m,'pj'):[],accounts:role==='member'?chkVals(m,'ac'):[]}});
  if(error||!(data&&data.ok)){q('sv').disabled=false;const c=await fnErr(error,data);return toast(c.includes('username_taken')?'Username already taken':c.includes('user_limit')?'User limit reached for your plan':c.includes('bad_username')?'Invalid username':c.includes('weak_password')?'Password must be at least 8 characters':c.includes('subscription')?'Subscription expired — data is read only':'Could not save, try again');}
  closeModal();toast('User created');S.team=null;render();};},true);}
function assignForm(uid){const x=S.team.members.find(m=>m.user_id===uid);if(!x)return;
 openModal(t('Edit assignments — {n}',{n:esc(x.full_name||x.username||x.email)}),`<div class="fg"><div class="sec full">${t('Assigned projects')}</div><div class="full">${chkList('pj',S.projects,x.projects||[])}</div><div class="sec full">${t('Assigned cash boxes')}</div><div class="full">${chkList('ac',S.accounts,x.accounts||[])}</div></div>`,
 `<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{m.querySelector('#sv').onclick=async()=>{
  const {error}=await sb.from('memberships').update({projects:chkVals(m,'pj'),accounts:chkVals(m,'ac')}).eq('org_id',ORGID).eq('user_id',uid);if(error)return dbErr(error);closeModal();toast('Saved');S.team=null;render();};},true);}
function pwForm(uid){const x=S.team.members.find(m=>m.user_id===uid);
 openModal(t('Change password')+' — '+esc(x.username||''),`<div class="fg"><label class="full">${t('New password')}<input id="np" type="text" dir="ltr"><span class="h">${t('At least 8 characters')}</span></label></div>`,`<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{
 m.querySelector('#sv').onclick=async()=>{const pw=m.querySelector('#np').value;if(pw.length<8)return toast('Password must be at least 8 characters');const {data,error}=await sb.functions.invoke('admin-users',{body:{action:'set_password',org_id:ORGID,user_id:uid,password:pw}});
  if(error||!(data&&data.ok))return toast('Could not save, try again');closeModal();toast('Password updated');};});}
const userLabel=x=>x.username||x.email||'';
const scopeTxt=x=>x.role!=='member'?`<span class="mut small">${t('All (no restriction)')}</span>`:[...(x.projects||[]).map(prjName),...(x.accounts||[]).map(accName)].filter(Boolean).map(n=>`<span class="tag">${esc(n)}</span>`).join(' ')||'—';

/* ============ monthly reconciliation ============ */
const lastMonth=()=>{const d=new Date();return ym(new Date(d.getFullYear(),d.getMonth()-1,1));};
function boxMonth(a,m){let open=+a.opening||0,inn=0,out=0;const start=m+'-01',rows=[];
 for(const x of [...S.txns].sort((p,q)=>(p.date||'').localeCompare(q.date||'')||(p.createdAt||0)-(q.createdAt||0))){const v=cashFx(x,a.id);if(!v)continue;const d=x.date||'';
  if(d<start)open+=v;else if(d.slice(0,7)===m){if(x.type==='adjust'&&x.closing)continue;rows.push([x,v]);if(v>0)inn+=v;else out-=v;}}
 return {open,inn,out,exp:open+inn-out,rows};}
async function loadClosings(m){const {data}=await sb.from('account_closings').select('*').eq('org_id',ORGID).eq('month',m);S.closings={month:m,rows:data||[]};
 if(canManage()&&!S.team)await loadTeam();else render();}
function vRecon(){const m=S.rmonth||(S.rmonth=lastMonth());if(!S.closings||S.closings.month!==m){loadClosings(m);return `<div class="empty">${t('Loading…')}</div>`;}
 const boxes=visAccounts(),C=S.closings.rows,st={submitted:['Submitted',''],approved:['Approved','ok'],returned:['Returned','no']};
 const cust=a=>S.team?S.team.members.filter(x=>x.role==='member'&&(x.accounts||[]).includes(a.id)).map(userLabelName).join('، '):'';
 const rows=boxes.map(a=>{const b=boxMonth(a,m),c=C.find(x=>x.account_id===a.id),diff=c?(+c.counted-b.exp):null;return{a,b,c,diff};});
 const totDiff=sum(rows.filter(r=>r.c),r=>r.diff/rate(r.a.currency));
 return `<div class="pn"><div class="pn-b"><div class="fl"><label style="flex:0 1 220px">${t('Month')}<input type="month" id="rmon" value="${m}"></label><div class="mut small" style="flex:1">${t('Count the cash in hand at the end of the month and enter the amount.')} ${t('Approving closes the month for this cash box: its entries for the month can no longer change.')}</div></div></div></div>
 <div class="stats"><div>${IC('accounts')}<span>${t('Cash boxes')}</span><b>${boxes.length}</b></div><div>${IC('txns')}<span>${t('Submitted')}</span><b>${C.filter(c=>c.status==='submitted').length}</b></div><div>${IC('lock')}<span>${t('Approved')}</span><b class="num" dir="ltr">${C.filter(c=>c.status==='approved').length} / ${boxes.length}</b></div><div>${IC('count')}<span>${t('Total differences')}</span><b class="${sgn(totDiff)}">${usdH(totDiff)}</b></div></div>`+
 pn(t('Monthly reconciliation')+' — '+monLbl(m),`<div class="tw"><table><tr><th>${t('Account')}</th>${canManage()?`<th class="m-hide">${t('Custodian')}</th>`:''}<th class="n m-hide">${t('Opening')}</th><th class="n m-hide">${t('In')}</th><th class="n m-hide">${t('Out')}</th><th class="n">${t('Book balance')}</th><th class="n">${t('Counted')}</th><th class="n">${t('Difference')}</th><th>${t('Status of the month')}</th><th></th></tr>
 ${rows.map(({a,b,c,diff})=>{const s=c?st[c.status]:null,mineOk=canWrite&&(!c||c.status!=='approved');
  return `<tr><td>${esc(a.name)} <span class="mut small">${esc(a.currency)}</span></td>${canManage()?`<td class="m-hide">${esc(cust(a))||'—'}</td>`:''}<td class="n m-hide">${money(b.open,a.currency)}</td><td class="n m-hide">${money(b.inn,a.currency,'pos')}</td><td class="n m-hide">${money(b.out,a.currency,'neg')}</td><td class="n">${money(b.exp,a.currency)}</td>
  <td class="n">${c?money(c.counted,a.currency):'—'}</td><td class="n">${c?money(diff,a.currency,Math.abs(diff)<0.005?'pos':'neg'):'—'}</td>
  <td>${s?`<span class="tag ${s[1]}">${t(s[0])}</span>`:`<span class="tag">${t('Not submitted')}</span>`}${c&&c.review_note?`<div class="mut small">${esc(c.review_note)}</div>`:''}</td>
  <td class="n">${mineOk?B('rcCount',c?t('Edit count'):t('Submit count'),'sm'+(c?'':' p'),a.id):''} ${canManage()&&c&&c.status==='submitted'?B('rcApprove',t('Approve'),'sm p',a.id)+' '+B('rcReturn',t('Return'),'sm',a.id):''} ${canManage()&&c&&c.status==='approved'?B('rcReturn',t('Reopen'),'sm d',a.id):''} ${B('rcStmt',t('Statement'),'sm',a.id)}</td></tr>`}).join('')||`<tr><td colspan="10" class="empty">${t('No accounts yet')}</td></tr>`}</table></div>`,{flush:true,ic:'count'});}
const userLabelName=x=>x.full_name||x.username||x.email||'';
function rcCount(aid){const a=byId(S.accounts,aid),m=S.rmonth,b=boxMonth(a,m),c=S.closings.rows.find(x=>x.account_id===aid);
 openModal(t('Count for {a} — {m}',{a:esc(a.name),m:monLbl(m)}),`<div class="fg"><div class="netline"><span>${t('Book balance')}</span><b>${money(b.exp,a.currency)}</b></div>
 <label>${t('Counted')}<input id="cn" type="number" step="any" inputmode="decimal" value="${c?esc(c.counted):''}"><span class="h" id="cdiff"></span></label><label>${t('Notes')}<input id="cm" value="${c?esc(c.note||''):''}"></label></div>`,
 `<button class="btn p" id="sv">${t('Submit count')}</button><button class="btn" data-x>${t('Cancel')}</button>`,mm=>{const q=id=>mm.querySelector('#'+id),dif=()=>rnd((+q('cn').value||0)-b.exp,a.currency);
 const show=()=>{if(q('cn').value==='')return q('cdiff').innerHTML='';const d=dif();q('cdiff').innerHTML=Math.abs(d)<0.005?`<span class="pos">${t('Matches')}</span>`:d>0?t('Surplus {v}',{v:money(d,a.currency,'pos')}):t('Shortage {v}',{v:money(-d,a.currency,'neg')});};q('cn').oninput=show;show();
 q('sv').onclick=async()=>{if(q('cn').value==='')return toast('Enter the counted amount');q('sv').disabled=true;
  const row={opening:rnd(b.open,a.currency),total_in:rnd(b.inn,a.currency),total_out:rnd(b.out,a.currency),expected:rnd(b.exp,a.currency),counted:+q('cn').value,difference:dif(),note:q('cm').value.trim()||null,status:'submitted',submitted_at:new Date().toISOString()};
  const {error}=c?await sb.from('account_closings').update(row).eq('id',c.id):await sb.from('account_closings').insert({...row,org_id:ORGID,account_id:aid,month:m});
  if(error){q('sv').disabled=false;return dbErr(error);}closeModal();toast('Count submitted');S.closings=null;render();};});}
function rcApprove(aid){const a=byId(S.accounts,aid),m=S.rmonth,b=boxMonth(a,m),c=S.closings.rows.find(x=>x.account_id===aid),diff=rnd(+c.counted-b.exp,a.currency);
 openModal(t('Approve month — {a} — {m}',{a:esc(a.name),m:monLbl(m)}),`<table class="kv"><tr><th>${t('Opening')}</th><td>${money(b.open,a.currency)}</td></tr><tr><th>${t('In')}</th><td>${money(b.inn,a.currency)}</td></tr><tr><th>${t('Out')}</th><td>${money(b.out,a.currency)}</td></tr><tr><th>${t('Book balance')}</th><td>${money(b.exp,a.currency)}</td></tr><tr><th>${t('Counted')}</th><td>${money(c.counted,a.currency)}</td></tr><tr><th>${t('Difference')}</th><td>${money(diff,a.currency,Math.abs(diff)<0.005?'pos':'neg')}</td></tr></table>
 ${c.note?`<p class="mut">${esc(c.note)}</p>`:''}<div class="fg" style="margin-top:10px">${Math.abs(diff)>=0.005?`<label class="full" style="flex-direction:row;align-items:center;gap:8px"><input type="checkbox" id="pa" checked style="width:auto"> ${t('Post the difference as a cash-count adjustment')}</label>`:''}<label class="full">${t('Review note')}<input id="rn"></label></div><p class="mut small">${t('Approving closes the month for this cash box: its entries for the month can no longer change.')}</p>`,
 `<button class="btn p" id="sv">${t('Approve')}</button><button class="btn" data-x>${t('Cancel')}</button>`,mm=>{const q=id=>mm.querySelector('#'+id);
 q('sv').onclick=async()=>{q('sv').disabled=true;if(Math.abs(diff-(+c.difference||0))>=0.005)await sb.from('account_closings').update({expected:rnd(b.exp,a.currency),difference:diff,opening:rnd(b.open,a.currency),total_in:rnd(b.inn,a.currency),total_out:rnd(b.out,a.currency)}).eq('id',c.id);
  const {error}=await sb.rpc('approve_closing',{p_id:c.id,p_post_adjustment:!!(q('pa')&&q('pa').checked),p_review_note:q('rn').value.trim()||null});if(error){q('sv').disabled=false;return dbErr(error);}
  closeModal();toast('Month approved and closed');S.closings=null;render();};});}
function rcReturn(aid){const c=S.closings.rows.find(x=>x.account_id===aid);
 openModal(t('Return'),`<div class="fg"><label class="full">${t('Review note')}<input id="rn"></label></div>`,`<button class="btn p" id="sv">${c.status==='approved'?t('Reopen'):t('Return')}</button><button class="btn" data-x>${t('Cancel')}</button>`,mm=>{
 mm.querySelector('#sv').onclick=async()=>{const {error}=await sb.rpc('return_closing',{p_id:c.id,p_review_note:mm.querySelector('#rn').value.trim()||null});if(error)return dbErr(error);closeModal();toast('Returned for review');S.closings=null;render();};});}
function rcStmt(aid){const a=byId(S.accounts,aid),m=S.rmonth,b=boxMonth(a,m),c=S.closings.rows.find(x=>x.account_id===aid);let run=b.open;
 openModal(t('Statement'),`<div id="docP" class="paper">${docHead(t('Cash box statement — {a} — {m}',{a:a.name,m:monLbl(m)}))}<div class="pb">
 <table><tr><th>${t('Date')}</th><th>${t('Doc. no.')}</th><th>${t('Description')}</th><th class="n">${t('In')}</th><th class="n">${t('Out')}</th><th class="n">${t('Balance')}</th></tr>
 <tr class="sub"><td colspan="5">${t('Opening')}</td><td class="n">${money(b.open,a.currency)}</td></tr>
 ${b.rows.map(([x,v])=>{run+=v;return `<tr><td class="num">${esc(x.date)}</td><td>${esc(x.ref||'')}</td><td>${tl(x.type)} — ${desc(x)}</td><td class="n">${v>0?money(v,a.currency):''}</td><td class="n">${v<0?money(-v,a.currency):''}</td><td class="n">${money(run,a.currency)}</td></tr>`}).join('')}
 <tr class="tot"><td colspan="3">${t('Closing balance')}</td><td class="n">${money(b.inn,a.currency)}</td><td class="n">${money(b.out,a.currency)}</td><td class="n">${money(b.exp,a.currency)}</td></tr>
 ${c?`<tr><td colspan="5">${t('Counted')}</td><td class="n">${money(c.counted,a.currency)}</td></tr><tr><td colspan="5">${t('Difference')}</td><td class="n">${money(+c.counted-b.exp,a.currency)}</td></tr><tr><td colspan="5">${t('Status of the month')}</td><td class="n">${t({submitted:'Submitted',approved:'Approved',returned:'Returned'}[c.status])}</td></tr>`:''}</table>
 <div class="sig"><div>${t('Custodian signature')}</div><div>${t('Accountant')}</div><div>${t('Finance manager')}</div></div></div>${docFoot()}</div>`,
 `<button class="btn p" id="pdf">${t('Download PDF')}</button><button class="btn" data-x>${t('Close')}</button>`,mm=>{mm.querySelector('#pdf').onclick=()=>toPdf(mm.querySelector('#docP'),`${a.name}-${m}.pdf`);},true);}

/* ============ dialogs ============ */
function openModal(title,body,foot,mount,wide){const m=$('#modal');m.innerHTML=`<div class="dlg ${wide?'wide':''}"><div class="dlg-h"><span class="sp">${title}</span><button data-x aria-label="${t('Close')}">×</button></div><div class="dlg-b">${body}</div>${foot!==null?`<div class="dlg-f">${foot}</div>`:''}</div>`;m.classList.remove('hidden');if(mount)mount(m);}
function closeModal(){const m=$('#modal');m.classList.add('hidden');m.innerHTML='';}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('[data-x]'))closeModal();});
function confirmBox(msg,yes,label){openModal(t('Confirmation'),`<p style="margin:0">${msg}</p>`,`<button class="btn d" id="cy">${label||t('Yes, delete')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{m.querySelector('#cy').onclick=()=>{closeModal();yes()}});}
const fld=(lbl,inner,attr='')=>`<label ${attr}>${lbl}${inner}</label>`;
const val=(m,id)=>{const el=m.querySelector('#'+id);return el?el.value:'';};
const foot=rm=>`<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>${rm?`<span class="sp"></span><button class="btn d" id="rm">${t('Delete')}</button>`:''}`;
const ttlF=(isNew,newK,editK)=>isNew?t(newK):t(editK);

function accForm(a){a=a||{};const used=a.id&&S.txns.some(x=>x.account===a.id||x.toAccount===a.id);
 openModal(ttlF(!a.id,'New account','Edit account'),`<div class="fg">${fld(t('Account name'),`<input id="an" value="${esc(a.name)}" placeholder="${t('e.g. Damascus cash — USD')}">`,'class="full"')}
 ${fld(t('Currency'),`<select id="ac" ${used?'disabled':''}>${currOpts(a.currency||'USD')}</select>`)}${fld(t('Type'),`<select id="ak">${dictOpts(AKINDS,a.kind||'cash')}</select>`)}
 ${fld(t('Country'),`<select id="ay">${dictOpts(COUNTRIES,a.country,'—')}</select>`)}${fld(t('Opening balance'),`<input id="ao" type="number" step="any" inputmode="decimal" value="${esc(a.opening??0)}">`)}
 ${fld(t('Notes'),`<input id="am" value="${esc(a.note)}">`,'class="full"')}</div>`,foot(a.id),m=>{
 m.querySelector('#sv').onclick=async()=>{const name=val(m,'an').trim();if(!name)return toast('Enter the account name');
  if(await put('accounts',a.id,{name,currency:used?a.currency:val(m,'ac'),kind:val(m,'ak'),country:val(m,'ay'),opening:+val(m,'ao')||0,note:val(m,'am'),createdAt:a.createdAt||Date.now(),updatedAt:Date.now()})){closeModal();toast('Saved')}};
 if(a.id)m.querySelector('#rm').onclick=()=>used?toast('Cannot delete an account with entries'):confirmBox(t('Delete this account?'),()=>del('accounts',a.id));});}
function prjForm(p){p=p||{};openModal(ttlF(!p.id,'New project','Edit project'),`<div class="fg">${fld(t('Project name'),`<input id="pn" value="${esc(p.name)}">`,'class="full"')}
 ${fld(t('Country'),`<select id="py">${dictOpts(COUNTRIES,p.country||'SY')}</select>`)}${fld(t('Status'),`<select id="ps"><option value="active">${t('Active')}</option><option value="closed" ${p.status==='closed'?'selected':''}>${t('Closed')}</option></select>`)}
 ${fld(t('Notes'),`<input id="pm" value="${esc(p.note)}">`,'class="full"')}</div>`,foot(p.id),m=>{
 m.querySelector('#sv').onclick=async()=>{const name=val(m,'pn').trim();if(!name)return toast('Enter the project name');
  if(await put('projects',p.id,{name,country:val(m,'py'),status:val(m,'ps'),note:val(m,'pm'),createdAt:p.createdAt||Date.now(),updatedAt:Date.now()})){closeModal();toast('Saved')}};
 if(p.id)m.querySelector('#rm').onclick=()=>S.txns.some(x=>x.project===p.id)?toast('Project has entries — mark it as closed instead'):confirmBox(t('Delete this project?'),()=>del('projects',p.id));});}
function empForm(e){e=e||{};openModal(ttlF(!e.id,'New employee','Edit employee'),`<div class="fg">${fld(t('Full name'),`<input id="en" value="${esc(e.name)}">`,'class="full"')}
 ${fld(t('Position'),`<input id="er" value="${esc(e.role)}">`)}${fld(t('Phone'),`<input id="ep" value="${esc(e.phone)}" dir="ltr" inputmode="tel">`)}
 ${fld(t('Monthly salary'),`<input id="es" type="number" step="any" inputmode="decimal" value="${esc(e.salary??'')}">`)}${fld(t('Salary currency'),`<select id="ec">${currOpts(e.salaryCurrency||'USD')}</select>`)}
 ${fld(t('Project'),`<select id="ej"><option value="">—</option>${opt(S.projects,e.project)}</select>`)}${fld(t('Start date'),`<input id="ed" type="date" value="${esc(e.start)}">`)}
 ${fld(t('Status'),`<select id="ea"><option value="1">${t('Active')}</option><option value="0" ${e.active===false?'selected':''}>${t('Suspended / left')}</option></select>`)}${fld(t('Notes'),`<input id="em" value="${esc(e.note)}">`)}</div>`,foot(e.id),m=>{
 m.querySelector('#sv').onclick=async()=>{const name=val(m,'en').trim();if(!name)return toast('Enter the employee name');
  if(await put('employees',e.id,{name,role:val(m,'er'),phone:val(m,'ep'),salary:+val(m,'es')||0,salaryCurrency:val(m,'ec'),project:val(m,'ej'),start:val(m,'ed'),active:val(m,'ea')==='1',note:val(m,'em'),createdAt:e.createdAt||Date.now(),updatedAt:Date.now()})){closeModal();toast('Saved')}};
 if(e.id)m.querySelector('#rm').onclick=()=>S.txns.some(x=>x.employee===e.id)?toast('Employee has entries — mark as suspended instead'):confirmBox(t('Delete this employee?'),()=>{S.emp=null;del('employees',e.id)});});}
function ptyForm(p,kind){p=p||{kind:kind||'supplier'};const used=p.id&&S.txns.some(x=>x.party===p.id);
 openModal(ttlF(!p.id,'New party','Edit party'),`<div class="fg">${fld(t('Name'),`<input id="yn" value="${esc(p.name)}">`,'class="full"')}
 ${fld(t('Type'),`<select id="yk">${dictOpts(PKINDS,p.kind)}</select>`)}${fld(t('Phone'),`<input id="yp" value="${esc(p.phone)}" dir="ltr">`)}
 ${fld(t('Default currency'),`<select id="yc">${currOpts(p.currency||'USD')}</select>`)}${fld(t('Opening balance (+ owed to us, − we owe)'),`<input id="yo" type="number" step="any" value="${esc(p.opening??0)}">`)}
 ${fld(t('Notes'),`<input id="ym" value="${esc(p.note)}">`,'class="full"')}</div>`,foot(p.id),m=>{
 m.querySelector('#sv').onclick=async()=>{const name=val(m,'yn').trim();if(!name)return toast('Enter the name');
  if(await put('parties',p.id,{name,kind:val(m,'yk'),phone:val(m,'yp'),currency:val(m,'yc'),opening:+val(m,'yo')||0,note:val(m,'ym'),createdAt:p.createdAt||Date.now(),updatedAt:Date.now()})){closeModal();toast('Saved')}};
 if(p.id)m.querySelector('#rm').onclick=()=>used?toast('Party has entries'):confirmBox(t('Delete this party?'),()=>{S.party=null;del('parties',p.id)});});}

/* ---------- entry form ---------- */
function txnForm(x,pre){
 if(!visAccounts().length){toast('Add a cash box or account first');go('accounts');return;}
 const isNew=!x,ro=!canWrite||(!isNew&&locked(x.date));
 x=x?{...x}:{type:'expense',date:today(),account:(S.f.account&&byId(visAccounts(),S.f.account))?S.f.account:visAccounts()[0].id,...(pre||{})};
 if(isNew&&x.employee){const e=byId(S.employees,x.employee);if(e&&e.project)x.project=e.project;}
 if(isNew&&x.party){const p=byId(S.parties,x.party);if(p&&p.currency){x.currency=p.currency;const a=S.accounts.find(a=>a.currency===p.currency);if(a)x.account=a.id;}}
 const fixed=x.type==='adjust'||x.type==='payment';
 const tsel=fixed?`<option value="${x.type}">${tl(x.type)}</option>`:`<optgroup label="${t('Common')}">${MAIN_T.filter(k=>!isScoped()||['expense','income','transfer'].includes(k)).map(k=>`<option value="${k}" ${x.type===k?'selected':''}>${tl(k)}</option>`).join('')}</optgroup><optgroup label="${t('Receivables, payables and partners')}">${MORE_T.filter(k=>!isScoped()||['pay','receive'].includes(k)).map(k=>`<option value="${k}" ${x.type===k?'selected':''}>${tl(k)}</option>`).join('')}</optgroup>`;
 const accOpts=(sel,all)=>(all?S.accounts:visAccounts()).map(a=>`<option value="${a.id}" ${a.id===sel?'selected':''}>${esc(a.name)} (${esc(a.currency)})</option>`).join('');
 const body=`${ro&&!isNew&&locked(x.date)?`<div class="note-box info">${t('This entry is in a closed period (up to {d}).',{d:lockDate()})}</div>`:''}<div class="fg">
 ${fld(t('Entry type'),`<select id="ty">${tsel}</select>`,'class="full"')}
 ${fld(t('Date'),`<input id="td" type="date" value="${esc(x.date)}">`)}${fld(t('Doc. no.'),`<input id="tf" value="${esc(x.ref)}" placeholder="${t('Optional')}">`)}
 ${fld(`<span id="accl">${t('From account')}</span>`,`<select id="ta">${accOpts(x.account)}</select>`,'data-show="account"')}
 ${fld(t('Currency'),`<select id="tcu">${currOpts(x.currency||'USD')}</select>`,'data-show="nocash"')}
 ${fld(t('Exchange rate (per 1 USD)'),`<input id="tr" type="number" step="any" value="${esc(x.rate||rate(x.currency||(byId(S.accounts,x.account)||{}).currency))}"><span class="h" id="uh"></span>`)}
 ${fld(t('Employee'),`<select id="te"><option value="">${t('— select —')}</option>${opt(S.employees.filter(e=>e.active!==false||e.id===x.employee),x.employee)}</select><span class="h" id="eh"></span>`,'data-show="emp" class="full"')}
 ${fld(t('Party'),`<select id="tp"><option value="">${t('— select —')}</option>${Object.entries(PKINDS).map(([k,l])=>{const g=S.parties.filter(p=>p.kind===k);return g.length?`<optgroup label="${t(l)}">${opt(g,x.party)}</optgroup>`:''}).join('')}</select><span class="h" id="ph"></span>`,'data-show="party" class="full"')}
 <div class="sec" data-show="salary">${t('Salary details')}</div>
 ${fld(t('For month'),`<input id="tn" type="month" value="${esc(x.month||ym())}">`,'data-show="salary"')}${fld(t('Basic salary'),`<input id="tg" type="number" step="any" inputmode="decimal" value="${esc(x.gross??'')}">`,'data-show="salary"')}
 ${fld(t('Bonus / overtime'),`<input id="tb" type="number" step="any" value="${esc(x.bonus||'')}" placeholder="0">`,'data-show="salary"')}${fld(t('Deductions'),`<input id="tq" type="number" step="any" value="${esc(x.penalty||'')}" placeholder="0">`,'data-show="salary"')}
 ${fld(t('Deduct from advances'),`<input id="tx" type="number" step="any" value="${esc(x.deduct||'')}" placeholder="0">`,'data-show="salary"')}
 ${fld(`<span id="al">${t('Amount')}</span>`,`<input id="tm" type="number" step="any" inputmode="decimal" value="${esc(x.amount??'')}">`)}
 ${fld(t('Monthly installment'),`<input id="ti" type="number" step="any" value="${esc(x.installment||'')}" placeholder="${t('Optional')}">`,'data-show="advance"')}
 ${fld(t('Direction'),`<select id="tdir"><option value="1">${t('Increase')}</option><option value="-1" ${+x.dir<0?'selected':''}>${t('Decrease')}</option></select>`,'data-show="adjust"')}
 ${fld(t('To account'),`<select id="tt"><option value="">${t('— select —')}</option>${accOpts(x.toAccount,true)}</select>`,'data-show="transfer"')}${fld(t('Amount received'),`<input id="tv" type="number" step="any" value="${esc(x.toAmount??'')}">`,'data-show="transfer"')}
 ${fld(t('Project'),`<select id="tj"><option value="">${t('— none —')}</option>${opt(S.projects.filter(p=>p.status!=='closed'||p.id===x.project),x.project)}</select>`,'data-show="project"')}
 ${fld(t('Category'),`<select id="tc"><option value="">—</option>${ecats().map(c=>`<option value="${esc(c)}" ${c===x.category?'selected':''}>${esc(t(c))}</option>`).join('')}</select>`,'data-show="ecat"')}
 ${fld(t('Category'),`<select id="tci"><option value="">—</option>${icats().map(c=>`<option value="${esc(c)}" ${c===x.category?'selected':''}>${esc(t(c))}</option>`).join('')}</select>`,'data-show="icat"')}
 ${fld(t('Description / notes'),`<input id="to" value="${esc(x.note)}">`,'class="full"')}</div>`;
 const slipB=x.type==='salary'&&!isNew?`<button class="btn" id="slipb">${t('Payslip')}</button>`:'';
 const ft=ro?`<button class="btn" data-x>${t('Close')}</button>${slipB}`:`<button class="btn p" id="sv">${t('Save')}</button><button class="btn" data-x>${t('Cancel')}</button>${slipB}${!isNew?`<span class="sp"></span><button class="btn d" id="rm">${t('Delete')}</button>`:''}`;
 openModal(isNew?t('New entry'):ro?t('View entry'):t('Edit entry'),body,ft,m=>{
 let type=x.type,toEdited=!!x.toAmount,netEdited=!isNew&&type==='salary';
 const q=id=>m.querySelector('#'+id),num=id=>+q(id).value||0;
 const acc=()=>byId(S.accounts,q('ta').value),curC=()=>HAS.account(type)?(acc()||{}).currency:q('tcu').value;
 if(ro)m.querySelectorAll('input,select').forEach(el=>el.disabled=true);
 if(q('slipb'))q('slipb').onclick=()=>slip(x.id);
 const calcNet=()=>{if(type!=='salary'||netEdited)return;const g=num('tg');if(!g&&!num('tb'))return;q('tm').value=rnd(g+num('tb')-num('tq')-num('tx'),curC());};
 const upd=()=>{const sh={account:HAS.account(type),nocash:!HAS.account(type),party:HAS.party(type),emp:HAS.emp(type),project:HAS.project(type),ecat:HAS.ecat(type),icat:HAS.icat(type),salary:type==='salary',advance:type==='advance',adjust:type==='adjust',transfer:type==='transfer'};
  m.querySelectorAll('[data-show]').forEach(el=>el.style.display=sh[el.dataset.show]?'':'none');
  q('al').textContent=type==='salary'?t('Net paid in cash'):type==='transfer'?t('Amount transferred'):t('Amount');
  q('accl').textContent=(TYPES[type]||{}).cash>0?t('To account'):t('From account');
  const c=curC(),amt=num('tm'),r=num('tr')||1;q('uh').innerHTML=c!=='USD'&&amt?'≈ '+usdH(amt/r):'';
  const e=byId(S.employees,q('te').value);q('eh').innerHTML=e?t('Salary {s} · advances: {a}',{s:money(e.salary,e.salaryCurrency||'USD'),a:multi(advByCur(e.id))}):'';
  const p=byId(S.parties,q('tp').value);q('ph').innerHTML=p?t('Balance: {b}',{b:ptyBal(p.id)}):'';
  if(type==='transfer'&&!toEdited){const to=byId(S.accounts,q('tt').value);if(to&&amt)q('tv').value=rnd(amt/r*rate(to.currency),to.currency);}};
 const fillSalary=()=>{const e=byId(S.employees,q('te').value);if(!e||!isNew||type!=='salary')return;const c=curC(),sc=e.salaryCurrency||'USD';
  q('tg').value=rnd(c===sc?+e.salary:(+e.salary)/rate(sc)*rate(c),c);q('tx').value=suggestDeduct(e.id,c)||'';netEdited=false;calcNet();};
 q('ty').onchange=()=>{type=q('ty').value;if(type==='salary')fillSalary();q('tr').value=rate(curC());upd();};
 q('ta').onchange=()=>{q('tr').value=rate(curC());if(type==='salary'&&isNew)fillSalary();upd()};
 q('tcu').onchange=()=>{q('tr').value=rate(curC());upd()};
 q('te').onchange=()=>{const e=byId(S.employees,q('te').value);if(e&&isNew&&e.project)q('tj').value=e.project;fillSalary();upd()};
 q('tp').onchange=()=>{const p=byId(S.parties,q('tp').value);if(p&&isNew&&p.currency){if(HAS.account(type)){const a=S.accounts.find(a=>a.currency===p.currency);if(a&&acc().currency!==p.currency){q('ta').value=a.id;q('tr').value=rate(a.currency);}}else{q('tcu').value=p.currency;q('tr').value=rate(p.currency);}}upd()};
 q('tv').oninput=()=>{toEdited=true};
 ['tg','tb','tq','tx'].forEach(id=>q(id).oninput=()=>{netEdited=false;calcNet();upd()});
 q('tm').oninput=()=>{if(type==='salary')netEdited=true;upd()};q('tr').oninput=upd;q('tt').onchange=upd;
 upd();if(isNew&&type==='salary'&&x.employee&&!x.amount){fillSalary();upd();}
 if(ro)return;
 q('sv').onclick=async()=>{const amt=num('tm'),date=q('td').value||today();
  if(locked(date))return toast('Date is in a closed period (up to {d})',{d:lockDate()});
  if(!(amt>0))return toast('Enter a valid amount');
  if(HAS.emp(type)&&!q('te').value)return toast('Select the employee');
  if(HAS.party(type)&&!q('tp').value)return toast(S.parties.length?'Select the party':'Add the party first from the Parties page');
  const a=acc(),c=curC();
  const d={type,date,ref:q('tf').value.trim(),currency:c,amount:amt,rate:num('tr')||rate(c),note:q('to').value.trim(),createdAt:x.createdAt||Date.now(),updatedAt:Date.now()};
  if(HAS.account(type))d.account=a.id;if(HAS.project(type))d.project=q('tj').value;
  if(HAS.ecat(type))d.category=q('tc').value;if(HAS.icat(type))d.category=q('tci').value;if(HAS.party(type))d.party=q('tp').value;
  if(HAS.emp(type)){d.employee=q('te').value;const e=byId(S.employees,d.employee);if(!d.project&&e&&e.project&&HAS.project(type))d.project=e.project;}
  if(type==='advance')d.installment=num('ti');
  if(type==='salary'){d.month=q('tn').value||ym();d.gross=num('tg');d.bonus=num('tb');d.penalty=num('tq');d.deduct=num('tx');
   const o=(advByCur(d.employee)[c]||0)+(!isNew&&x.currency===c?(+x.deduct||0):0);if(d.deduct>o+0.005)return toast('Advance deduction exceeds the advance balance in this currency');
   if(isNew&&paidMonth(d.employee,d.month)&&!q('sv').dataset.ok){q('sv').dataset.ok=1;q('sv').textContent=t('Confirm anyway');return toast('Warning: salary for this month already recorded');}}
  if(type==='repay'){const o=(advByCur(q('te').value)[c]||0)+(!isNew&&x.type==='repay'&&x.currency===c?+x.amount:0);if(amt>o+0.005&&!q('sv').dataset.ok){q('sv').dataset.ok=1;q('sv').textContent=t('Confirm anyway');return toast('Amount exceeds the advance balance in this currency');}}
  if(type==='adjust')d.dir=+q('tdir').value;
  if(type==='transfer'){const to=byId(S.accounts,q('tt').value);if(!to||to.id===a.id)return toast('Select a different account to transfer to');d.toAccount=to.id;d.toCurrency=to.currency;d.toAmount=num('tv');if(!(d.toAmount>0))return toast('Enter the amount received');}
  q('sv').disabled=true;if(await put('txns',isNew?null:x.id,d)){closeModal();toast(isNew?'Entry recorded':'Entry updated')}else q('sv').disabled=false;};
 if(!isNew)q('rm').onclick=()=>confirmBox(t('Delete this entry permanently?'),()=>del('txns',x.id));});}

/* ---------- cash count ---------- */
function countForm(aid){const a=byId(S.accounts,aid),b=accBal(a);
 openModal(t('Cash count — {a}',{a:esc(a.name)}),`<div class="fg"><div class="netline"><span>${t('Book balance')}</span><b>${money(b,a.currency)}</b></div>
 ${fld(t('Counted amount'),`<input id="cn" type="number" step="any" inputmode="decimal"><span class="h" id="cdiff"></span>`)}${fld(t('Count date'),`<input id="cd" type="date" value="${today()}">`)}
 ${fld(t('Notes'),`<input id="cm" placeholder="${t('e.g. month-end count')}">`,'class="full"')}</div>`,`<button class="btn p" id="sv">${t('Record count')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{
 const q=id=>m.querySelector('#'+id),diff=()=>rnd((+q('cn').value||0)-b,a.currency);
 q('cn').oninput=()=>{if(q('cn').value==='')return q('cdiff').innerHTML='';const d=diff();q('cdiff').innerHTML=Math.abs(d)<0.005?`<span class="pos">${t('Matches')}</span>`:d>0?t('Surplus {v}',{v:money(d,a.currency,'pos')}):t('Shortage {v}',{v:money(-d,a.currency,'neg')});};
 q('sv').onclick=async()=>{if(q('cn').value==='')return toast('Enter the counted amount');const d=diff(),date=q('cd').value||today();if(locked(date))return toast('Date is in a closed period (up to {d})',{d:lockDate()});
  if(Math.abs(d)<0.005){closeModal();return toast('Cash box matches');}
  if(await put('txns',null,{type:'adjust',dir:d>0?1:-1,date,account:a.id,currency:a.currency,amount:Math.abs(d),rate:rate(a.currency),note:q('cm').value.trim()||t('Count: counted {v}',{v:fN(+q('cn').value,dec(a.currency))}),createdAt:Date.now(),updatedAt:Date.now()})){closeModal();toast('Count difference recorded');}};});}

/* ---------- payroll ---------- */
function payroll(){const act=S.employees.filter(e=>e.active!==false&&+e.salary);if(!act.length)return toast('No employees with salaries');if(!S.accounts.length)return toast('Add a cash box or account first');
 const cc={};act.forEach(e=>{const c=e.salaryCurrency||'USD';cc[c]=(cc[c]||0)+1});const topC=Object.entries(cc).sort((a,b)=>b[1]-a[1])[0][0];const defA=(S.accounts.find(a=>a.currency===topC)||S.accounts[0]).id;
 openModal(t('Pay monthly salaries'),`<div class="fg">${fld(t('Month'),`<input id="pm" type="month" value="${ym()}">`)}${fld(t('Payment date'),`<input id="pd" type="date" value="${today()}">`)}
 ${fld(t('From account'),`<select id="pa">${S.accounts.map(a=>`<option value="${a.id}" ${a.id===defA?'selected':''}>${esc(a.name)} (${esc(a.currency)})</option>`).join('')}</select>`)}${fld(t('Project'),`<select id="pj"><option value="">${t('All projects')}</option>${opt(S.projects,'')}</select>`)}</div>
 <div class="tw" style="margin-top:12px;border:1px solid var(--line)"><table id="pt"></table></div><div class="netline" style="margin-top:10px"><span id="pc"></span><b id="ptot"></b></div>`,
 `<button class="btn p" id="sv">${t('Pay selected salaries')}</button><button class="btn" data-x>${t('Cancel')}</button>`,m=>{
 const q=id=>m.querySelector('#'+id);let rows=[];
 const build=()=>{const c=byId(S.accounts,q('pa').value).currency,mo=q('pm').value,pj=q('pj').value;
  rows=act.filter(e=>!pj||e.project===pj).map(e=>{const sc=e.salaryCurrency||'USD';return{e,g:rnd(c===sc?+e.salary:(+e.salary)/rate(sc)*rate(c),c),b:0,p:0,d:suggestDeduct(e.id,c),paid:paidMonth(e.id,mo),on:!paidMonth(e.id,mo)}});
  q('pt').innerHTML=`<tr><th></th><th>${t('Employee')}</th><th class="n">${t('Basic')}</th><th class="n">${t('Bonus')}</th><th class="n">${t('Deduction')}</th><th class="n">${t('Advance deduction')}</th><th class="n">${t('Net')}</th></tr>`+rows.map((r,i)=>`<tr data-i="${i}"><td><input type="checkbox" ${r.on?'checked':''} data-k="on" style="width:auto"></td><td>${esc(r.e.name)}${r.paid?` <span class="tag ok">${t('Paid')}</span>`:''}<div class="mut small">${t('Advances balance')}: ${multi(advByCur(r.e.id),'—')}</div></td>
  <td><input type="number" step="any" value="${r.g}" data-k="g" style="width:95px"></td><td><input type="number" step="any" placeholder="0" data-k="b" style="width:80px"></td><td><input type="number" step="any" placeholder="0" data-k="p" style="width:80px"></td><td><input type="number" step="any" value="${r.d||''}" placeholder="0" data-k="d" style="width:85px"></td><td class="n" data-net></td></tr>`).join('');calc();};
 const calc=()=>{const c=byId(S.accounts,q('pa').value).currency;let tot=0,n=0;q('pt').querySelectorAll('tr[data-i]').forEach(tr=>{const r=rows[+tr.dataset.i];tr.querySelectorAll('input').forEach(i=>{r[i.dataset.k]=i.type==='checkbox'?i.checked:(+i.value||0)});
  r.net=rnd(r.g+r.b-r.p-r.d,c);tr.querySelector('[data-net]').innerHTML=money(r.net,c);if(r.on){tot+=r.net;n++;}});q('pc').textContent=t('{n} employee(s)',{n});q('ptot').innerHTML=money(tot,c);};
 q('pt').addEventListener('input',calc);q('pt').addEventListener('change',calc);['pa','pm','pj'].forEach(id=>q(id).onchange=build);build();
 q('sv').onclick=async()=>{calc();const a=byId(S.accounts,q('pa').value),c=a.currency,mo=q('pm').value,date=q('pd').value||today();if(locked(date))return toast('Date is in a closed period (up to {d})',{d:lockDate()});
  const sel=rows.filter(r=>r.on);if(!sel.length)return toast('No employee selected');
  for(const r of sel){if(r.d>(advByCur(r.e.id)[c]||0)+0.005)return toast('Advance deduction for {n} exceeds their balance',{n:r.e.name});if(!(r.net>0))return toast('Net for {n} is invalid',{n:r.e.name});}
  q('sv').disabled=true;let ok=0;for(const r of sel){if(await put('txns',null,{type:'salary',date,month:mo,account:a.id,currency:c,rate:rate(c),employee:r.e.id,project:r.e.project||'',gross:r.g,bonus:r.b,penalty:r.p,deduct:r.d,amount:r.net,note:t('Salaries {m}',{m:monLbl(mo)}),createdAt:Date.now(),updatedAt:Date.now()}))ok++;else break;q('sv').textContent=t('Paying… {a}/{b}',{a:ok,b:sel.length});}
  closeModal();toast('{n} salaries paid',{n:ok});};},true);}

/* ---------- documents ---------- */
const docHead=(title,no)=>`<div class="ph"><img src="${LOGO}" alt=""><div class="o"><b>${ORG()}</b><span>${LANG==='ar'?'Modern Link for Telecommunications and IT Services':AR['Modern Link for Telecommunications and IT Services']}</span></div><div class="dt">${t('Issue date')}: <span class="num">${today()}</span>${no?`<br>${t('No.')}: <span class="num">${esc(no)}</span>`:''}</div></div><div class="pt">${esc(title)}</div>`;
const docFoot=()=>`<div class="pf"><span>${ORG()}</span><span>${t('Document issued by the internal accounting system')}</span></div>`;
function slip(tid){const x=byId(S.txns,tid);if(!x)return;const e=byId(S.employees,x.employee)||{},c=x.currency,g=+x.gross||plAmt(x),m=x.month||x.date.slice(0,7);
 const no=x.ref||('SAL-'+m.replace('-','')+'-'+String(x.id).slice(-4).toUpperCase());
 openModal(t('Payslip'),`<div id="docP" class="paper">${docHead(t('Payslip — {m}',{m:monLbl(m)}),no)}<div class="pb">
 <div class="meta"><div><span>${t('Employee name')}:</span><b>${esc(e.name||'')}</b></div><div><span>${t('Position')}:</span>${esc(e.role||'—')}</div><div><span>${t('Project')}:</span>${esc(prjName(x.project)||'—')}</div><div><span>${t('For month')}:</span>${monLbl(m)}</div><div><span>${t('Payment date')}:</span><span class="num">${esc(x.date)}</span></div><div><span>${t('Paid from')}:</span>${esc(accName(x.account))}</div></div>
 <table><tr><th>${t('Item')}</th><th class="n">${t('Amount')} (${esc(c)})</th></tr><tr><td>${t('Basic salary')}</td><td class="n">${money(g,c)}</td></tr>${+x.bonus?`<tr><td>${t('Overtime / bonus')}</td><td class="n">+ ${money(x.bonus,c)}</td></tr>`:''}${+x.penalty?`<tr><td>${t('Administrative deductions')}</td><td class="n">− ${money(x.penalty,c)}</td></tr>`:''}${+x.deduct?`<tr><td>${t('Advance deduction ')}</td><td class="n">− ${money(x.deduct,c)}</td></tr>`:''}
 <tr class="tot"><td>${t('Net paid ')}</td><td class="n">${money(x.amount,c)}</td></tr></table>
 <p style="margin:12px 0 0">${t('Remaining advances after this payment')}: <b>${multi(advByCur(x.employee))}</b></p>
 <div class="sig"><div>${t('Recipient signature')}</div><div>${t('Accountant')}</div><div>${t('Finance manager')}</div></div></div>${docFoot()}</div>`,
 `<button class="btn p" id="pdf">${t('Download PDF')}</button><button class="btn" data-x>${t('Close')}</button>`,mm=>{mm.querySelector('#pdf').onclick=()=>toPdf(mm.querySelector('#docP'),`${t('payslip')}-${e.name||''}-${m}.pdf`);},true);}
function stmt(title,sub,L,balHtml,fname){const rows=sorted(L).reverse();
 openModal(t('Statement'),`<div id="docP" class="paper">${docHead(title)}<div class="pb"><div class="meta"><div><span>${t('Subject')}:</span>${sub}</div><div><span>${t('Number of entries')}:</span><span class="num">${rows.length}</span></div></div>
 <table><tr><th>${t('Date')}</th><th>${t('Doc. no.')}</th><th>${t('Description')}</th><th class="n">${t('In')}</th><th class="n">${t('Out')}</th></tr>${rows.map(x=>{const f=flows(x);return `<tr><td class="num">${esc(x.date)}</td><td>${esc(x.ref||'—')}</td><td>${tl(x.type)}${x.month?' — '+esc(monLbl(x.month)):''}${x.note?' — '+esc(x.note):''}${+x.deduct?' — '+t('Advance deduction')+' '+fN(x.deduct,dec(x.currency)):''}</td><td class="n">${f.i?money(f.i,f.c):''}</td><td class="n">${f.o?money(f.o,f.c):''}</td></tr>`}).join('')||`<tr><td colspan="5" class="mut">${t('No entries')}</td></tr>`}
 <tr class="tot"><td colspan="3">${t('Balance')}</td><td class="n" colspan="2">${balHtml}</td></tr></table>
 <div class="sig"><div>${t('Accountant')}</div><div>${t('Finance manager')}</div></div></div>${docFoot()}</div>`,
 `<button class="btn p" id="pdf">${t('Download PDF')}</button><button class="btn" data-x>${t('Close')}</button>`,m=>{m.querySelector('#pdf').onclick=()=>toPdf(m.querySelector('#docP'),fname);},true);}

/* ============ export ============ */
async function saveFile(name,data){
 try{
  if(Capacitor.isNativePlatform()){
   const {Filesystem,Directory}=await import('@capacitor/filesystem');const {Share}=await import('@capacitor/share');
   const bytes=typeof data==='string'?new TextEncoder().encode(data):new Uint8Array(data);let bin='';for(let i=0;i<bytes.length;i+=0x8000)bin+=String.fromCharCode.apply(null,bytes.subarray(i,i+0x8000));
   const safe=name.replace(/[\\/:*?"<>|]/g,'-');await Filesystem.writeFile({path:safe,data:btoa(bin),directory:Directory.Cache});
   const {uri}=await Filesystem.getUri({path:safe,directory:Directory.Cache});await Share.share({title:safe,url:uri});return;}
  const blob=data instanceof Blob?data:new Blob([data]);const u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);toast('Downloaded');
 }catch(e){if(String(e&&e.message).toLowerCase().includes('cancel'))return;toast('Download failed');}}
async function toPdf(el,name){toast('Preparing PDF…');let html2canvas,jsPDF;try{html2canvas=(await import('html2canvas')).default;({jsPDF}=await import('jspdf'));}catch(e){return toast('Could not load the PDF library');}
 const ow=el.style.width;try{el.style.width='760px';const cv=await html2canvas(el,{scale:2,backgroundColor:'#ffffff',windowWidth:1000});el.style.width=ow;
  const pdf=new jsPDF('p','mm','a4'),mg=10,iw=210-2*mg,px=cv.width/iw,pageH=(297-2*mg)*px;
  for(let y=0,p=0;y<cv.height;y+=pageH,p++){const h=Math.min(pageH,cv.height-y),c=document.createElement('canvas');c.width=cv.width;c.height=h;const ctx=c.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,c.width,h);ctx.drawImage(cv,0,y,cv.width,h,0,0,cv.width,h);if(p)pdf.addPage();pdf.addImage(c.toDataURL('image/jpeg',.92),'JPEG',mg,mg,iw,h/px);}
  await saveFile(name,pdf.output('arraybuffer'));}catch(e){el.style.width=ow;toast('Could not create the PDF');}}
const TXH=()=>['Date','Doc. no.','Type','Account','Currency','Amount','Exchange rate','USD','Project','Category','Party','Employee','Salary month','Basic','Bonus','Deduction','Advance deduction','To account','Received amount','Description'].map(k=>t(k));
const txX=x=>[x.date,x.ref||'',tl(x.type),HAS.account(x.type)?accName(x.account):t('credit'),x.currency,(x.type==='adjust'?(+x.dir||1):1)*(+x.amount||0),tRate(x),+tUsd(x).toFixed(2),prjName(x.project),x.category?t(x.category):'',ptyName(x.party),empName(x.employee),x.month||'',+x.gross||'',+x.bonus||'',+x.penalty||'',+x.deduct||'',x.toAccount?accName(x.toAccount):'',+x.toAmount||'',x.note||''];
async function xls(sheets,name){toast('Preparing Excel…');let XL;try{XL=await import('xlsx');}catch(e){return toast('Could not load the Excel library');}
 const wb=XL.utils.book_new();if(LANG==='ar')wb.Workbook={Views:[{RTL:true}]};
 for(const [n,rows] of sheets){const ws=XL.utils.aoa_to_sheet(rows);ws['!cols']=rows[0].map((_,i)=>({wch:Math.min(40,Math.max(10,...rows.map(r=>String(r[i]??'').length+2)))}));XL.utils.book_append_sheet(wb,ws,String(n).replace(/[\\\/?*\[\]:]/g,' ').slice(0,31));}
 await saveFile(name,XL.write(wb,{bookType:'xlsx',type:'array'}));}
function xlsAll(){const r=period(S.rp.period,S.rp.from,S.rp.to);
 xls([[t('Transactions'),[TXH(),...sorted(S.txns).map(txX)]],
  [t('Accounts'),[[t('Account'),t('Type'),t('Country'),t('Currency'),t('Opening'),t('Balance'),t('USD')],...S.accounts.map(a=>[a.name,t(AKINDS[a.kind]||''),ctry(a.country),a.currency,+a.opening||0,rnd(accBal(a),a.currency),+accUsd(a).toFixed(2)])]],
  [t('Employees ').trim(),[[t('Name'),t('Position'),t('Project'),t('Phone'),t('Monthly salary'),t('Currency'),t('Status'),t('Advances (USD)'),t('Details')],...S.employees.map(e=>{const a=advByCur(e.id);return[e.name,e.role||'',prjName(e.project),e.phone||'',+e.salary||0,e.salaryCurrency||'USD',e.active===false?t('Suspended'):t('Active'),+advUsd(e.id).toFixed(2),Object.keys(a).map(c=>fN(a[c],dec(c))+' '+c).join(' + ')]})]],
  [t('Parties'),[[t('Name'),t('Type'),t('Phone'),t('Balance USD (+ owed to us)'),t('Details')],...S.parties.map(p=>{const b=ptyByCur(p.id);return[p.name,t(PKINDS[p.kind]||''),p.phone||'',+ptyUsd(p.id).toFixed(2),Object.keys(b).map(c=>fN(b[c],dec(c))+' '+c).join(' + ')]})]],
  [t('Projects'),[[t('Project name'),t('Country'),t('Status'),t('Revenue USD'),t('Expenses USD'),t('Net USD')],...S.projects.map(p=>{const L=S.txns.filter(x=>x.project===p.id&&inR(x.date,r)),i=sum(L.filter(isRev),plUsd),e=sum(L.filter(isExp),plUsd);return[p.name,ctry(p.country),p.status==='closed'?t('Closed'):t('Active'),+i.toFixed(2),+e.toFixed(2),+(i-e).toFixed(2)]})]]],`${t('accounts')}-${today()}.xlsx`);}
function repPdf(){const tab=RTABS.find(x=>x[0]===S.rp.tab);const box=document.createElement('div');box.className='paper';box.style.cssText='position:fixed;top:0;left:-3000px;width:760px';
 box.innerHTML=docHead(t(tab[2]))+`<div class="pb">${repBody()}</div>`+docFoot();document.body.appendChild(box);toPdf(box,`${t(tab[2])}-${today()}.pdf`).finally(()=>box.remove());}

/* ============ actions ============ */
const A={
 go:id=>go(id),lang:()=>{LANG=LANG==='ar'?'en':'ar';try{localStorage.setItem('ml_lang',LANG)}catch(e){}applyLang();if(ME.user&&ORGID)render();else renderAuth();},
 auth:id=>{AUTH=id;authMsg='';renderAuth();},logout:async()=>{await sb.auth.signOut();},
 setTab:id=>{if(S.view!=='setup'){S.view='setup';try{history.replaceState(null,'','#setup')}catch(e){}}S.setTab=id;if(id==='team')S.team=null;if(id==='billing')S.payments=null;render();window.scrollTo(0,0);},
 invite:async()=>{const em=$('#ie').value.trim(),role=$('#ir').value;if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em))return toast('Enter a valid email');
  const {error}=await sb.rpc('invite_member',{p_org:ORGID,p_email:em,p_role:role});if(error){const m=error.message||'';return toast(m.includes('user_limit')?'User limit reached for your plan':m.includes('already_member')?'Already a member':m.includes('subscription')?'Subscription expired — data is read only':'Could not save, try again');}
  toast('Invitation sent');S.team=null;render();},
 rmInvite:async id=>{const {error}=await sb.from('invitations').delete().eq('id',id);if(error)return dbErr(error);S.team=null;render();},
 rmMember:id=>confirmBox(t('Remove this user from the company?'),async()=>{const {error}=await sb.from('memberships').delete().eq('org_id',ORGID).eq('user_id',id);if(error)return dbErr(error);S.team=null;render();},t('Yes, remove')),
 admPay:id=>admPay(id),newUser:()=>createUserForm(),assign:id=>assignForm(id),pw:id=>pwForm(id),rcCount:id=>rcCount(id),rcApprove:id=>rcApprove(id),rcReturn:id=>rcReturn(id),rcStmt:id=>rcStmt(id),admSet:id=>admSet(id),
 admSaveP:async()=>{const {error}=await sb.from('platform_settings').update({contact_whatsapp:$('#pw').value.trim(),contact_email:$('#pe').value.trim(),trial_days:+$('#pt2').value||14,bank_details:$('#pb').value}).eq('id',1);if(error)return toast('Could not save, try again');toast('Settings saved');S.admin=null;render();},
 menu:()=>openModal(t('Menu'),`<div class="drawer">${navItems().map(([k,l])=>`<button data-a="go" data-id="${k}" class="${S.view===k?'on':''}">${IC(NAVIC[k])}${t(l)}</button>`).join('')}</div>`,null),
 newTx:id=>txnForm(null,id?{type:id}:null),editTx:id=>{const x=byId(S.txns,id);if(x)txnForm(x);},
 newAcc:()=>accForm(),editAcc:id=>accForm(byId(S.accounts,id)),newPrj:()=>prjForm(),editPrj:id=>prjForm(byId(S.projects,id)),newEmp:()=>empForm(),editEmp:id=>empForm(byId(S.employees,id)),
 newPty:()=>ptyForm(null,S.pk||undefined),editPty:id=>ptyForm(byId(S.parties,id)),
 openEmp:id=>{S.emp=id;render();window.scrollTo(0,0)},openPty:id=>{S.party=id;render();window.scrollTo(0,0)},pk:id=>{S.pk=id;render()},
 empTx:id=>txnForm(null,{type:id,employee:S.emp}),ptyTx:id=>txnForm(null,{type:id,party:S.party}),
 accTx:id=>{S.f={...S.f,account:id,project:'',emp:'',party:'',type:'',q:'',period:'all'};go('txns')},prjTx:id=>{S.f={...S.f,project:id,account:'',emp:'',party:'',type:'',q:'',period:'year'};go('txns')},
 clrF:()=>{S.f={...S.f,project:'',type:'',account:'',emp:'',party:'',q:''};render()},
 count:id=>countForm(id),payroll:()=>payroll(),slip:id=>slip(id),rtab:id=>{S.rp.tab=id;render()},
 repPdf:()=>repPdf(),xlsAll:()=>xlsAll(),xlsTx:()=>xls([[t('Transactions'),[TXH(),...filtTx().map(txX)]]],`${t('entries')}-${today()}.xlsx`),
 xlsEmp:()=>{const e=byId(S.employees,S.emp);xls([[e.name,[TXH(),...sorted(S.txns.filter(x=>x.employee===e.id)).map(txX)]]],`${t('statement')}-${e.name}-${today()}.xlsx`)},
 empStmt:()=>{const e=byId(S.employees,S.emp);stmt(t('Employee statement — {n}',{n:e.name}),`${t('Monthly salary')}: ${money(e.salary,e.salaryCurrency||'USD')}`,S.txns.filter(x=>x.employee===e.id),t('Advances balance')+': '+multi(advByCur(e.id)),`${t('statement')}-${e.name}.pdf`)},
 ptyStmt:()=>{const p=byId(S.parties,S.party);stmt(t('Statement — {n}',{n:p.name}),t(PKINDS[p.kind]||''),S.txns.filter(x=>x.party===p.id),ptyBal(p.id),`${t('statement')}-${p.name}.pdf`)},
 backup:()=>saveFile(`${t('backup')}-${today()}.json`,JSON.stringify({app:'modernlink-accounting',v:3,exportedAt:new Date().toISOString(),config:S.cfg,accounts:S.accounts,projects:S.projects,employees:S.employees,parties:S.parties,txns:S.txns},null,1)),
 addCur:()=>{const C=readCur();C.push({code:'',name:'',sym:'',rate:1});S.cfg={...(S.cfg||{}),currencies:C};render();},
 rmCur:id=>{const C=readCur(),c=C[+id];if(S.txns.some(x=>x.currency===c.code||x.toCurrency===c.code)||S.accounts.some(a=>a.currency===c.code)||S.employees.some(e=>e.salaryCurrency===c.code))return toast('Currency is in use');C.splice(+id,1);S.cfg={...(S.cfg||{}),currencies:C};render();},
 saveCfg:async()=>{const C=readCur().filter(c=>c.code);if(C.some(c=>!(+c.rate>0)))return toast('Exchange rate must be greater than zero');C.forEach(c=>c.code=c.code.toUpperCase());
  if(new Set(C.map(c=>c.code)).size!==C.length)return toast('Duplicate currency code');const sp=(id,keys)=>$('#'+id).value.split('\n').map(s=>s.trim()).filter(Boolean).map(l=>unT(l,keys));
  if(await saveCfg({currencies:C,categories:sp('ecats',[...DEF_ECATS,...ecats()]),incomeCats:sp('icats',[...DEF_ICATS,...icats()])}))toast('Settings saved');},
 lockLast:()=>{const d=new Date();$('#lockd').value=new Date(d.getFullYear(),d.getMonth(),0).toLocaleDateString('en-CA');},
 saveLock:()=>{const d=$('#lockd').value;if(!d)return toast('Select a closing date');confirmBox(t('Close all entries up to {d}?',{d:esc(d)}),async()=>{if(await saveCfg({lockDate:d}))toast('Books closed');},t('Yes, close'));},
 unlock:()=>confirmBox(t('Reopen closed periods for editing?'),async()=>{if(await saveCfg({lockDate:''}))toast('Books reopened');},t('Yes, reopen'))};
function readCur(){const C=JSON.parse(JSON.stringify(currs()));document.querySelectorAll('#ctab tr[data-i]').forEach(tr=>{const i=+tr.dataset.i;tr.querySelectorAll('input').forEach(inp=>{if(inp.disabled)return;const k=inp.dataset.k,v=inp.value.trim();if(k==='name'&&C[i].name&&v===t(C[i].name))return;C[i][k]=k==='rate'?+inp.value:v})});return C;}
const unT=(line,keys)=>{const k=keys.find(k=>t(k)===line);return k||line;};
document.addEventListener('click',e=>{const el=e.target.closest('[data-a]');if(!el)return;const fn=A[el.dataset.a];if(!fn)return;e.stopPropagation();fn(el.dataset.id,el,e);});
const onF=e=>{const el=e.target.closest('[data-f]');if(!el)return;const k=el.dataset.f;if(e.type==='input'&&(el.tagName!=='INPUT'||el.type==='date'))return;
 if(k.startsWith('rp.')){S.rp[k.slice(3)]=el.value;render();return;}S.f[k]=el.value;if(k==='period')render();else renderTxList();};
document.addEventListener('change',async e=>{const el=e.target.closest('[data-a2]');if(!el)return;
 if(el.dataset.a2==='org'){S.view='dash';await openOrg(el.value);}
 if(el.dataset.a2==='role'){const {error}=await sb.from('memberships').update({role:el.value}).eq('org_id',ORGID).eq('user_id',el.dataset.id);if(error)dbErr(error);else{toast('Saved');S.team=null;render();}}});
document.addEventListener('change',e=>{if(e.target.id==='rmon'&&e.target.value){S.rmonth=e.target.value;S.closings=null;render();}});
document.addEventListener('change',onF);document.addEventListener('input',onF);
if(Capacitor.isNativePlatform())import('@capacitor/app').then(({App})=>App.addListener('backButton',()=>{if(!$('#modal').classList.contains('hidden'))return closeModal();if(S.emp||S.party){S.emp=null;S.party=null;return render();}if(S.view!=='dash'&&ME.user&&ORGID)return go('dash');App.exitApp();}));
boot();
