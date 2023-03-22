<template>
  <div class="container py-8">
    <loading v-model:active="isLoading"></loading>
    <h2 class="text-center text-primary mb-7 fw-bold">購物車列表</h2>
    <div class="row justify-content-center flex-column flex-md-row mb-4">
      <template v-if="carts.carts?.length">
        <div class="col-md-6">
          <router-link to="/products">回商品列表</router-link>
          <div class="row bg-white p-2">
            <!-- <div class="col-12 mb-3">
              <div class="row">
                <div class="d-flex align-items-center text-center shadow-sm fw-bold">
                  <span class="col-2 d-block">商品圖片</span>
                  <p class="col-2 mb-0 d-block">商品名稱</p>
                  <span class="col-2 d-block">售價</span>
                  <span class="col-2 d-block">數量</span>
                  <span class="col-3 d-block">金額</span>
                  <span class="col-1 d-block"></span>
                </div>
              </div>
            </div> -->
            <div class="col-12 mb-3">
              <!-- <div class="row"> -->
                <div class="text-end">
                  <button class="btn btn-outline-danger" type="button" @click="clearCart"
                    :disabled="loadingItem === 'deleteAll'">
                    <i class="fas fa-spinner fa-pulse" v-if="loadingItem === 'deleteAll'"></i>
                    清空購物車
                  </button>
                </div>
              <!-- </div> -->
            </div>
            <div class="col-12">
              <div class="row d-flex shadow-sm mb-3" v-for="item in carts.carts" :key="item.id">
                <div class="col-4 col-md-4">
                  <img class="object-fit w-100 img-fluid" :src="item.product.imageUrl" alt="">
                </div>
                <div class="col-8 col-md-8">
                  <div class="row mb-4">
                    <div class="col-12 mb-0 position-relative">{{ item.product.title }}
                      <div class="col-2 position-absolute top-0 end-0"><a class="d-block" href="#" @click.prevent="() => deleteItem(item)"
                          :disabled="item.id === loadingItem"><span class="material-icons fs-2">delete</span></a>
                      </div>
                    </div>
                  </div>
                    <select name="" id="" class="form-select col-10" v-model="item.qty" @change="() => updateCartItem(item)"
                              :disabled="item.id === loadingItem">
                      <option :value="i" v-for="i in 5" :Key="i + '45678'">{{ i }}</option>
                    </select>
                    <span class="col-12 d-block">{{ $filters.currency(item.product.price) }}</span>
                </div>
              </div>
            </div>
            <div class="col-12 mb-6">
              <div class="d-flex justify-content-end align-items-center shadow-sm">
                <span class="fs-4 me-6">總金額</span>
                <span class="fs-5 text-end me-2">{{ $filters.currency(carts.total) }}</span>
              </div>
            </div>
            <div class="col-12 d-flex justify-content-end">
              <router-link to="/order" class="btn btn-primary">確認訂單</router-link>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="text-center">目前購物車為空的狀態喔!，再去選購吧~</p>
      </template>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cart'
import status from '../../stores/statusStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      // loadingItem: '',
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        msg: ''
      },
      total: 0
      // isLoading: false
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapState(cartStore, ['carts', 'final_total', 'isLoading', 'loadingItem']),
    ...mapState(status, ['isLoading'])
  },
  methods: {
    // deleteItem (item) {
    //   this.loadingItem = item.id
    //   const loader = this.$loading.show()
    //   this.$http.delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${item.id}`)
    //     .then((res) => {
    //       console.log(res)
    //       this.loadingItem = ''
    //       loader.hide()
    //       alert('該商品已經清空')
    //       this.getCarts()
    //     }).catch((err) => {
    //       alert(err.response.data.message)
    //     })
    // },
    // getCarts () {
    //   const loader = this.$loading.show()
    //   this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`)
    //     .then(res => {
    //       console.log(res)
    //       this.products = res.data.products
    //       this.cart = res.data.data.carts
    //       loader.hide()
    //     })
    //     .catch((err) => {
    //       alert(err.response.data.message)
    //     })
    // },
    ...mapActions(cartStore, ['getCarts', 'deleteItem', 'updateCartItem', 'clearCart']),
    changeLoading (modalLoading) {
      this.loadingItem = modalLoading
    },
    sendOrder () {
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
        this.$http.post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/order`, { data })
          .then(res => {
            this.getCarts()
            this.loadingItem = ''
            this.$refs.form.resetForm()
            alert('訂單已送出')
          }).catch((err) => {
            alert(err.response.data.message)
          })
      }
    },
    validateTelephone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的手機號碼'
    }

  },
  mounted () {
    // this.isLoading = true
    this.getCarts()
  }

}
</script>
