<template>
  <div class="modal" id="productModal" tabindex="-1" ref="modal">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">主要圖片</label>
                <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
              </div>
              <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status?.fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control" ref="fileInput" @change="uploadFile" />
              </div>
              <h3 class="mb-3">多圖新增</h3>
              <!-- 判斷傳入的值是否為array -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div class="mb-1" v-for="(img,i) in tempProduct.imagesUrl" :key="i">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[i]">
                  </div>
                  <img class="img-fluid" :src="img" alt="">
                  <div>
                    <button class="btn btn-outline-danger btn-sm d-block w-100"
                      @click="() =>tempProduct.imagesUrl.splice(i, 1)">
                      刪除圖片
                    </button>
                  </div>
                </div>
              </div>
              <!-- 當tempProducts.imagesUrl的資料筆數為0時的相反(當結果為true時) || tempProducts.imagesUrl[- 1]，當為新增資料時隱藏刪除按鈕，否則就顯現刪除按鈕-->
              <div v-if="!tempProduct?.imagesUrl?.length || tempProduct?.imagesUrl[tempProduct?.imagesUrl?.length - 1]">
                <button class="btn btn-outline-primary btn-sm d-block w-100" @click="() => tempProduct.imagesUrl.push('')">
                  新增圖片
                </button>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                    v-model="tempProduct.category">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price">
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                    v-model.number="tempProduct.price">
                </div>
              </div>
              <hr>

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <ckeditor id="description" class="form-control" :editor="editor" v-model="tempProduct.description" :config="editorConfig" placeholder="請輸入產品描述"></ckeditor>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <ckeditor id="content" class="form-control" :editor="editor" v-model="tempProduct.content" :config="editorConfig" placeholder="請輸入說明內容"></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                    v-model="tempProduct.is_enabled">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="() =>$emit('update-data')">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins/mixin'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
export default {
  props: {
    tempProducts: {
      type: Object,
      default () { return {} }
    },
    isNew: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempProduct: {
        description: '',
        content: ''
      },
      status: {},
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link']
      }
    }
  },
  methods: {
    uploadFile () {
      const uploadedFile = this.$refs.fileInput.files[0]
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const url = `${VITE_APP_URL}v2/api/${VITE_APP_PATH}/admin/upload`
      this.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        this.status.fileUploading = false
        if (res.data.success) {
          this.tempProduct.imageUrl = res.data.imageUrl
          this.$refs.fileInput.value = ''
        } else {
          this.$refs.fileInput.value = ''
        }
      }).catch((err) => {
        this.status.fileUploading = false
        console.log(err.response.data.message)
        alert(err.response.data.message)
      })
    }
  },
  emits: ['update-data'],
  mixins: [mixin],
  watch: {
    tempProducts () {
      this.tempProduct = this.tempProducts
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = []
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = ''
      }
    }
  }
}
</script>
