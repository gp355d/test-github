<template>
  <div id="delProductModal" ref="modal" class="modal fade" tabindex="-1"
      aria-labelledby="delProductModalLabel" aria-hidden="true">
    <div class="modal-dialog">
     <div class="modal-content border-0">
       <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除{{ state }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          是否刪除
          <template v-if="id===2">
            <strong class="text-danger">{{tempItems?.id}}</strong>{{ state }}(刪除後將無法恢復)。
          </template>
          <template v-else>
            <strong class="text-danger">{{tempItems?.title}}</strong>{{ state }}(刪除後將無法恢復)。
          </template>
       </div>
       <div class="modal-footer">
         <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
           取消
         </button>
         <button type="button" class="btn btn-danger" @click="() =>$emit('delete-data')">
           確認刪除
         </button>
       </div>
     </div>
    </div>
    </div>
  </template>

<script>

import mixin from '../mixins/mixin'
export default {
  data () {
    return {
      tempProduct: {
      },
      modal: {},
      state: ''
    }
  },
  props: ['tempItems', 'id'],
  mixins: [mixin],
  mounted () {
    console.log('1', typeof this.id)
    if (this.id === 1) {
      this.state = '商品'
    } else if (this.id === 2) {
      this.state = '訂單'
    } else if (this.id === 3) {
      this.state = '優惠券'
    } else if (this.id === 4) {
      this.state = '文章'
    }
  }
}
</script>
