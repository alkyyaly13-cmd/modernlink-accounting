// In-memory stand-in for supabase-js used only for UI smoke tests (VITE_MOCK=1)
const DB={account_closings:[],organizations:[],memberships:[],invitations:[],subscriptions:[],payments:[],platform_admins:[],org_settings:[],accounts:[],projects:[],employees:[],parties:[],txns:[],
 plans:[{code:'trial',name_ar:'تجريبي',name_en:'Trial',max_users:3,price_usd:0,sort:0},{code:'basic',name_ar:'أساسي',name_en:'Basic',max_users:5,price_usd:15,sort:1},{code:'pro',name_ar:'احترافي',name_en:'Professional',max_users:20,price_usd:35,sort:2}],
 platform_settings:[{id:1,contact_whatsapp:'+962790000000',contact_email:'sales@modernlink.example',bank_details:'Bank: Example Bank\nIBAN: JO00 0000 0000 0000',trial_days:14}]};
let user=null;const listeners=[];const uid=()=>crypto.randomUUID();
class Q{constructor(t){this.t=t;this.f=[];this.op='select';this.payload=null;this.single=false;}
 select(){return this}eq(k,v){this.f.push([k,v]);return this}order(){return this}range(){return this}
 maybeSingle(){this.single=true;return this}single_(){return this}
 insert(p){this.op='insert';this.payload=p;return this}update(p){this.op='update';this.payload=p;return this}delete(){this.op='delete';return this}upsert(p){this.op='upsert';this.payload=p;return this}
 rows(){return DB[this.t].filter(r=>this.f.every(([k,v])=>r[k]===v))}
 run(){const T=DB[this.t];
  if(this.op==='insert'){[].concat(this.payload).forEach(p=>T.push({id:uid(),created_at:new Date().toISOString(),...p}));return{data:null,error:null}}
  if(this.op==='update'){this.rows().forEach(r=>Object.assign(r,this.payload));return{data:null,error:null}}
  if(this.op==='delete'){const rs=this.rows();DB[this.t]=T.filter(r=>!rs.includes(r));return{data:null,error:null}}
  if(this.op==='upsert'){const k=this.payload.org_id?'org_id':'id';const e=T.find(r=>r[k]===this.payload[k]);if(e)Object.assign(e,this.payload);else T.push(this.payload);return{data:null,error:null}}
  let d=this.rows();if(this.t==='memberships')d=d.map(m=>({...m,org:DB.organizations.find(o=>o.id===m.org_id)}));
  return{data:this.single?(d[0]||null):d,error:null}}
 then(res,rej){try{res(this.run())}catch(e){rej(e)}}}
const RPC={
 accept_invitations:()=>0,
 create_organization:({p_name,p_country,p_full_name})=>{const id=uid();DB.organizations.push({id,name:p_name,country:p_country});DB.memberships.push({org_id:id,user_id:user.id,role:'owner',email:user.email,full_name:p_full_name,created_at:new Date().toISOString()});
  DB.subscriptions.push({org_id:id,plan:'trial',status:'trialing',current_period_end:new Date(Date.now()+14*864e5).toISOString()});DB.org_settings.push({org_id:id,data:{}});return id},
 invite_member:({p_org,p_email,p_role})=>{DB.invitations.push({id:uid(),org_id:p_org,email:p_email,role:p_role,created_at:new Date().toISOString()});return null},
 admin_list_orgs:()=>DB.organizations.map(o=>{const s=DB.subscriptions.find(x=>x.org_id===o.id)||{};return{org_id:o.id,name:o.name,country:o.country,created_at:new Date().toISOString(),owner_email:(DB.memberships.find(m=>m.org_id===o.id&&m.role==='owner')||{}).email,members:DB.memberships.filter(m=>m.org_id===o.id).length,plan:s.plan,status:s.status,current_period_end:s.current_period_end,txns:DB.txns.filter(x=>x.org_id===o.id).length}}),
 admin_record_payment:({p_org,p_plan,p_months,p_amount})=>{const s=DB.subscriptions.find(x=>x.org_id===p_org);s.plan=p_plan;s.status='active';s.current_period_end=new Date(Date.now()+p_months*30*864e5).toISOString();DB.payments.push({id:uid(),org_id:p_org,plan:p_plan,months:p_months,amount:p_amount,currency:'USD',created_at:new Date().toISOString()});return s.current_period_end},
 admin_set_subscription:()=>null,
 approve_closing:({p_id,p_post_adjustment,p_review_note})=>{const c=DB.account_closings.find(x=>x.id===p_id);if(p_post_adjustment&&+c.difference){const a=DB.accounts.find(x=>x.id===c.account_id);const last=new Date(+c.month.slice(0,4),+c.month.slice(5,7),0).toLocaleDateString('en-CA');DB.txns.push({id:uid(),org_id:c.org_id,data:{type:'adjust',dir:c.difference>0?1:-1,date:last,account:c.account_id,currency:a.data.currency,amount:Math.abs(c.difference),closing:c.id,note:'جرد'}});}c.status='approved';c.review_note=p_review_note;return null},
 return_closing:({p_id,p_review_note})=>{const c=DB.account_closings.find(x=>x.id===p_id);c.status='returned';c.review_note=p_review_note;return null}};
const STAFF={};
export const configured=true;
export const sb={
 auth:{getSession:async()=>({data:{session:user?{user}:null}}),onAuthStateChange:(cb)=>{listeners.push(cb);return{data:{subscription:{unsubscribe(){}}}}},
  signInWithPassword:async({email})=>{user=STAFF[email]||{id:'u-'+email,email,user_metadata:{full_name:'Owner',company:'Modern Link',country:'JO'}};return{data:{user},error:null}},
  signUp:async({email,options})=>{user={id:'u-'+email,email,user_metadata:options.data};return{data:{user,session:{}},error:null}},
  signOut:async()=>{user=null;listeners.forEach(f=>f('SIGNED_OUT',null));return{}},updateUser:async(p)=>{if(p.data)Object.assign(user.user_metadata,p.data);return{error:null}},resetPasswordForEmail:async()=>({error:null})},
 functions:{invoke:async(n,{body})=>{if(body.action==='create'){const email=body.username+'@staff.modernlink.app',id='u-'+email;STAFF[email]={id,email,user_metadata:{full_name:body.full_name,username:body.username,company_created:true}};DB.memberships.push({org_id:body.org_id,user_id:id,role:body.role,email,username:body.username,full_name:body.full_name,projects:body.projects,accounts:body.accounts,created_at:new Date().toISOString()});return{data:{ok:true},error:null}}return{data:{ok:true},error:null}}},
 from:t=>new Q(t),rpc:async(n,a)=>({data:RPC[n]?RPC[n](a||{}):null,error:null}),
 channel:()=>({on(){return this},subscribe(cb){setTimeout(()=>cb('SUBSCRIBED'),10);return this}}),removeChannel(){}};
window.__mockDB=DB;window.__mockMakeAdmin=()=>DB.platform_admins.push({user_id:user.id});
