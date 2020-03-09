<template>
  <div class="content-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="设备名称">
        <a-input v-decorator="[
              'name',
              {
                  initialValue:formData.name,
                  rules: [{
                  required: true, message: '请输入设备名称',
                }]
              }
            ]" :disabled="disabled" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="设备型号">
        <a-input v-decorator="[
              'deviceType',
              {
                  initialValue:formData.deviceType,
                  rules: [{
                  required: true, message: '请输入设备型号',
                }]
              }
            ]" :disabled="disabled" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="状态">
        <a-input v-decorator="[
              'status',
              {
                  initialValue:formData.status,
                  rules: [{
                  required: true, message: '请输入状态',
                }]
              }
            ]" :disabled="disabled" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="SN号（16位）">
        <a-input v-decorator="[
              'sn',
              {
                  initialValue:formData.sn,
                  rules: [{
                  required: true, message: '请输入设备sn号',
                }]
              }
            ]" :disabled="disabled" placeholder="请输入设备sn号" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="所属机构">
        <a-input v-decorator="[
              'org',
              {
                  initialValue:formData.org,
                  rules: [{
                  required: true, message: '请输入所属机构',
                }]
              }
            ]" :disabled="disabled" placeholder="请输入所属机构" />
      </a-form-item>
      <a-form-item v-bind="formItemLayout" label="设备二维码">
        <a-upload v-decorator="['upload', {
          valuePropName: 'fileList',
          getValueFromEvent: normFile,
        }]" name="logo" action="/upload.do" list-type="picture">
        </a-upload>
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
        org: "",
        sn: "",
        status: ""
      },
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 }
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
            offset: 4
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
    normFile  (e) {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    },
    goback() {
      this.$router.back();
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        console.log("Received values of form: ", values);
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