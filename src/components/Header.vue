<template>
  <el-container>
    <el-header height="80px">
      <div class="header">
        <div class="nav-left">
          <img src="../assets/image/logo2.png" alt="重庆科技学院" />
        </div>
        <div class="nav-center">
          <ul>
            <li>
              <a href="/">首页</a>
            </li>
            <li>
              <a href="/notifications">消息</a>
            </li>
            <li>
              <el-dropdown placement="bottom-start" style="height:50px">
                <a href="/activity" style="font-size:15px"
                  >活动<i class="el-icon-arrow-down el-icon--right"></i
                ></a>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    ><a href="/awardInfo">获奖信息</a></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </li>
            <li>
              <a href="/forum">讨论区</a>
            </li>
          </ul>
        </div>

        <div class="nav-right">
          <div v-if="isLogin">
            <el-dropdown placement="bottom-start" style="height:50px">
              <img @click="myInfo" :src="imageUrl" />
              <span class="user" style="font-size:14px">{{ accountName }}</span>

              <el-dropdown-menu slot="dropdown" v-if="isRole == 'teacher'">
                <el-dropdown-item
                  ><a href="/myAccount">消息和活动列表</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/addMessage">发布信息</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/addActivity">发布活动</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/addAwardInfo">发布获奖信息</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/studentRecord">学生提交情况</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a @click="myDataStatistics">数据图表</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a @click="logout">退出登录</a></el-dropdown-item
                >
              </el-dropdown-menu>
              <el-dropdown-menu slot="dropdown" v-else>
                <el-dropdown-item
                  ><a href="/myRecord">我的提交记录</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/myAwardInfo">我的获奖信息</a></el-dropdown-item
                >
                <el-dropdown-item
                  ><a href="/myDataStatistics"
                    >我的数据报表</a
                  ></el-dropdown-item
                >
                <el-dropdown-item
                  ><a @click="logout">退出登录</a></el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <ul class="my_account" v-if="isRole == 'teacher'">
              <li @click="myAccount">消息和活动列表</li>
              <li @click="pushInformation">发布信息</li>
              <li @click="pushActivty">发布活动</li>
              <li @click="pushAwardInfo">发布获奖信息</li>
              <li @click="studentRecord">学生提交情况</li>
              <li @click="logout">退出登录</li>
            </ul>
            <ul class="my_account" v-else>
              <li @click="myRecord">我的提交记录</li>
              <li @click="myAwardInfo">我的获奖信息</li>
              <li @click="myDataStatistics">我的数据报表</li>
              <li @click="logout">退出登录</li>
            </ul> -->
          </div>
          <div v-else>
            <span class="user" @click="login">登录</span>
          </div>
        </div>
      </div>
      <el-dialog
        :visible.sync="loginDialog"
        width="30%"
        :close-on-click-modal="false"
        center
      >
        <h1 class="title">登 录</h1>
        <el-form :model="loginForm">
          <el-form-item>
            <el-input placeholder="请输入账号" v-model="loginForm.username">
              <template slot="prepend">
                <i class="el-icon-user-solid"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              v-model="loginForm.password"
              show-password
            >
              <template slot="prepend">
                <i class="el-icon-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="loginForm.loginType"
              placeholder="登录方式"
              style="width:30%;"
            >
              <el-option
                v-for="item in optionType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" class="loginButton" @click="handleLogin"
          >登录</el-button
        >
      </el-dialog>
    </el-header>
  </el-container>
</template>

