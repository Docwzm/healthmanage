<style lang="less" scoped>
</style>

<template>
  <component :is="myComp"></component>
</template>

<script>
import { mapGetters } from "vuex";
import { ROLES } from "@/utils/enum";
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
    let { roles } = this.user;
    switch (roles) {
      case ROLES.ORGAN_MANAGER:
        this.myComp = () => import("./common");
        break;
      case ROLES.TEAM_MANAGER:
        this.myComp = () => import("./common");
        break;
      case ROLES.DOCTOR_MANAGER:
        this.myComp = () => import("./common");
        break;
      case ROLES.DOCTOR:
        this.myComp = () => import("./doctor");
        break;
      default:
        break;
    }
  },
  beforeRouteEnter(to, from, next) {
    document.getElementsByTagName("html")[0].style.fontSize = "100px";
    next()
  },
  destroyed() {
    document.getElementsByTagName("html")[0].style.fontSize = "16px";
  }
};
</script>
