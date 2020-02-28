<template>
  <div class="main">
    <a-textarea :rows="4" class="sn"
      placeholder="批量输入设备SN号, 以英文逗号分隔"
                @change="changeText"
                ref="text"
    />
    <a-row type="flex" justify="center">
      <a-button class="save-btn" @click="save">保存</a-button>
    </a-row>
  </div>
</template>

<script>
import { addDevice } from "../../../api/equipmentmanage";
import mixin from '@/common/js/mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      text: '' // textarea的内容
    }
  },
  methods: {
    save() {
      const sn = this.text;
      if (sn === '') {
        this.showNotice('请传入设备sn号');
        return
      }
      addDevice(sn).then(res => {
        let sentence = '';
        if (res.list_bind.length > 0) {
          sentence += `编号${res.list_bind.join(',')}已存在`
        }
        if (res.list_notexist.length > 0) {
          let noxist = res.list_notexist.join(',');
          sentence += ` 编号${noxist}不存在`
        }
        if (res.list_bind.length === 0 && res.list_notexist.length === 0 ) {
          sentence += '添加成功'
        }
        this.showNotice(sentence);
        this.$emit('closeModal');
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    changeText(e) {
      this.text = e.target.value
    }
  }
}
</script>

<style scoped lang="stylus">
  .main{
    // textarea
    .sn{
      resize none
    }
    .save-btn{
      margin 10px auto
    }
  }
</style>
