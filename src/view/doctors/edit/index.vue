<template>
  <div class="edit-wrap">
    <back-header title="新增医生"></back-header>
    <div class="form-wrap">
      <team-form :id="id" :editType="editType"></team-form>
    </div>
  </div>
</template>

<script>
import TeamForm from "./myForm";
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
    TeamForm
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