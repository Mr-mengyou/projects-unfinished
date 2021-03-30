<template>
  <el-main>
    <div class="main">
      <el-form
        :model="awardForm"
        ref="awardForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="比赛名称" prop="name">
          <el-col :span="14">
            <el-select
              v-model="awardForm.matchName"
              placeholder="请选择比赛名称"
              @focus="changeMatchNmae()"
            >
              <el-option
                v-for="item in matchNameOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="获奖材料" prop="file">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl()"
            :before-remove="beforeRemove"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadFalse"
            :on-progress="uploadProcess"
            :auto-upload="false"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传xlx,xlxs,csv文件，且不超过5M
            </div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('awardForm')"
            class="submit_style"
            >发布获奖信息</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { addAwardInfoApi } from '../../request/awardInfoApi'
import { getMatchNameApi } from '../../request/awardInfoApi'
export default {
  data() {
    return {
      awardForm: {},
      matchNameOptions: '',
      fileList: [],
    }
  },

  created() {},
  methods: {
    uploadUrl() {
      return 'http://127.0.0.1:8000/user/uploadAwardInfo'
    },
    uploadSuccess(response, file, fileList) {
      // var uploadpath = response.uploadPath
      // console.log(uploadPath)
      console.log(response.uploadPath)
      if (response.code == 0) {
        let uploadPath = response.uploadPath
        this.awardForm['uploadurl'] = uploadPath
        this.awardForm['excel_data'] = response.excel_data
        addAwardInfoApi(this.awardForm).then((res) => {
          if (res.statusCode == 1) {
            this.$message({
              type: 'success',
              message: '发布获奖信息成功',
            })
          } else if (res.statusCode == -1) {
            this.$message({
              type: 'error',
              message: '发布获奖信息失败',
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
      const extension = file.name.split('.')[1] === 'xlsx'
      const extension2 = file.name.split('.')[1] === 'csv'

      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls,xlxs,csv 格式!',
          type: 'error',
        })
      }
      return extension || extension2
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

    uploadProcess(event, file, fileList) {
      this.percent = Math.floor(event.percent)
    },

    changeMatchNmae() {
      console.log(this.matchNameOptions)
      getMatchNameApi().then((res) => {
        console.log(res.data)
        this.matchNameOptions = res.data
      })
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
