<template>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div class="row py-3">
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="() => openModal('new')">
          建立新的優惠券
        </button>
      </div>
      <div class="table-responsive">
        <table class="table mt-4">
        <thead>
        <tr>
          <th>名稱</th>
          <th class="text-nowrap">折扣百分比</th>
          <th>到期日</th>
          <th class="text-nowrap">是否啟用</th>
          <th>操作行為</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, i) in coupons" :key="i">
          <td class="text-nowrap">{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ $filters.date(item.due_date) }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未啟用</span>
          </td>
          <td class="text-nowrap">
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm"
                      @click="() => openModal('edit', item)"
              >編輯</button>
              <button class="btn btn-outline-danger btn-sm"
                      @click="() => openDelmodal(item)"
              >刪除</button>
            </div>
          </td>
        </tr>
        </tbody>
        </table>
      </div>
      <CouponsModal ref="couponModal" :coupon="tempCoupon" :is-new="isNew" @update-coupon="updateCoupon"></CouponsModal>
      <DelModal ref="coupondelModal" :temp-items="tempCoupon" @delete-data="deleteCoupon" :id=3></DelModal>
      <Pagination :pages="pagination" @emitPages="getCoupons"></Pagination>
    </div>
  </main>
</template>

<script>
import CouponsModal from '../../components/CouponsModal.vue'
import DelModal from '../../components/DelModal.vue'
import Pagination from '../../components/PaginationView.vue'

import Swal from 'sweetalert2'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  data () {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      pagination: {}
    }
  },
  methods: {
    getCoupons (page = 1) {
      const loader = this.$loading.show()
      this.$http.get(`${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/coupons/?page=${page}`).then((res) => {
        this.coupons = res.data.coupons
        this.pagination = res.data.pagination
        loader.hide()
      }).catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        loader.hide()
      })
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000
        }
        this.isNew = true
      } else if (status === 'edit') {
        this.tempCoupon = { ...item }
        this.isNew = false
      }
      this.$refs.couponModal.openModal()
    },
    openDelmodal (item) {
      this.tempCoupon = { ...item }
      const CoupondelComponent = this.$refs.coupondelModal
      CoupondelComponent.openModal()
    },
    updateCoupon (tempCoupon) {
      if (tempCoupon.percent > 100 || tempCoupon.percent <= 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: '折扣百分比不能為負值或100以上',
          showConfirmButton: false,
          timer: 1500
        })
        return 0
      }
      let url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/coupon`
      let httpMethos = 'post'
      let data = tempCoupon

      if (!this.isNew) {
        url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
        httpMethos = 'put'
        data = this.tempCoupon
      }

      this.$http[httpMethos](url, { data }).then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.getCoupons()
        this.$refs.couponModal.hideModal()
      }).catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    },
    deleteCoupon () {
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/coupon/${this.tempCoupon.id}`
      this.$http.delete(url).then((res) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500
        })
        const delComponent = this.$refs.coupondelModal
        delComponent.hideModal()
        this.getCoupons()
      }).catch((err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.response.data.message,
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  },

  components: {
    CouponsModal,
    DelModal,
    Pagination
  },
  mounted () {
    this.getCoupons()
    document.title = this.$route.meta.title
  }
}
</script>
