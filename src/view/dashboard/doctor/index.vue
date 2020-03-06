<style lang="less" scoped>
.dashboard {
  min-height: 100%;
  font-family: PingFangSC-Regular, PingFang SC;
  background: linear-gradient(
    180deg,
    rgba(36, 93, 168, 1) 0%,
    rgba(18, 39, 88, 1) 100%
  );
  white-space: nowrap;
  word-break: break-all;
  box-sizing: border-box;
  padding: 15px;
  color: #000;
}
.left-sider,
.right-sider,
.content-wrap {
  background: #fff;
  overflow: hidden;
}
.left-sider {
  border-radius: 20px;
}
.check-detail-text {
  font-size: 12px;
  color: #ccc;
}
.doctor-info-wrap {
  text-align: center;
  padding: 40px 10px 0;
  margin-bottom: 60px;
  .ant-avatar {
    margin-bottom: 10px;
  }
  .name {
    font-size: 16px;
    margin-bottom: 10px;
  }
  .time {
    font-size: 12px;
    color: #ccc;
    margin-bottom: 10px;
  }
}
.today-todo {
  padding: 0 20px;
  .title {
    font-size: 20px;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    margin-bottom: 30px;
    font-weight: bold;
  }
  .tag {
    font-size: 12px;
    margin-bottom: 7px;
    a {
      color: #ccc;
    }
  }
  .follow-todo {
    margin-bottom: 25px;
  }
  .box {
    background: #f5f8fe;
    padding: 10px;
    border-radius: 10px;
    font-size: 12px;
    .ant-row-flex {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .disease {
      font-weight: 500;
    }
  }
  .progress-wrap {
    .text {
      margin-top: 10px;
      font-size: 12px;
      color: #ccc;
    }
  }
}
.content-wrap {
  margin: 0 10px;
  border-radius: 20px 0 0 20px;
  .title {
    padding: 20px 10px 20px 20px;
    font-size:20px;
  }
  .ant-table-wrapper {
    margin-left: 10px;
  }
}
.right-sider {
  border-radius: 0 20px 20px 0;
  padding: 18px 15px 0;
  .coperation-data-wrap {
    background: #f5f8fe;
    text-align: center;
    border-radius: 15px;
    font-size: 12px;
    padding: 20px;
    .title {
      margin-bottom: 30px;
      font-size: 14px;
      font-weight: 600;
    }
    .data-total {
      color: #ccc;
      margin-bottom: 20px;
      .data {
        font-size: 20px;
        font-weight: bold;
        color: #3770e6;
        margin-bottom: 7px;
      }
    }
    .progress-wrap {
      margin-bottom: 2px;
      font-size:0;
    }
  }
  .concat-wrap{
    margin-top:80px;
    text-align:center;
    .title{
      font-size:16px;
      margin-bottom:15px;
    }
    .list{
      margin-bottom:20px;
    }
    .concat-item{
      background: #f5f8fe;
      border-radius: 10000px;
      height:30px;
      line-height: 30px;
      font-size:12px;
      padding:6px;
      box-sizing: content-box;
      margin-bottom:10px;
      flex-wrap:nowrap;
      .content{
        margin-left:10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width:calc(100% - 30px);
        text-align: left;
      }
    }
  }
  .patient-btn{
    margin:80px auto 20px;
    width:200px;
    display: block;

  }
}
</style>

<template>
  <a-layout class="dashboard">
    <a-layout-sider class="left-sider" width="20%">
      <div class="doctor-info-wrap">
        <a-avatar :size="64" icon="user" />
        <p class="name">早上好，王医生</p>
        <p class="time">2019/11/20 08:30:22</p>
        <a-button type="primary">个人信息管理</a-button>
      </div>
      <div class="today-todo">
        <p class="title">今日待办</p>
        <div class="follow-todo">
          <a-row class="tag" type="flex" justify="space-between">
            <p>今日待随访：5人</p>
            <router-link class="check-detail-text" to="/">查看 <a-icon type='right'></a-icon>
            </router-link>
          </a-row>
          <div class="box">
            <a-row type="flex" justify="space-between">
              <p class="disease">二级高血压：<a-avatar :size="20" icon='user'></a-avatar>
              </p>
              <p>3人</p>
            </a-row>
            <a-row type="flex" justify="space-between">
              <p class="disease">糖尿病：<a-avatar :size="20" icon='user'></a-avatar>
              </p>
              <p>3人</p>
            </a-row>
            <a-row type="flex" justify="space-between">
              <p class="disease">其它：无</p>
              <p>3人</p>
            </a-row>
          </div>
        </div>
        <div class="other-todo">
          <a-row class="tag" type="flex" justify="space-between">
            <p>今日待随访：5人</p>
            <router-link class="check-detail-text" to="/">查看 <a-icon type='right'></a-icon>
            </router-link>
          </a-row>
          <div class="progress-wrap">
            <a-progress strokeWidth="6" :showInfo="false" :percent="50" />
            <a-row class="text" type="flex" justify="space-between">
              <span>当前已完成150</span>
              <span>本月目标300</span>
            </a-row>
          </div>
        </div>
      </div>
    </a-layout-sider>
    <a-layout-content class="content-wrap" width="60%">
      <a-row class="title" type="flex" justify="space-between">
        <p>体征异常（30人）</p>
        <router-link class="check-detail-text" to="/">
          查看 <a-icon type='right'></a-icon>
        </router-link>
      </a-row>
      <a-table rowKey="id" :scroll="{ x:true }" :columns="abnormalColums" :pagination="false"
        :dataSource="abnormalData">
      </a-table>
    </a-layout-content>
    <a-layout-sider class="right-sider" width="20%">
      <div class="coperation-data-wrap">
        <p class="title">签约数据总览</p>
        <a-row class="data-total" type="flex" justify="space-between">
          <div>
            <p class="data">888</p>
            <p class="tag">区域居民总数</p>
          </div>
          <div>
            <p class="data">562</p>
            <p class="tag">已签约</p>
          </div>
        </a-row>
        <div class="disease-box">
          <div class="progress-wrap">
            <a-progress class="my-progress" strokeWidth="6" strokeColor="#96CF26" :showInfo="false"
              :percent="50"></a-progress>
            <a-row type="flex" justify="space-between">
              <span>高血压</span>
              <span>122</span>
            </a-row>
          </div>
          <div class="progress-wrap">
            <a-progress class="my-progress" strokeWidth="6" strokeColor="#F4AD5C" :showInfo="false"
              :percent="50"></a-progress>
            <a-row type="flex" justify="space-between">
              <span>高血糖</span>
              <span>122</span>
            </a-row>
          </div>
          <div class="progress-wrap">
            <a-progress class="my-progress" strokeWidth="6" trokeColor="#EC7B60" :showInfo="false"
              :percent="50"></a-progress>
            <a-row type="flex" justify="space-between">
              <span>其他</span>
              <span>122</span>
            </a-row>
          </div>
        </div>
      </div>
      <div class="concat-wrap">
        <p class="title">患者咨询</p>
        <div class="list">
          <a-row class="concat-item" type="flex" align="middle">
            <a-avatar size="20" icon="user"></a-avatar>
            <p class="content">hello,医生</p>
          </a-row>
          <a-row class="concat-item" type="flex" align="middle">
            <a-avatar size="20" icon="user"></a-avatar>
            <p class="content">hello,医生医生医生医生医生医生医生医生医生医生</p>
          </a-row>
          <a-row class="concat-item" type="flex" align="middle">
            <a-avatar size="20" icon="user"></a-avatar>
            <p class="content">hello,医生</p>
          </a-row>
        </div>
        <a-badge :count="5">
          <a-button type="primary">更多消息</a-button>
        </a-badge>
      </div>
      <a-button class="patient-btn" type="primary">患者管理</a-button>
    </a-layout-sider>
  </a-layout>
</template>

<script>
export default {
  name: "doctorDashboard",
  data() {
    return {
      // scrollY:400,
      abnormalData: [
        {
          id: 1,
          time: "2-19 09:12",
          name: "姓名1",
          sex: 1,
          age: 32,
          disease: "高血压 | 糖尿病",
          bloodpressure: "120/80",
          bloodsugar: 5.3
        }
      ],
      abnormalColums: [
        {
          title: "时间",
          dataIndex: "time",
          key: "time"
          // slots: { title: "customTitle" }
        },
        {
          title: "患者姓名",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "性别",
          dataIndex: "sex",
          key: "sex"
        },
        {
          title: "年龄",
          key: "age",
          dataIndex: "age"
        },
        {
          title: "疾病",
          dataIndex: "disease",
          key: "disease"
        },
        {
          title: "血压（mmHg）",
          dataIndex: "bloodpressure",
          key: "bloodpressure"
        },
        {
          title: "血糖（mmol/L）",
          dataIndex: "bloodsugar",
          key: "bloodsugar"
        }
      ]
    };
  },
  mounted() {}
};
</script>
