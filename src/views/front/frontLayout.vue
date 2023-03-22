<template>
    <div class="gg container-fluid">
          <div class="wrapper">
            <NavbarCompoment :num="cartNUm"></NavbarCompoment>
            <router-view></router-view>
            <footerCompoment></footerCompoment>
          </div>
    </div>

  <!-- </div> -->
</template>
<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../../stores/cart'
import NavbarCompoment from '../../components/NavbarCompoment.vue'
import footerCompoment from '../../components/FooterCompoment.vue'
export default {
  components: {
    NavbarCompoment,
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
