<template >
  <div class="home">
   <el-card shadow="always" class="homecard">
     <div slot="header">
       <span style="font-weight: bold;font-size: larger">登入</span>
       <el-button type="primary" size="medium" @click="toregister" style="float: right">注册</el-button>
     </div>
     <el-form ref="loginuser"
              :model="LoginformData"
              :rules="Usernamerules"
               label-width="80px">
       <el-form-item label="用户名"
                     align="center"
                    class="homeitem"
                    prop="username">
         <el-input v-model="LoginformData.username" class="homeinput"></el-input>
       </el-form-item>
       <el-form-item label="密码"
                     class="homeitem">
         <el-input type="password" v-model="LoginformData.password" class="homeinput"></el-input>
       </el-form-item>
       <el-form-item label="验证码"
                     align="center">
         <el-input class="homeinput" v-model="LoginformData.kapVaild"></el-input>
         <el-image fit="contain" :src="this.kaptchaurl" @click="getnewkaptchaurl"></el-image>
       </el-form-item>
       <el-form-item>
         <el-button type="success" style="height: 60px;width: 100px;margin: 0 auto" @click="loginform">登入</el-button>
       </el-form-item>
     </el-form>
   </el-card>
  </div>
</template>

<script>

export default {
  name: 'Home',
  inject:["reload"],
  data(){
    let vailidLoginname=async (rule, value, callback)=>{
      var  req= await this.axios.get("/isusername",{params:{username:this.LoginformData.username}})
      this.Loginusername=req.data
      console.log("返回对象"+ this.Loginusername)

      if (value==='')
      {
        callback(new Error("不能为空"))
      }
      else if (!this.Loginusername)
      {
        callback(new Error("用户名未注册"))
      }
      else {
        callback()
      }
    }
    return{
      LoginformData:{
        username:"",
        password:"",
        kapVaild:""
      },
      kaptchaurl:"http://localhost:8088/HexiProject/kaptcha",
      Loginusername:false,
      Usernamerules:{
        username:[{validator:vailidLoginname,trigger:'blur'}]
      }
    }
  },
  methods:{
    loginform(){
      this.axios.get("/loginuser",{params:{username:this.LoginformData.username,password:this.LoginformData.password,kapVaild:this.LoginformData.kapVaild}})
          .then(req=>
          {
            if (req.data==="success")
            {
              this.$message.success("登入成功")
              this.$router.push("/home")
            }
            else {
              this.$message.error(req.data)
            }
          })
    },
    getnewkaptchaurl(){
      this.reload()
    },
    toregister()
    {
      this.$router.push("/register")
    }
  },



}
</script>
<style scoped>
.homecard{
  width: 30%;
  float: left;
  margin: 19% auto auto 38%;

}
.homeinput{
  width: 70%;
  float: left;
}
/*.homeitem{
  margin: auto auto 15px 20%;
}*/
.home{
  height: 100%;
  width: 100%;
  margin: 0 0;
  background-image: url("../assets/backgourd.jpg");
  background-size: cover;
}
</style>