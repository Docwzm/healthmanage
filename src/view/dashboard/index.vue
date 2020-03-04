<style lang="less" scoped>
</style>

<template>
  <component :is="myComp"></component>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "dashboard",
  data() {
    return {
      myComp: null
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    // if(user.roles===1){
    this.myComp = () => import("./doctor");
    // }
  }
};
</script>
