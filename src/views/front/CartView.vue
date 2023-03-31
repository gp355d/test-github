<template>
  <div class="container py-8">
    <loading v-model:active="isLoading"></loading>
    <h2 class="text-center text-primary mb-7 fw-bold">購物車列表</h2>
    <div class="row g-0 g-md-3 g-lg-4 justify-content-center flex-column flex-md-row mb-4">
      <template v-if="carts.carts?.length">
        <div class="pt-4 pb-3">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-9 col-md-7 timeline">
          </div>
        </div>
        <div class="row">
          <div class="col-3 col-md-5">
            <div class="timeline-pointer text-center step-1 active">
              <p>購物清單確認</p>
            </div>
          </div>
          <div class="col-6 col-md-2">
            <div class="timeline-pointer text-center step-2">
              <p>填寫訂單</p>
            </div>
          </div>
          <div class="col-3 col-md-5">
            <div class="timeline-pointer text-center step-3">
              <p>購物完成</p>
            </div>
          </div>
        </div>
      </div>
    </div>
        <div class="col-md-6">
          <router-link to="/products" class="d-flex align-items-center text-decoration-none">
            <span class="material-icons">keyboard_return</span>
            回商品列表
          </router-link>
          <div class="row g-0 g-md-3 g-lg-4 bg-white p-2">
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
            <div class="col-12 noto-serif-font">
              <div class="row g-4 d-flex shadow-sm mb-3" v-for="item in carts.carts" :key="item.id">
                <div class="col-4 d-flex align-items-center">
                  <img class="object-fit w-100 img-fluid" :src="item.product.imageUrl" alt="">
                </div>
                <div class="col-8 d-flex flex-column justify-content-center">
                  <div class="row g-4 mb-4">
                    <div class="col-12 mb-0 position-relative fs-5 fw-bold">{{ item.product.title }}
                      <div class="col position-absolute top-0 end-0"><a href="#" @click.prevent="() => deleteItem(item)"
                          :disabled="item.id === loadingItem"><span class="material-icons fs-2">delete</span></a>
                      </div>
                    </div>
                  </div>
                  <div class="row g-4 d-flex justify-content-between">
                    <span class="col-4 d-block fs-3 text-danger fw-bold">{{ $filters.currency(item.product.price) }}</span>
                    <select name="product-number" id="" class="form-select w-50" v-model="item.qty" @change="() => updateCartItem(item)"
                              :disabled="item.id === loadingItem">
                      <option :value="i" v-for="i in 10" :Key="i + '45678'">{{ i }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-6">
              <div class="d-flex justify-content-end align-items-center shadow-sm">
                <span class="fs-4 me-6">總金額</span>
                <span class="fs-5 text-end me-2 text-danger fw-bold noto-serif-font">{{ $filters.currency(carts.total) }}</span>
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

<style lang="scss">
$primary: #46633D;

.timeline {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 9px;
    width: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #C1C1C1;
  }
   &::before {
    content: "";
    position: absolute;
    top: 9px;
    width: 50%;
    left: 50;
    right: 0;
    height: 2px;
    background-color: #C1C1C1;
  }
  &-pointer {
    position: relative;
    color: #c1c1c1;
    p {
      padding-top: 24px;
      margin-bottom: 0;
      line-height: 1.5;
    }
    &::before {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 20px;
      height: 20px;
      border: 1px solid #fff;
      border-radius: 50%;
      background-color: #C1C1C1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      z-index: 1;
    }
    &.step-1::before {
      content: '1';
    }
    &.step-2::before {
      content: '2';
    }
    &.step-3::before {
      content: '3';
    }
    &.active {
      color: $primary;
      &::before {
        color: #FFFFFF;
        background-color: $primary;
        border-color: $primary;
      }
    }
  }
}
</style>
