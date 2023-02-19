<template>
  這是產品列表
  <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">名稱</th>
      <th scope="col">圖片</th>
      <th scope="col">連結</th>
      <th scope="col">功能</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in product" :key="product.id">
      <th scope="row">1</th>
      <td>{{ product.title }}</td>
      <td><img :src="`${product.imageUrl}`" alt="" width="200"></td>
      <td>
        <router-link :to="`/product/${product.id}`" class="btn btn-outline-secondary">連結</router-link>
      </td>
      <td>
        <button type="button" class="btn btn-outline-primary" @click="addToCart(product.id)" :disabled="loadingItem === product.id+'1'">
          加入購物車
          <i class="fas fa-spinner fa-pulse" v-if="loadingItem === product.id+'1'"></i>
        </button>
      </td>
    </tr>
  </tbody>
</table>
</template>

<script>

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      product: [],
      loadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`).then((res) => {
        this.product = res.data.products
      })
    },
    addToCart (id) {
      this.loadingItem = id + '1'
      const data = {
        product_id: id,
        qty: 1
      }
      this.$http.post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`, { data }).then((res) => {
        this.loadingItem = ''
      })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
