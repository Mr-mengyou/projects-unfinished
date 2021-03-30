<template>
  <el-main>
    <div class="main">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="比赛名称" prop="name">
          <el-input
            size="small"
            style="width:80%"
            :disabled="true"
            v-model="ruleForm.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="作品名称" prop="workName">
          <el-input
            size="small"
            style="width:80%"
            v-model="ruleForm.workName"
          ></el-input>
        </el-form-item>

        <el-form-item label="参赛队长" required>
          <el-col :span="7" class="crew_style">
            <el-form-item prop="leaderStuno">
              <el-input
                size="small"
                v-model.number="ruleForm.leaderStuno"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-form-item prop="leaderStuname">
              <el-input
                size="small"
                v-model="ruleForm.leaderStuname"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col
            :span="16"
            style="height: 10px;margin-top: 10px;border-bottom-width: 5px;margin-bottom: 8px;"
          >
            <span class="sample"
              >第一个输入框为学号，第二个输入框为姓名，下同</span
            >
          </el-col>
        </el-form-item>

        <el-form-item label="参赛队员" prop="crew">
          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[0].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input
              size="small"
              v-model="ruleForm.crew[0].stuname"
            ></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[1].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input
              size="small"
              v-model="ruleForm.crew[1].stuname"
            ></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[2].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input
              size="small"
              v-model="ruleForm.crew[2].stuname"
            ></el-input>
          </el-col>
          <br />

          <el-col :span="7" class="crew_style">
            <el-input size="small" v-model="ruleForm.crew[3].stuno"></el-input>
          </el-col>
          <el-col :span="1">
            <span>-</span>
          </el-col>
          <el-col :span="6" class="crew_style">
            <el-input
              size="small"
              v-model="ruleForm.crew[3].stuname"
            ></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="比赛类型" prop="type">
          <el-checkbox-group v-model="ruleForm.type" @change="groupChange">
            <el-checkbox label="人工智能" name="type"></el-checkbox>
            <el-checkbox label="信息安全" name="type"></el-checkbox>
            <el-checkbox label="大数据" name="type"></el-checkbox>
            <el-checkbox label="传统" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="报名表" prop="file">
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
            <div slot="tip" class="el-upload__tip">只能上传doc或docx文件</div>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
            class="submit_style"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-main>
</template>

<script>
import { joinActivityApi } from '../../request/activityApi'
export default {
  data() {
    return {
      fileList: [],
      ruleForm: {
        name: '',
        leaderStuno: '',
        leaderStuname: '',
        workName: '',
        // leader: { stuno: "", stuname: "" },
        crew: [
          { stuno: '', stuname: '' },
          { stuno: '', stuname: '' },
          { stuno: '', stuname: '' },
          { stuno: '', stuname: '' },
        ],

        filename: '',

        type: [],
      },
      rules: {
        workName: [
          { required: true, message: '请输入作品名称', trigger: 'blur' },
        ],
        leaderStuno: [
          { required: true, message: '请填写参赛学号', trigger: 'blur' },
          { type: 'number', message: '学号是数字' },
        ],
        leaderStuname: [
          { required: true, message: '请填写参赛姓名', trigger: 'blur' },
        ],

        type: [
          {
            required: true,
            message: '请选择一个具体比赛类型',
            trigger: 'blur',
          },
        ],
      },
      matchData: {
        matchName: '',
      },
    }
  },
  computed: {},
  created() {
    this.ruleForm.name = decodeURIComponent(this.$route.path.split('/')[2])
  },
  methods: {
    uploadUrl() {
      return 'http://127.0.0.1:8000/activity/upload'
    },
    uploadSuccess(response, file, fileList) {
      // var uploadpath = response.uploadPath
      // console.log(uploadPath)
      console.log(response.code)
      if (response.code == 0) {
        let uploadurl = response.uploadPath
        // let URL = "http://127.0.0.1:8000/activity/join";
        this.ruleForm['uploadurl'] = uploadurl
        joinActivityApi(this.ruleForm).then((res) => {
          if (res.statusCode == 1) {
            this.$message({
              type: 'success',
              message: '参加比赛成功',
            })
            this.$router.push({ name: 'activity' })
          } else if (res.statusCode == -1) {
            this.$message({
              type: 'error',
              message: '参赛队伍中，已经有人参加该比赛',
            })
            this.$router.push({ name: 'activity' })
          } else if (res.statusCode == -2) {
            this.$message({
              type: 'error',
              message: '登录信息过期，请重新登录，再操作',
            })
            this.$router.push({ name: 'Home' })
          } else if (res.statusCode == -3) {
            this.$message({
              type: 'error',
              message: '请学生自行操作',
            })
            this.$router.push({ name: 'Home' })
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
      this.ruleForm.filename = file.name
      this.matchData.matchName = this.ruleForm.name
      const extension = file.name.split('.')[1] === 'doc'
      const extension2 = file.name.split('.')[1] === 'docx'
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 doc,docx 格式!',
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

      console.log(this.ruleForm.crew)
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

    groupChange() {
      if (this.ruleForm.type.length > 1) {
        this.ruleForm.type.shift()
      }
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
  margin-left: 70px;
  width: 150px;
}
.sample {
  font-size: 10px;
  color: red;
}
.el-upload__tip {
  color: red;
}
</style>
