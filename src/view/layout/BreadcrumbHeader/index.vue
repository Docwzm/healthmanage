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
    <a-button @click="add">{{btnName}}</a-button>
  </a-row>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      breadRoutes: [],
      btnName: ""
    };
  },
  mounted() {
    this.initBreadCrumb();
    this.changeBtn();
  },
  watch: {
    $route(to, from) {
      this.initBreadCrumb();
      this.changeBtn();
    }
  },
  methods: {
    initBreadCrumb() {
      this.breadRoutes = [
        // {
        //   path: this.$route.path,
        //   breadcrumbName: this.$route.meta.title
        // }
      ];
      // if (this.$route.meta.parentBreadCrumb) {
      this.$router.options.routes.map(_item => {
        if (_item.name === this.$route.name) {
          // this.add
          this.breadRoutes.unshift({
            path: _item.path,
            breadcrumbName: _item.meta.title
          });
          this.addBreadCrumb(_item.meta.parentBreadCrumb);
        }
        // this.addBreadCrumb(_item.children, this.$route.meta.parentBreadCrumb);
      });
      // }
    },
    addBreadCrumb(breadCrumbName) {
      console.log(breadCrumbName);
      this.$router.options.routes.map(item => {
        if (item.name == breadCrumbName) {
          this.breadRoutes.unshift({
            path: item.path,
            breadcrumbName: item.meta.title
          });
          if (item.meta.parentBreadCrumb) {
            this.addBreadCrumb(item.meta.parentBreadCrumb);
          }
        }
      });
    },
    changeBtn() {
      let btnName = "";
      let routeName = this.$route.name;
      switch (routeName) {
        case "organs":
          btnName = "新增机构";
          break;
        case "teams":
          btnName = "新增团队";
          break;
        case "doctors":
          btnName = "新增医生";
          break;
        case "patients":
          btnName = "新增患者";
          break;
      }
      this.btnName = btnName;
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
