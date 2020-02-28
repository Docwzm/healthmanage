<template>
    <div class="main">
        <a-table :pagination="pagination"
                 :columns="columns"
                 :dataSource="list"
                 :loading="loading"
                 :rowSelection="rowSelection"
                 rowKey="warnId"
                 @change="handleTableChange"
        >
            <a-row slot="name" slot-scope="name" style="width: 50px;">
                {{name}}
            </a-row>
            <a-row slot="sex" slot-scope="sex">
                {{sex == 1? $t('sex.male') : $t('sex.female')}}
            </a-row>
            <a-row slot="time" slot-scope="info">
                {{formatTime(info.warnTime)}}
            </a-row>
            <!--预警状态-->
            <a-row slot="status">
                {{statusType[status]}}
            </a-row>
            <!--预警标签-->
            <a-row slot="tag" slot-scope="info" style="width: 100px">
                <a-tag v-for="(item, key) in formatTag(info.warnTag)" :key="key" style="margin: 5px">
                    {{item}}
                </a-tag>
            </a-row>
            <!--操作-->
            <a-row slot="option" slot-scope="info" :style="$i18n.locale === 'ZH_CN' ? 'width: 135px' : 'width: 181px'">
                <a-button @click="deal(info.warnId)">{{ $t('dealwarn.deal') }}</a-button>
                <a-button @click="ignore(info.warnId)">{{ $t('dealwarn.ignor') }}</a-button>
            </a-row>
        </a-table>
        <a-modal v-model="visible"
                 :footer="null"
                 :bodyStyle="bodyStyle"
                 :title="$t('dealwarn.remark')"
                 :destroyOnClose="destroyOnClose"
        >
            <warn-comment :commentId="commentId"
                          @successDeal="successDeal"
            >
            </warn-comment>
        </a-modal>
    </div>
</template>

<script>
import { warnList, warnDeal } from "../../api/warn";
import WarnComment from '../../components/modals/warncomment'
import mixin from '../../common/js/mixin'
import { Bus } from '../../main'

