<template>
    <!-- <div class="banner">
      <div class="banner-img d-flex align-items-center justify-content-center">
        <div class="d-flex flex-column justify-content-center align-items-center">

        </div>
      </div>
    </div> -->
    <div class="banner">
      <div class="banner-img" style="top:0; bottom:0; left:0; right:0; background-image: url('https://images.unsplash.com/photo-1522747776116-64ee03be1dad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
      background-position: center center; opacity: 0.8; z-index: 2;">
      <div class="container d-flex flex-column" style="min-height: 100vh;">
        <!-- <NavbarCompoment :num="cartNUm"></NavbarCompoment> -->
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <img src="../assets/images/slogo2.svg" alt="logo" width="124" class="mb-8">
            <h2 class="fs-4 mb-3 lh-29 fw-bold noto-serif-font">從田間到您家，新鮮無損</h2>
            <p class="fs-6 mb-0 fw-normal mb-6">細品茶香，品味生活的美好</p>
            <div class="d-grid">
              <router-link class="btn btn-primary" to="/products">購物去</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
// import NavbarCompoment from './NavbarCompoment.vue'
// import { mapState } from 'pinia'
// import cartStore from '../stores/cart'
export default {
  computed: {
    // ...mapState(cartStore, ['cartNUm']) // 取用cart store內的狀態資料(資料)
  },
  components: {
    // NavbarCompoment
  }
}
</script>

<style>
.banner{
  /* position: absolute; */
  top: 0;
  left: 0;
  /* width: 100%; */
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: 2;
}
</style>
