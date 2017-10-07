<template>
  <div class="page page_exam_simulate">
    <div v-for="(item,index) in simulateList" :key="index" class="simulate_item">
      <div class="simulate_item_inner">
        <div style="width:80%;margin-left:10%;">
          <p class="font-primary font-md">{{item.g_name}}</p>
        </div>
        <div class="end">
          <span class="font-sm font-memo">
            共100道题<br/> 分数：0
          </span>
        </div>
      </div>
    </div>
    <mugen-scroll style="width: 100%;" v-show="hasMore" :handler="fetchData" :should-handle="!loading">
      <img style="width:20px;margin:10px calc(50% - 10px)" src="../../assets/img/common/loading.gif" />
    </mugen-scroll>
  </div>
</template>
<script>
export default {
  name: 'page_exam_simulate',
  components: {
    MugenScroll: r => { require.ensure([], () => r(require('vue-mugen-scroll')), 'mugenScroll') },
  },
  data() {
    return {
      hasMore: true,
      simulateList: [],
      loading: false,
      searchObj: {
        pageNo: 0,
        pageSize: globalConfig.pageSize,
        key: "",
        id: ""
      }
    }
  },
  methods: {
    //查询全真模拟列表
    fetchData() {
      this.searchObj.id = this.$route.params.id;
      this.searchObj.pageNo = this.searchObj.pageNo * this.searchObj.pageSize;
      utils.jsonp.post("c=apiSubject&a=simulations", this.searchObj, res => {
        if (res.CODE) {
          console.log('章节列表', res.data.data)
          this.simulateList = [...this.simulateList, ...res.data.data]
          this.hasMore = res.data.data.length >= globalConfig.pageSize;
        } else {
          this.$destroy();
          utils.ui.toast(res.data.data)
        }
      })
    }
  },
  mounted() {
  },
  watch: {
  }
  // ,
  // beforeRouteLeave(to, from, next) {
  //   next(!this.showAnserPop);
  //   if (this.showAnserPop) {
  //     this.showAnserPop = false
  //     this.value = "none"
  //   }
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.page_exam_simulate {
  display: flex;
  flex-wrap: wrap;
  .simulate_item {
    flex: 0 0 50%;
    padding: 15px; // padding-right: 0px;
    &:nth-child(odd) {
      padding-right: 5px;
    }
    &:nth-child(even) {
      padding-left: 5px;
    }
    .simulate_item_inner {
      position: relative;
      background-image: url('../../assets/img/common/exam_bg_blue.png');
      height: 200px;
      background-size: 100% 100%;
      padding-top: 60px;
      text-align: center;
      p {
        margin: 0px;
      }
      span {
        display: block;
      }
      .end {
        width: 100%;
        position: absolute;
        bottom: 30px;
      }
    }
  }
}
</style>
