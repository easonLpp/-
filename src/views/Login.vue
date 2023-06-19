<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" type="text" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script  setup>
import { reactive, ref } from "vue";
import { useUser } from "@/store/user";

import { test, doLogin,accessAdmin } from "@/api/user";

const user = useUser();
import { useRouter } from "vue-router";
const router = useRouter();
const checkUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("必须输入用户名哦"));
  }
  callback();
};

const ruleForm = reactive({
  username: "admin",
  password: "123456"
});

const rules = reactive({
  password: [{ required: true, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }]
});

const ruleFormRef = ref();

// 纯函数的好处: 只依赖外部传递的形参,和返回值, 不依赖于函数执行上下文或者闭包
const submitForm = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (valid) {
      const res = await doLogin(ruleForm.username,ruleForm.password);
      console.log(res,'响应');
      router.push('/order/order');

    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped>
.login-box {
  width: 440px;
  height: 170px;
  border: 1px solid grey;
  background: rgba(128, 128, 128, 0.1);

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  padding: 20px 20px 2px 0px;
}
</style>