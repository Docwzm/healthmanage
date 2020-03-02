<template>
  <div class="content-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="所属机构">
        <a-input v-decorator="[
          'organ',
          {
              initialValue:formData.organ,
              rules: [{
              required: true, message: '请输入所属机构',
            }]
          }
        ]" :disabled="true" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="所属团队">
        <a-input v-decorator="[
          'organ',
          {
              initialValue:formData.team,
              rules: [{
              required: true, message: '请输入所属团队',
            }]
          }
        ]" :disabled="true" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="团队联系人">
        <a-input v-decorator="[
          'organ',
          {
              initialValue:formData.concatPerson,
              rules: [{
              required: true, message: '请输入团队联系人',
            }]
          }
        ]" :disabled="true" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="联系电话">
        <a-input v-decorator="[
          'organ',
          {
              initialValue:formData.phone,
              rules: [{
              required: true, message: '请输入联系电话',
            }]
          }
        ]" :disabled="true" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="医生账号">
        <a-input v-decorator="[
          'username',
          {
              initialValue:formData.username,
            rules: [{
              required: true, message: '请输入医生账号',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入医生账号" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="密码">
        <a-input v-decorator="[
          'password',
          {
              initialValue:formData.password,
            rules: [{
              required: true, message: '请输入密码',
            }]
          }
        ]" :disabled="disabled" type="password" placeholder="请输入密码" />
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
        organ: "",
        name: "",
        concatPerson: "",
        phone: "",
        userName: "",
        password: ""
      },
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
      this.getTeamInfo();
    }
  },
  watch: {
    id(oldVal, newVal) {
      if (newVal) {
        this.getTeamInfo();
      }
    }
  },
  methods: {
    goback() {
      this.$router.back();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    getTeamInfo() {
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