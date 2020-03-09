<template>
  <div class="main">
    <a-row class="content-container">
      <bread-crumb>
        <template slot="right-btn">
          <a-button type="primary" @click="gotoDetail">新增设备</a-button>
        </template>
      </bread-crumb>
      <a-row>
        <a-table :pagination="pagination" :columns="columns" :dataSource="list" :loading="loading"
          rowKey="id">
          <!-- <a-row slot="index" slot-scope="info">
            {{JSON.stringify(info)}}
          </a-row> -->
          <a-row slot="status" slot-scope="status">
            {{status===1?'启用':'停用'}}
          </a-row>
          <a-row slot="option" slot-scope="info">
            <router-link :to="'/device/edit?type=edit&id='+info.id">编辑</router-link>
            /
            <router-link :to="'/device/edit?type=check&id='+info.id">查看</router-link>
          </a-row>
        </a-table>
      </a-row>
    </a-row>
  </div>
</template>

<script>
import BreadCrumb from "@/view/layout/BreadcrumbHeader";
import { filterQuery } from "@/utils/util";
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "i7/i5 GPRS",
          type: "i7/i5 GPRS",
          status: 1,
          sn: "12344444444444",
          org: "云诊所"
        },
        {
          id: 2,
          name: "i7/i5 GPRS",
          type: "i7/i5 GPRS",
          status: 0,
          sn: "12344444444444",
          org: "云诊所"
        }
      ],
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          scopedSlots: { customRender: "info" }
        },
        {
          title: "设备名称",
          dataIndex: "name"
        },
        {
          title: "设备型号",
          dataIndex: "type"
        },
        {
          title: "状态",
          dataIndex: "status",
          scopedSlots: { customRender: "status" }
        },
        {
          title: "SN号（16位）",
          dataIndex: "sn"
        },
        {
          title: "所属机构",
          dataIndex: "org"
        },
        {
          title: this.$t("common.option"),
          scopedSlots: { customRender: "option" }
        }
      ],
      loading: false, // 表格加载显示loading
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页显示的条数
      pagination: {
        showQuickJumper: true, // 显示跳转至
        showSizeChanger: true, // 显示每页几条
        onShowSizeChange: this.onShowSizeChange, // 每页显示条数改变时调用
        pageSizeOptions: ["5", "10", "20"]
      }
    };
  },
  components: {
    BreadCrumb
  },
  mounted() {
    this.getPatientList();
  },
  methods: {
    getPatientList() {},
    nameChange(e) {
      let value = e.target.value;
    },
    onShowSizeChange(current, pageSize) {
      let pager = { ...this.pagination };
      pager.current = 1;
      this.pagination = pager;
      this.pageNum = 1;
      this.pageSize = pageSize;
      this.pageSizeChange = true;
      this.getPatientList();
    },
    gotoDetail(data, type) {
      let id = data && data.id
      this.$router.push(
        `/device/edit${filterQuery({
          id,
          type
        })}`
      );
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale;
    }
  },
  watch: {
    lang() {
      // this.getOrgList();
    }
  }
};
</script>

<style lang="less" scoped>
.content-container {
  .top {
    height: 60px;
  }
  .name-input {
    width: 160px;
  }
  .title {
    margin-right: 20px;
  }
}
</style>
