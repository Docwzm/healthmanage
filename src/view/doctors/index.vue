<template>
  <div class="main">
    <a-row class="content-container">
      <bread-crumb></bread-crumb>
      <a-row type="flex" justify="space-between" align="middle" class="top">
        <a-row type="flex">
          <div class="title">团队一(共6名医生)</div>
          <div class="date-range">{{$t('common.dateRange')}}：2020/02/01--2020/03/01</div>
        </a-row>
        <a-row>
          <a-input :placeholder="$t('doctors.namePlaceholder')" class="name-input"
            @change="nameChange" />
          <a-range-picker @change="dateChange" />
        </a-row>
      </a-row>
      <a-row>
        <a-table :pagination="pagination" :columns="columns" :dataSource="list" :loading="loading"
          rowKey="id">
          <a-row slot="option" slot-scope="info">
            <a-button @click="gotoPatients(info)">{{$t('common.check')}}</a-button>
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
          name: "医生一",
          missionCount: 1000,
          patientCount: 100,
          selectCount: 100,
          findCount: 1000,
          manageCount: 10000,
          gfCount: 10000,
          controlCount: 200,
          ycPer: "50%"
        },
        {
          id: 2,
          name: "医生二",
          missionCount: 1000,
          patientCount: 100,
          selectCount: 100,
          findCount: 1000,
          manageCount: 10000,
          gfCount: 10000,
          controlCount: 200,
          ycPer: "50%"
        }
      ],
      columns: [
        {
          title: this.$t("doctors.name"),
          dataIndex: "name"
        },
        {
          title: this.$t("doctors.missionCount"),
          dataIndex: "missionCount"
        },
        {
          title: this.$t("common.patientCount"),
          dataIndex: "patientCount"
        },
        {
          title: this.$t("common.selectCount"),
          dataIndex: "selectCount"
        },
        {
          title: this.$t("common.findCount"),
          dataIndex: "findCount"
        },
        {
          title: this.$t("common.manageCount"),
          dataIndex: "manageCount"
        },
        {
          title: this.$t("common.gfCount"),
          dataIndex: "gfCount"
        },
        {
          title: this.$t("common.controlCount"),
          dataIndex: "controlCount"
        },
        {
          title: this.$t("common.ycPer"),
          dataIndex: "ycPer"
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
    this.getDoctorList();
  },
  methods: {
    gotoPatients(info) {
      let { id } = info;
      let { organId, teamId } = this.$route.query;
      this.$router.push(
        `/patients${filterQuery({
          organId,
          teamId,
          doctorId: id
        })}`
      );
    },
    getDoctorList() {},
    nameChange(e) {
      let value = e.target.value;
    },
    dateChange(dateArr) {
      console.log(dateArr);
    },
    onShowSizeChange(current, pageSize) {
      let pager = { ...this.pagination };
      pager.current = 1;
      this.pagination = pager;
      this.pageNum = 1;
      this.pageSize = pageSize;
      this.pageSizeChange = true;
      this.getDoctorList();
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
