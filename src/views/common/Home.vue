<template>
  <el-main>
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in image_list" :key="index">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img :src="item.background_url" alt />
      </el-carousel-item>
    </el-carousel>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>网站外的消息栏</span>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        2021年（第14届）中国大学生计算机设计大赛人工智能应用赛公告
      </div>
    </el-card> -->
    <el-card class="box-card">
      <div class="text item" v-for="(item, index) in contentList">
        <a :href="item.content_url" class="home_content">
          <span
            ><strong>{{ '[' + item.matchName + ']' }}</strong></span
          >
          {{ item.content_title }}</a
        >
      </div>
    </el-card>

    <div class="marquee">
      <div class="marquee_title">
        <span>获奖公告栏</span>
      </div>

      <div class="marquee_box">
        <div class="table">
          <ul>
            <li class="table_name">姓名</li>

            <li class="table_matchname">比赛</li>
            <li class="table_work">作品</li>
            <li class="table_award">奖项</li>
          </ul>
        </div>
        <vue-seamless-scroll
          :data="CardPartsStatisticsList"
          class="seamless-warp"
          :class-option="classOption"
          style="width:100%"
        >
          <ul>
            <li
              class="DataList_top"
              v-for="(item, index) in CardPartsStatisticsList"
            >
              <div class="scroll_name">
                {{ item.awardPerson }}
              </div>
              <div class="scroll_matchname">
                {{ item.awardName }}
              </div>
              <div class="scroll_work">
                {{ item.awardWork }}
              </div>
              <div class="scroll_award">
                {{ item.awardLevel }}
              </div>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </el-main>
</template>

<script>
import { getHomeContentApi, getHomeImageApi } from '../../request/api'
import vueSeamless from 'vue-seamless-scroll'
import { getAwardInfoApi } from '../../request/awardInfoApi'
export default {
  name: 'Home',
  data() {
    return {
      // image_list: [img2, img2, img3],
      image_list: [],
      animate: false,
      contentList: [],
      CardPartsStatisticsList: [],
    }
  },
  computed: {
    classOption() {
      return {
        step: 0.2, // 数值越大速度滚动越快

        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 0, // 0向下 1向上 2向左 3向右
      }
    },
  },

  created() {
    this.getAwardInfo()
    this.getHomeContent()
    this.getHomeImage()
  },
  methods: {
    getAwardInfo() {
      getAwardInfoApi().then((res) => {
        if (res.statuCode == 1) {
          this.CardPartsStatisticsList = res.data
          console.log(res.data)
        } else {
          this.$message({
            type: 'error',
            message: '请求出错！',
          })
        }
      })
    },
    getHomeContent() {
      getHomeContentApi().then((res) => {
        if (res.statusCode == 1) {
          this.contentList = res.data
          console.log(res.data)
        } else {
          this.$message({
            type: 'error',
            message: '请求出错！',
          })
        }
      })
    },
    getHomeImage() {
      getHomeImageApi().then((res) => {
        if (res.statusCode == 1) {
          this.image_list = res.data
          console.log(res.data)
        } else {
          this.$message({
            type: 'error',
            message: '请求出错！',
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.home_content {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.seamless-warp {
  height: 270px;
  overflow: hidden;
}
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  max-width: 100%;
  height: 100%;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.text {
  font-size: 14px;
}

.item {
  padding: 5px 0;
}

.box-card {
  width: 42%;
  float: left;

  margin-left: 26px;
  margin-right: 36px;
}

.marquee {
  width: 50%;

  height: 270px;

  align-items: center;

  color: #3a3a3a;

  background-color: white;

  display: flex;

  box-sizing: border-box;

  overflow: hidden;
}

.marquee_title {
  padding: 0 10px;

  height: 21px;

  font-size: 20px;

  /* border-right: 3px solid #d8d8d8; */

  align-items: center;
}

.marquee_box {
  display: block;

  position: relative;

  width: 80%;

  height: 300px;
}
.table {
  margin-left: 20px;
  width: 90%;
  height: 20px;
}
.table_name {
  float: left;
  margin-right: 50px;
}
.table_matchname {
  float: left;
  margin-left: 20px;
  margin-right: 60px;
}
.table_work {
  float: left;
  margin-left: 100px;
}
.table_award {
  float: right;
  margin-right: 5px;
}
.scroll_name {
  float: left;
  width: 70px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.scroll_matchname {
  float: left;
  width: 150px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.scroll_work {
  float: left;
  width: 220px;
  height: 20px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.scroll_award {
  float: left;
  width: 66px;
  text-align: center;
}
</style>
