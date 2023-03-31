import{d as c}from"./pinia-7d28dea6.js";import{a as i}from"./axios-08622986.js";import{S as e}from"./sweetalert2-fc38d252.js";import{s as l}from"./statusStore-fedbabd5.js";const d=l(),{VITE_APP_URL:r,VITE_APP_PATH:n}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"leo533",BASE_URL:"/test-github/",MODE:"production",DEV:!1,PROD:!0},g=c("cart",{state:()=>({carts:[],cartNUm:0,total:0,final_total:0,loadingItem:"",isLoading:!1}),actions:{getCarts(){d.isLoading=!0,i.get(`${r}v2/api/${n}/cart`).then(t=>{const{data:a}=t.data;this.carts=a,this.cartNUm=a.carts.length,this.total=t.data.data.total,this.final_total=t.data.data.final_total,d.isLoading=!1})},addToCart(t,a=1){const o={data:{product_id:t,qty:a}};this.loadingItem=t+"1",i.post(`${r}v2/api/${n}/cart`,o).then(s=>{console.log(s),this.getCarts(),e.fire({position:"top-end",icon:"success",title:s.data.message,showConfirmButton:!1,timer:1500}),this.loadingItem=""}).catch(s=>{console.log(s.res.data),e.fire({position:"top-end",icon:"error",title:s.response.data.message,showConfirmButton:!1,timer:1500})})},clearCart(){this.loadingItem="deleteAll",i.delete(`${r}v2/api/${n}/carts`).then(t=>{this.getCarts(),this.loadingItem="",e.fire({position:"top-end",icon:"success",title:"購物車已清空",showConfirmButton:!1,timer:1500})}).catch(t=>{e.fire({position:"top-end",icon:"error",title:t.response.data.message,showConfirmButton:!1,timer:1500})})},updateCartItem(t){const a={product_id:t.product.id,qty:t.qty};this.loadingItem=t.id,i.put(`${r}v2/api/${n}/cart/${t.id}`,{data:a}).then(o=>{this.getCarts(),this.loadingItem="",e.fire({position:"top-end",icon:"success",title:o.data.message,showConfirmButton:!1,timer:1500})}).catch(o=>{alert(o.response.data.message)})},deleteItem(t){this.loadingItem=t.id,i.delete(`${r}v2/api/${n}/cart/${t.id}`).then(a=>{e.fire({position:"top-end",icon:"success",title:`該商品${a.data.message}`,showConfirmButton:!1,timer:1500}),this.getCarts()}).catch(a=>{e.fire({position:"top-end",icon:"error",title:a.response.data.message,showConfirmButton:!1,timer:1500})})}}});export{g as c};
