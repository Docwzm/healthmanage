<template>
  <div class="main">
    <a-row class="content-container">
      <a-row type="flex" justify="space-between">
        <a-col :span="14">
          <a-input :placeholder="$t('dealwarn.userName')" style="width: 102px;" @change="nameChange"/>
          <a-cascader :options="options" @change="onOrgChange" style="width: 173px;"
                      :placeholder="$t('dealwarn.organizationPlaceholder')"/>
          <a-range-picker @change="dateChange" style="width: 200px"/>
          <a-select  style="width: 130px;" :placeholder="$t('dealwarn.warnTag')" @change="tagChange">
            <a-select-option v-for="(item, key) in warnTagsList" :key="key">{{item}}</a-select-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button @click="search">{{ this.$t('dealwarn.search') }}</a-button>
          <a-button @click="exportData">{{ this.$t('dealwarn.download') }}</a-button>
        </a-col>
        <a-col :span="6" style="text-align: right;" v-show="activeTab==0">
          <a-button  @click="batchDeal" :disabled="selectedKeys.length===0">{{ this.$t('dealwarn.batchDeal') }}</a-button>
          <a-button  @click="batchIgnore" :disabled="selectedKeys.length===0">{{ this.$t('dealwarn.batchIgnore') }}</a-button>
        </a-col>
      </a-row>
      <a-tabs :defaultActiveKey="defaultTab" @change="callback" style="margin-top: 32px;">
        <a-tab-pane :tab="$t('dealwarn.pending')" key="0" :forceRender="forceRender">
          <warn-table ref="undeal" :selectedGroupId="selectedGroupId"
                      :status="todeal"
                      :start ="start"
                      :end ="end"
                      :userName="userName"
                      :warnTag="selectedTag"
                      @selectedKeysChange="selectedKeysChange"
                      @refresh="search"
          ></warn-table>
        </a-tab-pane>
        <a-tab-pane :tab="$t('dealwarn.processed')" key="1" :forceRender="forceRender">
          <warn-table ref="deal" :selectedGroupId="selectedGroupId"
                      :status="dealed"
                      :start="start"
                      :end="end"
                      :userName="userName"
                      :warnTag="selectedTag"
          ></warn-table>
        </a-tab-pane>
        <a-tab-pane :tab="$t('dealwarn.ignored')" key="2" :forceRender="forceRender">
          <warn-table ref="ignore" :selectedGroupId="selectedGroupId"
                      :status="ignore"
                      :start="start"
                      :end="end"
                      :userName="userName"
                      :warnTag="selectedTag"
          ></warn-table>
        </a-tab-pane>
      </a-tabs>
    </a-row>
    <a-modal v-model="visible"
             :footer="null"
             :bodyStyle="bodyStyle"
             :title="$t('dealwarn.remark')"
             :destroyOnClose="destroyOnClose"
    >
      <warn-comment :commentId="selectedKeys"
                    @successDeal="search"
      >
      </warn-comment>
    </a-modal>
    <!--      下载用户数据-->
    <a-modal v-model="downVisible"
             :title="$t('dealwarn.exportData')"
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
import mixin from '../../common/js/mixin'
import { groupList } from '../../api/organization'
import { warnDeal, downWarnDataUrl } from "../../api/warn"
import WarnTable from '../../components/warntable'
import WarnComment from '../../components/modals/warncomment'
import DownData from '@/components/modals/downData'
import { Bus } from '../../main'

export default {
  components: { WarnTable, WarnComment, DownData },
  mixins: [mixin],
  created() {
    let type = this.$route.params.type;
    if (type === 'dealed') {
      this.defaultTab = '1';
    } else if (type === 'ignore') {
      this.defaultTab = '2';
    } else {
      this.defaultTab = '0';
    }
  },
  mounted() {
    /**
     * get tagList
     */
    Bus.$on("warnTagList", (data) => {
      this.warnTagsList = JSON.parse(data);
      this.warnTagsList["0"] = this.$t('dealwarn.all');
    });
    this.getOrg();
  },
  data() {
    return {
      defaultTab: '0', // 默认的tab
      forceRender: true, // tab隐藏时强制渲染
      activeTab: 0, // 当前激活的tab
      todeal: 0, // 待处理
      dealed: 1, // 已处理
      ignore: 2, // 已忽略
      options: [], // 所有机构
      selectedGroupId: '', // 选中的机构
      start: '', // 开始日期
      end: '', // 结束日期
      userName: '', // 用户名
      selectedTag: '', // 选中的标签
      selectedKeys: [], // 表格组件选中的行数
      visible: false,
      bodyStyle: { // modal的样式
        height: 'auto',
      },
      destroyOnClose: true,
      warnTagsList: {},
      downVisible: false,
      params: '',
      downInfo: {}
    }
  },
  methods: {
    // 获取机构信息
    getOrg() {
      groupList({}).then(res => {
        const list = res.groupList;
        let options = [{
          value: 'all',
          label: this.$t('dealwarn.all')
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
      const groupId = JSON.parse(JSON.stringify(val)).pop();
      if (groupId === 'all') {
        this.selectedGroupId = '';
      } else {
        this.selectedGroupId = groupId
      }
    },
    // 日期变化
    dateChange(e, time) {
      let start = new Date(`${time[0]} 00:00:00`).getTime();
      let end = new Date(`${time[1]} 23:59:59`).getTime();
      this.start = start;
      this.end = end;
    },
    // 姓名变化
    nameChange(e) {
      this.userName = e.target.value;
    },
    // 搜索触发
    search() {
      this.visible = false;
      this.$refs.undeal.fetch();
      this.$refs.undeal.refreshSelected();
      this.$refs.deal.fetch();
      this.$refs.ignore.fetch();
    },
    // 标签变化
    tagChange(e) {
      if (e === '0') {
        this.selectedTag = '';
      } else {
        this.selectedTag = e;
      }
    },
    // tab变化切换
    callback(key) {
      this.activeTab = key;
      this.$refs.undeal.delItems()
    },
    // 批量处理
    batchDeal() {
      this.visible = true
    },
    // 批量忽略
    batchIgnore() {
      warnDeal({
        warnId: this.selectedKeys,
        type: 2,
      }).then(res => {
        this.showNotice(`${this.$t('systemNotice.otherNotice[1]')}`);
        this.search();
      }).catch(err => {
        this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
      });
    },
    selectedKeysChange(keys) {
      this.selectedKeys = keys;
    },
    exportData() {
      this.params = {
        userName: this.userName,
        groupId: this.selectedGroupId,
        start: this.start,
        end: this.end,
        warnTag: this.selectedTag,
        status: Number(this.activeTab) ? Number(this.activeTab) : 0
      };
      this.downInfo = {
        downloadUrl: downWarnDataUrl,
        params: this.params,
        fileName: '预警处理数据',
        type: '.csv'
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
      this.getOrg();
      this.warnTagsList["0"] = this.$t('dealwarn.all');
    }
  },
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/common.styl"
  .main{
    .content-container{
      background-color: #fff
      padding 32px
    }
  }
</style>
