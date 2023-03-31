<template>
  <div class="container py-8">
    <loading v-model:active="isLoading"></loading>
    <h2 class="text-center fw-bold text-primary mb-7">填寫訂單</h2>
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
            <div class="timeline-pointer text-center step-2 active">
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
  <div class="row g-0 g-md-3 justify-content-center flex-column flex-md-row">
    <div class="col-md-9 mb-3 d-flex flex-column justify-content-between">
      <div class="row g-0 g-md-3">
        <div class="col-md-6">
          <router-link to="/cart" class="d-flex align-items-center text-decoration-none">
            <span class="material-icons">keyboard_return</span>
            回購物車列表
          </router-link>
            <div class="border p-2 h-100">
              <h3 class="text-center fw-bold text-primary">訂單明細</h3>
              <div class="d-flex align-items-center mb-4 shadow-sm p-2" v-for="item in carts.carts" :key="item.id">
                <div class="col-4">
                  <img class="col-4 object-fit p-1 w-100 img-fluid" :src="item.product?.imageUrl" alt="order-img" height="150">
                </div>
                <div class="col-3">
                  <span class="fs-6 fs-md-4 mb-0">{{item.product?.title}}</span>
                </div>
                <div class="col-3 text-end">
                  <span class="fs-6 fs-md-4 noto-serif-font">{{$filters.currency(item.product?.price)}}</span>
                </div>
                <div class="col-2 text-end">
                  <span class="col-2 fs-6 fs-md-4">X{{item.qty}}</span>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <input type="text" class="form-control" v-model="couponCode">
                <button class="btn btn-primary text-nowrap" type="button" @click.prevent="() => sendCoupon(couponCode)">套用優惠碼</button>
              </div>
              <div class="d-flex justify-content-between fs-5">
                <span>總和</span>
                <template v-if="discoutStatus">
                  <span class="fw-bold noto-serif-font text-danger">{{$filters.currency(final_total)}}</span>
                </template>
                <template v-else>
                  <span class="fw-bold noto-serif-font text-danger">{{$filters.currency(total)}}</span>
                </template>
              </div>
            </div>
        </div>
        <div class="col-md-6">
          <v-form ref="form" v-slot="{ errors }" @submit="sendOrder">
            <div class="p-2">
              <h3 class="text-center fw-bold text-primary">顧客資訊</h3>
              <div class="mb-3">
                <label for="customer-name" class="form-label">姓名</label>
                <v-field type="text" name="姓名" class="form-control" id="customer-name" placeholder="請填寫姓名" :class="{ 'is-invalid': errors['姓名'] }" rules="required" v-model="form.name"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
              </div>
               <div class="mb-3">
                <label for="customer-emall" class="form-label">Email</label>
                <v-field type="email" name="信箱" class="form-control" id="customer-emall" placeholder="name@example.com" :class="{ 'is-invalid': errors['信箱'] }" rules="email|required" v-model="form.email"></v-field>
                <error-message name="信箱" class="invalid-feedback"></error-message>
              </div>
             <div class="mb-3">
                <label for="customer-phone" class="form-label">電話</label>
                <v-field type="tel" name="電話" class="form-control" id="customer-phone" placeholder="0912345678" :class="{ 'is-invalid': errors['電話'] }" :rules="validateTelephone" v-model="form.phone"></v-field>
                <error-message name="電話" class="invalid-feedback"></error-message>
              </div>
             <div class="mb-3">
                <label for="customer-address" class="form-label">地址</label>
                <v-field type="text" name="地址" class="form-control" id="customer-address" placeholder="請輸入地址" :class="{ 'is-invalid': errors['地址'] }" rules="required" v-model="form.address"></v-field>
                <error-message name="地址" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="customer-pay" class="form-label">付款方式</label>
                <v-field id="customer-pay" name="付款方式" class="form-control" :class="{ 'is-invalid': errors['付款方式'] }" rules="required" v-model="form.region" as="select">
                  <option value="" disabled>請選擇</option>
                  <option value="1">ATM</option>
                  <option value="2">Cradit Card</option>
                  <option value="3">samsung pay</option>
                </v-field>
                <error-message name="付款方式" class="invalid-feedback"></error-message>
              </div>
              <div class="mb-3">
                <label for="customer-note" class="form-label">備註</label>
                <textarea class="form-control" id="customer-note" rows="3" v-model="form.msg"></textarea>
              </div>
              <div class="text-end">
                <button type="submit" class="btn btn-primary">送出訂單</button>
              </div>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart'
import status from '../../stores/statusStore'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        phone: '',
        address: '',
        region: '',
        msg: ''
      },
      couponCode: '',
      discount: 0,
      discoutStatus: false
    }
  },
  computed: {
    ...mapState(cartStore, ['carts']), // 取用cart store內的狀態資料(資料)
    ...mapState(cartStore, ['final_total']), // cart總價
    ...mapState(cartStore, ['total', 'isLoading']),
    ...mapState(status, ['isLoading'])
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']), // 取用cart store內的狀態資料(方法)
    validateTelephone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '請輸入09開頭的手機號碼'
    },
    sendCoupon (code) {
      this.couponCode = code
      const coupon = {
        code: this.couponCode
      }
      console.log(coupon)
      this.$http.post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/coupon`, { data: coupon })
        .then((res) => {
          console.log(res)
          this.discoutStatus = res.data.success
          // this.final_total = res.data.final_total
          // alert(res.data.message)
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          // alert(err.response.data.message)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          return 0
        })
      this.couponCode = ''
    },
    sendOrder () {
      console.log(this.carts.length)
      if (this.carts.length === 0) {
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
        const loader = this.$loading.show()
        this.$http.post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/order`, { data })
          .then(res => {
            console.log('送出訂單:', res)
            this.getCarts()
            this.loadingItem = ''
            this.$refs.form.resetForm()
            // alert('訂單已送出')
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: '訂單已送出',
              showConfirmButton: false,
              timer: 1500
            })
            this.$router.push(`/complete/${res.data.orderId}`)
            loader.hide()
          }).catch((err) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500
            })
          })
      }
    }
  },
  components: {
    Loading
  },
  mounted () {
    this.getCarts()
  }
}
</script>
