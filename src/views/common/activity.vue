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
    </div>

    <el-table
      :data="init_tableData"
      style="width: 100%"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="date" label="发布日期" sortable width="180" align="center"></el-table-column>
      <el-table-column prop="matchName" label="比赛名字" width="200" align="center"></el-table-column>
      <el-table-column prop="conditions" label="面向对象" align="center"></el-table-column>
      <el-table-column prop="publisher" label="发布人" align="center"></el-table-column>
      <el-table-column prop="deadline" label="结束时间" align="center"></el-table-column>
      <el-table-column prop="com_material" label="比赛材料" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.matchUpload">{{scope.row.matchName}}材料</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="join(scope.row.matchName)">参加</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { getActivityApi } from "../../request/api";
export default {
  data() {
    return {
      search: '',
      tableData: [
        
      ]
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
  created(){
    this.getActivityList()
  },
  methods: {
    getActivityList(){
      getActivityApi().then(res=>{
        this.tableData = res.data
      })
      // let URL = "http://127.0.0.1:8000/activity/getActivityList"
      // fetch(URL)
      // .then(res=>res.json())
      // .then(json=>{
      //   // console.log(json)
      //   this.tableData = json.data
      // })
      // .catch(err=>{
      //   this.$message({
      //     type:'error',
      //     message : '请求失败，请稍后再试！'
      //   })
      // })
    },
    join(index) {
      this.$router.push({name:'join',params:{'id':index}})
      
    }
  }
};
</script>

<style>
.search-per {
  width: 300px;
  float: left;
  padding-left: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>