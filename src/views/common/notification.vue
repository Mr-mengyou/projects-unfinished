<template>
  <el-main>
    <el-tabs :tab-position="tabPosition" v-model="activeName"  style="height: 500px;"  type="border-card" @tab-click="handleClick" >
      <el-tab-pane label="全部消息" name="all"></el-tab-pane>
      <el-tab-pane label="未读消息" name="unread"></el-tab-pane>
      <el-tab-pane label="已读消息" name="read"></el-tab-pane>
      <router-view ></router-view>
    </el-tabs>
  </el-main>
</template>

<script>
export default {
  data() {
    return {
      activeName:'all',
      
      tabPosition: "left",
      
      routerAlive:true,
    }
  },
  
  mounted(){

    // console.log(this.$route.path)
    let params = (this.$route.path).split("/")[2]
    if(params == 'detail'){
      // this.activeName = localStorage.getItem('activeName')
      this.activeName = this.$store.state.activeName
    }
    else{
      this.activeName = (this.$route.path).split("/")[2]
    }
    // console.log(this.$store.state.activeName)
    // console.log((this.$route.path).split("/")[2])
    
    
  },
  
  
  created(){
    
  },
  
  methods:{
    handleClick(tab){
      this.$router.push({ path: `/notifications/${this.activeName}`});
      
    }
    
    
      
  }
};
</script>

<style>
.el-tabs__item {
  width: 170px;
}
.span_title {
  font-size: 15px;
}
.el-tabs--left .el-tabs__item.is-left {
  text-align: center;
}
#footer {
  float: right;
  
}
</style>