<template>
  <div class="content-container">
    <div class="parent">上级机构 罗湖医院</div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="机构名称">
        <a-input v-decorator="[
          'name',
          {
              initialValue:formData.name,
            rules: [{
              required: true, message: '请输入机构名称',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入机构名称" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="机构等级">
        <a-select v-decorator="[
          'level',
          {
              initialValue:formData.level,
              rules: [{ required: true, message: '请选择机构等级' }]
        }
        ]" :disabled="disabled" placeholder="请选择机构等级">
          <a-select-option value="三级甲等">三级甲等</a-select-option>
          <a-select-option value="三级乙等">三级乙等</a-select-option>
          <a-select-option value="二级甲等">二级甲等</a-select-option>
          <a-select-option value="二级乙等">二级乙等</a-select-option>
          <a-select-option value="社区医院">社区医院</a-select-option>
          <a-select-option value="其它">其它</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="城市地区">
        <a-cascader v-decorator="[
          'city',
          {
              initialValue:formData.citys,
            rules: [{
              required: true, message: '请输入城市地区',
            }]
          }
        ]" :options="residences" :disabled="disabled" placeholder="请输入城市地区" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="详细地址">
        <a-input v-decorator="[
          'address',
          {
              initialValue:formData.address,
            rules: [{
              required: true, message: '请输入详细地址',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入详细地址" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="联系人">
        <a-input v-decorator="[
          'concatPerson',
          {
              initialValue:formData.concatPerson,
            rules: [{
              required: true, message: '请输入联系人',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入联系人" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="联系电话">
        <a-input v-decorator="[
          'phone',
          {
              initialValue:formData.phone,
            rules: [{
              required: true, message: '请输入联系电话',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入联系电话" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="机构账号">
        <a-input v-decorator="[
          'username',
          {
              initialValue:formData.username,
            rules: [{
              required: true, message: '请输入机构账号',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入机构账号" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="机构密码">
        <a-input v-decorator="[
          'password',
          {
              initialValue:formData.password,
            rules: [{
              required: true, message: '请输入机构密码',
            }]
          }
        ]" :disabled="disabled" type="password" placeholder="请输入机构密码" />
      </a-form-item>
      <a-form-item v-if="!disabled" v-bind="tailFormItemLayout">
        <a-button class="btn-submit" type="primary" html-type="submit">
          {{id?'更新':'创建'}}
        </a-button>
        <a-button @click="goback">
          取消
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        level: [],
        citys: [],
        address: "",
        concatPerson: "",
        phone: "",
        userName: "",
        password: ""
      },
      residences: [
        {
          value: "zhejiang",
          label: "Zhejiang",
          children: [
            {
              value: "hangzhou",
              label: "Hangzhou",
              children: [
                {
                  value: "xihu",
                  label: "West Lake"
                }
              ]
            }
          ]
        },
        {
          value: "jiangsu",
          label: "Jiangsu",
          children: [
            {
              value: "nanjing",
              label: "Nanjing",
              children: [
                {
                  value: "zhonghuamen",
                  label: "Zhong Hua Men"
                }
              ]
            }
          ]
        }
      ],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 5,
            offset: 3
          },
          sm: {
            span: 5,
            offset: 3
          }
        }
      }
    };
  },
  props: {
    id: "",
    editType: ""
  },
  computed: {
    disabled() {
      return this.editType === "check";
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    if (this.id) {
      this.getOrganInfo();
    }
  },
  watch: {
    id(oldVal, newVal) {
      if (newVal) {
        this.getOrganInfo();
      }
    }
  },
  methods: {
    goback() {
      this.$router.back();
    },
    valiCity(rule, value, callback, source, options) {
      var errors = [];
      return errors;
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    getOrganInfo() {
      this.formData = {
        name: "fdd"
      };
    }
  }
};
</script>

<style scoped lang="less">
.content-container {
  // margin
  padding-left: 30px;
}
.parent {
  margin-bottom: 20px;
}
.btn-submit {
  margin-right: 20px;
}
</style>