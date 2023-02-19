<template>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="clearCart" :disabled="loadingItem==='deleteAll'">
      <i class="fas fa-spinner fa-pulse" v-if="loadingItem==='deleteAll'"></i>
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
          <td>
            <button type="button" class="btn btn-outline-danger btn-sm" @click="deleteItem(item)" :disabled="item.id===loadingItem">
              <i class="fas fa-spinner fa-pulse" v-if="loadingItem===item.id"></i>
              x
            </button>
          </td>
          <td>
            {{ item.product.title }}
            <!-- <div class="text-success">
              已套用優惠券
            </div> -->
          </td>
          <td>
            <div class="input-group input-group-sm">
              <select name="" id="" class="form-select" v-model="item.qty" @change="updateCartItem(item)" :disabled="item.id===loadingItem">
                <option :value="i" v-for="i in 20" :Key="i+'45678'">{{i}}</option>
              </select>
              <!--<div class="input-group mb-3">
                <input min="1" type="number" class="form-control">
                <span class="input-group-text" id="basic-addon2">{{ }}</span>
              </div> -->
            </div>
          </td>
          <td class="text-end">
            <!-- <small class="text-success">折扣價：</small> -->
            {{ item.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total }}</td>
      </tr>
      <tr>
        <!-- <td colspan="3" class="text-end text-success">折扣價</td> -->
        <!-- <td class="text-end text-success">{{cart.final_Total }}</td> -->
      </tr>
    </tfoot>
  </table>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '',
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        msg: ''
      }
    }
  },
  methods: {
    getCarts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          console.log('購物車:', res)
          this.products = res.data.products
          this.cart = res.data.data
        })
    },
    updateCartItem (item) { // 購物車的id,產品的id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      console.log(data, item.id)
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          console.log('更新購物車清單:', res)
          this.getCarts()
          this.loadingItem = ''
        })
    },
    deleteItem (item) {
      this.loadingItem = item.id
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(res => {
          console.log('刪除項目:', res)
          this.getCarts()
          this.loadingItem = ''
          alert('該商品已經清空')
        })
    },
    clearCart () {
      if (this.cart.carts.length === 0) {
        alert('購物車清單內為空')
      } else {
        this.loadingItem = 'deleteAll'
        this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
          .then(res => {
            console.log('清空購物車:', res)
            this.getCarts()
            this.loadingItem = ''
            alert('購物車已清空')
          })
      }
    },
    changeLoading (modalLoading) {
      this.loadingItem = modalLoading
    },
    sendOrder () {
      console.log(this.cart.carts.length)
      if (this.cart.carts.length === 0) {
        alert('購物車清單內為空')
      } else {
        const data = {
          user: {
            name: this.form.name,
            email: this.form.email,
            tel: this.form.phone,
            address: this.form.address
          },
          message: this.form.msg
        }
        this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data })
          .then(res => {
            console.log('送出訂單:', res)
            this.getCarts()
            this.loadingItem = ''
            this.$refs.form.resetForm()
            alert('訂單已送出')
          })
      }
    },
    validateTelephone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的手機號碼'
    }

  },
  mounted () {
    this.getCarts()
  }

}
</script>
