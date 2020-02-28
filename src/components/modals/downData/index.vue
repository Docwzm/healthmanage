<template>
  <div class="main">
    <div>
      <p style="padding-bottom: 30px">{{ $t('healthanalysis.chooseType') }}</p>
      <a-radio-group @change="onChange" v-model="value" v-for="(type, key) in downType" :key="key">
        <a-radio :value="key" style="padding-right: 70px;">{{type}}</a-radio>
      </a-radio-group>
    </div>
    <a-row class="user-row" style="margin-top: 10px; padding-left: 280px; width: 480px;">
      <a-button @click="closeModal">{{ $t('healthanalysis.cancel') }}</a-button>
      <a-button type="primary" @click="startDownload">{{ $t('healthanalysis.confirm') }}</a-button>
    </a-row>
  </div>
</template>

<script>
import { exportData } from "../../../api/organization"
import mixin from '@/common/js/mixin'

export default {
  mixins: [mixin],
  props: ["downInfo"],
  data() {
    return {
      downType: {
        '.CSV': '.CSV',
        '.XLS': '.XLS',
        '.XLSX': '.XLSX'
      },
      value: '.XLS',
    }
  },
  mounted() {
    this.downInfo.params.type = '.xls';
  },
  methods: {
    onChange(e) {
      this.downInfo.params.type = (e.target.value).toLocaleLowerCase();
    },
    // 开始下载
    startDownload() {
      let fileName = this.downInfo.fileName + this.downInfo.params.type;
      let url = this.downInfo.downloadUrl;
      let params = this.downInfo.params;
      exportData(url, params).then(res => {
        let blob = res.data;
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (e) => {
          let a = document.createElement('a');
          a.download = fileName;
          a.href = e.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
        this.$emit('closeModal');
        this.showNotice(`${this.$t('systemNotice.download[0]')}`);
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.download[1]')}`);
        this.$emit('completeDown');
      });
    },
    // 关闭modal
    closeModal() {
      this.$emit('closeModal')
    }
  }

}
</script>

<style lang="stylus" scoped>
  .main {
    width 439px
    height 103px
  }
</style>
