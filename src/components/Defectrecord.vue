<template>
<div>
  <el-card class="el-card" shadow="always" :body-style="bodystyle">
    <div slot="header">
      <el-button size="small" type="danger" @click="carTypeVisible=true" style="float: left;margin-top: 25px;font-size: 13px">添加自定义车型</el-button>
      <span>车型问题填报表</span>
    </div>

  <el-form ref="Defectrecordform"
           :model="DefectrecordtformData"
           :rules="defectrecordrules"
           label-position="left"
           :status-icon="true">
    <el-form-item label="VIN" prop="vin" >
      <el-row type="flex" justify="center" gutter="0">
        <el-col  span="22">
          <el-input v-model="DefectrecordtformData.vin" autofocus></el-input>
        </el-col>
        <el-col class="el-col" span="2" >
        </el-col>
      </el-row>
      <span class="outspan">{{this.errorvin}}</span>
    </el-form-item>

    <el-form-item label="车型" prop="carType">
      <el-select v-model="DefectrecordtformData.carType" placeholder="请选择" :allow-create="true" :filterable="true" clearable>
        <el-option
            v-for="item in carTypedata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
          <span >{{this.errorcarType}}</span>

    </el-form-item>
    <el-form-item label="故障状态" prop="defectStatus">
      <el-select v-model="DefectrecordtformData.defectStatus" placeholder="请选择" @change="selectValues">
        <el-option
            label="合格"
            value="合格">
        </el-option>
        <el-option
            label="不合格"
            value="不合格">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errordefectStatus}}</span>
    </el-form-item>
    <el-form-item label="sip工位号" prop="station">
      <el-select v-model="DefectrecordtformData.station" placeholder="请选择" :allow-create="true" :filterable="true" clearable>
        <el-option
            v-for="item in carstationdata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span >{{this.errorcarType}}</span>
          <span >{{this.errorstation}}</span>
    </el-form-item>
    <el-form-item label="时间" prop="timestamp">
          <el-date-picker
              v-model="DefectrecordtformData.timestamp"
              type="datetime"
              editable
              clearable
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions">
          </el-date-picker>
      <span class="outspan">{{this.errortimestamp}}</span>
    </el-form-item>
    <el-form-item label="用户名" prop="username">
      <el-row type="flex" justify="center">
        <el-col span="22" >
          <el-input v-model="DefectrecordtformData.username"></el-input>
        </el-col>
        <el-col span="2" class="el-col">
        <span>{{this.errorusername}}</span>
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item label="故障名称" prop="defectName">
      <el-row type="flex" justify="center">
        <el-col span="22" >
          <el-input class="el-input" v-model="DefectrecordtformData.defectName" :disabled="selectdisvaild"></el-input>
        </el-col>
        <el-col span="2" class="el-col">
          <span>{{this.errordefectName}}</span>
        </el-col>
      </el-row>

    </el-form-item>

    <el-form-item label="缺陷类别" prop="type">

      <el-select v-model="DefectrecordtformData.type" placeholder="请选择" :allow-create="true" :filterable="true" :disabled="selectdisvaild" clearable>
        <el-option
            v-for="item in typedata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errortype}}</span>
    </el-form-item>
    <el-form-item label="部位分类" prop="defectPart">

      <el-select v-model="DefectrecordtformData.defectPart" placeholder="请选择" :allow-create="true" :filterable="true" :disabled="selectdisvaild" clearable>
        <el-option
            v-for="item in defectpartdata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errordefectPart}}</span>
    </el-form-item>
    <el-form-item label="具体部位" prop="specificPart">
      <el-select v-model="DefectrecordtformData.specificPart" placeholder="请选择" :allow-create="true" :filterable="true" :disabled="selectdisvaild" clearable>
        <el-option
            v-for="item in specificpartdata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errorspecificPart}}</span>
    </el-form-item>
    <el-form-item label="故障" prop="defectMode">
      <el-select v-model="DefectrecordtformData.defectMode" placeholder="请选择" :allow-create="true" :filterable="true" :disabled="selectdisvaild" clearable>
        <el-option
            v-for="item in defectmoddata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errordefectMode}}</span>
    </el-form-item>
    <el-form-item label="具体故障" prop="remark">
      <el-row type="flex" justify="center">
        <el-col span="22" class="el-col"></el-col>
        <el-col span="2" class="el-col"></el-col>
      </el-row>
      <el-select v-model="DefectrecordtformData.remark" placeholder="请选择" :allow-create="true" :filterable="true" :disabled="selectdisvaild" clearable>
        <el-option
            v-for="item in remarkdata"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <span class="outspan">{{this.errorremark}}</span>
    </el-form-item>

    <el-form-item label="状态" prop="status" >
      <el-row type="flex" justify="center">
        <el-col span="22" >
          <el-input v-model="DefectrecordtformData.status"></el-input>
        </el-col>
        <el-col span="2" class="el-col">
          <span>{{this.errorstatus}}</span>
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item label="备注" prop="comments">
      <el-row type="flex" justify="center">
        <el-col span="22" >
          <el-input v-model="DefectrecordtformData.comments"></el-input>
        </el-col>
        <el-col span="2" class="el-col">
          <span>{{this.errorcomments}}</span>
        </el-col>
      </el-row>

    </el-form-item>
    <el-form-item label="故障图片" >
      <el-upload
          ref="upload"
          name="defectPhoto"
          :data="updatanum"
          with-credentials
          show-file-list
          accept=".jpg,.png"
          :limit="4"
          action=""
          :drag="true"
          :multiple="true"
          :file-list="fileLists"
          :on-success="updatasuccess"
          :before-upload="beforeupdata"
          list-type="picture"
          :auto-upload="false"
          :http-request="uploaddefectPhoto">
        <el-button size="medium" type="primary" >上传文件</el-button>
        <div slot="tip" class="el-upload__tip" style="margin: 0 0 0 80px">只能上传jpg/png文件，且不超过4Mb,最多四张</div>
        <div slot="tip" class="el-upload__tip" style="margin: 0 0 0 80px">图片为可选,四张图片分别对于四种不同缺陷问题,如果插入任意一个非上传类型文件,默认删除</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="success" @click="insertdefectrecord">提交</el-button>
      <el-button type="info" @click="restform">重置</el-button>
    </el-form-item>
  </el-form>
  </el-card>

  <el-dialog
      title="sip工位号及其车型自定义"
      :visible.sync="carTypeVisible"
      width="30%"
      :before-close="handleClose">
    <el-tabs  type="card" stretch  value="添加">
      <el-tab-pane label="添加" name="添加">
        <el-card class="el-inoutcard" shadow="always" :body-style="{padding: '20px' }">
          <div slot="header">
            <span>可以一次性添加多个车型和sip工位号,添加多个时候需要使用"-"这个分割符号分开.列如:xxx-xxx</span>
          </div>
        <el-form ref="carTypeform"
                 :model="carTypeData"
                 label-position="left">
          <el-form-item label="车型添加">
            <el-input v-model="carTypeData.addcarType"></el-input>
          </el-form-item>
          <el-form-item label="sip工位号添加">
            <el-input v-model="carTypeData.addcarstation"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDefecte">确 定</el-button>
            <el-button @click="carTypeVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="删除" name="删除">

        <el-card class="el-inoutcard" shadow="always" :body-style="{padding: '20px' }">
          <el-form ref="delectcarTypeform"
                   :model="deletecarTypeData"
                   label-position="left">
            <el-form-item label="车型删除">
              <el-select v-model="deletecarTypeData.delectcarType" multiple placeholder="请选择" :allow-create="true" :filterable="true">
                <el-option
                    v-for="item in carTypedata"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="sip工位号删除">
              <el-select v-model="deletecarTypeData.delectcarstation" multiple placeholder="请选择" :allow-create="true" :filterable="true">
                <el-option
                    v-for="item in carstationdata"
                    :key="item"
                    :label="item"
                    :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="delectcartypedata">确 定</el-button>
              <el-button @click="carTypeVisible = false">取 消</el-button>
            </el-form-item>
          </el-form>
        </el-card>

      </el-tab-pane>
    </el-tabs>



  </el-dialog>
