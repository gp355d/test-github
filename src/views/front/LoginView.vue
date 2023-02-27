<template>
  <div class="container">
    <div class="row justify-content-center mt-3">
      <div class="col-6">
        <h1>請先登入</h1>
        <form id="form" class="form-signin" @submit.prevent="check">
          <div class="form-floating mb-3">
            <!-- v-model="user.username"綁定data的資料 -->
            <input type="email" class="form-control" id="username"
              placeholder="name@example.com" required autofocus v-model="user.username">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password"
              placeholder="Password" required v-model="user.password">
            <label for="password">Password</label>
          </div>
          <div class="text-center">
            <button class="btn btn-lg btn-primary mt-3 text-nowrap" type="submit">
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    check () {
      this.$http.post(`${VITE_APP_URL}admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data
          document.cookie = `mytoken=${token}; expires=${new Date(expired)};`// 將存取到的token存入cookie
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    document.title = this.$route.meta.title
  }
}
</script>
