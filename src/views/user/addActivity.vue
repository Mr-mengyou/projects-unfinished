<template>
  <el-main>
    <div class="main">
      <el-form
        :model="addActivForm"
        :rules="rules"
        ref="addActivForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="比赛名称" prop="name">
          <el-col :span="14">
            <el-input size="small" v-model="addActivForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="参赛对象" prop="crew">
          <el-select
            v-model="addActivForm.crew"
            placeholder="请选择参赛对象类别"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="截止时间" prop="deadline">
          <el-date-picker
            v-model="addActivForm.deadline"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="比赛材料" prop="file">
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
            <div slot="tip" class="el-upload__tip">
              只能上传doc或docx文件，且不超过5M
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('addActivForm')"
            class="submit_style"
            >立即创建</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { addActivityApi } from '../../request/activityApi'
export default {
  data() {
    return {
      fileList: [],
      options: [
        {
          value: '在校大学生',
          label: '在校大学生',
        },
        {
          value: '仅限通过校级',
          label: '仅限通过校级',
        },
        {
          value: '仅限通过市级',
          label: '仅限通过市级',
        },
      ],
      addActivForm: {
        name: '',

        crew: '',
        // leader: { stuno: "", stuname: "" },

        filename: '',

        deadline: '',
      },
      rules: {
        name: [{ required: true, message: '请输入作品名称', trigger: 'blur' }],
      },
      matchData: {
        matchName: '12',
      },
    }
  },
  created() {},
  methods: {
    uploadUrl() {
      return 'http://127.0.0.1:8000/activity/upload'
    },
    uploadSuccess(response, file, fileList) {
      // var uploadpath = response.uploadPath
      // console.log(uploadPath)
      console.log(response.uploadPath)
      if (response.code == 0) {
        let uploadPath = response.uploadPath
        let URL = 'http://127.0.0.1:8000/activity/addActivity'
        this.addActivForm['uploadurl'] = uploadPath
        this.addActivForm['publisher'] = decodeURIComponent(
          window.atob(sessionStorage.getItem('_info'))
        )
        addActivityApi(this.addActivForm).then((res) => {
          if (res.statusCode == 1) {
            this.$message({
              type: 'success',
              message: '发布比赛活动成功',
            })
          } else if (res.statusCode == -1) {
            this.$message({
              type: 'error',
              message: '发布比赛活动失败',
            })
          }
        })
      }
    },
    uploadFalse(response, file, fileList) {
      this.$message({
        message: '文件上传失败！',
        type: 'error',
      })
    },
    beforeUpload(file) {
      this.addActivForm.filename = file.name
      this.matchData.matchName = this.addActivForm.name
      const extension = file.name.split('.')[1] === 'doc'
      const extension2 = file.name.split('.')[1] === 'docx'
      const extension3 = file.name.split('.')[1] === 'zip'
      if (!extension && !extension2 && !extension3) {
        this.$message({
          message: '上传文件只能是 doc,docx 文档或者 .zip 压缩包!',
          type: 'error',
        })
      }
      return extension || extension2 || extension3
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs.upload.submit()
        } else {
          return false
        }
      })
    },

    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
  },
}
</script>

<style>
.main {
  margin: 75px auto;

  width: 500px;
}

.submit_style {
  margin-left: 70px;
  margin-right: 50px;
}
.sample {
  font-size: 10px;
  color: red;
}
</style>
