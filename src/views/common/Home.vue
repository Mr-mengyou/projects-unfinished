<template>
  <el-main>
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item v-for="(item,index) in image_list" :key="index">
        <!-- <h3 class="medium">{{ item }}</h3> -->
        <img :src="item" style="width:100%;" alt />
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-card class="box-card" v-for="(item,index) in content" :key="index"   >
        <el-collapse v-model=" activity[index]" @change="handleChange">
          <p class="card_title">{{item.title}}</p>
          <!-- <el-collapse-item title="一致性 Consistency" name="1">
          </el-collapse-item>-->
          <el-collapse-item title="简介" name="1">
            <div class="s_card">
              <p>{{ item.main_content }}</p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="举办单位" name="2">
            <div class="s_card">
              <strong>主办单位</strong>
              <p>{{ item.sponsor }}</p>  
              <strong>协办单位</strong>
              <p>清华大学</p>
            </div>
          </el-collapse-item>
          <el-collapse-item title="奖项" name="3">
            <div class="s_card">
              <p>{{ item.award }}</p>
              
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-card>

      
    </div>
  </el-main>
</template>

<script>
import img1 from "@/assets/image/l1.jpg";
import img2 from "@/assets/image/l2.png";
import img3 from "@/assets/image/l3.png";
export default {
  name: "Home",
  data() {
    return {
      image_list: [img2, img2, img3],
      activity: [],

      content :"",
    };
  },
  created(){
    this.getcontent()
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    getcontent(){
      let URL = "http://127.0.0.1:8000/home/getContent"
      return new Promise(resolve => {
            fetch(URL)
              .then(res => res.json())
              .then(json => {
                this.content = json.data
                for ( var i=0,cl = this.content.length;i<cl;i++){
                  this.activity.unshift('1')
                }
                
                
                
                resolve();
                
              });
          });
    },

  }
};
</script>

<style scoped>
.el-carousel__item img {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;

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
  padding: 18px 0;
}

.box-card {
  width: 400px;
  float: left;
  margin-left: 16px;
  margin-right: 16px;
}
.card_title {
  text-align: center;
}
.s_card p {
  text-indent: 2em;
}
</style>