<script>
import { loginApi, checkLoginApi } from '../request/api'
export default {
  name: 'Header',
  data() {
    return {
      imageUrl: '',
      loginDialog: false,
      isLogin: false,
      accountName: '',
      isRole: '',
      loginForm: {
        username: '',
        password: '',
        loginType: '学生登录',
      },
      optionType: [
        {
          value: '学生登录',
          label: '学生登录',
        },
        {
          value: '教师登录',
          label: '教师登录',
        },
      ],
    }
  },
  computed: {},
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      console.log('12')
      if (sessionStorage.getItem('_loginId') == null) {
        this.$message({
          type: 'error',
          message: '登录信息过期，请重新登录',
        })
        this.isLogin = false
        this.loginDialog = true
        this.$router.push({ name: 'Home' })
      } else {
        let userId = decodeURIComponent(
          window.atob(sessionStorage.getItem('_loginId'))
        )
        console.log(userId)
        checkLoginApi(userId).then((res) => {
          console.log(res)
          if (res.statusCode == 1) {
            //       console.log("ok")
            if (res.data.role == 'teacher') {
              this.isRole = 'teacher'
            } else {
              let username = res.data.name.split('(')[1].split(')')[0]
              sessionStorage.setItem(
                '_loginId',
                window.btoa(encodeURIComponent(username))
              )
            }
            sessionStorage.setItem(
              '_info',
              window.btoa(encodeURIComponent(res.data.name))
            )
            sessionStorage.setItem(
              '_role',
              window.btoa(encodeURIComponent(res.data.role))
            )
            sessionStorage.setItem(
              '_imageUrl',
              window.btoa(encodeURIComponent(res.data.imageUrl))
            )
            sessionStorage.setItem(
              '_major',
              window.btoa(encodeURIComponent(res.data.major))
            )

            this.loginDialog = false
            this.isLogin = true
            this.accountName = decodeURIComponent(
              window.atob(sessionStorage.getItem('_info'))
            )
            this.imageUrl = decodeURIComponent(
              window.atob(sessionStorage.getItem('_imageUrl'))
            )
            console.log(this.imageUrl)
            if (!this.imageUrl) {
              this.imageUrl =
                'https://447063956-xlf.oss-cn-shanghai.aliyuncs.com/下载.jpg'
            }
          } else if (res.statusCode == -1) {
            this.$message({
              type: 'error',
              message: '登录信息过期，请重新登录',
            })
            this.isLogin = false
            this.loginDialog = true
            this.$router.push({ name: 'Home' })
          }
        })
      }
    },

    login() {
      this.loginDialog = true
    },
    myInfo() {
      this.$router.push({ name: 'myInfo' })
    },
    pushInformation() {
      this.$router.push({ name: 'addMessage' })
    },
    pushActivty() {
      this.$router.push({ name: 'addActivity' })
    },
    myAccount() {
      this.$router.push({ name: 'account' })
    },
    myAwardInfo() {
      this.$router.push({ name: 'awardInfo' })
    },
    pushAwardInfo() {
      this.$router.push({ name: 'addAwardInfo' })
    },
    myRecord() {
      this.$router.push({ name: 'record' })
    },
    studentRecord() {
      this.$router.push({ name: 'studentRecord' })
    },
    myDataStatistics() {
      this.$router.push({ name: 'data' })
    },
    logout() {
      localStorage.removeItem('token')
      sessionStorage.removeItem('_info')
      sessionStorage.removeItem('_role')
      sessionStorage.removeItem('_loginId')
      sessionStorage.removeItem('_major')
      sessionStorage.removeItem('_imageUrl')
      this.isLogin = false
      this.loginDialog = true
      this.accountName = ''
      this.$router.push({ name: 'Home' })
    },
    handleLogin() {
      loginApi(this.loginForm).then((res) => {
        if (res.data.statusCode == 1) {
          this.$message({
            type: 'success',
            message: '登录成功',
          })
          console.log(res.data)
          if (res.data.role == 'teacher') {
            this.isRole = 'teacher'
          }
          sessionStorage.setItem(
            '_info',
            window.btoa(encodeURIComponent(res.data.info))
          )
          sessionStorage.setItem(
            '_role',
            window.btoa(encodeURIComponent(res.data.role))
          )
          sessionStorage.setItem(
            '_loginId',
            window.btoa(encodeURIComponent(this.loginForm.username))
          )
          sessionStorage.setItem(
            '_imageUrl',
            window.btoa(encodeURIComponent(res.data.imageUrl))
          )
          sessionStorage.setItem(
            '_major',
            window.btoa(encodeURIComponent(res.data.major))
          )
          localStorage.setItem('token', res.data.token)
          this.loginDialog = false
          this.isLogin = true
          this.accountName = decodeURIComponent(
            window.atob(sessionStorage.getItem('_info'))
          )
          this.imageUrl = decodeURIComponent(
            window.atob(sessionStorage.getItem('_imageUrl'))
          )

          if ((this.imageUrl = 'undefined')) {
            this.imageUrl =
              'https://447063956-xlf.oss-cn-shanghai.aliyuncs.com/下载.jpg'
          }
        } else if (res.statusCode == -1) {
          this.$message({
            type: 'error',
            message: '登录失败,账号或者密码错误',
          })
        }
      })
    },
    // checkLogin(){
    //   let token = localStorage.getItem('token')
    //   let URL = "http://127.0.0.1:8000/user/checkLogin?token="+token
    //   fetch(URL)
    //   .then(res=>res.json())
    //   .then(json=>{

    //     if (json.statusCode == 1 ) {
    //       console.log("ok")
    //       if(json.data.role=='teacher'){this.isRole = 'teacher'}
    //       else{
    //         let username  = json.data.name.split('(')[1].split(')')[0]
    //         sessionStorage.setItem('_loginId',window.btoa(encodeURIComponent(username)))
    //         }

    //       sessionStorage.setItem('_info',window.btoa(encodeURIComponent(json.data.name)))
    //       sessionStorage.setItem('_role',window.btoa(encodeURIComponent(json.data.role)))

    //       this.loginDialog = false
    //       this.isLogin = true
    //       this.accountName = decodeURIComponent(window.atob(sessionStorage.getItem('_info')))
    //     }
    //     else if (json.statusCode == -1) {
    //       this.$message({
    //         type:'error',
    //         message : '登录信息过期，请重新登录'
    //       })
    //       this.isLogin = false
    //       this.loginDialog = true

    //     }

    //   })
    //   .catch(err=>{
    //     this.$message({
    //         type:'error',
    //         message : '登录信息过期，请重新登录'
    //       })
    //       this.isLogin = false
    //       this.loginDialog = true
    //   })

    // },
    // handleLogin(){
    //   let URL = "http://127.0.0.1:8000/user/login"
    //   let opt = {
    //     method : 'post',
    //     body : JSON.stringify(this.loginForm),
    //     headers :{
    //       'content-type' : 'application/json',

    //     },
    //   }
    //   fetch(URL,opt)
    //   .then(res=>res.json())
    //   .then(json=>{
    //     if (json.statusCode == 1 ) {
    //       this.$message({
    //         type:'success',
    //         message : '登录成功',
    //       })
    //       console.log(json.role)
    //       if(json.role=='teacher'){this.isRole = 'teacher'}
    //       sessionStorage.setItem('_info',window.btoa(encodeURIComponent(json.info)))
    //       sessionStorage.setItem('_role',window.btoa(encodeURIComponent(json.role)))

    //       sessionStorage.setItem('_loginId',window.btoa(encodeURIComponent(this.loginForm.username)))
    //       localStorage.setItem('token',json.token)
    //       this.loginDialog = false
    //       this.isLogin = true
    //       this.accountName = decodeURIComponent(window.atob(sessionStorage.getItem('_info')))

    //     }
    //     else if (json.statusCode == -1) {
    //       this.$message({
    //         type:'error',
    //         message : '登录失败,账号或者密码错误'
    //       })

    //     }

    //   })
    //   .catch(err=>{
    //     this.$message({
    //       type:'error',
    //       message:'请求失败，请稍后再试'
    //     })
    //   })
    // },
  },
}
</script>

