<template>
  <div style="position: fixed; min-width: 256px;">
    <a-menu :selectedKeys="selectedKey" mode="inline" :inlineCollapsed="collapsed" class="menu">
      <template v-for="route in routes" :route="route" class="menu-item">
        <a-menu-item v-if="showMenu(route)" :key="route.path" @click="jumpTo(route.path)" class="menu-item">
          <a-icon :component="route.meta.menu.icon" />
          <span>{{route.meta.title}}</span>
        </a-menu-item>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "@/common/js/mixin.js";
import siderItem from "./SiderItem";
export default {
  mixins: [mixin],
  data() {
    return {
      routes: this.$router.options.routes,
      selectedKey: [this.$route.name],
      collapsed: false,
      list: []
    };
  },
  components: {
    siderItem
  },
  created() {
    console.log(this.user);
    // this.$router.options.routes.map(item => {
    //   if (item.meta && item.meta.menu) {
    //     if (hasMenuChild(item)) {
    //       this.list.push({
    //         path: item.path,
    //         icon: item.meta.menu.icon,
    //         title: item.meta.title,
    //         name: item.name,
    //         children: []
    //       });
    //     } else {
    //     }
    //   }
    // });
  },
  watch: {
    $route(to, from) {
      this.selectedKey = [to.name];
    }
  },
  methods: {
    showMenu(route){
      return route.meta && route.meta.menu
    },
    toggleCollapsed() {
      // 切换菜单伸缩
      this.collapsed = !this.collapsed;
    }
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>

<style lang="stylus" scoped>
.menu {
  background-color: #0050B3;
  color: #fff;
  width: 100%;
  border-right: 1px solid #0050B3;
}
.menu-item {
  background-color: #0050B3 !important; // 这行覆盖了menu的默认样式
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
