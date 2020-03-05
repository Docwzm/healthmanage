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

  .my-progress {
    .ant-progress-inner {
      background: #fff;
    }
  }
  .ant-menu-submenu-arrow {
    &::before,
    &::after {
      background-image: none;
    }
  }
  .ant-menu-submenu-inline > .ant-menu-submenu-title:hover {
    &:hover {
      .ant-menu-submenu-arrow {
        &::before,
        &::after {
          background: #fff;
        }
      }
    }
  }
}
</style>
