<template>
  <el-main>
    <div class="main">
      <el-card class="box-card" v-for="(item, index) in tableData" :key="index">
        <div slot="header">
          <h3 class="name">{{ item.title }}</h3>
          <p class="date">{{ item.time }}</p>
          <span class="main_content">
            {{ textExpand[index] ? item.content : capitalize(item.content) }}
          </span>

          <span
            @click="textExpandClick(index)"
            style="color:#0fbcf9"
            v-if="item.content.length >= 100"
            >{{ textExpand[index] ? '收缩' : '展开'
            }}<i
              :class="
                textExpand[index] ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              "
            ></i
          ></span>
          <br />
          <!-- <a href>
            <i style="font-size:25px" class="el-icon-star-off"></i>
            <span>收藏</span>
          </a> -->
          <a
            href="javascript:void(0);"
            @click="expand_comment(index)"
            class="comment-layout"
          >
            <i style="font-size:25px" class="el-icon-chat-dot-square"></i>
            <span style="margin-left:7px">评论</span>
          </a>
        </div>

        <div v-if="isexpand[index]">
          <el-input
            placeholder="请输入内容"
            v-model="mainInput"
            clearable
          ></el-input>
          <br />
          <el-button
            type="success"
            size="mini"
            class="push_comment"
            @click="sendMainComment(item.id)"
            >发表</el-button
          >
        </div>

        <div
          :style="{ 'margin-top': isexpand[index] == true ? '50px' : '0px' }"
        >
          <div
            class="div1"
            v-for="(item2, index2) in item.mainComment"
            :key="index2"
          >
            <div class="user-face">
              <img :src="item2.userImage" alt />
            </div>
            <div
              class="con"
              :style="{
                'margin-top': isexpand[index] == true ? '20px' : '0px',
              }"
            >
              <div class="user">
                <span style="font-size:14px">
                  {{ item2.uid }}
                </span>
                <span>{{ item2.userMajor }}</span>
              </div>
              <p class="text" style="margin-top:5px">{{ item2.comment }}</p>
              <div class="info">
                <span class="time">{{ item2.time }}</span>
                <span
                  class="reply"
                  @click="expandCommentItem2(item2.uid, item2.id)"
                >
                  <el-link icon="el-icon-edit">回复</el-link>
                </span>
              </div>

              <div class="reply-box">
                <div
                  class="reply-item"
                  v-for="(item3, index3) in item2.sideComment"
                  :key="index3"
                >
                  <div class="reply-user-face">
                    <img :src="item3.userImage" alt />
                  </div>

                  <div class="reply-con">
                    <div class="user">
                      <span style="font-size:14px;margin-right:5px;">{{
                        item3.uid
                      }}</span>
                      <span>{{ item3.userMajor }}</span>
                      <span
                        style="margin-right:5px;color:#0fbcf9"
                        v-if="item3.replyTo != ''"
                        >@{{ item3.replyTo }}</span
                      >
                      :
                      <span class="text" style="margin-top:5px">{{
                        item3.comment
                      }}</span>
                    </div>
                  </div>
                  <div class="info">
                    <span class="time">{{ item3.time }}</span>
                    <span
                      class="reply"
                      @click="expandCommentItem(item3.uid, item3.id)"
                    >
                      <el-link icon="el-icon-edit">回复</el-link>
                    </span>
                  </div>

                  <div
                    v-if="replyIsexpand[item3.id]"
                    style="margin-top:10px;margin-bottom:45px"
                  >
                    <el-input
                      :placeholder="'@' + replyTo[item3.id]"
                      v-model="sideInput"
                      clearable
                    ></el-input>

                    <br />
                    <el-button
                      type="success"
                      size="mini"
                      class="push_comment"
                      @click="sendSideComment(item2.id, replyTo[item3.id])"
                      >回复</el-button
                    >
                  </div>
                </div>
              </div>

              <div
                v-if="reply_main[item2.id]"
                style="margin-top:10px;margin-bottom:45px"
              >
                <el-input
                  :placeholder="'@' + replyTo[item2.id]"
                  v-model="input1"
                  clearable
                ></el-input>
                <br />
                <el-button
                  type="success"
                  size="mini"
                  class="push_comment"
                  @click="sendSideComment(item2.id, replyTo[item2.id])"
                  >回复</el-button
                >
              </div>
            </div>
            <hr style="width:100%;margin-top:20px;margin-bottom:20px" />
          </div>
        </div>
      </el-card>
    </div>
  </el-main>
</template>

