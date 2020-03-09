<template>
  <div class="main">
    <a-row class="content-container">
      <bread-crumb>
        <template slot="right-btn">
          <a-button type="primary" @click="gotoEdit">新增患者</a-button>
        </template>
      </bread-crumb>
      <a-row type="flex" justify="space-between" align="middle" class="top">
        <a-row type="flex">
          <div class="title">共200名患者</div>
        </a-row>
        <a-row>
          <a-input placeholder="请输入患者姓名" class="name-input" @change="nameChange" />
        </a-row>
      </a-row>
      <a-row>
        <a-table :pagination="pagination" :columns="columns" :dataSource="list" :loading="loading"
          rowKey="id">
          <a-row slot="sex" slot-scope="sex">
            {{sex===1?'男':'女'}}
          </a-row>
          <a-row slot="option" slot-scope="info">
            <a-button @click="gotoDetail(info)">{{$t('common.check')}}</a-button>
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
          name: "患者1",
          sex: 1,
          age: 29,
          disease: "高血压 | 糖尿病",
          bloodPressure: "130/99",
          bloodSugar: 5.3,
          depometer: 5000,
          heart: 63,
          bmi: 12,
          sleep: "8h"
        },
        {
          id: 2,
          name: "患者2",
          sex: 2,
          age: 29,
          disease: "高血压 | 糖尿病",
          bloodPressure: "130/99",
          bloodSugar: 5.3,
          depometer: 5000,
          heart: 63,
          bmi: 12,
          sleep: "8h"
        }
      ],
      columns: [
        {
          title: this.$t("patients.name"),
          dataIndex: "name"
        },
        {
          title: this.$t("common.sex"),
          dataIndex: "sex",
          scopedSlots: { customRender: "sex" }
        },
        {
          title: this.$t("common.age"),
          dataIndex: "age"
        },
        {
          title: this.$t("common.disease"),
          dataIndex: "disease"
        },
        {
          title: `${this.$t("common.bloodPressure")}(mmHg)`,
          dataIndex: "bloodPressure"
        },
        {
          title: `${this.$t("common.bloodSugar")}(mmol/L)`,
          dataIndex: "bloodSugar"
        },
        {
          title: this.$t("common.depometer"),
          dataIndex: "depometer"
        },
        {
          title: this.$t("common.heart"),
          dataIndex: "heart"
        },
        {
          title: "BMI",
          dataIndex: "bmi"
        },
        {
          title: this.$t("common.sleep"),
          dataIndex: "sleep"
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
    gotoEdit(){
      this.$router.push(
        `/patients/edit`
      );
    },
    gotoDetail(data = {}) {
      let { id } = data;
      let { organId, teamId, doctorId } = this.$route.query;
      this.$router.push(
        `/patients${filterQuery({
          organId,
          teamId,
          doctorId,
          patientId: id
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
