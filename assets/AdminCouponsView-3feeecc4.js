import{m as x,D as y}from"./DelModal-1fd2db91.js";import{aC as l,W as a,X as o,bl as r,bc as _,a2 as $,aZ as u,b8 as k,aM as f,F as D,aK as P,a3 as C}from"./@vue-a2e6aab2.js";import{_ as g}from"./index-90e19ebd.js";import{P as V}from"./PaginationView-924a1c4c.js";import{S as c}from"./sweetalert2-fc38d252.js";import"./bootstrap-8396874d.js";import"./@popperjs-9847b28c.js";import"./@ckeditor-b092e1d3.js";import"./vue-71628d3f.js";import"./pinia-7d28dea6.js";import"./vue-demi-71ba0ef2.js";import"./vue-router-49be82a2.js";import"./axios-08622986.js";import"./vue-axios-58a7c26f.js";import"./vue-loading-overlay-67898897.js";import"./vee-validate-aa725db8.js";import"./@vee-validate-55db0f47.js";const N={props:["coupon","isNew"],data(){return{tempCoupon:{},due_date:""}},mixins:[x],watch:{coupon(){this.tempCoupon=this.coupon;const s=new Date(this.tempCoupon.due_date*1e3).toISOString().split("T");[this.due_date]=s,console.log(s)},due_date(){this.tempCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}}},T={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},B={class:"modal-dialog",role:"document"},E={class:"modal-content"},U={class:"modal-header"},A={class:"modal-title",id:"exampleModalLabel"},L={key:0},S={key:1},I=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),R={class:"modal-body"},O={class:"mb-3"},F=o("label",{for:"title"},"標題",-1),H={class:"mb-3"},K=o("label",{for:"coupon_code"},"優惠碼",-1),W={class:"mb-3"},X=o("label",{for:"due_date"},"到期日",-1),Z={class:"mb-3"},j=o("label",{for:"price"},"折扣百分比",-1),q={class:"mb-3"},z={class:"form-check"},G=o("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),J={class:"modal-footer"},Q=o("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close",-1);function Y(s,t,n,m,e,d){return l(),a("div",T,[o("div",B,[o("div",E,[o("div",U,[o("h5",A,[n.isNew?(l(),a("span",L,"新增優惠卷")):(l(),a("span",S,"編輯優惠卷"))]),I]),o("div",R,[o("div",O,[F,r(o("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":t[0]||(t[0]=i=>e.tempCoupon.title=i),placeholder:"請輸入標題"},null,512),[[_,e.tempCoupon.title]])]),o("div",H,[K,r(o("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":t[1]||(t[1]=i=>e.tempCoupon.code=i),placeholder:"請輸入優惠碼"},null,512),[[_,e.tempCoupon.code]])]),o("div",W,[X,$(" "+u(e.due_date)+" ",1),r(o("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":t[2]||(t[2]=i=>e.due_date=i)},null,512),[[_,e.due_date]])]),o("div",Z,[j,r(o("input",{type:"number",min:"0",max:"100",class:"form-control",id:"price","onUpdate:modelValue":t[3]||(t[3]=i=>e.tempCoupon.percent=i),placeholder:"請輸入折扣百分比"},null,512),[[_,e.tempCoupon.percent,void 0,{number:!0}]])]),o("div",q,[o("div",z,[r(o("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":t[4]||(t[4]=i=>e.tempCoupon.is_enabled=i),id:"is_enabled"},null,512),[[k,e.tempCoupon.is_enabled]]),G])])]),o("div",J,[Q,o("button",{type:"button",class:"btn btn-primary",onClick:t[5]||(t[5]=()=>s.$emit("update-coupon",e.tempCoupon))},u(n.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)}const oo=g(N,[["render",Y]]),{VITE_APP_URL:h,VITE_APP_PATH:b}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"leo533",BASE_URL:"/test-github/",MODE:"production",DEV:!1,PROD:!0},to={data(){return{coupons:{},tempCoupon:{title:"",is_enabled:0,percent:100,code:""},isNew:!1,pagination:{}}},methods:{getCoupons(s=1){const t=this.$loading.show();this.$http.get(`${h}v2/api/${b}/admin/coupons/?page=${s}`).then(n=>{this.coupons=n.data.coupons,this.pagination=n.data.pagination,t.hide()}).catch(n=>{c.fire({position:"top-end",icon:"error",title:n.response.data.message,showConfirmButton:!1,timer:1500}),t.hide()})},openModal(s,t){s==="new"?(this.tempCoupon={due_date:new Date().getTime()/1e3},this.isNew=!0):s==="edit"&&(this.tempCoupon={...t},this.isNew=!1),this.$refs.couponModal.openModal()},openDelmodal(s){this.tempCoupon={...s},this.$refs.coupondelModal.openModal()},updateCoupon(s){if(s.percent>100||s.percent<=0)return c.fire({position:"top-end",icon:"error",title:"折扣百分比不能為負值或100以上",showConfirmButton:!1,timer:1500}),0;let t=`${h}v2/api/${b}/admin/coupon`,n="post",m=s;this.isNew||(t=`${h}v2/api/${b}/admin/coupon/${this.tempCoupon.id}`,n="put",m=this.tempCoupon),this.$http[n](t,{data:m}).then(e=>{c.fire({position:"top-end",icon:"success",title:e.data.message,showConfirmButton:!1,timer:1500}),this.getCoupons(),this.$refs.couponModal.hideModal()}).catch(e=>{c.fire({position:"top-end",icon:"error",title:e.response.data.message,showConfirmButton:!1,timer:1500})})},deleteCoupon(){const s=`${h}v2/api/${b}/admin/coupon/${this.tempCoupon.id}`;this.$http.delete(s).then(t=>{c.fire({position:"top-end",icon:"success",title:t.data.message,showConfirmButton:!1,timer:1500}),this.$refs.coupondelModal.hideModal(),this.getCoupons()}).catch(t=>{c.fire({position:"top-end",icon:"error",title:t.response.data.message,showConfirmButton:!1,timer:1500})})}},components:{CouponsModal:oo,DelModal:y,Pagination:V},mounted(){this.getCoupons(),document.title=this.$route.meta.title}},eo={class:"col-md-9 ms-sm-auto col-lg-10 px-md-4"},so={class:"py-3"},no={class:"text-end mt-4"},io={class:"table-responsive"},lo={class:"table mt-4"},ao=o("thead",null,[o("tr",null,[o("th",null,"名稱"),o("th",{class:"text-nowrap"},"折扣百分比"),o("th",null,"到期日"),o("th",{class:"text-nowrap"},"是否啟用"),o("th",null,"操作行為")])],-1),po={class:"text-nowrap"},co={key:0,class:"text-success"},ro={key:1,class:"text-muted"},uo={class:"text-nowrap"},mo={class:"btn-group"},_o=["onClick"],ho=["onClick"];function bo(s,t,n,m,e,d){const i=f("CouponsModal"),w=f("DelModal"),v=f("Pagination");return l(),a("main",eo,[o("div",so,[o("div",no,[o("button",{class:"btn btn-primary",type:"button",onClick:t[0]||(t[0]=()=>d.openModal("new"))}," 建立新的優惠券 ")]),o("div",io,[o("table",lo,[ao,o("tbody",null,[(l(!0),a(D,null,P(e.coupons,(p,M)=>(l(),a("tr",{key:M},[o("td",po,u(p.title),1),o("td",null,u(p.percent)+"%",1),o("td",null,u(s.$filters.date(p.due_date)),1),o("td",null,[p.is_enabled===1?(l(),a("span",co,"啟用")):(l(),a("span",ro,"未啟用"))]),o("td",uo,[o("div",mo,[o("button",{class:"btn btn-outline-primary btn-sm",onClick:()=>d.openModal("edit",p)},"編輯",8,_o),o("button",{class:"btn btn-outline-danger btn-sm",onClick:()=>d.openDelmodal(p)},"刪除",8,ho)])])]))),128))])])]),C(i,{ref:"couponModal",coupon:e.tempCoupon,"is-new":e.isNew,onUpdateCoupon:d.updateCoupon},null,8,["coupon","is-new","onUpdateCoupon"]),C(w,{ref:"coupondelModal","temp-items":e.tempCoupon,onDeleteData:d.deleteCoupon,id:3},null,8,["temp-items","onDeleteData"]),C(v,{pages:e.pagination,onEmitPages:d.getCoupons},null,8,["pages","onEmitPages"])])])}const Uo=g(to,[["render",bo]]);export{Uo as default};