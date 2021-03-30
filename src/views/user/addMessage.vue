<template>
  <el-main>
    <div class="main">
      <el-form
        :model="messageForm"
        :rules="rules"
        ref="messageForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="主题" required>
          <el-col :span="15">
            <el-form-item prop="title" required>
              <el-input size="small" v-model="messageForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="内容" prop="content" required>
          <el-input
            type="textarea"
            maxlength="5000"
            show-word-limit
            :rows="15"
            v-model="messageForm.content"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" class="submit_style"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { addMessageApi } from '../../request/notifcationApi'
export default {
  data() {
    return {
      messageForm: {
        content: '',
        title: '',
      },
      rules: {
        title: [{ required: true, message: '请输入主题', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      const submitForm = {
        title: this.messageForm.title,
        content: this.messageForm.content,
        publisher: '高长风',
      }
      addMessageApi(submitForm).then((res) => {
        if (res.state === 'ok') {
          this.$message({
            message: '添加成功',
            type: 'success',
          })
          this.messageForm = {}
        }
      })
      //       let opt = {
      //         method: 'POST',
      //         body:JSON.stringify(submitForm),
      //         headers: {
      //           'Authorization' :localStorage.getItem('token'),
      //    　　　　'content-type': 'application/json'
      //  　　　　 },
      //       }
      //       fetch(URL,opt)
      //       .then(res => res.json())
      //       .then(json => {
      //         this.$message({
      //           message: '添加成功',
      //           type: 'success'
      //         });
      //         this.messageForm = {}
      //       })
      //       .catch(error=>{
      //         this.$message({
      //           message: '添加失败',
      //           type: 'warning'
      //         });
      //       })
    },
  },
}
</script>

<style>
.main {
  margin: 0 auto;

  width: 500px;
}
.crew_style {
  margin-right: 10px;
}
.submit_style {
  margin-left: 150px;
}
.sample {
  font-size: 10px;
  color: red;
}
</style>
