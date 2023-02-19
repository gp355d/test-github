<template>
  這是後台頁面
  <div v-if="checkSuccess">
    <router-link to="/admin">後台首頁</router-link> |
    <router-link to="/admin/products">商品管理</router-link> |
    <router-link to="/admin/orders">訂單管理</router-link> |
    <router-link to="/">回前台首頁</router-link> |
    <a href="#" @click="logout">登出</a>
  </div>
    <router-view v-if="checkSuccess"></router-view>
</template>
<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      checkSuccess: false
    }
  },
  methods: {
    logout () {
      document.cookie = `mytoken=; expires=${new Date()};`
      this.$router.push('/login')
    },
    checkLogin () {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)mytoken\s*=\s*([^;]*).*$)|^.*$/, '$1')// 存取cookie
      this.$http.defaults.headers.common.Authorization = token
      this.$http.post(`${VITE_APP_URL}api/user/check`)
        .then((res) => {
          console.log(res)
          if (!res.data.success) {
            alert(res.data.message)
            this.$router.push('/login')
          } else {
            this.checkSuccess = true
            this.$router.push('/admin/products')
          }
        })
        .catch((err) => {
          alert(err)
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
