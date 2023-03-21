import { defineStore, mapActions } from 'pinia'
import cartStore from '../stores/cart'
import statusStore from '../stores/statusStore'
import axios from 'axios'
import Swal from 'sweetalert2'
const status = statusStore()
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
const productStore = defineStore('product', {
  state: () => {
    return {
      tempProducts: [],
      followList: {
        id: [],
        list: []
      },
      productsAll: [],
      category: '',
      categories: [],
      isLoading: false
      // cartNum: 1
    }
  },
  actions: {
    // get carts
    ...mapActions(cartStore, ['addToCart']),
    getProductAll () {
      status.isLoading = true
      axios
        .get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/products/all`)
        .then((res) => {
          this.productsAll = res.data.products
          this.tempProductsall(this.productsAll)
          this.createCategories()
          status.isLoading = false
        })
        .catch((err) => {
          console.log(err)
          alert(err.response)
        })
    },
    createCategories () {
      if (this.productsAll.length !== 0) {
        const categoriesMap = this.productsAll.map((item) => item.category)
        this.categories = [...new Set(categoriesMap)]
      }
    },
    setCategory (category = '') {
      this.category = category
    },
    tempProductsall (products) {
      this.tempProducts = products
      this.getid()
      this.checkCollection()
    },
    getid () {
      this.followList.id = JSON.parse(localStorage.getItem('followId')) || []
    },
    checkCollection () {
      this.followList.list = []
      console.log(this.tempProducts)
      this.tempProducts.forEach((item) => {
        // console.log(item)
        // console.log(this.followList.id.indexOf(item.id))
        if (this.followList.id.indexOf(item.id) > -1) { // 未加入
          this.followList.list.push(item)
        }
      })
      // console.log('hh', this.followList.list)
    },
    // addToCart (productId, qty = 1) {
    //   const data = {
    //     data: {
    //       product_id: productId,
    //       qty
    //     }
    //   }
    //   axios.post(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/cart`, data).then((res) => {
    //     console.log(res)
    //     getCart.getCarts()
    //   })
    // },
    addtoFollow (id) {
      // console.log(this.followList.id)
      const follwId = this.followList.id.indexOf(id)
      if (follwId === -1) {
        this.followList.id.push(id)
        // alert('已收藏')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '已收藏',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        this.followList.id.splice(follwId, 1)
        // alert('取消收藏')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '取消收藏',
          showConfirmButton: false,
          timer: 1500
        })
      }
      localStorage.setItem('followId', JSON.stringify(this.followList.id))
      // this.tempProductsa(this.product)
      this.getProductAll()
      // console.log(this.product)
      // console.log(this.followList.list, this.product)
    }
  }
})
export default productStore
