<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style  lang="less">
#app {
  width: 100%;
  height: 100%;
  .ant-form-item-label {
    text-align: left;
  }
  .content-container {
    margin: 24px;
  }
}
</style>
