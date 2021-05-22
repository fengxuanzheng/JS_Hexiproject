<template>
<div class="registerhome" >
  <el-card class="registercard">
    <div slot="header">
      <span style="font-weight: bold;font-size: larger">注册</span>
      <el-button type="primary" size="medium" @click="tologin" style="float: right">登入</el-button>
    </div>
      <el-form ref="Registerform"
               :model="RegisterformData"
                label-width="90px"
               :rules="registerVaild"
               status-icon
               :hide-required-asterisk="false"
                 label-position="left">
        <el-form-item label="用户名" class="registeritem" prop="username">
          <el-input v-model="RegisterformData.username" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="registeritem" prop="password">
          <el-input type="password" v-model="RegisterformData.password" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" class="registeritem" prop="password2">
          <el-input type="password" v-model="RegisterformData.password2" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item label="sip工位号" class="registeritem" prop="station">
          <el-input  v-model="RegisterformData.station" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" class="registeritem" >
          <el-input v-model="RegisterformData.email" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="registeritem" >
          <el-input v-model="RegisterformData.mobile" class="registerinput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="registeruser">注册</el-button>
        </el-form-item>
      </el-form>

  </el-card>
</div>
</template>

<script>
export default {
  name: "Register",
  data() {
    let vailidUsername=async (rule, value, callback)=>{
      var  req= await this.axios.get("/isusername",{params:{username:this.RegisterformData.username}})
      this.isRegisterusername=req.data
      console.log("返回对象"+ this.isRegisterusername)

      if (value==='')
      {
        callback(new Error("不能为空"))
      }
      else if (this.isRegisterusername)
      {
        callback(new Error("用户名已注册"))
      }
      else {
        callback()
      }
    }
    let validPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.RegisterformData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    let validEmail= (rule,value,callback)=>{
      let emailformat=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
     /*  if (value==='')
      {
        callback(new Error("不能为空"))
      }*/
        if (!emailformat.test(value))
       {
         callback(new Error("输入邮箱格式不正确"))
       }
       else
       {
         callback()
       }
    }
          return {
      isRegisterusername:true,
            RegisterformData :{
              username: "",
              password: "",
              password2: "",
              station:"",
              email: "",
              mobile: ""
            },
            registerVaild: {
              username: [{validator:vailidUsername,trigger:'blur'}],
              password: [{ min: 6, max: 12, message: '长度在 6到 12 个字符', trigger: 'blur' },
                         {required: true, message: '不能为空', trigger: 'blur'}],
              password2: [{validator: validPassword2, trigger: 'blur' }],
              station:[{required: true, message: '不能为空', trigger: 'blur'}],
              email: [{validator: validEmail, trigger: 'blur' }],

            }
          }
        },
        methods: {
          registeruser(){
            if (!this.isRegisterusername) {
              this.axios.post("/registerUser", this.RegisterformData)
                  .then(req => {
                    if (req.data === "success") {
                      this.$message.success("注册成功")
                      this.$router.push("/")
                    }
                  })
            }


  },
    tologin()
    {
      this.$router.push("/")
    }

  },

}
</script>

<style scoped>
.registercard{
  width: 25%;
  float: left;
  margin: 13% auto auto 35%;
}
.registerinput{
  width: 70%;
  float: left;
}
.registeritem{
  margin: auto auto 15px 20%;
}
.registerhome{
  height: 100%;
  width: 100%;
  margin: 0 0;
  background-image: url("../assets/register.jpg");
  background-size: cover;
}
</style>