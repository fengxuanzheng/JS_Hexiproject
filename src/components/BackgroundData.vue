<template>
<div>
  <el-card shadow="always" :body-style="{ padding: '40px' } ">
    <div slot="header">
      <span style="float: left;font-size: 30px;font-weight: bold;color: #b42647">FTQ:{{this.productFTQ}}</span>
      <span>后台数据库</span>
      <el-input style="float: right;width: 20%" size="medium" v-model="sorttable" placeholder="请输入搜索VIN码" prefix-icon="el-icon-search"  @keyup.enter.native="sortTbaleS"></el-input>
    </div>

  <el-table  :data="DefectrecordData"
             height="680px"
             border
             fit
             style="width: 100%"
             stripe
             size="mini"
             show-header
             highlight-current-row
             :header-row-style="headerstype2"
             :row-style="{height:'60px','font-size':'20px'}">
    <el-table-column label="序号"
                     sortable
                     prop="id"
                     align="center">

    </el-table-column>
    <el-table-column label="VIN"
                     prop="vin"
                     fixed="left"
                     align="center">

    </el-table-column>
    <el-table-column label="故障状态"
                     prop="defectStatus"
                     fixed="left"
                     align="center">

    </el-table-column>
    <el-table-column label="车型"
                     prop="carType"
                     fixed="left"
                     align="center">

    </el-table-column>
    <el-table-column label="sip工位号"
                     prop="station"
                     align="center">

    </el-table-column>
    <el-table-column label="时间"
                     sortable
                     prop="timestamp"
                     align="center">

    </el-table-column>
    <el-table-column label="用户名"
                     prop="username"
                     align="center">

    </el-table-column>
    <el-table-column label="故障名称"
                     prop="defectName"
                     align="center">

    </el-table-column>
    <el-table-column label="缺陷类别"
                     prop="type"
                     align="center">

    </el-table-column>
    <el-table-column label="部位分类"
                     prop="defectPart"
                     align="center">

    </el-table-column>
    <el-table-column label="具体部位"
                     prop="specificPart"
                     align="center">

    </el-table-column>
    <el-table-column label="故障"
                     prop="defectMode"
                     align="center">

    </el-table-column>
    <el-table-column label="具体故障"
                     prop="remark"
                     align="center">

    </el-table-column>
    <el-table-column label="状态"
                     prop="status"
                     align="center">

    </el-table-column>
    <el-table-column label="备注"
                     prop="comments"
                     align="center">

    </el-table-column>
    <el-table-column label="图片(部位分类)"
                     align="center">
      <template slot-scope="slot">
        <el-image fit="contain"  :src="slot.row.defectPhoto" :preview-src-list="[slot.row.photourl]">
          <div slot="error">
            <span>未上传</span>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column label="图片(具体部位)"
                     align="center">
      <template slot-scope="slot">
        <el-image fit="contain"  :src="slot.row.defectPhoto2" :preview-src-list="[slot.row.photourl2]">
          <div slot="error">
            <span>未上传</span>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column label="图片(故障)"
                     align="center">
      <template slot-scope="slot">
        <el-image fit="contain"  :src="slot.row.defectPhoto3" :preview-src-list="[slot.row.photourl3]">
          <div slot="error">
            <span>未上传</span>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column label="图片(具体故障)"
                     align="center">
      <template slot-scope="slot">
        <el-image fit="contain"  :src="slot.row.defectPhoto4" :preview-src-list="[slot.row.photourl4]">
          <div slot="error">
            <span>未上传</span>
          </div>
        </el-image>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="slot">

        <el-button type="warning" @click="delectDefectrecord(slot.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

    <el-pagination
        background
        @size-change="defectrecordSizeChange"
        @current-change="defectrecordCurrentChange"
        :current-page.sync="defectrecordcurrentPage"
        :page-sizes.sync="defectrecordpageSizes"
        :page-size.sync="defectrecordpageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total.sync="defectrecordpagTotal">
    </el-pagination>

  </el-card>
</div>
</template>

<script>
export default {
  name: "BackgroundData",
  inject:['reload'],
  data(){
    return{
      headerstype2:{
        "font-size": '20px',
        "height":"50px"
      },
      DefectrecordData:[],
      defectrecordcurrentPage:1,
      defectrecordpageSizes:[5,10,15,20,25,30],
      defectrecordpageSize:5,
      defectrecordpagTotal:0,
      sorttable:"",


      BackbodyStyle: {
        padding: '0px 0px 0px 0px',

      },
      productFTQ:""
    }
  },
  methods:{
    getBackgournddefectrecord()
    {
        this.axios.get("/getdefectrecordbase64", {params:{page:this.defectrecordcurrentPage,sizes:this.defectrecordpageSize}})
            .then(req=>{
              if (req.data.message==="用户未登入")
              {
                this.$router.push("/")
                return false
              }
              this.DefectrecordData=req.data.datas
              this.defectrecordpagTotal=req.data.total
            })

    },
    defectrecordCurrentChange(value){
      this.defectrecordcurrentPage=value
      this.getBackgournddefectrecord()
    },
    defectrecordSizeChange(value){
      this.defectrecordpageSize=value
      this.getBackgournddefectrecord()
    },
    delectDefectrecord(value)
    {
      this.axios.delete("/deleteDefectrecord",{params:{delectid:value}})
      .then(req=>{
        if (req.data==="success")
        {
          this.getBackgournddefectrecord()
        }
      })
    },
    sortTbaleS(){
      console.log(this.sorttable)
      if (this.sorttable!==null&&this.sorttable!=='')
      {
        this.axios.get("/sortTable",{params:{vin:this.sorttable}})
            .then(req=>
            {
              if (req.data.datas===null)
              {
                this.DefectrecordData=[]
                this.$message.warning("没有找到任何匹配数据")
              }
              this.DefectrecordData=[req.data.datas]
              this.defectrecordpagTotal=req.data.total
            })
        console.log(this.DefectrecordData)
        return false
      }
      this.getBackgournddefectrecord()

    },
    getFtq(){
      this.axios.get("/productFTQ")
      .then(req=>{
        this.productFTQ=req.data
      })
    }
  },
  created() {
    this.sortTbaleS();
    this.getFtq();
  }
}
</script>

<style scoped>

</style>