<template>
  <div class="main">
    <a-row class="content-container">
      <a-row type="flex" justify="space-between" class="top-line">
        <a-col :span="22">
          <a-cascader :options="options" @change="onOrgChange"
                      placeholder="选择组织机构"/>

          <a-input placeholder="姓名" style="width: 100px" @change="nameChange"/>

          <a-select placeholder="设备类型" style="width: 150px" @change="deviceTypeChange">
            <a-select-option value="all">全部</a-select-option>
            <a-select-option value="01">体重秤</a-select-option>
            <a-select-option value="02">体重脂肪测量仪</a-select-option>
            <a-select-option value="04">手环</a-select-option>
            <a-select-option value="06">血糖仪</a-select-option>
            <a-select-option value="08">血压计</a-select-option>
            <a-select-option value="09">人体成分分析仪</a-select-option>
            <a-select-option value="11">支付卡</a-select-option>
          </a-select>

          <a-input placeholder="SN" style="width: 150px" @change="snChange"/>
          <a-button @click="fetch">搜索</a-button>
        </a-col>
        <a-col :span="2" >
          <a-button class="add-btn" @click="handleAdd">添加设备</a-button>
        </a-col>
      </a-row>

      <!--表格部分-->
      <a-row>
        <a-table :columns="columns" :dataSource="list"
                 :pagination="pagination"
                 :loading="loading"
                 @change="handleTableChange"
                 rowKey="sn">
          <a-row slot="status" slot-scope="status">
            {{status == 1? '激活' : '未激活'}}
          </a-row>
        </a-table>
      </a-row>
    </a-row>

    <!--弹窗部分-->
    <a-modal
      title="通过设备SN号添加"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel"
      :destroyOnClose="destroyOnClose"
    >
      <add-device @closeModal="closeModal"></add-device>
    </a-modal>
  </div>
</template>

<script>
import { deviceList } from '../../api/equipmentmanage'
import { groupList } from '../../api/organization'
import AddDevice from '../../components/modals/adddevice'

const columns = [{
  title: 'SN号',
  dataIndex: 'sn',
}, {
  title: '设备类型',
  dataIndex: 'deviceType'
}, {
  title: '组织结构',
  dataIndex: 'groupName',
}, {
  title: '姓名',
  dataIndex: 'userName'
}, {
  title: '激活状态',
  dataIndex: 'status',
  scopedSlots: { customRender: 'status' },
}];

export default {
  created() {
    this.handleOrg();
    this.fetch();
  },
  data() {
    return {
      list: [], // 设备列表信息
      columns,
      pagination: {
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ['5', '10', '20']
      }, // 分页信息
      loading: false, // 是否转圈圈
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页多少条
      pageSizeChange: false,
      visible: false, // 是否展示modal
      deviceType: '', // 设备类型
      deviceSn: '', // sn号
      userName: '',
      options: [], // 级联选择
      selectedGroupId: '', // 选中的groupid
      destroyOnClose: true
    }
  },
  methods: {
    // 处理组织信息
    handleOrg() {
      groupList({}).then(res => {
        const list = res.groupList;
        let options = [{
          value: 'all',
          label: '全部'
        }];
        // 列表内容
        list.forEach(item => {
          let tmp = {
            value: item.groupId,
            label: item.name,
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
    // 设备类型变化
    deviceTypeChange(value) {
      if (value === 'all') {
        this.deviceType = ''
      } else {
        this.deviceType = value
      }
    },
    // sn号变化
    snChange(e) {
      this.deviceSn = e.target.value
    },
    // 名字变化
    nameChange(e) {
      this.userName = e.target.value
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
    // 请求表格数据
    fetch() {
      this.loading = true;
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      };
      if (this.userName !== '') {
        params.userName = this.userName;
      }
      if (this.deviceSn !== '') {
        params.deviceSn = this.deviceSn;
      }
      if (this.selectedGroupId !== '') {
        params.groupId = this.selectedGroupId;
      }
      if (this.deviceType !== '') {
        params.deviceType = this.deviceType;
      }
      // 获取组织成员信息
      deviceList(params).then(res => {
        const pagination = { ...this.pagination };
        pagination.total = res.total;
        this.loading = false;
        this.list = res.list;
        this.pagination = pagination;
      });
    },
    // 页数变化时处理数据
    handleTableChange(pagination, filters, sorter) {
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
    onShowSizeChange(current, pageSize) {
      const pager = { ...this.pagination };
      pager.current = 1;
      this.pagination = pager;
      this.pageNum = 1;
      this.pageSize = pageSize;
      this.pageSizeChange = true;
      this.fetch(this.activeGroupId);
    },
    // 关闭模态窗
    handleCancel() {
      this.visible = false;
    },
    handleAdd() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
      this.fetch();
    }
  },
  components: {
    AddDevice
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
    .top-line{
      margin-bottom 20px
      .add-btn{
        float right
      }
    }
  }
</style>
