<template>
  <div class="content-container">
    <a-form :form="form" @submit="handleSubmit">
      <a-row type="flex">
        <a-col :span="9">
          <a-form-item v-bind="formItemLayout" label="姓名">
            <a-input v-decorator="[
          'name',
          {
              initialValue:formData.name,
              rules: [{
              required: true, message: '请输入姓名',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入姓名" />
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
          <a-form-item v-bind="formItemLayout" label="性别">
            <a-select v-decorator="[
          'sex',
          {
              initialValue:formData.sex,
              rules: [{ required: true, message: '请选择性别' }]
        }]" :disabled="disabled" placeholder="请选择性别">
              <a-select-option value="1">男</a-select-option>
              <a-select-option value="2">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="出生日期">
            <a-date-picker v-decorator="[
        'bornDate',
         {
          initialValue:formData.bornDate,
          rules: [{ required: true, message: '请选择出生日期' }]
        }]" :disabled="disabled" placeholder="请选择出生日期" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="身高（cm）">
            <a-input v-decorator="[
          'height',
          {
              initialValue:formData.height,
              rules: [{
              required: true, message: '请输入身高',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入身高" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="体重（kg）">
            <a-input v-decorator="[
          'weight',
          {
              initialValue:formData.weight,
              rules: [{
              required: true, message: '请输入体重',
            }]
          }
        ]" :disabled="true" placeholder="请输入体重" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="腰围（cm）">
            <a-input v-decorator="[
          'waist',
          {
              initialValue:formData.waist,
            rules: [{
              required: true, message: '请输入腰围',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入腰围" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="紧急联系人">
            <a-input v-decorator="[
          'concatPerson',
          {
              initialValue:formData.concatPerson,
            rules: [{
              required: true, message: '请输入紧急联系人',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入紧急联系人" />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="紧急联系人电话">
            <a-input v-decorator="[
          'concatPersonPhone',
          {
              initialValue:formData.concatPersonPhone,
            rules: [{
              required: true, message: '请输入紧急联系人电话',
            }]
          }
        ]" :disabled="disabled" placeholder="请输入紧急联系人电话" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item v-bind="formItemLayout2" label="嗜酒">
            <a-radio-group v-decorator="['drinkFlag',{
              initialValue:formData.drinkFlag,
              rules: [{
                required: true, message: '请选择嗜酒',
              }]
              }]">
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
            <a-form-item v-if="form.getFieldValue('drinkFlag')==1" v-bind="formItemLayout">
              <a-input v-decorator="[
          'drinkYearNum',
          {
              initialValue:formData.drinkYearNum
          }
        ]" :disabled="disabled" addonBefore="请提供" addonAfter="年" />
            </a-form-item>
          </a-form-item>
          <a-form-item v-bind="formItemLayout2" label="嗜烟">
            <a-radio-group v-decorator="['smokeFlag',{
              initialValue:formData.smokeFlag,
              rules: [{
                required: true, message: '请选择嗜烟',
              }]
              }]">
              <a-radio value="0">否</a-radio>
              <a-radio value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item v-bind="formItemLayout2" label="既往病史">
            <a-checkbox-group v-decorator="['historyDisease', {
              initialValue: formData.historyDisease,
              rules: [{
                  required: true, message: '请选择既往病史',
                }]
            }]">
              <a-checkbox value="高血压">高血压</a-checkbox>
              <a-checkbox value="糖尿病">糖尿病</a-checkbox>
              <a-checkbox value="其他">其他</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
          <a-form-item v-bind="formItemLayout2" label="家族病史">
            <a-checkbox-group v-decorator="['familyDisease', { 
              initialValue: formData.familyDisease,
                rules: [{
                  required: true, message: '请选择家族病史',
                }]
              }]">
              <a-checkbox value="高血压">高血压</a-checkbox>
              <a-checkbox value="糖尿病">糖尿病</a-checkbox>
              <a-checkbox value="其他">其他</a-checkbox>
            </a-checkbox-group>
          </a-form-item>
        </a-col>
      </a-row>

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
          sm: { span: 9 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 10 }
        }
      },
      formItemLayout2: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 17 }
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
            offset: 20
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