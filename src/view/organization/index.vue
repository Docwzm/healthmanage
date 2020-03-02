<template>
  <div class="main">
    <a-row class="content-container" type="flex" justify="space-between">
      <!--左边组织结构-->
      <a-col class="left">
        <a-row class="title">{{ $t('organization.name') }}</a-row>
        <a-row class="add-org" v-show="addFirst">
          <a-button class="newAdd-org-button" @click="changeOrgType">+ {{ $t('organization.addOrg') }}</a-button>
        </a-row>
        <a-row class="add-org" type="flex" justify="space-between" v-if="!addFirst">
          <a-input class="firstOrg-input" :placeholder="$t('organization.orgPlacer')" ref="firstOrg"></a-input>
          <a-button class="addorg-btn" @click="addOrg">{{ $t('organization.confirm') }}</a-button>
          <a-button class="addorg-btn" @click="cancelAddOrg">{{ $t('organization.cancel') }}</a-button>
        </a-row>
        <!--折叠区域-->
        <a-row class="collapse">
          <a-row v-for="(item, key) in groupList" :key="key">
            <div class="firstOrg" >
              <span style="width: 18px;display: inline-block;">
                <a-icon @click="handleFirstChange(key)" type="caret-down" style="color: #1890FF;" v-if="isHightLight(item.groupId, key)==='downLight'"/>
                <a-icon @click="handleFirstChange(key)" type="caret-right" v-else-if="isHightLight(item.groupId, key)==='right'"/>
                <a-icon @click="handleFirstChange(key)" type="caret-down" v-else-if="isHightLight(item.groupId, key)==='down'"/>
                <a-icon @click="handleFirstChange(key)" type="caret-right" style="color: #1890FF;" v-else-if="isHightLight(item.groupId, key)==='rightLight'"/>
              </span>
              <span @click="handleFirstChange(key)" :class="{'active-org':item.groupId===activeGroupId}">
                {{item.name === '未分配' ?  $t('organization.unassigned') : item.name }}
              </span>
              <a-icon class="normal-icon" theme="filled" type="plus-circle" @click="addSecOrg(key)" v-if="item.groupId!=='00001'"/>
              <a-popconfirm :title="$t('organization.confirmDelete')+item.name+'?' " @confirm="delOrg(item.groupId)" v-if="item.groupId!=='00001'"  :okText="$t('organization.yes')"
                            :cancelText="$t('organization.no')">
                <a-icon class="normal-icon" theme="filled" type="minus-circle" />
              </a-popconfirm>
            </div>
            <!--二级菜单-->
            <transition name="fade">
              <a-row v-show="item.isSubShow">
                <div class="add-sec" v-show="item.isInputShow">
                  <a-input   style="width: 150px" :placeholder="$t('organization.secondOrg')"
                            @pressEnter="press($event, item.groupId)"/>
                  <a-icon type="close" class="close-icon" @click="closeInput(key)"/>
                </div>

                <div v-for="(item1, key1) in item.child" :key="key1"
                     class="secondOrg"
                >
                  <span @click="handleSecondChange(item1.groupId)"
                        :class="{'active-org':item1.groupId===activeGroupId}">
                    {{item1.name}}
                  </span>
                  <a-popconfirm :title=" $t('organization.confirmDelete') +item1.name+'?'" @confirm="delOrg(item1.groupId)"   :okText="$t('organization.yes')"
                                :cancelText="$t('organization.no')">
                    <a-icon type="minus-circle" theme="filled" class="pink-minus"/>
                  </a-popconfirm>
                </div>
              </a-row>
            </transition>

          </a-row>
        </a-row>
      </a-col>

      <!--右边职员列表-->
      <a-col class="right">
        <!--职员列表标题-->
        <a-row class="top-title" type="flex" justify="space-between">
          <a-col :span="4">
            {{ $t('organization.staffList') }}
          </a-col>
          <a-col :span="20" style="text-align:right;">
            <a-cascader :options="options" @change="onOrgChange"
                        :placeholder="$t('organization.chooseOrg')"
                        style="text-align: center;padding-left: 0;"
            />
            <a-button type="primary" @click="moveOrg" :disabled="selectedRowKeys.length===0">{{ $t('organization.confirmMove') }}</a-button>
          </a-col>
        </a-row>
        <!--提示框-->
        <a-alert :message="$t('organization.notice')"
                 style="margin-bottom: 32px"
                 showIcon
                 type="info"/>

        <a-table :pagination="pagination"
                 :columns="columns"
                 :rowSelection="rowSelection"
                 :dataSource="userList"
                 :loading="loading"
                 @change="handleTableChange"
                 rowKey="userId"
                 @showSizeChange="onShowSizeChange"
        >
          <a-row slot="sex" slot-scope="sex" >
            {{ sex===1 ? $t('sex.male') : $t('sex.female') }}
          </a-row>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// import {
//   groupList, moveUser2Group, addGroup, groupDelete
// } from '../../api/organization';
import mixin from '@/common/js/mixin'

