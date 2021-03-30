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
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column
        prop="date"
        label="发布日期"
        sortable
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="matchName"
        label="比赛名字"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="conditions"
        label="面向对象"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="publisher"
        label="发布人"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="deadline"
        label="结束时间"
        align="center"
      ></el-table-column>
      <el-table-column prop="com_material" label="比赛材料" align="center">
        <template slot-scope="scope">
          <a :href="scope.row.matchUpload">{{
            scope.row.matchUpload.substring(
              scope.row.matchUpload.lastIndexOf('/') + 1
            )
          }}</a>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.deadline < nowTime"
            size="mini"
            @click="join(scope.row.matchName)"
            >参加</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
Date.prototype.Format = function(fmt) {
  //author: meizz
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
import { getActivityApi } from '../../request/activityApi'
export default {
  data() {
    return {
      search: '',
      nowTime: '',
      tableData: [],
    }
  },
  computed: {
    init_tableData: function() {
      var search = this.search
      if (search) {
        return this.tableData.filter(function(dataNews) {
          return Object.keys(dataNews).some(function(key) {
            return (
              String(dataNews[key])
                .toLowerCase()
                .indexOf(search) > -1
            )
          })
        })
      }
      return this.tableData
    },
  },
  created() {
    this.getActivityList()
  },
  methods: {
    getActivityList() {
      getActivityApi().then((res) => {
        this.tableData = res.data
        this.nowTime = new Date().Format('yyyy-MM-dd')
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
      this.$router.push({ name: 'join', params: { id: index } })
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
