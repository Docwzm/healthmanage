<template>
  <a-row class="breadcrumb-container" type="flex" justify="space-between" align="middle">
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
    <!-- <a-button v-if="showBtn" type="primary" @click="add">{{btnName}}</a-button> -->
    <div class="btn-wrap">
      <slot name='right-btn'></slot>
    </div>
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
      queryParmas: { id: 1 },
      flag:false
    };
  },
  computed: {
    ...mapGetters(["routes"])
  },
  mounted() {
    this.initBreadCrumb(this.$route.meta.key);
  },
  watch: {
    $route(to, from) {
      this.flag = false;
      this.breadRoutes = []
      this.initBreadCrumb(to.meta.key);
    }
  },
  methods: {
    initBreadCrumb(breadcrumbName) {
      let { organId, teamId, doctorId } = this.$route.query;
      this.routes.map(item => {
        if (item.meta && item.meta.key === breadcrumbName) {
          this.flag = true;
          let query = "";
          switch (item.meta.key) {
            case "rpm_depart_manage":
              query = filterQuery({ organId });
              break;
            case "rpm_doctor_manage":
              query = filterQuery({ organId, teamId });
              break;
            case "rpm_patient_manage":
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

      if (!this.flag) {
        this.breadRoutes.unshift({
          path: this.$route.path,
          key: this.$route.name,
          breadcrumbName: this.$route.meta.title
        });
      }
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
