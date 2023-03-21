<template>
  <div class="container-fluid">
    <NavbarCompoment :num="cartNUm"></NavbarCompoment>
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
export default {
  computed: {
    ...mapState(cartStore, ['carts', 'cartNUm']) // 取用cart store內的狀態資料(資料)
  },
  methods: {
    ...mapActions(cartStore, ['getCarts']) // 取用cart store內的狀態資料(方法)
  },
  components: {
    NavbarCompoment,
    footerCompoment
  },
  mounted () {
    this.getCarts()
  }
}
</script>
<style>

</style>
