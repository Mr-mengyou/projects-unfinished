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
          @change="searchList"
        ></el-input>
      </div>
    </div>

    <el-table
      :data="init_tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="awardDate"
        label="日期"
        sortable
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardName"
        label="比赛名字"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardWork"
        label="获奖作品"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardPerson"
        label="获奖人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardMajor"
        label="专业"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardBelong"
        label="学院"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="awardLevel"
        label="获奖等级"
        align="center"
      ></el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </el-main>
</template>

<script>
import { getAwardInfoApi } from '../../request/awardInfoApi'
export default {
  data() {
    return {
      search: '',

      tableData: [], //原始数据
      init_tableData: [], //分页数据
      currentPage: 1,
      pagesize: 5,
      total: 0,
    }
  },
  // computed: {
  //   init_tableData: function() {
  //     var search = this.search
  //     if (search) {
  //       return this.tableData.filter(function(dataNews) {
  //         return Object.keys(dataNews).some(function(key) {
  //           return (
  //             String(dataNews[key])
  //               .toLowerCase()
  //               .indexOf(search) > -1
  //           )
  //         })
  //       })
  //     }
  //     return this.tableData
  //   },
  // },
  created() {
    this.getAwardInfo(this.selectTime, this.selectMatchName)
  },
  methods: {
    searchList() {
      var search = this.search
      if (search) {
        this.init_tableData = this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
        this.total = this.init_tableData.length
      } else {
        this.currentChangePage(this.tableData, 1)
      }
    },
    getAwardInfo() {
      getAwardInfoApi().then((res) => {
        if (res.statuCode == 1) {
          this.tableData = res.data
          this.total = res.data.length
          this.currentChangePage(this.tableData, 1)
        }
      })
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      this.handleCurrentChange(this.currentPage)
      console.log('每页下拉显示数据' + this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      this.currentChangePage(this.tableData, currentPage)
      console.log('点击第几页' + this.currentPage) //点击第几页
    },

    //切换列表页码时的处理操作
    currentChangePage(list, currentPage) {
      let from = (currentPage - 1) * this.pagesize //每一页开始序号
      let to = currentPage * this.pagesize //每一页结束序号  to-from = 每页最大数据pagesize
      // console.log(list)
      this.init_tableData = []
      for (; from < to; from++) {
        if (list[from]) {
          this.init_tableData.push(list[from])
        }
      }
    },
  },
}
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
