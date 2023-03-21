import { defineStore } from 'pinia'
const statusStore = defineStore('status', {
  state: () => {
    return {
      loadingItem: '',
      isLoading: false
    }
  }
})
export default statusStore
