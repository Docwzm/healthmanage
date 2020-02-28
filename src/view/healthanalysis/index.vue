<template>
  <div class="main">

    <a-row class="content-container">
      <a-row class="top">
        <a-col :span="16" style="width: 100%">
          <span>{{ $t('healthanalysis.userName') }}:</span>
          <a-input  :placeholder="$t('healthanalysis.namePlaceholder')" class="name-input" @change="nameChange"/>
          <span>{{ $t('healthanalysis.mechanism') }}:</span>
          <a-cascader :placeholder="$t('healthanalysis.organizationPlaceholder')" :options="options" @change="onOrgChange"
                      />
          <a-button @click="fetch">{{ $t('healthanalysis.search') }}</a-button>
          <a-button @click="exportData" style="float: right">{{ $t('healthanalysis.download') }}</a-button>
        </a-col>
      </a-row>
      <a-row>
        <a-table :pagination="pagination"
                 :columns="columns"
                 :dataSource="list"
                 :loading="loading"
                 rowKey="userId"
                 @change="handleTableChange"
        >
          <a slot="name" href="javascript:;"  slot-scope="name" @click="showModal(info.userId)">
            {{name}}
          </a>
          <a-row slot="sex" slot-scope="sex">
            {{sex == 1? $t('sex.male') : $t('sex.female')}}
          </a-row>
        </a-table>
      </a-row>
    </a-row>

    <a-modal v-model="visible"
             :footer="null"
             :closable="false"
             :bodyStyle="bodyStyle"
    >
      <health-modal @hideModal="hideModel()"></health-modal>
    </a-modal>

    <!--      下载用户数据-->
    <a-modal v-model="downVisible"
             :title="$t('healthanalysis.exportData')"
             :destroyOnClose="destroyOnClose"
             :footer="null"
             width = "483px"
             height = "231px"
    >
      <down-data :downInfo="downInfo"
                 @closeModal="closeDownUser"
      ></down-data>
    </a-modal>
  </div>
</template>

<script>
import HealthModal from '@/components/modals/healthanalysis'
import DownData from '@/components/modals/downData'
import { analyseList, downHeathDataUrl } from '../../api/healthanalysis'
import { groupList } from '../../api/organization'
import mixin from '../../common/js/mixin'

export default {
  mixins: [mixin],
  components: { HealthModal, DownData },
  mounted() {
    // 获取表格数据
    this.fetch();
    // 获取组织结构数据
    this.getOrgList()
  },
  data() {
    return {
      list: [],
      columns: [{
        title: this.$t('healthanalysis.userName'),
        dataIndex: 'userName',
      }, {
        title: this.$t('healthanalysis.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
      }, {
        title: this.$t('healthanalysis.age'),
        dataIndex: 'age',
      }, {
        title: this.$t('healthanalysis.phone'),
        dataIndex: 'phone',
      }, {
        title: this.$t('healthanalysis.org'),
        dataIndex: 'groupName',
      }, {
        title: this.$t('healthanalysis.complexIndex'),
        dataIndex: 'healthScore',
      }, {
        title: this.$t('healthanalysis.healthAdvice'),
        dataIndex: 'advice',
      }],
      visible: false, // 是否显示modal
      bodyStyle: { // modal的样式
        height: '480px',
        padding: 0
      },
      loading: false, // 表格加载显示loading
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      pagination: {
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ['5', '10', '20']
      },
      pageSizeChange: false, // 判断是否是页面条数变化
      options: [], // 机构select
      selectedGroupId: '', // 选中的项目组
      userName: '', // 用户名
      downVisible: false,
      destroyOnClose: true, // 每次打开modal重新渲染
      params: '',
      downInfo: {}
    }
  },
  methods: {
    // 获取组织机构列表
    getOrgList() {
      groupList({}).then(res => {
        const list = res.groupList;
        let options = [{
          value: 'all',
          label: this.$t('healthanalysis.all')
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
        this.options = options;
      })
    },
    // 组织机构发生变化
    onOrgChange(val) {
      const groupId = JSON.parse(JSON.stringify(val)).pop();
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
    // 请求接口
    fetch() {
      this.loading = true;
      this.params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        langType: this.$i18n.locale
      };
      if (this.selectedGroupId !== '') {
        this.params.groupId = this.selectedGroupId;
      }
      if (this.userName !== '') {
        this.params.userName = this.userName;
      }
      // 获取列表信息
      analyseList(this.params).then(res => {
        const pagination = { ...this.pagination };
        pagination.total = res.total;
        this.loading = false;
        this.list = res.list;
        this.pagination = pagination;
      })
    },
    // 生成表格内容
    handleTableChange(pagination, filters, sorter) {
      if (!this.pageSizeChange) {
        const pager = { ...this.pagination };
        pager.current = pagination.current;
        this.pagination = pager;
        this.pageNum = pagination.current;
        this.fetch();
      } else {
        this.pageSizeChange = false;
      }
    },
    showModal(userId) {
      this.visible = true;
    },
    // 隐藏弹窗
    hideModel() {
      this.visible = false;
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
    exportData() {
      this.downInfo = {
        downloadUrl: downHeathDataUrl,
        params: this.params,
        fileName: this.$t('downloadExcel.excelName[0]'),
        type: '.csv',
        langType: this.$i18n.locale
      };
      this.downVisible = true;
    },
    closeDownUser() {
      this.downVisible = false;
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    }
  },
  watch: {
    lang() {
      this.getOrgList();
      this.fetch();
      this.columns = [{
        title: this.$t('healthanalysis.userName'),
        dataIndex: 'userName',
      }, {
        title: this.$t('healthanalysis.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
      }, {
        title: this.$t('healthanalysis.age'),
        dataIndex: 'age',
      }, {
        title: this.$t('healthanalysis.phone'),
        dataIndex: 'phone',
      }, {
        title: this.$t('healthanalysis.org'),
        dataIndex: 'groupName',
      }, {
        title: this.$t('healthanalysis.complexIndex'),
        dataIndex: 'healthScore',
      }, {
        title: this.$t('healthanalysis.healthAdvice'),
        dataIndex: 'advice',
      }]
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"

  .main{
    .content-container{
      background-color: #fff
      padding $padding
      .top{
        margin-bottom $padding
      }
      .name-input{
        width 200px
        margin 0 15px 0 10px
      }
      .organization-select{
        margin-left 10px
      }
    }
  }
</style>
