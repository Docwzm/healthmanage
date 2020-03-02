<template>
  <a-row class="container" type="flex" align="middle">
    <!-- <a-icon :component="backIcon" @click="goback"></a-icon> -->
    <a-icon type="backward" @click="goBack"/>
    <div>{{title}}</div>
  </a-row>
</template>

<script>
export default {
  name: "backHeader",
  data() {
    return {
    };
  },
  props:{
    title:''
  },
  methods: {
    goBack(){
      this.$router.back()
    }
  }
};
</script>

<style scoped lang="less">
.container{
  height:60px;
  line-height: 60px;
  border-bottom:1px solid #ccc;
  padding-left:20px;
  i{
    cursor: pointer;
    margin-right: 20px;
  }
}
</style>
