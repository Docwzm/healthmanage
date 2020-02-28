<template>
  <div class="main">
    <a-row class="user-row" type="flex" justify="center">
      <a-col :span="4" class="ue-title">{{ $t('editUser.name') }}:</a-col>
      <a-col :span="14">
        <a-input ref="name" :defaultValue="info.name" class="user-input"/>
      </a-col>
    </a-row>

    <a-row class="user-row" type="flex" justify="center" :style="$i18n.locale === 'EN' ? 'margin-bottom: 30px;' : ''">
      <a-col :span="4" class="ue-title">{{ $t('editUser.hobit')}}:</a-col>
      <a-col :span="14">
        <a-row style="width: auto">
          <a-col :style="$i18n.locale === 'EN' ? 'text-align: left; margin-left: 69px;' : '' ">
            <a-checkbox @change="changeStatus($event,'isSmoke')" :defaultChecked="!!info.isSmoke">{{ $t('editUser.somke') }}</a-checkbox>
            <a-checkbox @change="changeStatus($event,'isDrink')" :defaultChecked="!!info.isDrink">{{ $t('editUser.dranik') }}</a-checkbox>
            <a-checkbox @change="changeStatus($event,'bloodPressure')" :defaultChecked="!!info.bloodPressure">{{ $t('editUser.highBlood') }}</a-checkbox>
            <a-checkbox @change="changeStatus($event,'bloodFat')" :defaultChecked="!!info.bloodFat">{{ $t('editUser.cholesterol') }}</a-checkbox>
            <a-checkbox @change="changeStatus($event,'bloodGlucose')" :defaultChecked="!!info.bloodGlucose">{{ $t('editUser.sugar') }}</a-checkbox>
          </a-col>
        </a-row>
      </a-col>
    </a-row>


    <a-row class="user-row" type="flex" justify="center">
      <a-col :span="4" class="ue-title">{{ $t('editUser.conact') }}:</a-col>
      <a-col :span="14">
        <a-input ref="contactName" :defaultValue="info.contactName" class="user-input"/>
      </a-col>
    </a-row>

    <a-row class="user-row" type="flex" justify="center">
      <a-col :span="4" class="ue-title">{{ $t('editUser.address') }}:</a-col>
      <a-col :span="14">
        <a-input ref="address" :defaultValue="info.address" class="user-input"/>
      </a-col>
    </a-row>

    <a-row class="user-row" type="flex" justify="center">
      <a-col :span="4" class="ue-title">{{ $t('editUser.conactMobile') }}:</a-col>
      <a-col :span="14">
        <a-input ref="contactPhone" :defaultValue="info.contactPhone" class="user-input"/>
      </a-col>
    </a-row>

    <a-row class="user-row" type="flex" justify="center">
      <a-col :span="4" class="ue-title">{{ $t('editUser.ID') }}:</a-col>
      <a-col :span="14">
        <a-input ref="idCard" :defaultValue="info.idCard" class="user-input"/>
      </a-col>
    </a-row>

    <a-row class="user-row" style="text-align: center;margin-top: 10px">
      <a-button @click="close">{{ $t('editUser.cancel') }}</a-button>
      <a-button type="primary" @click="save">{{ $t('editUser.save') }}</a-button>
    </a-row>
  </div>
</template>

<script>
import { saveUser } from "../../../api/organization"
import mixin from '@/common/js/mixin'

export default {
  mixins: [mixin],
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  methods: {
    changeStatus(e, status) {
      this.$emit('changeStatus', status, e.target.checked === true ? 1 : 0)
    },
    // 保存
    save() {
      let params = {
        userId: this.info.userId, // 用户id
        address: this.$refs.address.$el.value, // 地址
        contactName: this.$refs.contactName.$el.value, // 公司联系名字
        contactPhone: this.$refs.contactPhone.$el.value, // 电话
        idCard: this.$refs.idCard.$el.value, // 身份证
        name: this.$refs.name.$el.value, // 姓名
        isSmoke: this.info.isSmoke, // 吸烟
        isDrink: this.info.isDrink, // 酗酒
        bloodPressure: this.info.bloodPressure, // 血压
        bloodFat: this.info.bloodFat, // 血脂
        bloodGlucose: this.info.bloodGlucose, // 血糖
      };
      saveUser(params).then(res => {
        this.showNotice(`${this.$t('systemNotice.otherNotice[0]')}`);
        this.$emit('successUpdate')
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      });
    },
    // 关闭modal
    close() {
      this.$emit('close')
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  }

}
</script>

<style lang="stylus" scoped>
  .ue-title{
    text-align right
    width 182px;
    margin-left -137px;
  }
  .user-row{
    text-align right
    height 40px
    line-height 40px
    margin 5px auto
  }
  .habit{
    margin-top 5px
    .item{
      width 90px
    }
  }
  .user-input{
    width 380px
  }
</style>
