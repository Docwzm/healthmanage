<template>
  <div class="edit-wrap">
    <back-header title="新增患者"></back-header>
    <patient-form :id="id" :editType="editType"></patient-form>
  </div>
</template>

<script>
import PatientForm from "./myForm";
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
    PatientForm
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