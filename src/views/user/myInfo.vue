<template>
  <div class="main">
    <el-main>
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input :disabled="true" size="small" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="学院\专业" prop="region">
          <el-col :span="10" style="marign-right:10px">
            <el-select v-model="ruleForm.acamdemy" placeholder="请选择所属院校\专业">
              <el-option
                v-for="item in acamdemyOptions"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          
          
        </el-form-item>
        <el-form-item label="用户头像" prop="name">
          <el-upload
            ref="upload"
            class="avatar-uploader"
            action="http://127.0.0.1:8000/user/uploadImage"
            
            :on-success="handleAvatarSuccess"
            :on-error="uploadFalse"
            
            :before-upload="beforeAvatarUpload"
            
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item class="modfiyUser">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
import { myInfoApi } from "../../request/api";

export default {
  data () {
    return {
      imageUrl: '',
      ruleForm: {},
      acamdemyOptions:[
        {
          value: '智能技术与工程学院',
          label: '智能技术与工程学院',
        }, {
          value: '电气工程学院',
          label: '电气工程学院'
        }, {
          value: '化学化工学院',
          label: '化学化工学院'
        }, {
          value: '数理与大数据学院',
          label: '数理与大数据学院'
        }, {
          value: '工商管理学院',
          label: '工商管理学院'
        },
      ],
      
    };
  },

  created () {
    this.ruleForm.name = decodeURIComponent(window.atob(sessionStorage.getItem("_info")));

  },
  methods: {
    
    handleAvatarSuccess (response, file, fileList) {
      // var uploadpath = response.uploadPath
      // console.log(uploadPath)
      console.log(fileList)
      console.log(response.code);
      if (response.code == 0) {
        this.imageUrl = URL.createObjectURL(file.raw);
        let uploadurl = response.uploadPath;
        this.ruleForm['userId'] = decodeURIComponent(window.atob(sessionStorage.getItem("_loginId")))
        this.ruleForm["uploadurl"] = uploadurl;
        console.log(this.ruleForm)
      }
    },
    uploadFalse (response, file, fileList) {
      this.$message({
        message: "图片上传失败！",
        type: "error"
      });
    },
    beforeAvatarUpload (file) {
      
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm (formName) {
      
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          myInfoApi(this.ruleForm).then(res => {
          if(res.statusCode==1){
            this.$message({
              type: "success",
              message: "个人信息上传成功"
            });
            sessionStorage.setItem(
            "_imageUrl",
            window.btoa(encodeURIComponent(this.ruleForm.uploadurl))
          );
          sessionStorage.setItem(
            "_major",
            window.btoa(encodeURIComponent(this.ruleForm.major))
          );
          }
        });

        } else {
          return false;
        }
      });

      console.log(this.ruleForm);
    },


  }




};
</script>

<style scoped>
.main {
  margin: 0 auto;
  width: 500px;
}

.avatar-uploader .el-upload {
  border: 2px dashed black;
  border-radius: 6px;
  margin-left: 50px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.modfiyUser {
  margin-left: 50px;
}
</style>