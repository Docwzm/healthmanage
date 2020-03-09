<template>
  <div class="edit-wrap">
    <back-header title="新增患者"></back-header>
    <component :is="myComponent" :id="id" :editType="editType"></component>
  </div>
</template>

<script>
import BackHeader from "@/view/layout/backHeader";
export default {
  data() {
    return {
      id: "",
      editType: "",
      myComponent:null
    };
  },
  components: {
    BackHeader,
  },
  created() {
    let {
      query: { id, type }
    } = this.$route;
    this.id = id;
    this.editType = type;
    if(id&&type==='check'){
      this.myComponent = () => import('./checkForm')
    }else{
      this.myComponent = () => import('./editForm')
    }
  }
};
</script>

<style scoped lang="less">
</style>