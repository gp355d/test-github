<template>
  這是單一列表
  <h2>{{ product.title }}</h2>
  <img :src="`${product.imageUrl}`" alt="">
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      const loader = this.$loading.show()
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`).then((res) => {
        this.product = res.data.product
        loader.hide()
      }).catch((err) => {
        alert(err.response.data.message)
      })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
