<template>
  <div style="position: fixed; min-width: 256px;">
    <a-menu :selectedKeys="selectedKey" mode="inline" :inlineCollapsed="collapsed" class="menu">
      <a-menu-item v-for="item in list" :key="item.name" @click="jumpTo(item.path)"
        class="menu-item">
        <a-icon :component="item.icon" />
        <span>{{item.title}}</span>
      </a-menu-item>

    </a-menu>

  </div>
</template>

<script>
import mixin from "@/common/js/mixin.js";

export default {
  mixins: [mixin],
  data() {
    return {
      selectedKey: [this.$route.name],
      collapsed: false,
      list: []
    };
  },
  created() {
    this.$router.options.routes.map(item => {
        if (item.meta && item.meta.menu) {
          this.list.push({
            path: item.path,
            icon: item.meta.menu.icon,
            title: item.meta.title,
            name: item.name
          });
        }
    });
  },
  watch: {
    $route(to, from) {
      this.selectedKey = [to.name];
      console.log(this.selectedKey);
    }
  },
  methods: {
    toggleCollapsed() {
      // 切换菜单伸缩
      this.collapsed = !this.collapsed;
    }
  },
  computed: {}
};
</script>

<style lang="stylus" scoped>
.menu-item {
  background-color: #0050B3 !important; // 这行覆盖了menu的默认样式
}

.menu {
  background-color: #0050B3;
  color: #fff;
  width: 100%;
  border-right: 1px solid #0050B3;
}

.ant-menu-item-selected {
  color: #fff;
  background: linear-gradient(270deg, rgba(0, 138, 255, 1) 0%, rgba(2, 91, 185, 1) 41%, rgba(0, 80, 179, 1) 100%);
}

.side-children {
  .side-title {
    font-size: 30px;
  }
}
</style>
