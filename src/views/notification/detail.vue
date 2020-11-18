<template>
  <p>{{this.testData}}</p>
</template>

<script>
import { getDetailApi } from "../../request/api";
export default {
  data() {
    return {
      testData: ""
    };
  },

  beforeRouteEnter(to, from, next) {
    // console.log(to.params)
    // this.getListData(to.name)  //获取列表数据

    next(vm => vm.getDetail(to.params, from));
  },

  methods: {
    getDetail(toPath, fromPath) {
      getDetailApi(toPath.id).then(res => {
        console.log(res.state);
        if (res.state == false) {
          let activityname = "unread";
          this.$store.commit("set_active_index", activityname);
        } else if (res.state == true) {
          let activeName = "read";
          this.$store.commit("set_active_index", activeName);
        }
        this.testData = res.data;
      });

      // let URL = `http://127.0.0.1:8000/notifcation/detail/${toPath.id}`
      // fetch(URL)
      //   .then(res=>res.json())
      //   .then(json=>{
      //     console.log(json.state)
      //     if(json.state == false)
      //     {
      //       let activityname = 'unread'
      //       this.$store.commit('set_active_index', activityname)

      //     }
      //     else if(json.state == true){
      //       let activeName = 'read'
      //       this.$store.commit('set_active_index', activeName)

      //     }
      //     this.testData = json.data

      //   })
    }
  }
};
</script>

<style>
</style>