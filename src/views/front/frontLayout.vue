<template>
  <NavbarCompoment :num="cartNUm"></NavbarCompoment>
  <!-- <BannerCompoment></BannerCompoment> -->
    <div class="container-">
            <router-view></router-view>
            <footerCompoment></footerCompoment>
    </div>

  <!-- </div> -->
</template>
<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart'
import NavbarCompoment from '../../components/NavbarCompoment.vue'
import footerCompoment from '../../components/FooterCompoment.vue'
// import BannerCompoment from '../../components/BannerCompoment.vue'
export default {
  components: {
    NavbarCompoment,
    // BannerCompoment,
    footerCompoment
  },
  computed: {
    ...mapState(cartStore, ['cartNUm']) // 取用cart store內的狀態資料(資料)
  },
  methods: {
    ...mapActions(cartStore, ['getCarts'])
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style>

</style>