export default {
  mixins: [mixin],
  components: { WarnComment },
  props: {
    status: {
      type: Number
    },
    selectedGroupId: {
      type: String,
      default: ''
    },
    start: {},
    end: {},
    userName: {
      type: String,
      default: ''
    },
    warnTag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false, // 加载图标
      pagination: {
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ['5', '10', '20']
      },
      pageSizeChange: false,
      selectedRowKeys: [], // 当前选中warnId组成的数组
      list: [],
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      warnTags: {},
      warnTagList: [],
      statusType: { // 预警状态集合
        0: this.$t('dealwarn.statusType[0]'),
        1: this.$t('dealwarn.statusType[1]'),
        2: this.$t('dealwarn.statusType[2]')
      },
      visible: false,
      bodyStyle: { // modal的样式
        height: 'auto',
      },
      destroyOnClose: true,
      commentId: [], // 处理的id
      columns: [{
        title: this.$t('dealwarn.dealTable.name'),
        dataIndex: 'userName',
        scopedSlots: { customRender: 'name' },
      }, {
        title: this.$t('dealwarn.dealTable.warnTime'),
        scopedSlots: { customRender: 'time' },
      }, {
        title: this.$t('dealwarn.dealTable.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
        width: '50%'
      }, {
        title: this.$t('dealwarn.dealTable.age'),
        dataIndex: 'age',
      }, {
        title: this.$t('dealwarn.dealTable.phone'),
        dataIndex: 'phone',
      }, {
        title: this.$t('dealwarn.dealTable.org'),
        dataIndex: 'groupName',
      }, {
        title: this.$t('dealwarn.dealTable.warnStatus'),
        scopedSlots: { customRender: 'status' },
      }, {
        title: this.$t('dealwarn.dealTable.warnTag'),
        scopedSlots: { customRender: 'tag' },
      }]
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    // 获取接口数据
    fetch() {
      this.loading = true;
      this.selectedRowKeys = []; // 清空选中项
      let params = {
        status: this.status,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      if (this.selectedGroupId) {
        params.groupId = this.selectedGroupId;
      }
      if (this.start) {
        params.start = this.start;
      }
      if (this.end) {
        params.end = this.end;
      }
      if (this.userName !== '') {
        params.userName = this.userName;
      }
      if (this.warnTag !== '') {
        params.warnTag = this.warnTag;
      }
      warnList(params)
        .then(res => {
          const pagination = { ...this.pagination };
          pagination.total = res.pageDataList.total;
          this.loading = false;
          this.list = res.pageDataList.list;
          this.warnTagList = res.warnTagList;
          this.convertObjArrToObj(this.warnTagList);
          this.pagination = pagination;
        })
    },
    // 表格更新
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
    /**
       * convert object array to object and save in sessionStorage
       * @param array
       * @returns {warnTags|{}}
       */
    convertObjArrToObj(array) {
      for (const entry of array) {
        this.warnTags[entry.warnTagType] = this.$t(`warnTags[${entry.warnTagType}]`);
      }
      Bus.$emit('warnTagList', JSON.stringify(this.warnTags));
      return this.warnTags;
    },
    offListener() {
      Bus.$off("warnTagList");
    },
    // 格式化预警标签
    formatTag(tags) {
      tags = tags.replace('[', '')
        .replace(']', ''); // 后端返回的数组字符串过滤一下
      if (tags === '') {
        return []
      }
      let arr = tags.split(',');
      let options = [];
      arr.forEach(item => {
        options.push(this.warnTags[item]);
      });
      return options
    },
    // 处理预警
    deal(warnId) {
      this.visible = true;
      this.commentId = [warnId];
    },
    // 忽视预警
    ignore(warnId) {
      warnDeal({
        warnId: [warnId],
        type: 2,
      })
        .then(res => {
          this.showNotice(`${this.$t('systemNotice.otherNotice[1]')}`);
          this.$emit('refresh')
        })
        .catch(err => {
          this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
        });
    },
    // 成功处理
    successDeal() {
      this.visible = false
      this.$emit('refresh')
    },
    // 删除所有的选中项
    delItems() {
      this.selectedRowKeys = [];
    },
    // 清空选中项
    refreshSelected() {
      this.selectedRowKeys = [];
    }
  },
  computed: {
    // 表格的选中项
    rowSelection() {
      if (this.status === 0) {
        return {
          // rows是选中的每一行用户信息生成数组
          onChange: (keys, rows) => {
            this.selectedRowKeys = keys;
          },
          selectedRowKeys: this.selectedRowKeys, // 控制选中项
        }
      } else {
        return null
      }
    },
    lang() {
      return this.$i18n.locale
    },
    abc() {
      return this.status === 0 ? this.columns = [{
        title: this.$t('dealwarn.dealTable.name'),
        dataIndex: 'userName',
        scopedSlots: { customRender: 'name' },
      }, {
        title: this.$t('dealwarn.dealTable.warnTime'),
        scopedSlots: { customRender: 'time' },
      }, {
        title: this.$t('dealwarn.dealTable.sex'),
        dataIndex: 'sex',
        scopedSlots: { customRender: 'sex' },
      }, {
        title: this.$t('dealwarn.dealTable.age'),
        dataIndex: 'age',
      }, {
        title: this.$t('dealwarn.dealTable.phone'),
        dataIndex: 'phone',
      }, {
        title: this.$t('dealwarn.dealTable.org'),
        dataIndex: 'groupName',
      }, {
        title: this.$t('dealwarn.dealTable.warnStatus'),
        scopedSlots: { customRender: 'status' },
      }, {
        title: this.$t('dealwarn.dealTable.warnTag'),
        scopedSlots: { customRender: 'tag' },
      },
      {
        title: this.$t('dealwarn.operator'),
        scopedSlots: { customRender: 'option' }
      }]
        : this.columns = [{
          title: this.$t('dealwarn.dealTable.name'),
          dataIndex: 'userName',
          scopedSlots: { customRender: 'name' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTime'),
          scopedSlots: { customRender: 'time' },
        }, {
          title: this.$t('dealwarn.dealTable.sex'),
          dataIndex: 'sex',
          scopedSlots: { customRender: 'sex' },
        }, {
          title: this.$t('dealwarn.dealTable.age'),
          dataIndex: 'age',
        }, {
          title: this.$t('dealwarn.dealTable.phone'),
          dataIndex: 'phone',
        }, {
          title: this.$t('dealwarn.dealTable.org'),
          dataIndex: 'groupName',
        }, {
          title: this.$t('dealwarn.dealTable.warnStatus'),
          scopedSlots: { customRender: 'status' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTag'),
          scopedSlots: { customRender: 'tag' },
        },
        {
          title: this.$t('dealwarn.dealTable.dealMark'),
          dataIndex: 'dealNote'
        }];
    }
  },
  watch: {
    selectedRowKeys(val) {
      this.$emit('selectedKeysChange', val);
    },
    abc() {
      if (this.status === 0) {
        this.columns = [{
          title: this.$t('dealwarn.dealTable.name'),
          dataIndex: 'userName',
          scopedSlots: { customRender: 'name' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTime'),
          scopedSlots: { customRender: 'time' },
        }, {
          title: this.$t('dealwarn.dealTable.sex'),
          dataIndex: 'sex',
          scopedSlots: { customRender: 'sex' },
        }, {
          title: this.$t('dealwarn.dealTable.age'),
          dataIndex: 'age',
        }, {
          title: this.$t('dealwarn.dealTable.phone'),
          dataIndex: 'phone',
        }, {
          title: this.$t('dealwarn.dealTable.org'),
          dataIndex: 'groupName',
        }, {
          title: this.$t('dealwarn.dealTable.warnStatus'),
          scopedSlots: { customRender: 'status' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTag'),
          scopedSlots: { customRender: 'tag' },
        },
        {
          title: this.$t('dealwarn.operator'),
          scopedSlots: { customRender: 'option' }
        }];
      } else {
        this.columns = [{
          title: this.$t('dealwarn.dealTable.name'),
          dataIndex: 'userName',
          scopedSlots: { customRender: 'name' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTime'),
          scopedSlots: { customRender: 'time' },
        }, {
          title: this.$t('dealwarn.dealTable.sex'),
          dataIndex: 'sex',
          scopedSlots: { customRender: 'sex' },
        }, {
          title: this.$t('dealwarn.dealTable.age'),
          dataIndex: 'age',
        }, {
          title: this.$t('dealwarn.dealTable.phone'),
          dataIndex: 'phone',
        }, {
          title: this.$t('dealwarn.dealTable.org'),
          dataIndex: 'groupName',
        }, {
          title: this.$t('dealwarn.dealTable.warnStatus'),
          scopedSlots: { customRender: 'status' },
        }, {
          title: this.$t('dealwarn.dealTable.warnTag'),
          scopedSlots: { customRender: 'tag' },
        },
        {
          title: this.$t('dealwarn.dealTable.dealMark'),
          dataIndex: 'dealNote'
        }];
      }
    },
    lang() {
      this.statusType = { // 预警状态集合
        0: this.$t('dealwarn.statusType[0]'),
        1: this.$t('dealwarn.statusType[1]'),
        2: this.$t('dealwarn.statusType[2]')
      };
      this.warnTags = {
        0: this.$t('warnTags[0]'),
        1: this.$t('warnTags[1]'),
        2: this.$t('warnTags[2]'),
        3: this.$t('warnTags[3]'),
        4: this.$t('warnTags[4]'),
        5: this.$t('warnTags[5]'),
        6: this.$t('warnTags[6]'),
        7: this.$t('warnTags[7]'),
        8: this.$t('warnTags[8]'),
        9: this.$t('warnTags[9]'),
        10: this.$t('warnTags[10]'),
        11: this.$t('warnTags[11]'),
        12: this.$t('warnTags[12]')
      };
      Bus.$emit('warnTagList', JSON.stringify(this.warnTags));
    }
  },
  beforeDestroy() {
    this.offListener();
  }
}
</script>

<style lang="stylus">

</style>
