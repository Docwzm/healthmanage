<template>
  <div class="main">
    <div class="upload">
      <a-upload :fileList="fileList" :remove="handleRemove" :beforeUpload="beforeUpload">
        <a-button :disabled="fileList.length
        !== 0"> <a-icon type="upload" />{{ $t('batchExport.upload') }}</a-button>
      </a-upload>
      <div :style="styleObject">
        <a-progress :percent='percent' />
      </div>
    </div>
    <div class="first-sentence">
      <span class="first-sentence-text">{{ $t('batchExport.please') }}</span>
      <a-icon type="download" class="down-excel" @click="downExcelTemplate"/>
      <span class="down-excel" @click="downExcelTemplate">{{ $t('batchExport.downTemplate')}}</span>，
      <span class="first-sentence-text">{{ $t('batchExport.ruel') }}</span>
    </div>
    <div class="notice">
      {{ $t('batchExport.notice') }}:
    </div>
    <div class="first-sentence">
      1.{{ $t('batchExport.noticeOne') }}
    </div>
    <div class="first-sentence">
      2.{{ $t('batchExport.noticeTwo') }}
    </div>
    <p style="border-bottom: solid 1px rgba(0,0,0,0.09);padding-top: 10px;
"></p>
    <a-row :class="isActive ? 'user-row' : 'user-row-up' ">
      <a-button type="primary"  style="width: 65px; height: 36px;"
                @click="handleUpload"
                :disabled="fileList.length === 0"
      >{{ $t('batchExport.export') }}</a-button>
    </a-row>
  </div>
</template>

<script>
import { downTemplate, uploadExcel } from "../../../api/organization";
import mixin from '@/common/js/mixin'
import { Bus } from '../../../main'

export default {
  mixins: [mixin],
  data() {
    return {
      fileList: [],
      uploading: false,
      percent: 0,
      styleObject: {
        display: 'none'
      },
      isActive: true,
    }
  },
  methods: {
    downExcelTemplate() {
      downTemplate()
        .then(res => {
          let blob = res.data;
          let reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            let a = document.createElement('a');
            a.download = `${this.$t('downloadExcel.excelName[1]')}.xlsx`;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
          this.$emit('closeModal');
          this.showNotice(`${this.$t('systemNotice.download[0]')}`);
        })
        .catch(err => {
          this.showNotice(`${this.$t('systemNotice.download[1]')}`);
          this.$emit('completeDown');
        });
    },

    handleRemove(file) {
      Bus.$emit('changeStyle', 'no');
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },

    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      let fileSuffix = '';
      this.fileList.forEach(item => {
        fileSuffix = item.name.replace(/.+\./, "");
      });
      if (fileSuffix !== 'xlsx') {
        this.showNotice(`${this.$t('systemNotice.upload[2]')}`);
        this.handleRemove(file);
      } else {
        Bus.$emit('changeStyle', 'yes');
      }
      return false;
    },
    handleUpload() {
      this.$emit('startUpload');
      const { fileList } = this;
      const formData = new FormData();
      this.styleObject.display = '';
      fileList.forEach(file => {
        formData.append('file', file);
      });
      this.uploading = true;
      let completePercent = 0;
      let timer = setInterval(() => {
        completePercent++;
        if (completePercent >= 99) {
          clearInterval(timer);
        }
        this.percent = completePercent
      }, 30);
      uploadExcel(formData).then(res => {
        if (!res.data.status) {
          this.styleObject.display = 'none';
          this.showNotice(`${this.$t(`systemNotice.systemCode[${res.data.code}]`)}`);
          this.handleRemove(fileList);
          this.percent = 0;
        } else {
          this.percent = 100;
          setTimeout(() => {
            this.$emit('closeModal');
            this.$emit('updateList');
            this.showNotice(`${this.$t('systemNotice.upload[0]')}`);
          }, 1000)
        }
      }).catch(err => {
        this.uploading = false;
        this.showNotice(`${this.$t('systemNotice.upload[1]')}`);
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  .main {
    width 100%
    height 105px
    padding-top  20px;
    .upload {
      padding-left 19px;
    }
    .up-excel {
      width 135px;
      height 32px;
      cursor pointer
      background rgba(255,255,255,1);
      border-radius 4px;
      border 1px solid rgba(134,141,170,0.5);
      .up-text-style {
        padding-left 10px;
        padding-top 4px;
        height 22px;
        font-size 14px;
        font-family PingFangSC-Regular,PingFang SC;
        font-weight 400;
        color rgba(79,89,131,1);
        line-height 22px;
      }
    }
    .user-row {
      text-align: center;
      padding-top: 10px;
    }
    .user-row-up {
      text-align: center;
      padding-top: 10px;
    }
    .first-sentence {
      width 435px;
      padding-top 10px;
      padding-left 19px;
      .first-sentence-text {
        font-size 14px;
        font-family PingFangSC-Regular,PingFang SC;
        font-weight 400;
        color rgba(0,0,0,0.65);
        line-height 14px;
      }
    }
    .down-excel {
      font-size 14px;
      font-family PingFangSC-Regular,PingFang SC;
      font-weight 400;
      color rgba(24,144,255,1);
      line-height 20px;
      cursor pointer;
    }
    .notice {
      padding-left 19px;
      padding-top 14px;
      font-size 16px;
      font-family PingFangSC-Medium,PingFang SC;
      font-weight 500;
      color rgba(0,0,0,0.85);
      line-height 20px;
    }
  }
</style>
