<template>
  <a-row class="breadcrumb-container" type="flex" justify="space-between">
    <a-breadcrumb :routes="breadRoutes">
      <template slot="itemRender" slot-scope="{route, params, routes, paths}">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{route.breadcrumbName}}
        </span>
        <router-link v-else :to="route.path">
          {{route.breadcrumbName}}
        </router-link>
      </template>
    </a-breadcrumb>
    <a-button v-if="showBtn" type="primary" @click="add">{{btnName}}</a-button>
  </a-row>
</template>

<script>
import { mapGetters } from "vuex";
import { filterQuery } from "@/utils/util";
export default {
  name: "breadcrumb",
  data() {
    return {
      breadRoutes: [],
      btnName: "",
      showBtn: false,
      queryParmas: { id: 1 }
    };
  },
  computed: {
    ...mapGetters(["routes"])
  },
  mounted() {
    this.initBreadCrumb(this.$route.meta.key);
    this.changeBtn();
  },
  watch: {
    $route(to, from) {
      this.initBreadCrumb(to.meta.key);
      this.changeBtn();
    }
  },
  methods: {
    initBreadCrumb(breadCrumbName) {
      let { organId, teamId, doctorId } = this.$route.query;

      this.routes.map(item => {
        if (item.meta && item.meta.key === breadCrumbName) {
          let query = "";
          switch (item.meta.key) {
            case "teams":
              query = filterQuery({ organId });
              break;
            case "doctors":
              query = filterQuery({ organId, teamId });
              break;
            case "patients":
              query = ``;
              break;
          }
          this.breadRoutes.unshift({
            path: `${item.path}${query}`,
            key: item.meta.key,
            breadcrumbName: item.meta.title
          });

          if (item.meta.parentBreadCrumb) {
            this.initBreadCrumb(item.meta.parentBreadCrumb);
          }
        }
      });

      // this.$route.matched.map(item => {

      // })

    },
    changeBtn() {
      let btnName = "";
      let showBtn = false;
      let routeName = this.$route.name;
      switch (routeName) {
        case "organs":
          btnName = "新增机构";
          showBtn = true;
          break;
        case "teams":
          btnName = "新增团队";
          showBtn = true;
          break;
        case "doctors":
          btnName = "新增医生";
          showBtn = true;
          break;
        case "patients":
          btnName = "新增患者";
          showBtn = true;
          break;
      }
      this.btnName = btnName;
      this.showBtn = showBtn;
    },
    add() {
      this.$router.push(`${this.$route.path}/edit`);
    }
  }
};
</script>

<style scoped lang="less">
.breadcrumb-container {
  height: 40px;
  line-height: 40px;
}
</style>
