<template>
<div class="divclass">
  <el-container class="el-container" >
    <el-header height="80px" class="el-header">
      <span class="topspan">综合管理系统</span>
      <el-dropdown style="float: right;top: 15px" @command="handleDropdown">
        <el-avatar :size="60" :src="this.photobase64"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="this.username!==''" disabled divided >{{this.username}}</el-dropdown-item>
          <el-dropdown-item v-if="this.username!==''" divided command="insertUserPhoto">用户自定义</el-dropdown-item>
          <el-dropdown-item v-if="this.username!==''" divided command="logout">登出</el-dropdown-item>
          <el-dropdown-item v-if="this.username===''" divided command="login">登入</el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside class="el-asides" width="250px">
        <el-menu
            default-active="3"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            collapse-transition
            active-text-color="#ffd04b"
             :router="true">
          <el-submenu index="1"  v-if="this.userStatus==='0'">
            <template slot="title" >
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/userManagement">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>后台权限管理</span>
              </template>
            </el-menu-item>
            </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>sip管理中心</span>
            </template>
            <el-menu-item index="/Defectlist">
              <template slot="title">
                <i class="el-icon-notebook-1"></i>
                <span>缺陷问题</span>
                </template>
            </el-menu-item>

            <el-menu-item index="/defectrecord">
              <template slot="title">
                <i class="el-icon-notebook-2"></i>
                <span>车型问题表</span>
              </template>
            </el-menu-item>

            <el-menu-item v-if="this.userStatus==='0'" index="/backgroundData">
              <template slot="title">
                <i class="el-icon-coin"></i>
                <span>车型问题后台数据库</span>
              </template>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="el-main">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>


    <el-dialog
        title="头像自定义"
        :visible.sync="UserPhotoVisible"
        width="20%"
        :before-close="handleClose">
      <el-card shadow="always" :body-style="{padding: '0px' }">
      <el-upload
          ref="userupload"
          name="photoData"
          with-credentials
          show-file-list
          drag
          accept=".jpg,.png"
          action="http://localhost:8088/HexiProject/insertuserPhoto/"
          :on-success="Usersuccess"
          :before-upload="Userbeforeupdata"
          list-type="picture"
          :auto-upload="false">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4Mb</div>
      </el-upload>
  </el-card>
      <div slot="footer" style="text-align: center">
        <el-button type="primary" @click="toloaderphoto">确 定</el-button>
        <el-button @click="UserPhotoVisible = false">取 消</el-button>
      </div>
    </el-dialog>


</div>
</template>

<script>
export default {
  name: "Container",
  inject:["reload"],

  data(){
    return{
      UserPhotoVisible:false,
      photobase64:"",
      username:'',
      userStatus:""
    }

  },
  methods:{
    handleDropdown(value){
      if (value==="logout")
      {
        this.userlogout()
        this.photobase64=""
        return false
      }
      if (value==="insertUserPhoto")
      {
        this.UserPhotoVisible=true
      }
      if (value==="login")
      {
        this.$router.push("/")
      }
    },
    userlogout(){
      this.axios.get("/logout")
      .then(req=>{
        if (req.data.message==="成功登出")
        {
          this.username=""
          this.userStatus=""
          this.reload()
        }
      })

    },
    toloaderphoto(){
      this.$refs.userupload.submit()
    },
    getphotobase64(){
      this.axios.get("/getphotobase64")
      .then(req=>{
        this.photobase64=req.data
      })
    },
    getuserStatus(){
     this.axios.get("/getusrStatus")
      .then(req=>{
        this.username=req.data.user
        this.userStatus=req.data.status
        if (req.data.message==="用户未登入")
        {
          this.username=""
          this.userStatus=""

        }
      })

    },
    Userbeforeupdata(file){
      const isUserJPG = file.type === 'image/jpeg'||file.type === 'image/png';
      const isUserLt2M = file.size / 1024 / 1024 < 4;
      if (!isUserJPG) {
        this.$message.error('上传头像图片只能是PNG或JPG格式!');

      }
      if (!isUserLt2M) {
        this.$message.error('上传头像图片大小不能超过4MB!');
      }
      return isUserJPG&&isUserLt2M
    },
    Usersuccess(req)
    {
      if (req==="success")
      {
        this.UserPhotoVisible=false
        this.getphotobase64()
        this.reload()
      }
    }
  },
  created() {
    this.getphotobase64()
    this.getuserStatus()
  }
}
</script>

<style scoped>
.el-container,.divclass{
  height: 100%;
  padding: 0;
  margin: 0;

}
.el-header{
  background-color: rgb(34, 53, 64);

}
.el-asides {
  background-color: #545c64;
}


.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 50px;
}
.topspan{
  float: left;
  font-size: 30px;
  margin: 2% 0 0 0;
  font-weight: bold;
  color: #397ba7;
}
</style>