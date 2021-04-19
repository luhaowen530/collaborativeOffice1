<template>
<div>
  <el-dialog :visible="dialogVisible" width="582px">
    <template slot="title">
      <div class="resetPassword-title">
        <img src="../../assets/common/password.png" />
        密码修改
      </div>
    </template>
    <el-form :model="formData" class="reset-form-password" :rules="rules" ref="addForm" label-width="100px">
      <el-form-item label="新密码：" prop="password1" required>
        <el-input v-model="formData.password1" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码：" prop="password2" required>
        <el-input v-model="formData.password2" placeholder="请输入确认密码"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sumbit('addForm')">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { resetPassword } from "@/axios"
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    var validatePass = (rule, value, callback) => {
      if (!/^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).*$/.test(value)) {
        callback(new Error("密码大于等于8位，必须包含字母、数字和特殊字符"));
      } else {
        if (this.formData.password2 !== "") {
          this.$refs.addForm.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (!/^(?=.{8,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W).*$/.test(value)) {
        callback(
          new Error("密码大于等于8位，必须包含大、小写字母、字符和数字")
        );
      } else if (value !== this.formData.password1) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      formData: {
        password1: '',
        password2: ''
      },
      rules: {
        password1: [
          { validator: validatePass, trigger: "blur" }
        ],
        password2: [
          { validator: validatePass2, trigger: "blur" }
        ],
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('closeDialog')
    },
    sumbit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          resetPassword(this.formData).then((response) => {
            if (response.data.errCode == 0) {
              this.$message({
                message: '密码修改成功,请重新登录',
                type: 'success'
              });
              this.$emit('closeDialog')
              this.$emit('closePrompt')
            }
          })
          // this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  },
}
</script>

<style lang="scss">
.reset-form-password {
  padding: 0px 80px;

  .el-form-item__label {
    font-weight: normal;
  }
}

.resetPassword-title {
  img {
    float: left;
    width: 14px;
    height: 17px;
    margin-right: 5px;
  }
}
</style>
