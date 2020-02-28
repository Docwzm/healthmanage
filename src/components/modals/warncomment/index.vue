<template>
  <div class="main">
    <a-textarea :placeholder="$t('warnComment.inputDealMark')" :rows="4"
                class="comment"
                ref="comment"/>
    <a-row class="btn-row">
      <a-button @click="save">{{ $t('warnComment.save') }}</a-button>
    </a-row>
  </div>
</template>

<script>
import { warnDeal } from "../../../api/warn";
import mixin from '../../../common/js/mixin'

export default {
  mixins: [mixin],
  props: {
    commentId: {
      type: Array,
      default: []
    }
  },
  mounted() {
  },
  methods: {
    save() {
      let comment = this.$refs.comment.$el.value;
      warnDeal({
        warnId: "this.commentId",
        type: "1",
        dealNote: "comment"
      }).then(res => {
        this.showNotice(`${this.$t('dealwarn.dealSucess')}`);
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      });
      this.$emit('successDeal');
    }
  }
}
</script>

<style scoped lang="stylus">
  .main{
    .comment{
      resize none
    }
    .btn-row{
      text-align center
      margin-top 15px
    }
  }
</style>
