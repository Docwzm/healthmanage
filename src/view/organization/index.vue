<template>
  <div class="main">
    <a-row class="content-container" type="flex" justify="space-between">
      <!--左边组织结构-->
      <a-col class="left">
        <a-row type="flex" justify="space-between" align="middle" class="title">
          <span>{{ $t('organization.name') }}</span>
          <a-button type="primary" class="newAdd-org-button" @click="gotoAdd('organs')">+ 添加机构
          </a-button>
        </a-row>
        <!--折叠区域-->
        <a-row class="collapse">
          <!-- <a-input-search style="margin-bottom: 8px" placeholder="Search" @change="onChange" /> -->
          <a-tree @select="onSelect" @expand="onExpand" :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent" :treeData="gData">
            <template slot="title" slot-scope="{title}">
              <span v-if="title.indexOf(searchValue) > -1">
                {{title.substr(0, title.indexOf(searchValue))}}
                <span style="color: #f50">{{searchValue}}</span>
                {{title.substr(title.indexOf(searchValue) + searchValue.length)}}
              </span>
              <span v-else>{{title}}</span>
            </template>
          </a-tree>
        </a-row>
      </a-col>

      <a-col class="right">
        <a-col class="top" v-if="currentComponentId" >
          <component :is="currentComponent" :id="currentComponentId" :editType="editType"
            :cancel="handleCancel" :delete="handleDelete" :formItemLayout="formItemLayout"
            :tailFormItemLayout="tailFormItemLayout"></component>
        </a-col>
        <a-col class="bot" v-if="currentComponentId">
          <p class="title">用户总览</p>
          <a-row type="flex" v-if="selectedRole==='organs'" justify="space-between" align="middle">
            <p><span class="tag">医生团队</span><span>3个</span></p>
            <a-button type="primary" @click="gotoAdd('teams')">新增团队</a-button>
          </a-row>
          <a-row type="flex" v-if="selectedRole==='organs'||selectedRole==='teams'"
            justify="space-between" align="middle">
            <p><span class="tag">医生总数</span><span>3名</span></p>
            <a-button type="primary" @click="gotoAdd('doctors')">新增医生</a-button>
          </a-row>
          <a-row type="flex"
            v-if="selectedRole==='organs'||selectedRole==='teams'||selectedRole==='doctors'"
            justify="space-between" align="middle">
            <p><span class="tag">患者总数</span><span>30名</span></p>
          </a-row>
        </a-col>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRole: "",
      currentComponentId: "",
      editType: "check",
      expandedKeys: [],
      searchValue: "",
      autoExpandParent: true,
      gData: [
        {
          title: "社康1",
          key: "社康1id",
          scopedSlots: { title: "title" },
          isOrg: true,
          children: [
            {
              title: "团队1",
              key: "团队1id",
              scopedSlots: { title: "title" },
              isTeam: true,
              children: [
                {
                  title: "医生1",
                  key: "医生1id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                },
                {
                  title: "医生2",
                  key: "医生2id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                },
                {
                  title: "医生3",
                  key: "医生3id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                }
              ]
            },
            {
              title: "团队2",
              key: "团队2id",
              scopedSlots: { title: "title" },
              isTeam: true,
              children: [
                {
                  title: "医生1",
                  key: "医生1id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                },
                {
                  title: "医生2",
                  key: "医生2id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                },
                {
                  title: "医生3",
                  key: "医生3id",
                  scopedSlots: { title: "title" },
                  isDoctor: true
                }
              ]
            },
            {
              title: "团队3",
              key: "团队3id",
              isTeam: true,
              scopedSlots: { title: "title" }
            }
          ]
        },
        {
          title: "社康3",
          key: "社康3id",
          id: "02",
          isOrg: true,
          scopedSlots: { title: "title" }
        }
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          span: 8,
          offset: 7
        }
      },
      currentComponent: null
    };
  },
  mounted() {},
  methods: {
    gotoAdd(type) {
      let url = "";
      switch (type) {
        case "organs":
          url = "/organs/edit";
          break;
        case "teams":
          url = "/teams/edit";
          break;
        case "doctors":
          url = "/doctors/edit";
          break;
      }
      this.$router.push(url);
    },
    handleEdit() {
      this.editType = "edit";
    },
    handleDelete() {
      switch (this.selectedRole) {
        case "organs":
          this.gData = this.gData.filter(item => {
            if (item.key === this.currentComponentId) {
              return false;
            }
            return true;
          });
          break;
        case "teams":
          this.gData = this.gData.map(item => {
            let _orgId = this.selectedNode.$parent.dataRef.key;
            if (item.key === _orgId) {
              item.children = item.children.filter(_item => {
                if (_item.key === this.currentComponentId) {
                  return false;
                }
                return true;
              });
            }
            return item;
          });
          break;
        case "doctors":
          this.gData = this.gData.map(item => {
            let _orgId = this.selectedNode.$parent.$parent.dataRef.key;
            if (item.key === _orgId) {
              item.children.map(_item => {
                if (
                  _item.key === this.selectedNode.$parent.dataRef.key
                ) {
                  _item.children = _item.children.filter(__item => {
                    if (__item.key === this.currentComponentId) {
                      return false;
                    }
                    return true;
                  });
                }
                return item;
              });
            }
            return item;
          });
          break;
      }
      this.currentComponentId = null
    },
    handleCancel() {
      console.log("...............");
      this.editType = "check";
    },
    onExpand(expandedKeys, obj) {
      // console.log(obj);
      // console.log(expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onSelect(selectedKeys, e) {
      // console.log(e.node.$parent.dataRef);
      // console.log(e.node.dataRef);
      // console.log(selectedKeys);
      let { isOrg, isDoctor, isTeam } = e.node.dataRef;
      if (isOrg) {
        this.currentComponent = () => import("@/view/organs/edit/myForm");
        this.selectedRole = "organs";
      } else if (isTeam) {
        this.currentComponent = () => import("@/view/teams/edit/myForm");
        this.selectedRole = "teams";
      } else if (isDoctor) {
        this.currentComponent = () => import("@/view/doctors/edit/myForm");
        this.selectedRole = "doctors";
      }
      this.currentComponentId = selectedKeys[0];
      this.selectedNode = e.node;
    },
    getParentKey(key, tree) {
      let parentKey;
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key;
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children);
          }
        }
      }
      return parentKey;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map(item => {
          if (item.key.indexOf(value) > -1) {
            return this.getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/common/stylus/common.styl';

.fade-enter-active {
  transition: all 1.5s ease-in;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.content-container {
  // 左边组织结构
  .left {
    background-color: #fff;
    border-radius: 4px;
    width: calc(40% - 24px);
    padding-bottom: 40px;
    align-self: baseline;

    // 组织机构标题
    .title {
      padding: 0 25px;
      height: 55px;
      color: #fff;
      line-height: 55px;
      border-radius: 4px 4px 0 0;
      font-size: 16px;
      font-family: SourceHanSansCN-Medium;
      font-weight: 500;
      background: linear-gradient(270deg, rgba(180, 221, 255, 1) 0%, rgba(90, 179, 255, 1) 71%, rgba(55, 144, 255, 1) 100%);
    }

    // 增加机构
    .add-org {
      margin: 20px $padding;

      .firstOrg-input {
        width: calc(100% - 144px);
      }

      .addorg-btn {
        width: 65px;
        color: #1890FF;
        border-color: #1890FF;
      }
    }

    // 新增的按钮
    .newAdd-org-button {
      color: #fff;
    }

    // 折叠区域
    .collapse {
      padding: 20px;
    }
  }

  // 右边职员列表
  .right {
    width: 60%;
    background-color: #fff;
    margin-left: 10px;
    padding: 0 50px;

    .top-title {
      height: 70px;
      line-height: 70px;
    }

    .top {
      border-bottom: 1px solid #ccc;
    }

    .bot {
      padding: 24px;

      .title {
        color: #000;
        font-weight: bold;
        line-height: 30px;
        margin-bottom: 10px;
      }

      .ant-row-flex {
        width: 234px;
        margin-bottom: 10px;
        height: 35px;
        line-height: 35px;
      }
    }
  }
}
</style>
