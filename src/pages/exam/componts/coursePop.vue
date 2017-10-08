<template>
  <div class="course_pop">
    <mu-popup position="bottom" popupClass="mu-popup-full course_pop bg-primary-content" :open="$parent.coursePop">
      <div class="search border-bottom">
        <input type="text" v-model="searchObj.key" placeholder="请输入搜索内容">
        <button @click="searchCourse()"></button>
      </div>
      <div class="search_list bg-primary-w">
        <mu-list>
          <mu-list-item v-for="(item,index) in hotList" :key="index" class="border-bottom" :title="item.g_name">
            <button @click="$parent.choose(item)" slot="right" style="margin-top:5px" class="button-sm button-sm-active  font-md">
              选择
            </button>
          </mu-list-item>
        </mu-list>
        <!-- </div> -->
        <div v-show="hasMore" style="text-align:center;height:45px;line-height:45px">
          <mu-flat-button @click="loadMore" label="点击加载更多" class="demo-flat-button" />
        </div>
      </div>
    </mu-popup>
  </div>
</template>

<script>
import MugenScroll from 'vue-mugen-scroll'
export default {
  name: 'course_pop',
  components: {
    // vueScroll
    MugenScroll
  },
  data() {
    return {
      hasMore: true,
      searchObj: {
        pageNo: 0,
        pageSize: globalConfig.pageSize,
        key: ""
      },
      loading: false,
      hotList: [],
    }
  },
  props: {
    date: {
      type: Object
    }
  },
  methods: {
    //选择
    toItem(item) {
      this.$emit("toQus", item);
    },
    //点击查询
    searchCourse() {
      this.hotList = [];
      this.searchObj.pageNo = 0;
      this.loadMore();
    },
    //加载更多
    loadMore() {
      this.searchObj.pageNo = this.searchObj.pageNo * this.searchObj.pageSize;
      console.log('请求参数', this.searchObj)
      utils.jsonp.post("c=apiSubject&a=subjects", this.searchObj, res => {
        if (res.CODE) {
          console.log(res.data)
          this.hotList = [...this.hotList, ...res.data.data];
          this.hasMore = res.data.data.length >= globalConfig.pageSize;
          this.loading = this.hasMore;
        } else {
          this.$destroy();
          utils.ui.toast(res.data.data)
        }
      })
    }
  },
  watch: {
    ['$parent.coursePop'](newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.searchCourse();
        }, 200);
      }
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.course_pop {
  .line_header {
    height: 30px;
    display: block;
    margin-bottom: 0px;
    margin-left: 10px;
    line-height: 30px;
  }
  .hot_search {
    padding-bottom: 10px;
    padding-left: 10px;
    height: 100px;
    overflow: hidden; // display: flex;
    flex-wrap: wrap;
    .btn_item {
      margin-right: 10px;
      margin-top: 10px;
      border-radius: 4px;
      min-width: 40px;
      height: 30px;
      .mu-raised-button-label {
        padding: 5px;
      }
    }
  }
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
</style>
