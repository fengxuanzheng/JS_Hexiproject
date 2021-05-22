<template>
<div>
  <el-card shadow="always">
    <div slot="header">
      <span>后台用户管理</span>
      <el-table  :data="UserTableData"
                 height="680px"
                 border
                 style="width: 100%"
                 stripe
                 size="mini"
                 show-header
                 highlight-current-row
                 :header-row-style="Userstype"
                 :row-style="{height:'60px','font-size':'20px'}">

        <el-table-column label="用户序号"
                         prop="userid"
                         align="center">

        </el-table-column>
        <el-table-column label="用户名"
                         prop="username"
                         align="center">

        </el-table-column>
        <el-table-column label="密码"
                         prop="password"
                         align="center">

        </el-table-column>
        <el-table-column label="加密盐值"
                         prop="salt"
                         align="center">

        </el-table-column>
        <el-table-column label="邮箱"
                         prop="email"
                         align="center">

        </el-table-column>
        <el-table-column label="电话"
                         prop="mobile"
                         align="center">

        </el-table-column>
        <el-table-column label="权限"
                         prop="status"
                         align="center">

        </el-table-column>
        <el-table-column label="sip工位号"
                         prop="station"
                         align="center">

        </el-table-column>
        <el-table-column label="用户头像"
                         prop="userPhoto"
                         align="center">
          <template slot-scope="slot">
            <el-image fit="contain"  :src="slot.row.userPhoto" ></el-image>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="slot">
          <el-button type="primary" v-if="slot.row.username!=='admin'" @click="statusmodify(slot.row)">用户修改</el-button>
            <el-button type="danger" v-if="slot.row.username!=='admin'" @click="deleteuser(slot.row.userid)">删除</el-button>

          </template>
        </el-table-column>

      </el-table>


      <el-pagination
          background
          @size-change="UserSizeChange"
          @current-change="UserCurrentChange"
          :current-page.sync="UsercurrentPage"
          :page-sizes.sync="UserpageSizes"
          :page-size.sync="UserpageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total.sync="UserpagTotal">
      </el-pagination>
    </div>
  </el-card>

  <el-dialog
      :visible.sync="UserVisible"
      width="30%"
      >
  <el-card>
    <template slot="header">
      <span>更改权限及工位号</span>
    </template>

    <el-form ref="Userform"
             :model="UserformData"
             :rules="Userrules"
             label-position="left">
      <el-form-item label="权限"
                    align="center"
                     prop="status">
        <el-select v-model="UserformData.status" placeholder="请选择">
          <el-option
              v-for="item in statusdata"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工位号"
                    align="center"
                      prop="station">
        <el-input v-model="UserformData.station"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="Usersubmit">提交</el-button>
    <el-button @click="UserVisible = false">取 消</el-button>

  </el-card>
  </el-dialog>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserManagement",
  data() {
    return{
      UserTableData:[],
      Userstype:{
        "font-size": '20px',
        "height":"50px"
      },
      UserformData:{
        userid:"",
        status:"",
        station:""
      },
      UserVisible:false,
      updataId:"",
      UserpagTotal:0,
      UserpageSize:5,
      UserpageSizes:[5,10,15,20,25,30],
      UsercurrentPage:1,
      statusdata:[
        {value: '0',
          label: '0'
        },
        {
          value: '1',
          label: '1'
        }
      ],
      Userrules:{
        station:[{ required: true, message: '不能为空', trigger: 'blur' }],
        status:[{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    }

  },
  methods:{
    getuser()
    {
      this.axios.get("/getuser",{params:{page:this.UsercurrentPage,sizes:this.UserpageSize}})
      .then(req=>{
        this.UserTableData=req.data.datas
        this.UserpagTotal=req.data.total
      })
    },
    UserCurrentChange(value){
      this.UsercurrentPage=value
      this.getuser()
   },
    UserSizeChange(value)
    {
      this.UserpageSize=value
      this.getuser()
    },
    statusmodify(value)
    {
      this.UserVisible=true;
      this.UserformData.userid=value.userid;
      this.UserformData.status=value.status;
      this.UserformData.station=value.station


    },
    Usersubmit(){
      this.$refs.Userform.validate((value)=>{
        if (value)
        {
          this.axios.get("/updataStatus",{params:{id:this.UserformData.userid,status:this.UserformData.status,station:this.UserformData.station}})
              .then(req=>
              {
                if (req.data==="success")
                {
                  this.UserVisible=false
                  this.getuser()
                }
                else if (req.data.stringObjectMap.message==="您没有权限")
                {
                  this.$message.error("您没有权限")
                }

              })
        }
        else
        {
          this.$message.error("校验错误输入信息不符合规范")
        }
      })

    },
    deleteuser(value)
    {
      this.axios.delete("/deleteuser",{params:{id:value}})
      .then(req=>{
        if (req.data==="success")
        {
          this.getuser()
        }
        else if (req.data.stringObjectMap.message==="您没有权限")
        {
          this.$message.error("您没有权限")
        }
        else
        {
          this.$message.error("删除失败")
        }
      })
    }

  },
  created() {
    this.getuser()
  }
}
</script>

<style scoped>

</style>