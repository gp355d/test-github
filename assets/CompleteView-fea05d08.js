import{S as a}from"./sweetalert2-fc38d252.js";import{aM as u,aC as d,W as c,X as s,a3 as f,bj as v,F as g,aK as b,aZ as t,bo as x,a1 as w,a2 as y}from"./@vue-a2e6aab2.js";import{_ as P}from"./index-90e19ebd.js";import"./@ckeditor-b092e1d3.js";import"./vue-71628d3f.js";import"./pinia-7d28dea6.js";import"./vue-demi-71ba0ef2.js";import"./vue-router-49be82a2.js";import"./axios-08622986.js";import"./vue-axios-58a7c26f.js";import"./vue-loading-overlay-67898897.js";import"./bootstrap-8396874d.js";import"./@popperjs-9847b28c.js";import"./vee-validate-aa725db8.js";import"./@vee-validate-55db0f47.js";const{VITE_APP_URL:_,VITE_APP_PATH:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"leo533",BASE_URL:"/test-github/",MODE:"production",DEV:!1,PROD:!0},V={data(){return{order:{products:[],user:{}}}},methods:{getOrder(){const o=this.$route.params.order_id,n=this.$loading.show();this.$http.get(`${_}v2/api/${p}/order/${o}`).then(i=>{const{order:l}=i.data;this.order=l,n.hide()}).catch(i=>{a.fire({position:"top-end",icon:"error",title:i.response.data.message,showConfirmButton:!1,timer:1500})})},pay(){const o=this.$route.params.order_id,n=this.$loading.show();this.$http.post(`${_}v2/api/${p}/pay/${o}`).then(i=>{console.log(i),this.getOrder(),n.hide(),a.fire({position:"top-end",icon:"success",title:i.data.message,showConfirmButton:!1,timer:1500})})}},mounted(){this.getOrder()}},k={class:"container py-8"},E=w('<h2 class="text-center text-primary fw-bold mb-7">訂購完成</h2><div class="pt-4 pb-3"><div class="container"><div class="row justify-content-center"><div class="col-9 col-md-7 timeline"></div></div><div class="row"><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-1 active"><p>購物清單確認</p></div></div><div class="col-6 col-md-2"><div class="timeline-pointer text-center step-2 active"><p>填寫訂單</p></div></div><div class="col-3 col-md-5"><div class="timeline-pointer text-center step-3 active"><p>購物完成</p></div></div></div></div></div>',2),j={class:"row g-0 g-md-3 g-lg-4 justify-content-center flex-column flex-md-row"},A={class:"col-md-9 mb-3 d-flex flex-column justify-content-between"},C={class:"row g-0 g-md-3 g-lg-4"},T=s("p",null,"您已經完成本次購物，當確認訂購資訊無誤及付款完成後，我們將立即出貨，感謝您訂購商品",-1),$={class:"col-md-6"},B={class:"border p-2 mb-2 mb-md-0 h-100"},I=s("span",{class:"material-icons"},"keyboard_return",-1),O=s("h3",{class:"text-center fw-bold text-primary"},"訂單明細",-1),S=["src"],D={class:"col-3 fs-6 fs-md-4 mb-0 d-flex flex-nowrap p-2"},L={class:"col-3 fs-6 fs-md-4 text-end noto-serif-font"},N={class:"col-2 fs-6 fs-md-4 text-end"},R={class:"d-flex justify-content-between fs-5"},U=s("span",null,"總計",-1),M={class:"fw-bold noto-serif-font text-danger noto-serif-font"},F={class:"col-md-6 border py-2"},H={class:"row g-0 g-md-3 g-lg-4"},X={class:"col-12 mb-2"},q=s("h3",{class:"text-center text-primary fw-bold"},"顧客資訊",-1),K={class:"shadow-sm p-2"},W={class:""},Z=s("span",null,"姓名:",-1),z={class:""},G=s("span",null,"電話:",-1),J={class:""},Q=s("span",null,"Emai:",-1),Y={class:""},ss=s("span",null,"地址:",-1),ts={class:""},es=s("span",null,"備註:",-1),os={class:"col-12"},is=s("h3",{class:"text-center text-primary fw-bold"},"訂單資訊",-1),ns={class:"shadow-sm p-2"},rs={class:""},ds=s("span",null,"訂單狀態:",-1),cs={class:""},ls=s("span",null,"訂單編號:",-1),as={class:""},_s=s("span",null,"訂單金額:",-1),ps={class:"mb-2"},hs=s("span",null,"訂單成立時間:",-1),ms={class:"d-flex justify-content-center"},us={key:1};function fs(o,n,i,l,e,h){const m=u("router-link");return d(),c("div",k,[E,s("div",j,[s("div",A,[s("div",C,[T,s("div",$,[s("div",B,[f(m,{to:"/home",class:"d-flex align-items-center text-decoration-none"},{default:v(()=>[I,y(" 回首頁 ")]),_:1}),O,(d(!0),c(g,null,b(e.order.products,r=>(d(),c("div",{key:r.id,class:"d-flex align-items-center mb-4 shadow-sm p-2 noto-serif-font"},[s("img",{class:"col-4 object-fit img-fluid",src:r.product.imageUrl,alt:"",height:"50"},null,8,S),s("p",D,t(r.product.title),1),s("span",L,t(o.$filters.currency(r.product.price)),1),s("span",N,"X"+t(r.qty),1)]))),128)),s("div",R,[U,s("span",M,t(o.$filters.currency(e.order.total)),1)])])]),s("div",F,[s("div",H,[s("div",X,[q,s("div",K,[s("div",W,[Z,s("span",null,t(e.order.user.name),1)]),s("div",z,[G,s("span",null,t(e.order.user.tel),1)]),s("div",J,[Q,s("span",null,t(e.order.user.email),1)]),s("div",Y,[ss,s("span",null,t(e.order.user.address),1)]),s("div",ts,[es,s("span",null,t(e.order.message),1)])])]),s("div",os,[is,s("div",ns,[s("div",rs,[ds,s("span",null,t(e.order.is_paid?"付款完成":"尚未付款"),1)]),s("div",cs,[ls,s("span",null,t(e.order.id),1)]),s("div",as,[_s,s("span",null,t(o.$filters.currency(e.order.total)),1)]),s("div",ps,[hs,s("span",null,t(o.$filters.date(e.order.create_at)),1)]),s("div",ms,[e.order.is_paid!==!0?(d(),c("button",{key:0,type:"button",class:"btn btn-primary",onClick:n[0]||(n[0]=x(()=>h.pay(),["prevent"]))},"前往付款")):(d(),c("div",us))])])])])])])])])])}const Bs=P(V,[["render",fs]]);export{Bs as default};
