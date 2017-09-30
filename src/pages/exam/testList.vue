<template>
  <div class="page page_test">
    <div class="search  bg-primary-gray">
      <input type="text" placeholder="请输入搜索内容">
      <button>搜索</button>
    </div>
    <div class="list_content  bg-primary-gray" style="margin-top:46px;">
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
  .list_content {}
  .search {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0px;
    height: 44px;
    display: flex;
    justify-content: center;
    padding: 5px;
    input {
      width: 100%;
      outline-style: none;
      background-image: url('../../assets/img/icon/search1.png');
      border: 1px solid #BDBDBD;
      background-repeat: no-repeat;
      padding-left: 30px;
      background-size: 15px;
      background-position-y: center;
      background-position-x: 10px;
      border-radius: 3px;
    }
    button {
      flex: 0 0 60px;
      border: none;
      background: #BABEC6;
      transition: all linear .25s;
      &:active {
        background: white;
      }
    }
  }
}
</style>
