<template>
  <el-main>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="addDate" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="matchName" label="比赛名称" align="center" width="150"></el-table-column>
      <el-table-column prop="workName" label="作品名称" width="300" align="center"></el-table-column>
      <el-table-column prop="playerName" label="参赛人" width="200" align="center"></el-table-column>
      <el-table-column prop="groupUploadPath" label="报名材料" width="200" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.status=='报名已结束'" v-if="scope.row.playerName.split('：')[0]=='小组组长'" size="mini" @click="editPerson(scope.row)">编辑</el-button>
          <el-button :disabled="scope.row.status=='报名已结束'" size="mini" @click="delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改" :visible.sync="dialogFormVisible" width="50%" center>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="比赛名称" prop="name" style="margin-left: 50px;">
          <el-input size="small" style="width:80%" :disabled="true" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="作品名称" prop="workName" style="margin-left: 50px;">
          <el-input size="small" style="width:80%" v-model="ruleForm.workName"></el-input>
        </el-form-item>

        <el-form-item label="参赛队长" required style="margin-left: 50px;">
          <el-col :span="7" class="crew_style">
            <el-form-item prop="leaderStuno">
              <el-input size="small" v-model.number="ruleForm.leaderStuno"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-form-item prop="leaderStuname">
              <el-input size="small" v-model="ruleForm.leaderStuname"></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="16"
            style="height: 10px;margin-top: 10px;border-bottom-width: 5px;margin-bottom: 8px;"
          >
            <span class="sample">第一个输入框为学号，第二个输入框为姓名，下同</span>
          </el-col>
        </el-form-item>

        <el-form-item label="参赛队员" prop="crew" style="margin-left: 50px;">
          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[0].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span style="margin-left:10px;margin-right:10px">-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[0].stuname"></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[1].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span style="margin-left:10px;margin-right:10px">-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[1].stuname"></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[2].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span style="margin-left:10px;margin-right:10px">-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[2].stuname"></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[3].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span style="margin-left:10px;margin-right:10px">-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[3].stuname"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="比赛类型" prop="type" style="margin-left: 50px;">
          <el-checkbox-group v-model="ruleForm.type"  @change="groupChange">
            <el-checkbox label="人工智能" name="type"></el-checkbox>
            <el-checkbox label="信息安全" name="type"></el-checkbox>
            <el-checkbox label="大数据" name="type"></el-checkbox>
            <el-checkbox label="传统" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="报名表" prop="file" style="margin-left: 50px;" v-if="isShow" >
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl()"
            :data="matchData"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadFalse"
            :auto-upload="false"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip" >只能上传doc或docx文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" center class="submit_style" @click="editForm('ruleForm')">修改</el-button>
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
import { recordApi } from "../../request/api";
export default {
  data() {
    return {
      isShow:false,
      tableData: [],
      fileList: [],
      dialogFormVisible:false,
      ruleForm: {
        name: "",
        leaderStuno: "",
        leaderStuname: "",
        workName: "",
        // leader: { stuno: "", stuname: "" },
        crew:[
          {stuno:"",stuname:''},
          {stuno:"",stuname:''},
          {stuno:"",stuname:''},
          {stuno:"",stuname:''},
        ],
        
        filename: "",

        type: [],
      },
      rules: {
        workName: [
          { required: true, message: "请输入作品名称", trigger: "blur" }
        ],
        leaderStuno: [
          { required: true, message: "请填写参赛学号", trigger: "blur" },
          { type: "number", message: "学号是数字" }
        ],
        leaderStuname: [
          { required: true, message: "请填写参赛姓名", trigger: "blur" }
        ],

        type: [
          {
            required: true,
            message: "请选择一个具体比赛类型",
            trigger: "blur"
          }
        ]
      },
      matchData:{
        'matchName':'',
      }
    };
  },

  created() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      let personUid = decodeURIComponent(window.atob(sessionStorage.getItem("_loginId")))
      // let URL =
      //   "http://localhost:8000/activity/getPersonList?personUid=" +
      //   decodeURIComponent(window.atob(sessionStorage.getItem("_loginId")));
      recordApi({
        personUid:personUid
        }).then(res=>{
        this.tableData = this.filterData(res.data);
      })
      // fetch(URL)
      //   .then(res => res.json())
      //   .then(json => {
      //     this.tableData = this.filterData(json.data);
      //   })
      //   .catch(err => {
      //     this.$message({
      //       type: "error",
      //       message: "请求失败，稍后再试"
      //     });
      //   });
    },
    filterData(tableData) {
      return tableData.map(item => {
        if (item.groupLeaderId != undefined) {
          item.playerId = item.groupLeaderId;
        }
        if (item.groupLeaderName != null) {
          item.playerName = item.groupLeaderName;
          item.playerName = "小组组长：" + item.playerName;
        } else if (item.groupLeaderName == null) {
          item.playerName = "小组成员：" + item.playerName;
        }

        return item;
      });
    },
    editPerson(currentRow) {
      this.dialogFormVisible = true
      console.log(currentRow.playerId,currentRow.matchName)
      let URL = `http://localhost:8000/activity/editPerson?personUid=${currentRow.playerId}&matchName=${currentRow.matchName}`;
      fetch(URL)
        .then(res => res.json())
        .then(json => {
          console.log(json.data)
          
          for(let i =0;i<json.data.length;i++){
            this.ruleForm.crew[i].stuno = json.data[i].playerId
            this.ruleForm.crew[i].stuname = json.data[i].playerName
          }
          this.isShow = true
          this.ruleForm.workName = currentRow.workName
          this.ruleForm.name = currentRow.matchName
          this.ruleForm.leaderStuno = currentRow.groupLeaderId
          this.ruleForm.leaderStuname = currentRow.groupLeaderName
          this.ruleForm.type.push(currentRow.gameCategory)
          

         
          
        });
    },
    groupChange(){
      if (this.ruleForm.type.length > 1) {
        this.ruleForm.type.shift();
      }
    },

    uploadUrl() {
      return "http://127.0.0.1:8000/activity/upload";
    },
    uploadSuccess(response, file, fileList) {
      // var uploadpath = response.uploadPath
      // console.log(uploadPath)
      console.log(response.code)
      if (response.code == 0) {
        this.ruleForm.originId = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        let uploadurl =  response.uploadPath
        let URL = "http://127.0.0.1:8000/activity/editActivity"
        this.ruleForm['uploadurl'] = uploadurl
        
        let opt = {
          method : 'post',
          body:JSON.stringify(this.ruleForm),
          headers : {
            'Authorization' :localStorage.getItem('token'),
            'content-type' : 'application/json'
          },
        }
        fetch(URL,opt)
        .then(res=>res.json())
        .then(json=>{
          if(json.statusCode == 1){
            this.$message({
            type : 'success',
            message : '参加比赛成功'
          })
          this.$router.push({ name: "activity" })
          }
          else if(json.statusCode == -1){
            this.$message({
            type : 'error',
            message : '参赛队伍中，已经有人参加该比赛'
          })
          this.$router.push({ name: "activity" })
          }
          else if(json.statusCode == -2 ){
            this.$message({
            type : 'error',
            message : '登录信息过期，请重新登录，再操作'
          })
          this.$router.push({name:'Home'})  
          }
          else if(json.statusCode == -3 ){
            this.$message({
            type : 'error',
            message : '请学生自行操作'
          })
          this.$router.push({name:'Home'})  
          }
          
        })
        .catch(err=>{
          this.$message({
            type : 'error',
            message : '请求失败,请稍后在试'
          })
        })
      }
      
    },
    uploadFalse(response, file, fileList) {
      this.$message({
        message: "文件上传失败！",
        type: "error"
      });
    },
    beforeUpload(file) {
      this.ruleForm.filename = file.name
      this.matchData.matchName = this.ruleForm.name
      const extension = file.name.split(".")[1] === "doc";
      const extension2 = file.name.split(".")[1] === "docx";
      if (!extension && !extension2) {
        this.$message({
          message: "上传文件只能是 doc,docx 格式!",
          type: "error"
        });
      }
      return extension || extension2 
    },
    editForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
          
        } else {
          
          return false;
        }
      });
      
      console.log(this.ruleForm.crew);
    },
    
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  }
};
</script>

<style>
.el-form-item{
  width: 90%;
  
}
</style>