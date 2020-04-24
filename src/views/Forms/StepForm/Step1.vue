<!--
 * @Description:
 * @Author: sxy
 * @Date: 2020-03-18 19:06:47
 * @LastEditors: sxy
 * @LastEditTime: 2020-04-20 20:20:46
 -->
<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账号"
        />
      </a-form-item>
      <a-form-item
        label="收款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from "@/components/ReceiverAccount";
export default {
  components: { ReceiverAccount },
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  // 对象的解构赋值
  // let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
  // foo // "aaa"
  // bar // "bbb"
  methods: {
    handleSubmit() {
      // console.log(this)
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          // 这种写法合法的前提是在vuex中设置 namespaced: true,
          $store.commit({
            type: "form/saveStepFormData", //指定对应命名空间, 这样写的好处是避免方法名重复
            payload: values
          });
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style></style>
