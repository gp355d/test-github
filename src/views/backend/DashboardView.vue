<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap ps-3 shadow">
    <div class="col-md-3 col-lg-12 me-0">
      <a href="#">
        <img src="../../assets/images/slogo.svg" alt="" height="50">
      </a>
    </div>
    <button class="navbar-toggler position-absolute d-md-none" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="true" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">

      </div>
    </div>
  </header>
  <div class="container-fluid">
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse" v-if="checkSuccess">
        <div class="position-sticky pt-3">
          <ul class="nav flex-column">
            <h2>請選擇功能</h2>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/products">商品管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/orders">訂單管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/coupons">優惠券管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/admin/articles">文章管理</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">回前台首頁</router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" @click="logout">登出</a>
            </li>
          </ul>
        </div>
      </nav>
      <router-view v-if="checkSuccess"></router-view>
  </div>
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
      const loader = this.$loading.show()
      this.$http.post(`${VITE_APP_URL}api/user/check`)
        .then((res) => {
          if (!res.data.success) {
            alert(res.data.message)
            loader.hide()
            this.$router.push('/login')
          } else {
            this.checkSuccess = true
            loader.hide()
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
