<template>
  <page :noMsg="examList.length==0 && !loading">
    <div class="page page_test">
      <!-- <div class="search  bg-primary-gray">
                                                          <input type="text" placeholder="请输入搜索内容">
                                                          <button>搜索</button>
                                                        </div> -->
      <div class="list_content">
        <listItem @toDetail="toEaxm" :date="item" style="margin-top:15px" v-for="(item,index) in examList" :key="index"></listItem>
        <mugen-scroll v-if="hasMore" :handler="fetchData" :should-handle="!loading">
          <img style="width:20px;margin:10px calc(50% - 10px)" src="../../assets/img/common/loading.gif" />
        </mugen-scroll>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: 'page_test',
  components: {
    'listItem': r => { require.ensure([], () => r(require('./componts/listItem')), 'listItem') },
    MugenScroll: r => { require.ensure([], () => r(require('vue-mugen-scroll')), 'mugenScroll') }
  },
  data() {
    return {
      hasMore: true,
      examList: [],
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
    //跳转到习题详情
    toEaxm(item) {
			console.log("习题详情",item)
      this.$router.push({
        name: "examDetail",
        params: {
          course: JSON.stringify(item)
        }
      })
    },
    //加载更多
    fetchData() {
      this.loading = true;
      this.searchObj.id = this.$route.params.id;
      this.searchObj.pageNo = this.searchObj.pageNo * this.searchObj.pageSize;
      utils.jsonp.post("c=apisubject&a=chapters", this.searchObj, res => {
        if (res.CODE) {
          console.log('章节列表', res)
          this.examList = [...this.examList, ...res.data.data]
          this.hasMore = res.data.data.length >= globalConfig.pageSize;
          this.loading = false;
        } else {
          this.$destroy();
          utils.ui.toast(res.data.data)
        }
      })
    }
  },
  activated() {
  },
  beforeRouteEnter(to, from, next) {
    next(true)
  }
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