<script>
import {
  getTopicApi,
  senMainCommentApi,
  sendSideCommentApi,
} from '../../request/topicApi.js'
export default {
  name: 'topic',
  data() {
    return {
      // BATHURL: 'http://localhost:8000',

      textExpand: [],
      activeName: 'first',
      replyTo: [],
      isexpand: [],
      reply_main: [],
      replyIsexpand: [],
      mainInput: '',
      sideInput: '',
      input1: '',
      img1: '',
      topicList: [],
      commentList: [],
      tableData: [],
    }
  },
  created() {
    this.getTopic()
  },

  methods: {
    textExpandClick(index) {
      if (
        this.textExpand[index] == false ||
        this.textExpand[index] == undefined
      ) {
        this.$set(this.textExpand, index, true)
      } else {
        this.$set(this.textExpand, index, false)
      }
    },
    capitalize(values) {
      if (!values) return ''
      values = values.toString()
      if (values.length > 100) {
        return values.substr(0, 100)
      } else {
        return values
      }
    },
    getTopic() {
      getTopicApi().then((res) => {
        this.topicList = res.topicList
        this.commentList = res.commentList
        this.tableData = this.filterData(this.topicList, this.commentList)
      })
      // fetch(URL)
      //   .then(res => res.json())
      //   .then(json => {
      //     this.topicList = json.topicList;
      //     this.commentList = json.commentList;
      //     this.tableData = this.filterData(this.topicList, this.commentList);
      //     console.log(this.tableData);
      //   });
    },
    filterData(topicList, commentList) {
      let tmpList = []
      for (let i = 0; i < topicList.length; i++) {
        for (let j = 0; j < commentList.length; j++) {
          if (topicList[i].id == commentList[j].belongId) {
            tmpList.push(commentList[j])
          }
        }
        topicList[i].mainComment = tmpList
        tmpList = []
      }
      return topicList
    },
    sendMainComment(id) {
      let mainCommentList = {
        uid: decodeURIComponent(window.atob(sessionStorage.getItem('_info'))),
        userImage: decodeURIComponent(
          window.atob(sessionStorage.getItem('_imageUrl'))
        ),
        userMajor: decodeURIComponent(
          window.atob(sessionStorage.getItem('_major'))
        ),
        comment: this.mainInput,
        belongId: id,
      }
      senMainCommentApi(mainCommentList)
        .then((res) => {
          if (res.statusCode == 'ok') {
            this.$message({
              type: 'success',
              message: '发表成功',
            })
            this.getTopic()
          } else if (res.statusCode == -2) {
            this.$message({
              type: 'error',
              message: '登录信息失效,请重新登录',
            })
            this.$router.push({ name: 'Home' })
          } else {
            this.$message({
              type: 'error',
              message: '发表失败',
            })
          }
        })

        .catch((err) => {
          this.$message({
            type: 'error',
            message: '请求失败,请稍后再试',
          })
        })
    },
    sendSideComment(id, replyTo) {
      if (this.input1 == '') {
        this.input1 = this.sideInput
      }
      if (
        decodeURIComponent(window.atob(sessionStorage.getItem('_info'))) ==
        replyTo
      ) {
        replyTo = ''
      }
      let sideCommentList = {
        mainId: id,
        uid: decodeURIComponent(window.atob(sessionStorage.getItem('_info'))),
        userImage: decodeURIComponent(
          window.atob(sessionStorage.getItem('_imageUrl'))
        ),
        userMajor: decodeURIComponent(
          window.atob(sessionStorage.getItem('_major'))
        ),
        comment: this.input1,
        replyTo: replyTo,
      }
      sendSideCommentApi(sideCommentList).then((res) => {
        if (res.statusCode == 'ok') {
          this.$message({
            type: 'success',
            message: '发表成功',
          })
          this.getTopic()
        } else if (res.statusCode == -2) {
          this.$message({
            type: 'error',
            message: '登录信息失效,请重新登录',
          })
          this.$router.push({ name: 'Home' })
        } else {
          this.$message({
            type: 'error',
            message: '发表失败',
          })
        }
      })
      // let URL = this.BATHURL + "/topic/addSideComment";
      // let opt = {
      //   method: "post",
      //   body: JSON.stringify(sideCommentList),
      //   headers: {
      //     "content-type": "application/json",
      //     'Authorization' :localStorage.getItem('token'),
      //   }
      // };
      // fetch(URL, opt)
      //   .then(res => res.json())
      //   .then(json => {
      //     if (json.statusCode == "ok") {
      //       this.$message({
      //         type: "success",
      //         message: "发表成功"
      //       });
      //     }else if(json.statusCode == -2){
      //       this.$message({
      //         type: "error",
      //         message: "登录信息失效,请重新登录"
      //       });
      //        this.$router.push({name:'Home'})
      //     }
      //     else {
      //       this.$message({
      //         type: "error",
      //         message: "发表失败"
      //       });
      //     }
      //   })
      //   .catch(err => {
      //     this.$message({
      //       type: "error",
      //       message: "请求失败,请稍后再试"
      //     });
      //   });
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },
    expandCommentItem(toObj, index3) {
      this.replyTo[index3] = toObj
      if (
        this.replyIsexpand[index3] == false ||
        this.replyIsexpand[index3] == undefined
      ) {
        this.$set(this.replyIsexpand, index3, true)
      } else {
        this.$set(this.replyIsexpand, index3, false)
      }
    },
    expand_comment(index) {
      if (this.isexpand[index] == false || this.isexpand[index] == undefined) {
        this.$set(this.isexpand, index, true)
      } else {
        this.$set(this.isexpand, index, false)
      }
    },
    expandCommentItem2(toObj, index2) {
      console.log(index2)
      console.log(this.reply_main[index2])
      this.replyTo[index2] = toObj
      if (
        this.reply_main[index2] == false ||
        this.reply_main[index2] == undefined
      ) {
        this.$set(this.reply_main, index2, true)
      } else {
        this.$set(this.reply_main, index2, false)
      }
    },
  },
}
</script>

<style scoped>
.main {
  position: absolute;
  left: 22%;
}
.box-card {
  width: 800px;
  margin-bottom: 50px;
  /* float: right; */
}
.date {
  font-size: 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.main_content {
  padding-left: 20px;
  line-height: 30px;
}
span {
  font-size: 14px;
  margin-right: 5px;
}
.push_comment {
  margin-top: 10px;
  margin-bottom: 20px;
  width: 65px;
  float: right;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.reply-user-face {
  float: left;

  width: 4%;
  padding-left: 5px;

  margin-right: 10px;
}
.user-face {
  float: left;
  width: 4%;
  padding-left: 10px;
}
.con {
  padding-left: 50px;
  padding-top: 5px;
}
.info span {
  font-size: 10px;
  color: darkgray;
}
.reply-con {
  margin-left: 20px;
}
.text {
  font-size: 14px;
}
.comment-layout {
  display: block;
  margin-top: 10px;
}
</style>
