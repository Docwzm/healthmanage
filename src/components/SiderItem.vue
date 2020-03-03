<template>
  <!-- <div v-if="showMenu"> -->
      <a-menu-item @click="jumpTo(route.path)"
        class="menu-item">
        <a-icon :component="route.meta.menu.icon" />
        <span>{{route.meta.title}}</span>
      </a-menu-item>
      <!-- <a-sub-menu key="sub2">
        <span slot="title">
          <span>Navigation Two</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu> -->

  <!-- </div> -->
</template>

<script>
import { mapGetters } from "vuex";
import mixin from "@/common/js/mixin.js";

export default {
  mixins: [mixin],
  data() {
    return {
      
    };
  },
  props:{
    route:{}
  },
  computed:{
    showMenu(){
      return this.route.meta && this.route.meta.menu
    }
  }
};
</script>

<style lang="stylus" scoped>
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
