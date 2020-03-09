<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      routes: this.$router.options.routes,
      selectedKey: [],
      list: [],
      accessMenuRoute: []
    };
  },
  props: {
    collapsed:false
  },
  computed: {
    ...mapGetters(["roles"])
  },
  watch: {
    $route(to, from) {
      this.changeSelectedKey(to.matched);
    }
  },
  created() {
    this.menu = []
    this.changeSelectedKey(this.$route.matched);
  },
  methods: {
    jumpTo(path) {
      this.$router.push(path);
    },
    changeSelectedKey(matchedRoutes) {
      this.selectedKey = [];
      matchedRoutes.map(item => {
        if (item.meta.menu) {
          this.selectedKey.push(item.path);
        }
      });
    },
    showMenu(route) {
      return route.meta && route.meta.menu;
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

  render() {
    const style = {
      width: this.collapsed ? "auto" : "256px"
    };

    const renderMenuItem = (parentPath, route) => {
      if (route.path.indexOf("/") == 0) {
        parentPath = "";
      } else {
        parentPath = parentPath
          ? parentPath + "/"
          : route.path.indexOf("/") == 0
          ? ""
          : "/";
      }

      return this.hasOneMenuChild(route) ? (
        <a-menu-item
          key={route.path}
          onClick={() => this.jumpTo(parentPath + route.path)}
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
            return renderMenuItem(route.path, item);
          })}
        </a-sub-menu>
      );
    };

    return (
      <a-menu
        selectedKeys={this.selectedKey}
        mode="inline"
        class="menu"
        theme="light"
        style={style}
      >
        {this.menu.map(route => {
          if (route.meta && route.meta.menu) {
            return renderMenuItem(null, route);
          }
          return null;
        })}
      </a-menu>
    );
  }
};
</script>

<style lang="less" scoped>
.menu {
  background-color: #0050b3;
  color: #fff;
  width: auto;
  border-right: 1px solid #0050b3;
  position: fixed;
}

.menu-item {
  background-color: #0050b3 !important; // 这行覆盖了menu的默认样式
}
.ant-menu-sub .ant-menu-item {
  margin-bottom: 0;
}

.ant-menu-item-selected {
  color: #fff;
  background: linear-gradient(
    270deg,
    rgba(0, 138, 255, 1) 0%,
    rgba(2, 91, 185, 1) 41%,
    rgba(0, 80, 179, 1) 100%
  );
}

.side-children {
  .side-title {
    font-size: 30px;
  }
}
.ant-menu-item {
  margin: 0;
  color: #fff;
}
</style>