export default {
  mixins: [mixin],
  created() {
    this.initTable();
  },
  data() {
    return {
      columns: [{
        title: this.$t('organization.nameTitle'),
        dataIndex: 'userName',
      }, {
        title: this.$t('organization.gender'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
        width: 200
      }],
      loading: false, // 加载状态
      activeGroupId: "00001", // 当前选中机构,默认是未分配
      groupList: [], // 所有组织的信息
      userList: [], // 用户列表
      index: {},
      pagination: { // 分页信息
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ['5', '10', '20']
      },
      selectedRowKeys: [], // 当前选中用户的userId组成的数组
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      options: [], // 级联选择
      selectedGroupId: '', // 右侧选中的groupid
      pageSizeChange: false, // 判断是否是表格每页条数变化
      addFirst: true // 添加一级机构切换
    }
  },
  methods: {
    // 初始化表格
    initTable() {
      this.groupList = [];
      groupList({}).then(res => {
        let list = res.groupList;
        let options = [{
          value: 'all',
          label: this.$t('organization.all')
        }];
        let index = {};
        list.forEach(item => {
          // 列表内容
          let tmp = {
            value: item.groupId,
            label: item.name === '未分配' ? this.$t('organization.unassigned') : item.name
          };
          if (item.child.length > 0) {
            tmp.children = [];
            item.child.forEach(item1 => {
              tmp.children.push({
                value: item1.groupId,
                label: item1.name
              })
            });
          }
          options.push(tmp)
          // 把一级分类和二级分类的groupId一一对应起来
          item.child.forEach(val => {
            index[val.groupId] = item.groupId;
          });
        });
        this.options = options;
        this.index = index;
        // 设置分页信息
        const pagination = { ...this.pagination };
        pagination.total = res.page.total;
        this.pagination = pagination;
        list.forEach((item, key) => {
          list[key].isSubShow = false; // 是否显示子栏
          list[key].isInputShow = false; // 是否显示添加的input
        });
        this.groupList = list;
        this.fetch(this.activeGroupId)
      })
    },
    // 一级机构点击时触发,把isSubShow取反
    handleFirstChange(key) {
      let tmpList = this.groupList;
      tmpList[key].isSubShow = !tmpList[key].isSubShow;
      if (!tmpList[key].isSubShow) {
        tmpList[key].isInputShow = false;
      }
      this.groupList = tmpList;
      // 在获取对应的数据
      this.pageNum = 1;
      // 如果是未分配就再获取一下数据
      if (key === 0) {
        this.fetch(tmpList[key].groupId);
        this.activeGroupId = "00001";
      }
    },
    // 当前的一级菜单小箭头朝向
    isHightLight(groupId, key) {
      let isSubShow = this.groupList[key].isSubShow;
      // 未分类
      if (groupId === "00001") {
        return true
      }
      switch (isSubShow) {
        case true:
          if (this.index[this.activeGroupId] === groupId) {
            return 'downLight';
          }
          return 'down';
        case false:
          if (this.index[this.activeGroupId] === groupId) {
            return 'rightLight';
          }
          return 'right';
        default:
          return true
      }
    },
    // 二级机构点击时触发
    handleSecondChange(groupId) {
      this.pageNum = 1;
      this.activeGroupId = groupId; // 更新当前激活的groupId
      this.fetch(groupId)
    },
    // 右侧二级联动触发
    onOrgChange(val) {
      const groupId = JSON.parse(JSON.stringify(val)).pop();
      if (groupId === 'all') {
        this.selectedGroupId = '';
      } else {
        this.selectedGroupId = groupId
      }
    },
    // 获取数据
    fetch(groupId) {
      this.loading = true;
      let params = {
        groupId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      // 获取组织成员信息
      groupList(params).then(res => {
        this.selectedRowKeys = []; // 选中的用户先清0
        const pagination = { ...this.pagination };
        pagination.total = res.page.total;
        this.loading = false;
        this.userList = res.page.list;
        this.pagination = pagination;
      });
    },
    // 页数改变时触发
    handleTableChange(pagination, filters, sorter) {
      if (!this.pageSizeChange) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.pageNum = pagination.current;
        this.fetch(this.activeGroupId);
      } else {
        this.pageSizeChange = false;
      }
    },
    // 添加一级机构
    addOrg() {
      let name = this.$refs.firstOrg.$el.value;
      if (name === '') {
        this.showNotice(`${this.$t('systemNotice.otherNotice[5]')}`);
        return;
      }
      let params = {
        name
      };
      addGroup(params)
        .then(res => {
          this.showNotice(`${this.$t('systemNotice.otherNotice[4]')}`);
          this.initTable();
          this.$refs.firstOrg.$el.value = '';
          this.addFirst = true; // 重新显示添加按钮
        }).catch(err => {
          this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
        });
    },
    // 消失按钮切换
    changeOrgType() {
      this.addFirst = false;
    },
    // 添加二级机构回车事件
    press(e, groupId) {
      let name = e.target.value;
      let params = {
        name,
        oneCategory: groupId
      };
      addGroup(params).then(res => {
        e.target.value = '';
        this.showNotice(`${this.$t('systemNotice.otherNotice[4]')}`);
        this.initTable();
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    // 关闭input
    closeInput(key) {
      this.groupList[key].isInputShow = false
    },
    // 移动员工所属部门
    moveOrg() {
      // 请求的参数
      let params = {};
      // 如果没有勾选用户给个提示
      if (this.selectedRowKeys.length < 1) {
        this.showNotice(`${this.$t('systemNotice.otherNotice[6]')}`);
        return;
      }
      params.userIds = this.selectedRowKeys;
      if (this.selectedGroupId === '') {
        this.showNotice(`${this.$t('systemNotice.otherNotice[7]')}`);return
      } else {
        params.groupId = this.selectedGroupId;
      }
      moveUser2Group(params).then(res => {
        this.showNotice(`${this.$t('systemNotice.otherNotice[2]')}`);
        this.selectedRowKeys = [];
        // 移动成功重新加载表格信息
        this.fetch(this.activeGroupId)
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    // 添加二级机构
    addSecOrg(key) {
      this.groupList[key].isSubShow = true;
      this.groupList[key].isInputShow = true;
    },
    // 根据groupid删除组织
    delOrg(groupId) {
      groupDelete(groupId).then(res => {
        this.showNotice(`${this.$t('systemNotice.otherNotice[3]')}`);
        this.initTable();
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      })
    },
    // 每页显示条数修改
    onShowSizeChange(current, pageSize) {
      const pager = { ...this.pagination };
      pager.current = 1;
      this.pagination = pager;
      this.pageNum = 1;
      this.pageSize = pageSize;
      this.pageSizeChange = true;
      this.fetch(this.activeGroupId);
    },
    cancelAddOrg() {
      this.addFirst = true; // 重新显示添加按钮
    }
  },
  computed: {
    // 表格的选中项
    rowSelection() {
      return {
        // rows是选中的每一行用户信息生成数组
        onChange: (keys, rows) => {
          this.selectedRowKeys = keys;
        },
        selectedRowKeys: this.selectedRowKeys, // 控制选中项
      }
    },
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.initTable();
      this.columns = [{
        title: this.$t('organization.nameTitle'),
        dataIndex: 'userName',
      }, {
        title: this.$t('organization.gender'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
        width: 200
      }];
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  .fade-enter-active{
    transition all 1.5s ease-in
  }
  .fade-enter, .fade-leave-to  {
    opacity: 0;
  }
  .content-container{
    // 左边组织结构
    .left{
      background-color: #fff
      border-radius 4px
      width calc(40% - 24px)
      padding-bottom 40px
      align-self baseline
      // 组织机构标题
      .title{
        height 55px
        color #fff
        line-height 55px
        border-radius 4px 4px 0 0
        font-size 16px
        font-family SourceHanSansCN-Medium
        font-weight 500
        padding-left 25px
        background:linear-gradient(270deg,rgba(180,221,255,1) 0%,rgba(90,179,255,1) 71%,rgba(55,144,255,1) 100%);
      }
      //增加机构
      .add-org{
        margin 20px $padding
        .firstOrg-input{
          width calc( 100% - 144px )
        }
        .addorg-btn{
          width 65px
          color #1890FF
          border-color #1890FF
        }
      }
      // 新增的按钮
      .newAdd-org-button{
        width 100%
        color #1890FF
        border-color #1890FF
      }
      // 折叠区域
      .collapse{
        .active-org{
          color #1890FF
        }
        font-size 16px
        margin 0 $padding
        // 第一级菜单
        .firstOrg{
          color: #a7a7a7
          height 25px
          line-height 25px
          span{
            cursor pointer
          }
        }
        //红色的减号
        .pink-minus{
          color #FFF0F0
          background-color #F36565
          border-color  #FFF0F0
          border-radius 50%
        }
        //正常的加减号
        .normal-icon{
          color #f2f2f2
          background-color: #878787
          border-radius 50%
        }
        // 第二级菜单
        .secondOrg{
          color: #333333
          height 25px
          line-height 25px
          margin-left 80px
          span{
            cursor pointer
          }
        }
        //新增二级机构的input
        .add-sec{
          margin 5px 0 5px 80px
          width 190px
        }
        //关闭按钮
        .close-icon{
          font-size 12px
          color #666
          cursor pointer
        }
      }
    }
    // 右边职员列表
    .right{
      width 60%
      background-color #fff
      padding 10px 32px
      margin-left 10px
      .top-title{
        height 70px
        line-height 70px
      }
      //提示框
      .notice{
        height 40px
        line-height 40px
        margin-bottom 16px
        padding-left 40px
        background-color #BAE7FF
        border-radius:4px;
        border:1px solid rgba(186,231,255,1)
      }
    }
  }

</style>
