<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      routes: this.$router.options.routes,
      selectedKey: "",
      collapsed: false,
      list: [],
      accessMenuRoute: []
    };
  },
  created() {
    if (this.$route.meta.key) {
      this.selectedKey = [this.$route.meta.key];
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.key) {
        this.selectedKey = [to.meta.key];
      }
    }
  },
  methods: {
    jumpTo(path){
      this.$router.push(path)
    },
    showMenu(route) {
      return route.meta && route.meta.menu;
    },
    toggleCollapsed() {
      // 切换菜单伸缩
      this.collapsed = !this.collapsed;
    },
    hasOneMenuChild(route) {
      if (!route.children || route.children.length == 0) {
        return true;
      }
      let menuCount = 0;
      route.children.map(item => {
        if (item.meta && item.meta.menu && item.path !== "") {
          menuCount += 1;
        }
      });
      if (menuCount === 0) {
        return true;
      }
      return false;
    }
  },
  computed: {
    ...mapGetters(["menu"])
  },
  render() {
    const renderMenuItem = (parentPath,route) => {
      parentPath = parentPath?parentPath+'/':(route.path.indexOf('/')==0?'':'/')
      return this.hasOneMenuChild(route) ? (
        <a-menu-item
          key={route.meta.key}
          onClick={() => this.jumpTo(parentPath+route.path)}
          class="menu-item"
        >
          <a-icon component={route.meta.menu.icon} />
          <span>{route.meta.title}</span>
        </a-menu-item>
      ) : (
        <a-sub-menu key={route.path}>
          <span slot="title">
            <a-icon component={route.meta.menu.icon} />
            <span>{route.meta.title}</span>
          </span>
          {route.children.map(item => {
            return renderMenuItem(route.path,item);
          })}
        </a-sub-menu>
      );
    };

    return (
      <div style="position: fixed; min-width: 256px;">
        <a-menu
          selectedKeys={this.selectedKey}
          mode="inline"
          inlineCollapsed={this.collapsed}
          class="menu"
          theme="light"
        >
          {this.menu.map(route => {
            if (route.meta && route.meta.menu) {
              return renderMenuItem(null,route);
            }
            return null;
          })}
        </a-menu>
      </div>
    );
  }
};
</script>

<style lang="less" scoped>
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
.ant-menu-item{
  margin:0;
  color:#fff;
}
</style>
