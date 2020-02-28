<template>
  <div class="main">
    <a-row class="content-container">
      <a-row type="flex" justify="space-between">
        <a-col>
          <a-input :placeholder="$t('organizationmember.userName')" size="default" style="width: 200px" @change="nameChange"/>
          <a-cascader :options="options" @change="onOrgChange"
                      :placeholder="$t('organizationmember.organizationPlaceholder')"/>
          <a-button @click="fetch">{{ $t('organizationmember.search') }}</a-button>
        </a-col>
        <a-col>
          <a-button @click="exportData">{{ $t('organizationmember.download') }}</a-button>
          <a-button @click="showAddUser" style="margin-left: 20px">{{ $t('organizationmember.addUser') }}</a-button>
        </a-col>
      </a-row>

      <a-row class="table">
        <a-table :columns="columns" :dataSource="userInfo"
                 :pagination="pagination"
                 :loading="loading"
                 rowKey="userId"
                 @change="handleTableChange"
        >
          <!--头像-->
          <a-row slot="imgUrl" slot-scope="imgUrl">
            <img :src="imgUrl?imgUrl:defaultPic" alt="" class="head-img">
          </a-row>
          <a-row slot="sex" slot-scope="sex">
            {{ sex=== 1 ? $t('sex.male') : $t('sex.female') }}
          </a-row>
          <a-row slot="bindWechat" slot-scope="bindWechat">
            {{ bindWechat=== 1 ? $t('bindWechat.yes') : $t('bindWechat.no') }}
          </a-row>
          <!--编辑-->
          <a slot="edit"  href="javascript:;" slot-scope="info">
            <a-icon type="form" @click="edit(info)"/>
          </a>
          <!--删除-->
          <a slot="del"  href="javascript:;"  slot-scope="info">
            <a-icon type="delete" @click="del(info)"/>
          </a>
        </a-table>
      </a-row>
      <!--成员编辑modal-->
      <a-modal v-model="visible"
               :footer="null"
               :bodyStyle="bodyStyle"
               :title="$t('organizationmember.userEdit')"
               :destroyOnClose="destroyOnClose"
               width="800px"
      >
        <edit-user :info="curUserInfo"
                   @changeStatus="changeStatus"
                   @successUpdate="fetch"
                   @close="closeEditUser"
        ></edit-user>
      </a-modal>

      <!--新增用户modal-->
      <a-modal v-model="addUserVisible"
               :title="$t('organizationmember.batchExport')"
               :footer="null"
               :bodyStyle="addUserBodyStyle"
               width="483px"
               :destroyOnClose="destroyOnClose"
      >
        <add-user @closeModal="closeAddUser" @updateList="updateList" @startUpload="startUpload"></add-user>
      </a-modal>

      <!--      下载用户数据-->
      <a-modal v-model="downVisible"
               :title="$t('organizationmember.exportData')"
               :destroyOnClose="destroyOnClose"
               :footer="null"
               width="483px"
      >
        <down-data :downInfo="downInfo"
                   @closeModal="closeDownUser"
        ></down-data>
      </a-modal>
    </a-row>
  </div>
</template>

<script>
import {
  userList, groupList, getUserInfoById, deleteUser, downUserDataUrl
} from '../../api/organization'
import EditUser from '../../components/modals/useredit'
import DownData from '@/components/modals/downData'
import AddUser from '../../components/modals/adduser'
import defaultPic from '../../statics/img/default.png'
import mixin from '@/common/js/mixin'
import '../../utils/qrcode'
import { Bus } from '../../main'

