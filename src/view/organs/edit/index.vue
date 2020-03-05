<template>
  <div class="edit-wrap">
    <!-- <back-header title="新增机构"></back-header> -->
    <bread-crumb></bread-crumb>
    <div class="form-wrap">
      <organ-form :id="id" :editType="editType"></organ-form>
    </div>
  </div>
</template>

<script>
import OrganForm from "./myForm";
import BackHeader from "@/view/layout/backHeader";
import BreadCrumb from "@/view/layout/BreadcrumbHeader";
export default {
  data() {
    return {
      id: "",
      editType: ""
    };
  },
  components: {
    BackHeader,
    OrganForm,
    BreadCrumb
  },
  created() {
    let {
      query: { id, type }
    } = this.$route;
    this.id = id;
    this.editType = type;
  }
};
</script>

<style scoped lang="less">
.form-wrap {
  padding-left: 30px;
}
</style>