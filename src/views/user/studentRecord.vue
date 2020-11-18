<template>
  <el-main>
    <div class="line-row">
      <div class="search-per">
        <i class="el-icon-search"></i>
        <el-input
          style="width: 200px;margin-left:20px"
          type="text"
          label="搜索"
          icon="search"
          v-model="search"
          placeholder="请输入搜索内容"
        ></el-input>
      </div>
      <div class="ToExcelStyle">
        <el-button size="small" @click="tableToExcel(multipleSelection)">导出表格</el-button>
      </div>
      
      
    </div>
    
    <el-table :data="init_tableData" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="addDate" label="创建日期" align="center" width="120"></el-table-column>
      <el-table-column prop="matchName" label="比赛名称" align="center" width="220"></el-table-column>
      <el-table-column prop="workName" label="作品名称" width="350" align="center"></el-table-column>
      <el-table-column prop="groupLeaderName" label="参赛人" width="200" align="center"></el-table-column>
      <el-table-column prop="groupUploadPath" label="报名材料" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.groupUploadPath">{{scope.row.workName}}|报名材料</a>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="static" label="状态" width="100" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
  </el-main>
</template>

<script>
import { stuRecordApi } from "../../request/api";
export default {
  data() {
    return {
      search: '',
      tableData: [],
      multipleSelection:[],
    };
  },
  computed:{
    init_tableData:function(){
        var search=this.search;
        if(search){
          return  this.tableData.filter(function(dataNews){
            return Object.keys(dataNews).some(function(key){
              return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.tableData
      }
    

  },
  created() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      stuRecordApi().then(res=>{
        this.tableData = res.data;
      }) 
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val);
    },
    tableToExcel(multipleSelection) {
      if(multipleSelection.length==0){
        this.$message({
            type: "error",
            message: "选择为空，无法导出excel表格"
        })
        return false
      }
      // console.log(multipleSelection)
      for(let i=0;i < multipleSelection.length;i++){
        delete multipleSelection[i].addDate,delete multipleSelection[i].groupUploadPath
        multipleSelection[i].groupLeader = multipleSelection[i].groupLeaderId+"-"+multipleSelection[i].groupLeaderName
        delete multipleSelection[i].groupLeaderId,delete multipleSelection[i].groupLeaderName
        var newobj = multipleSelection[i].playerId.map((item,index) => {
            return {...item, ...multipleSelection[i].playerName[index]};
        })
        let newPlayer = ""
        for(let i =0;i<newobj.length;i++){
         
          newPlayer += newobj[i].playerId+"-"+newobj[i].playerName+"，"
          
        }
        multipleSelection[i].player = newPlayer
        delete multipleSelection[i].playerId,delete multipleSelection[i].playerName
      }
      console.log(multipleSelection)
      
      // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
      let str = `比赛名称,作品名称,类别,组长姓名-组长ID,组员姓名-组员ID\n`;
      //增加\t为了不让表格显示科学计数法或者其他格式
      for (let i = 0; i < multipleSelection.length; i++) {
        for (let item in multipleSelection[i]) {
          str +=`${multipleSelection[i][item] + '\t'},`
          
        
        }
        str += "\n";
      }
      //encodeURIComponent解决中文乱码
      let uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
      //通过创建a标签实现
      let link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名
      link.download = "参赛队伍基本信息表.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.multipleSelection = []
    }

    // filterData(tableData){
    //     return tableData.map(item => {
    //         item.playerId = item.groupLeaderId
    //         // item.playerName =item.groupLeaderName
    //         if(item.groupLeaderName!=null){
    //           item.playerName = item.groupLeaderName
    //           item.playerName = "小组组长："+item.playerName
    //         }
    //         else if(item.groupLeaderName ==null){
    //           item.playerName = "小组成员："+item.playerName
    //         }

    //         return item
    //     })
    // }
  }
};
</script>

<style>
.search-per {
  width: 300px;
  float: left;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.ToExcelStyle{
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>