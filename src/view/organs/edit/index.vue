<template>
  <div class="edit-wrap">
    <back-header title="新增机构"></back-header>
    <organ-form :id="id" :editType="editType"></organ-form>
  </div>
</template>

<script>
import OrganForm from "./myForm";
import BackHeader from "@/view/layout/backHeader";
export default {
  data() {
    return {
      id: "",
      editType: ""
    };
  },
  components: {
    BackHeader,
    OrganForm
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
</style>