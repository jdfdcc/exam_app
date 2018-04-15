<template>
  <page :noMsg="examList.length==0 && !loading">
    <div class="page page_error">
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
  name: 'page_error',
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
        sid: ""
      }
    }
  },
  methods: {
    //跳转到习题详情
    toEaxm(item) {
      this.$router.push({
        name: "errorExamDetail",
        params: {
          course: JSON.stringify(item)
        }
      })
    },
    //加载更多
    fetchData() {
      this.loading = true;
      this.searchObj.sid = this.$route.params.id;
      this.searchObj.pageNo ++ ;
      utils.jsonp.post("c=apiSubject&a=corrents", this.searchObj, res => {
        if (res.CODE) {
          console.log('错题列表', res)
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
.page_error {
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