export default {
  components: { EditUser, AddUser, DownData },
  mixins: [mixin],
  mounted() {
    this.fetch();
    this.getOrg();
    Bus.$on("changeStyle", (data) => {
      if (data === 'yes') {
        this.addUserBodyStyle.height = this.$i18n.locale === 'ZH_CN' ? '340px' : '383px';
      } else {
        this.addUserBodyStyle.height = this.$i18n.locale === 'ZH_CN' ? '313px' : '352px';
      }
    });
  },
  data() {
    return {
      defaultPic,
      columns: [{
        title: this.$t('organizationmember.icon'),
        dataIndex: 'imgUrl',
        scopedSlots: { customRender: 'imgUrl' },
      }, {
        title: this.$t('organizationmember.userName'),
        dataIndex: 'userName'
      }, {
        title: this.$t('organizationmember.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
      }, {
        title: this.$t('organizationmember.phone'),
        dataIndex: 'phone'
      }, {
        title: this.$t('organizationmember.age'),
        dataIndex: 'age'
      }, {
        title: this.$t('organizationmember.org'),
        dataIndex: 'groupName'
      }, {
        title: this.$t('organizationmember.wechatBind'),
        dataIndex: 'bindWechat',
        scopedSlots: { customRender: 'bindWechat' },

      }, {
        title: this.$t('organizationmember.edit'),
        scopedSlots: { customRender: 'edit' },
      }, {
        title: this.$t('organizationmember.delete'),
        scopedSlots: { customRender: 'del' },
      }],
      userInfo: [], // 成员信息
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      totalPages: 0, // 总共有多少页
      pagination: {
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ['5', '10', '20']
      },
      loading: false,
      pageSizeChange: false, // 判断是否是页面条数变化
      options: [], // 级联选择
      selectedGroupId: '', // 选中的groupid
      userName: '', // 用户姓名
      visible: false,
      downVisible: false,
      bodyStyle: { // modal的样式
        height: 'auto'
      },
      addUserBodyStyle: {
        height: this.$i18n.locale === 'ZH_CN' ? '313px' : '332px',
        width: '483px',
        padding: 0
      },
      curUserInfo: {}, // 当前要编辑的用户信息
      addUserVisible: false, // 是否显示新增用户modal
      destroyOnClose: true, // 每次打开modal重新渲染
      params: '',
      downInfo: {}
    }
  },
  methods: {
    // 获取机构信息
    getOrg() {
      groupList({})
        .then(res => {
          const list = res.groupList;
          let options = [{
            value: 'all',
            label: this.$t('organizationmember.all')
          }];
          // 列表内容
          list.forEach(item => {
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
          });
          this.options = options
        })
    },
    // 组织机构发生变化
    onOrgChange(val) {
      const groupId = JSON.parse(JSON.stringify(val))
        .pop();
      if (groupId === 'all') {
        this.selectedGroupId = '';
      } else {
        this.selectedGroupId = groupId
      }
    },
    // 名字发生变化
    nameChange(e) {
      this.userName = e.target.value;
    },
    // 生成表格内容
    handleTableChange(pagination, filters, sorter) {
      // 如果每页条数变化的话
      if (!this.pageSizeChange) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.pageNum = pagination.current;
        this.fetch();
      } else {
        this.pageSizeChange = false
      }
    },
    fetch() {
      this.visible = false;
      this.loading = true;
      this.params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.selectedGroupId !== '') {
        this.params.groupId = this.selectedGroupId;
      }
      if (this.userName !== '') {
        this.params.userName = this.userName;
      }
      // 获取组织成员信息
      userList(this.params)
        .then(res => {
          const pagination = { ...this.pagination };
          pagination.total = res.total;
          this.loading = false;
          this.userInfo = res.list;
          this.pagination = pagination;
        });
    },
    // 编辑用户信息
    edit(userInfo) {
      this.curUserInfo = {};
      getUserInfoById(userInfo.userId)
        .then(res => {
          this.curUserInfo = res;
          this.visible = true;
        })
        .catch(err => {
          this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
        });
    },
    // 改变吸烟酗酒等的状态
    changeStatus(status, val) {
      this.curUserInfo[status] = val;
    },
    // 删除用户
    del(info) {
      this.$confirm({
        title: `${this.$t('deleteUser.notice')}`,
        content: `${this.$t('deleteUser.noticeText')}${info.userName}?`,
        okText: `${this.$t('deleteUser.confirm')}`,
        cancelText: `${this.$t('deleteUser.cancel')}`,
        onOk: () => { // OK确认事件
          deleteUser(info.userId)
            .then(res => {
              // to-do
              this.showNotice(`${this.$t('systemNotice.otherNotice[3]')}`);
              this.fetch()
            })
            .catch(err => {
              this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
            })
        }
      });
    },
    // 每页条数更改
    onShowSizeChange(current, pageSize) {
      let pager = { ...this.pagination };
      pager.current = 1;
      this.pagination = pager;
      this.pageNum = 1;
      this.pageSize = pageSize;
      this.pageSizeChange = true;
      this.fetch();
    },
    // 显示新增用户modal
    showAddUser() {
      this.addUserBodyStyle.height = this.$i18n.locale === 'ZH_CN' ? '313px' : '352px';
      this.addUserVisible = true;
    },
    startUpload() {
      this.addUserBodyStyle.height = this.$i18n.locale === 'ZH_CN' ? '359px' : '400px';
    },
    // 关闭新增用户modal
    closeAddUser() {
      this.addUserBodyStyle.height = this.$i18n.locale === 'ZH_CN' ? '313px' : '352px';
      this.addUserVisible = false;
    },
    closeEditUser() {
      this.visible = false;
    },
    exportData() {
      this.downInfo = {
        downloadUrl: downUserDataUrl,
        params: this.params,
        fileName: '用户信息 ',
        type: '.csv'
      };
      this.downVisible = true;
    },
    closeDownUser() {
      this.downVisible = false;
    },
    updateList() {
      this.fetch();
      this.getOrg();
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.getOrg();
      this.columns = [{
        title: this.$t('organizationmember.icon'),
        dataIndex: 'imgUrl',
        scopedSlots: { customRender: 'imgUrl' },
      }, {
        title: this.$t('organizationmember.userName'),
        dataIndex: 'userName'
      }, {
        title: this.$t('organizationmember.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
      }, {
        title: this.$t('organizationmember.phone'),
        dataIndex: 'phone'
      }, {
        title: this.$t('organizationmember.age'),
        dataIndex: 'age'
      }, {
        title: this.$t('organizationmember.org'),
        dataIndex: 'groupName'
      }, {
        title: this.$t('organizationmember.wechatBind'),
        dataIndex: 'bindWechat',
        scopedSlots: { customRender: 'bindWechat' },

      }, {
        title: this.$t('organizationmember.edit'),
        scopedSlots: { customRender: 'edit' },
      }, {
        title: this.$t('organizationmember.delete'),
        scopedSlots: { customRender: 'del' },
      }]
    }
  },
}
</script>

<style scoped lang="stylus">
  @import "~@/common/stylus/common.styl"
  .main{
    .content-container{
      background-color: #fff
      padding 32px
    }
    .table{
      text-align center
      margin-top 10px
      .head-img{
        width 25px
        height 25px
        border-radius 50%
      }
    }
  }
</style>
