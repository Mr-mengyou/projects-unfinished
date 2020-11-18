<template>
  <el-main>
    <el-table :data="notifTable" style="width: 100%" @cell-click="cellClick">
      <el-table-column label="主题" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.title" size="small" v-if="scope.row.seen"></el-input>
          <span style="margin-left: 10px" v-else>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="information" label="内容" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.information"
            type="textarea"
            placeholder="请输入内容"
            maxlength="5000"
            show-word-limit
            size="small"
            v-if="scope.row.seen"
          ></el-input>
          <span style="margin-left: 10px" v-else>{{ scope.row.information}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" v-if="scope.row.seen" @click="cancelEdit(scope.row)">取消编辑模式</el-button>
          <el-button size="mini" @click="editNotif(scope.row)">编辑</el-button>
          <el-button size="mini" @click="deleteNotif(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <hr />

    <el-table :data="activTable" style="width: 100%" @cell-click="cellClick">
      <el-table-column label="比赛名称" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.matchName" size="small" v-if="scope.row.seen"></el-input>
          <span style="margin-left: 10px" v-else>{{scope.row.matchName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="参赛对象" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.crew" size="small" v-if="scope.row.seen"></el-input>
          <span style="margin-left: 10px" v-else>{{scope.row.crew}}</span>
        </template>
      </el-table-column>
      <el-table-column label="截止时间" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.deadline" size="small" v-if="scope.row.seen"></el-input>
          <span style="margin-left: 10px" v-else>{{scope.row.deadline}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editRow(scope.row)">编辑</el-button>
          <el-button size="mini" @click="delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { editNotifApi, delNotifApi } from "../../request/api";
export default {
  data() {
    return {
      notifTable: [],
      activTable: []
    };
  },
  created() {
    this.getNotif();
  },
  methods: {
    getNotif() {
      let URL = "http://localhost:8000/notifcation/getNotif?publisher=高长风";
      fetch(URL)
        .then(res => res.json())
        .then(json => {
          for (let i = 0; i < json.data.length; i++) {
            json.data[i].seen = false;
          }
          this.notifTable = json.data;
          console.log(this.notifTable);
        });
    },

    editNotif(row) {
      if (row.seen == true) {
        let notifForm = {
          id: row.id,
          title: row.title,
          content: row.information
        };
        console.log(notifForm);
        editNotifApi(notifForm).then(res => {
          if (res.statusCode == 1) {
            this.$message({
              type: "success",
              message: "修改成功"
            });
            row.seen = false;
          } else {
            this.$message({
              type: "error",
              message: "修改失败"
            });
            row.seen = false;
          }
        });
        console.log(row.title, row.information, row.id);
      }
    },
    deleteNotif(currentId) {
      this.$confirm("此操作将永久删除该消息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(() => {
          console.log(currentId);
          delNotifApi({
            notifId: currentId
          }).then(res => {
            if (res.statusCode == 1) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getNotif()
            } else {
              this.$message({
                type: "error",
                message: "删除失败，请稍后再试"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cancelEdit(currentRow) {
      this.getNotif();
    },
    cellClick(row, column, cell) {
      row.seen = true;
    }
  }
};
</script>

<style>
</style>