<template>
  <div class="page page_test">
    <!-- <div class="search  bg-primary-gray">
      <input type="text" placeholder="请输入搜索内容">
      <button>搜索</button>
    </div> -->
    <div class="list_content">
      <listItem :date="item" style="margin-top:5px" v-for="(item,index) in examList" :key="index"></listItem>
      <mugen-scroll :handler="fetchData" :should-handle="!loading">
        <img style="width:20px;margin:10px calc(50% - 10px)" src="../../assets/img/common/loading.gif" />
      </mugen-scroll>
    </div>
  </div>
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
import listItem from './componts/listItem'
export default {
  name: 'page_test',
  components: {
    'listItem': r => { require.ensure([], () => r(require('./componts/listItem')), 'listItem') },
    MugenScroll
  },
  data() {
    return {
      examList: [],
      loading: false
    }
  },
  methods: {
    fetchData() {
      this.loading = true;
      for (let index = 0; index < 10; index++) {
        this.examList.push({
          index: index
        });
      }
      this.loading = false
    },
    toPay() {
      this.$router.push({ name: "payExam" })
    }
  },
  activated() {
  }
  // ,
  // beforeRouteEnter(to, from, next) {
  //   next(true);
  //   this.$store.commit('LOADING', {
  //     loading: false
  //   })
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.page_test {
  .list_content {
    .search_list {
      margin-top: 10px;
      height: calc(100% - 50px);
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      .mu-item-title {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
