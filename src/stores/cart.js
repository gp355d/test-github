import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'
import statusStore from './statusStore'
const status = statusStore()
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const cartStore = defineStore('cart', {
  state: () => {
    return {
      carts: [],
      cartNUm: 0,
      total: 0,
      final_total: 0,
      loadingItem: '',
      isLoading: false

      // cartNum: 1
    }
  },
  actions: {
    // get carts
    getCarts () {
      // const loader = this.$loading.show()
      status.isLoading = true
      axios.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`).then((res) => {
        const { data } = res.data
        this.carts = data
        this.cartNUm = data.carts.length
        this.total = res.data.data.total
        this.final_total = res.data.data.final_total
        // loader.hide()
        status.isLoading = false
      })
    },

    addToCart (productId, qty = 1) {
      const data = {
        data: {
          product_id: productId,
          qty
        }
      }
      this.loadingItem = productId + '1'
      axios.post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`, data)
        .then((res) => {
          console.log(res)
          this.getCarts()
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
          this.loadingItem = ''
        }).catch((err) => {
          console.log(err.res.data)
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    clearCart () {
      this.loadingItem = 'deleteAll'
      axios.delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/carts`)
        .then(res => {
          this.getCarts()
          this.loadingItem = ''
          // alert('購物車已清空')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: '購物車已清空',
            showConfirmButton: false,
            timer: 1500
          })
        }).catch((err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        })
    },
    updateCartItem (item) { // 購物車的id,產品的id
      const data = {
        product_id: item.product.id,
        qty: item.qty
      }
      this.loadingItem = item.id
      axios.put(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
          this.getCarts()
          this.loadingItem = ''
          // alert('商品數量已更新！')
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500
          })
        }).catch((err) => {
          alert(err.response.data.message)
        })
    },
    deleteItem (item) {
      this.loadingItem = item.id
      // const loader = this.$loading.show()
      axios.delete(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then((res) => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `該商品${res.data.message}`,
            showConfirmButton: false,
            timer: 1500
          })
          this.getCarts()
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
})
export default cartStore
