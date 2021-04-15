<template>
  <el-main>
    <!-- <div class="marquee">
      <div class="marquee_title">
        <span>免费微报</span>
      </div>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{ marquee_top: animate }">
          <li v-for="(item, index) in marqueeList">
            <a href="www.baidu.com">{{ item.name }}</a>
          </li>
        </ul>
      </div>
    </div> -->

    <section>
      <el-table :data="marqueeList" class="custom-table-2 hidden-tbody">
        <el-table-column prop="name" label="文件名"></el-table-column>
        <el-table-column prop="name" label="关键词"></el-table-column>
        <el-table-column prop="name" label="处理状态"></el-table-column>
        <el-table-column prop="name" label="时间"></el-table-column>
      </el-table>

      <vue-seamless-scroll
        :data="marqueeList"
        :class-option="classOption"
        class="auto-scorll-table"
      >
        <el-table :data="marqueeList" class="custom-table-2 hidden-thead">
          <el-table-column prop="name" label="文件名"></el-table-column>
          <el-table-column prop="name" label="关键词"></el-table-column>
          <el-table-column prop="name" label="处理状态"></el-table-column>
          <el-table-column prop="name" label="时间"></el-table-column>
        </el-table>
      </vue-seamless-scroll>
    </section>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      animate: false,

      marqueeList: [
        {
          name: '1军电视剧烦恼是的空间开发',
        },

        {
          name: '2军水电费了羧甲淀粉钠盛开',
        },

        {
          name: '3军第三方库收到货否',
        },

        {
          name: '4军杜师傅iOS',
        },
      ],
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

  mounted() {},

  created() {
    // setInterval(this.showMarquee, 2000)
  },

  methods: {
    showMarquee: function() {
      this.animate = true

      setTimeout(() => {
        this.marqueeList.push(this.marqueeList[0])

        this.marqueeList.shift()

        this.animate = false
      }, 500)
    },
  },
}
</script>

<style scoped>
.marquee {
  width: 100%;

  height: 200px;

  align-items: center;

  color: #3a3a3a;

  background-color: white;

  display: flex;

  box-sizing: border-box;

  overflow: hidden;
}

.marquee_title {
  padding: 0 20px;

  height: 21px;

  font-size: 30px;

  /* border-right: 3px solid #d8d8d8; */

  align-items: center;
}

.marquee_box {
  display: block;
  border-left: 3px solid #d8d8d8;
  position: relative;

  width: 60%;

  height: 120px;

  overflow: hidden;
}

.marquee_list {
  display: block;

  position: absolute;

  top: 0;

  left: 0;
}

.marquee_top {
  transition: all 0.5s;

  margin-top: -30px;
}

.marquee_list li {
  height: 30px;

  line-height: 30px;

  font-size: 20px;

  padding-left: 20px;
}

.marquee_list li span {
  padding: 0 2px;
}

.hidden-tbody.el-table {
  height: 34px;
  box-sizing: border-box;
  tbody {
    display: none;
    overflow: hidden;
  }
}
.auto-scorll-table {
  height: calc(100% - 34px);
  overflow: hidden;
}
.hidden-thead.el-table {
  border-top: none; //防止边框重叠
  thead {
    display: none;
    overflow: hidden;
  }
}
</style>
