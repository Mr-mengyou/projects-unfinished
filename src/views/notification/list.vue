<template>
  <div>
    <el-table ref="multipleTable" :data="pageList" tooltip-effect="dark" style="width: 100%" >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题内容" prop="title" align="center" width="600">
        <template slot-scope="scope">
          <!-- <router-link :to="{name:'detail',params:{id:scope.row.detailAll_id}}">{{ scope.row.title }}</router-link> -->
          <a href="javascript:void(0);" @click="test(scope.row)">{{ scope.row.title }}</a>
          <router-view></router-view>
        </template>
      </el-table-column>
      <el-table-column prop="publisher" label="发布人" align="center" width="200"></el-table-column>
      <el-table-column prop="publishDate" label="时间" align="center"></el-table-column>
    </el-table>
    <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import { getUnreadApi,getReadApi,getAllApi } from "../../request/api";
export default {
  data() {
    return {
      tabPosition: "left",
      currentPage: 1,
      pagesize: 5,
      total:0,
      rawList: [],//原始数据
      pageList: [], //分页数据
      
    };
  },
  beforeRouteEnter  (to,from,next){
    // console.log(to.name)
    // this.getListData(to.name)  //获取列表数据
    
    next(vm => vm.getListData(to.name))
  },

  // created() {
  //   // this.currentChangePage(this.rawList, 1);
    
    
  // },
  

  methods: {
    getListData(listType){
      
      if(listType=="unread"){
        let username  = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        getUnreadApi(username).then(res=>{
          this.rawList = res.data
          this.total = this.rawList.length
          this.currentChangePage(this.rawList, 1);
        })
        // let username  = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        // let URL = `http://127.0.0.1:8000/notifcation/getUnreadList?username=${username}`
        // fetch(URL)
        // .then(res=>res.json())
        // .then(json=>{
        //   this.rawList = json.data
         
        //   this.total = this.rawList.length
        //   this.currentChangePage(this.rawList, 1);
        // })
        
        
      }
      // console.log(this.rawList)
      else if(listType=="all")
      {
        let username = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        getAllApi(username).then(res=>{
          this.rawList = res.data
          this.total = this.rawList.length
          this.currentChangePage(this.rawList, 1);
        })
        
      }
      else if(listType === "read"){
        let username  = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        getReadApi(username).then(res=>{
          this.rawList = res.data
          this.total = this.rawList.length
          this.currentChangePage(this.rawList, 1);
        })  
      }
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.handleCurrentChange(this.currentPage);
      console.log("每页下拉显示数据" + this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.currentChangePage(this.rawList, currentPage);
      console.log("点击第几页" + this.currentPage); //点击第几页
    },

    //切换列表页码时的处理操作
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pagesize; //每一页开始序号
      let to = currentPage * this.pagesize; //每一页结束序号  to-from = 每页最大数据pagesize
      // console.log(list)
      this.pageList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.pageList.push(list[from]);
        }
        
      }
      // console.log("pageList",this.pageList);
    },
    test(parameter){
      console.log(parameter)
        let username = decodeURIComponent(window.atob(sessionStorage.getItem('_loginId')))
        this.$router.push({ path: `/notifications/detail/${parameter.id}`});
        let URL =  `http://127.0.0.1:8000/notifcation/readMessage/${parameter.id}?username=${username}`
        fetch(URL)
        .then(res=>res.json)
        .then(json=>{
          // console.log(json.success)
        })
      
      
    }

   
    
  }
};
</script>

<style>
</style>