<style lang="css" scoped>
.el-header {
  border-bottom: #c9c9c9;
  box-shadow: 0 0.5px 0.5px 0 #c9c9c9;
}

.header {
  width: 1250px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
}
img {
  width: 100%;
  height: 100%;
}

.nav-left {
  float: left;
  width: 307px;
  margin-top: 5px;
}

.nav-center {
  float: left;
  margin-left: 50px;
}

.nav-center ul {
  overflow: hidden;
}

.nav-center ul li {
  float: left;
  margin: 0 30px;
  /*width: 100px;*/
  padding: 0 30px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  position: relative;
}

.nav-center ul li a {
  color: #4a4a4a;
  width: 100%;
  height: 60px;
  display: inline-block;
}

.nav-center ul li a:hover {
  color: #b3b3b3;
}

.nav-center ul li a.is-active {
  color: #4a4a4a;
  border-bottom: 4px solid #ffc210;
}

.nav-center ul li span {
  color: red;
  font-size: 12px;
  position: absolute;
  top: -12px;
  right: -3px;
}

.nav-right {
  float: right;
  position: relative;
  z-index: 100;
}

.nav-right span {
  cursor: pointer;
}

.nav-right div:hover ul {
  display: block;
}

.nav-right .user {
  margin-left: 15px;
}

.nav-right img {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-left: 15px;
}

.nav-right ul {
  display: none;
  position: absolute;
  width: 150px;
  z-index: 100;
  font-size: 12px;
  top: 60px;
  background: #fff;
  border-top: 1px solid #d0d0d0;
  box-shadow: 0 2px 4px 0 #e8e8e8;
}

.nav-right ul li {
  height: 40px;
  color: #4a4a4a;
  padding-left: 30px;
  padding-right: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s linear;
}

.nav-right ul li span.msg {
  margin-left: -80px;
  color: red;
}

.nav-right ul li span.count {
  margin-left: -100px;
  color: red;
}

.user {
  /* margin-right: 50px; */
}
.title {
  text-align: center;
  margin-bottom: 25px;
}
.loginButton {
  width: 100%;
  margin-top: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
a {
  color: #4a4a4a;
}
/* .el-icon-arrow-down {
  font-size: 12px;
} */
</style>
