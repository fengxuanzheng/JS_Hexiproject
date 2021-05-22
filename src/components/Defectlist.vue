<template>
<div>
  <el-card class="box-card" :body-style="{ padding: '40px' } ">
    <div slot="header" class="clearfix">
      <span style="float:left">缺陷问题表</span>
      <el-button style="float: right;" type="primary" @click="DefectlistVisible=true">添加</el-button>
    </div>
  <el-table  :data="DefectlistData"
             height="680px"
             border
             style="width: 100%"
             stripe
             size="mini"
             show-header
             highlight-current-row
             :header-row-style="headerstype"
             :row-style="{height:'60px','font-size':'20px'}"
               >
    <el-table-column prop="id"
                     label="序号"
                     align="center"
    ></el-table-column>
    <el-table-column prop="type"
                     label="缺陷类别"
                     align="center"
                     ></el-table-column>
    <el-table-column prop="defectPart"
                     label="部位分类"
                     align="center"></el-table-column>
    <el-table-column prop="specificPart"
                     label="具体部位"
                     align="center"></el-table-column>
    <el-table-column prop="defectMode"
                     label="故障"
                     align="center"></el-table-column>
    <el-table-column prop="remark"
                     label="具体故障"
                     align="center"></el-table-column>
    <el-table-column>
      <template slot-scope="slot">
        <el-button type="primary" size="medium" @click="deletedefectlist(slot.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes.sync="pageSizes"
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="pagTotal">
    </el-pagination>
  </el-card>

  <el-card >

    <el-dialog
        title="缺陷添加"
        :visible.sync="DefectlistVisible"
        width="30%"

        :before-close="handleClose">
      <el-form ref="form"
               :model="Defectlistform"
               :rules="defectlistrules"
               label-width="80px"
               label-position="left">
        <el-form-item label="缺陷类别" prop="type">
          <el-input v-model="Defectlistform.type" class="diainput"></el-input>
        </el-form-item>
        <el-form-item label="部位分类" prop="defectPart">
          <el-input v-model="Defectlistform.defectPart" class="diainput"></el-input>
        </el-form-item>
        <el-form-item label="具体部位" prop="specificPart">
          <el-input v-model="Defectlistform.specificPart" class="diainput"></el-input>
        </el-form-item>
        <el-form-item label="故障" prop="defectMode">
          <el-input v-model="Defectlistform.defectMode" class="diainput"></el-input>
        </el-form-item>
        <el-form-item label="具体故障" prop="remark">
          <el-input v-model="Defectlistform.remark" class="diainput"></el-input>
        </el-form-item>
      </el-form>
    <el-button @click="DefectlistVisible = false">取 消</el-button>
    <el-button type="primary" @click="getnewDefectlist">提交</el-button>

    </el-dialog>
  </el-card>
</div>
</template>

<script>
export default {
  name: "Defectlist",
  inject:["reload"],
  data(){
    return{
      currentPage:1,
      pageSizes:[5,10,15,20,25,30],
      pageSize:5,
      pagTotal:0,
      DefectlistData:[],
      DefectlistVisible:false,
      Defectlistform:{
        type:"",
        defectPart:"",
        specificPart:"",
        defectMode:"",
        remark:""
      },
      headerstype:{
        "font-size": '20px',
        "height":"50px"
      },
      defectlistrules:{
        type:[{ required: true, message: '不能为空', trigger: 'blur' }],
        defectPart:[{ required: true, message: '不能为空', trigger: 'blur' }],
        specificPart:[{ required: true, message: '不能为空', trigger: 'blur' }],
        defectMode:[{ required: true, message: '不能为空', trigger: 'blur' }],
        remark:[{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }
  },methods:{
    getDefectlist(){

          this.axios.get("/getDefectlist",{params:{page:this.currentPage,sizes:this.pageSize}})
              .then(req=>{
                if (req.data.message==="用户未登入")
                {
                  this.$router.push("/")
                  return false
                }
                this.DefectlistData=req.data.datas
                this.pagTotal=req.data.total
              })




    },
    deletedefectlist(value){
      this.axios.delete("/deleteefectlist",{params:{id:value}})
      .then(req=>{
        if (req.data==="success")
        {
          this.getDefectlist()
        }
      })
    },
    getnewDefectlist(){
      this.$refs.form.validate((valid=>{
        if (valid)
        {
          this.axios.post("/getnewDefectlist",this.Defectlistform)
              .then(req=>
              {
                if (req.data==="success")
                {
                  this.$message.success("添加成功")
                  this.DefectlistVisible=false
                  this.getDefectlist()
                }
                else
                {
                  this.$message.error("添加失败,未知错误")
                }
              })
        }
        else {
          this.$message.error("输入字段格式不正确,校验失败")
        }
      }))

    },
    handleCurrentChange(value){
      this.currentPage=value
      this.getDefectlist()

    },
    handleSizeChange(value){
      this.pageSize=value
      this.getDefectlist()
    }
  },
  created() {
    this.getDefectlist()
  }
}
</script>

<style scoped>
.diainput{
  width: 70%;
  float: left;
}

</style>