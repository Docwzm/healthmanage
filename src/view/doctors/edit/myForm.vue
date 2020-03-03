<template>
  <div class="content-container">
    <a-form :form="form">
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
        <a-button class="btn-submit" type="primary" @click="handleSubmit">
          {{id?'更新':'创建'}}
        </a-button>
        <a-button @click="goback">
          取消
        </a-button>
      </a-form-item>
      <a-form-item v-else v-bind="tailFormItemLayout">
        <a-button class="btn-submit" type="primary" @click="handleEdit">
          编辑
        </a-button>
        <a-button type="danger" @click="handleDelete">
          删除
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "check",
      formData: {
        organ: "",
        name: "",
        concatPerson: "",
        phone: "",
        userName: "",
        password: ""
      }
    };
  },
  props: {
    id: "",
    editType: "",
    delete: null,
    cancel: null,
    formItemLayout: {
      type: Object,
      default: () => ({
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        }
      })
    },
    tailFormItemLayout: {
      type: Object,
      default: () => ({
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
      })
    }
  },
  computed: {
    disabled() {
      return this.type === "check";
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created() {
    this.type = this.editType;
    if (this.id) {
      this.getDoctorInfo();
    }
  },
  watch: {
    editType(oldVal, newVal) {
      // conso
      this.type = newVal;
    },
    id(oldVal, newVal) {
      if (newVal) {
        this.getDoctorInfo();
      }
    }
  },
  methods: {
    handleEdit() {
      this.type = "edit";
    },
    handleDelete() {
      let content = "机构中有团队成员，无法删除机构";
      // content "确定删除？"
      this.$warning({
        content,
        cancelText: "取消",
        okText: "确定",
        onOk: () => {
          if (this.delete) {
            this.delete();
          } else {
            this.$router.back();
          }
        },
        onCancel: null
      });
    },
    goback() {
      this.form.resetFields();
      if (this.cancel) {
        this.type = "check";
        this.cancel();
      } else {
        this.$router.back();
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        }
      });
    },
    getDoctorInfo() {
      this.formData = {
        name: "fdd"
      };
    }
  }
};
</script>

<style scoped lang="less">
.parent {
  margin-bottom: 20px;
}
.btn-submit {
  margin-right: 20px;
}
</style>