</div>
</template>

<script>
import Qs from "qs";

export default {
  name: "Defectrecord",
  inject:["reload"],
  data() {
    let vindefect= async (rule,value,callback)=>{
      let vild=/^[A-Z0-9]{17}$/;
      console.log(vild.test(value))

      if (!vild.test(value))
      {
        callback(new Error("vin码必须是普通字符或数字不能含中文或特殊字符,长度为17位"))
      }

      else
      {
        new callback()
      }
    }

    let validDefect= (rule,value,callback)=>{

        if (!this.selectdisvaild&&value==='')
       {
         callback(new Error("不能为空"))
       }

      else
      {
        callback()
      }
    }
    return {
      typedata:[],
      defectpartdata:[],
      specificpartdata:[],
      defectmoddata:[],
      remarkdata:[],
      carTypedata:[],
      carstationdata:[],
      carTypeVisible:false,
      isupdataphoto:false,
      retureid:0,
      fileLists:[],
      updatanum:{
        getid:""
      },
      DefectrecordtformData: {
        vin: "",
        carType:"",
        defectStatus:"不合格",
        station: "",
        timestamp: "",
        type: "",
        defectPart: "",
        specificPart: "",
        defectMode: "",
        remark: "",
        defectName: "",
        status: "",
        username: "",
        comments: "",
      },
      carTypeData:{
        addcarType:"",
        addcarstation:""
      },
      deletecarTypeData:{
        delectcarType:"",
        delectcarstation:""
      },
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      defectrecordrules:{
        vin: [ { validator: vindefect, trigger: 'blur' }],
        station: [ { required: true, message: '不能为空', trigger: 'blur' }],
        timestamp: [ { required: true, message: '不能为空', trigger: 'blur' }],
        type: [{ validator:validDefect, trigger: 'blur' }],
        defectPart: [{ validator:validDefect, trigger: 'blur' }],
        specificPart: [{ validator:validDefect, trigger: 'blur' }],
        defectMode: [{ validator:validDefect, trigger: 'blur' }],
        remark: [{ validator:validDefect, trigger: 'blur' }],
        defectName: [{  validator:validDefect, trigger: 'blur' }],
        username: [{ required: true, message: '不能为空', trigger: 'blur' }],
        carType:[{ required: true, message: '不能为空', trigger: 'blur' }],
        defectStatus:[{ required: true, message: '不能为空', trigger: 'blur' }]

      },
      errorvin: "",
      errorstation: "",
      errortimestamp: "",
      errortype: "",
      errordefectPart: "",
      errorspecificPart: "",
      errordefectMode: "",
      errorremark: "",
      errordefectName: "",
      errorstatus: "",
      errorusername: "",
      errorcomments: "",
      errordefectStatus:"",
      errorcarType:"",


      selectdisvaild:false,
      isvin:false,

      bodystyle:{

      }


  }

  },
  methods:{
    gettypedata()
    {
      this.axios.get("/gettype")
      .then(req=>{
        if (req.data.message==="用户未登入")
        {
          this.$router.push("/")
          return false
        }
        this.typedata=req.data
      })
    },
    insertdefectrecord(){
      this.$refs.Defectrecordform.validate((valid=>{
        if (valid)
        {
          this.axios.post("/insertDefectrecord",this.DefectrecordtformData)
              .then(req=>{
                this.retureid=req.data.getid
                this.errorvin=req.data.vin
                this.errorstation=req.data.station
                this.errortimestamp=req.data.timestamp
                this.errortype=req.data.type
                this.errordefectPart=req.data.defectPart
                this.errorspecificPart=req.data.specificPart
                this.errordefectMode=req.data.defectMode
                this.errorremark=req.data.remark
                this.errordefectName=req.data.defectName
                this.errorstatus=req.data.status
                this.errorusername=req.data.username
                this.errorcomments=req.data.comments
                this.errorcarType=req.data.carType
                this.errordefectStatus=req.data.defectStatus
                if (req.data.datas==="success")
                {
                  this.$notify({
                    title: '提交信息',
                    message: '车型问题报表提交成功',
                    type: 'success',
                    showClose:true
                  })


                }
                if (this.retureid!==0 && req.data.datas==="success")
                {
                  this.insertphoto()
                }
                if (req.data.datas!="success")
                {
                  this.$message.error("后台校验失败,请检查表单输入是否有误")
                }
                if (req.data.datas===null)
                {
                  this.$message.error("vin重复")
                }
              })
        }
        else {
          this.$message.error("表单输入格式不对,校验失败")
        }
      }))

    },
    uploaddefectPhoto(file){

      this.formDate.append('defectPhoto', (file.file));
    },

    insertphoto(){
        this.formDate = new FormData()
        this.updatanum.getid=this.retureid

        this.$refs.upload.submit();
      this.formDate.append('getid', this.retureid);
      let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            }}
          if (this.isupdataphoto){
            this.axios.post("/insertPhoto", this.formDate,config).then( res => {
             if (res.data==="success")
             {
               this.$message.success('车型图标提交成功');

               setTimeout(() =>{
                 this.$router.go(0);
               },1000);


             }
            })
          }
          else {

            setTimeout(() =>{
              this.$router.go(0);
            },1000);
          }




          },
    beforeupdata(file){
      console.log("上传的文件"+file)
      if (file)
      {
        const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 4;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是PNG或JPG格式!');

        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过4MB!');
        }

        this.isupdataphoto=isJPG&&isLt2M
        return isJPG&&isLt2M
      }

    },
    updatasuccess(response)
    {
     if (response==="success")
     {

       this.$message.success("车型图片报表提交成功")

     }

    },
    restform()
    {
      this.$refs.Defectrecordform.resetFields()
    },
    getdefectpartdata()
    {
      this.axios.get("/getdefectpart")
          .then(req=>{
            this.defectpartdata=req.data
          })
    },
    getdefectmodedata()
    {
      this.axios.get("/getdefectmod")
          .then(req=>{
            this.defectmoddata=req.data
          })
    },
    getspecitpartdata()
    {
      this.axios.get("/getsecifpart")
          .then(req=>{
            this.specificpartdata=req.data
          })
    },
    getremarkdata()
    {
      this.axios.get("/getremark")
          .then(req=>{
            this.remarkdata=req.data
          })
    },
     getDefectrecordUser()
    {
     this.axios.get("/getusrStatus")
      .then(req=>{
        this.DefectrecordtformData.username=req.data.user
        this.DefectrecordtformData.station=req.data.station
      })

    },
    getnewdatatime(){
      this.DefectrecordtformData.timestamp=new Date()
    },
    getFormatDate() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentDate = date.getFullYear() + "-" + month + "-" + strDate
          + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      this.DefectrecordtformData.timestamp=currentDate

    },
    selectValues(value)
    {
      if (value==="不合格")
      {
        this.selectdisvaild=false;
      }
      else{
        this.selectdisvaild=true;
      }
    },
    addDefecte(){
      this.axios.get("/addcartType",{params:{carTypeList:this.carTypeData.addcarType,carstation:this.carTypeData.addcarstation}});
      this.getcarType();
      this.carTypeVisible=false;
      this.reload();

    },

    getcarType(){
      this.axios.get("/getcartType")
      .then(req=>
      {
        this.carTypedata=req.data.carType
        this.carstationdata=req.data.carstation
      })
    },
    delectcartypedata(){
      this.axios.get("/delectcartType",{params:{delectcarTypeList:this.deletecarTypeData.delectcarType,delectcarstationList:this.deletecarTypeData.delectcarstation},
        paramsSerializer: function(params) {
          return Qs.stringify(params, {arrayFormat: 'repeat'})
        }});
      console.log(this.deletecarTypeData.delectcarType)
      this.getcarType();
      this.carTypeVisible=false;
      this.reload();

    }

  },
  created() {
    this.gettypedata()
    this.getdefectmodedata()
    this.getdefectpartdata()
    this.getspecitpartdata()
    this.getremarkdata()
    this.getDefectrecordUser()
   this.getFormatDate()
    this.getcarType()
  }
}
</script>

<style scoped>
 .el-col span{
  font-weight: bold;
  color: crimson;
}
 .el-card{
   width: 60%;
   margin: 0 auto;

 }
 .outspan{
   font-weight: bold;
   font-size: small;
   color: crimson;
 }
 .el-inoutcard{
   width: 70%;
   margin: 0 auto;


 }

</style>