<template>
  <div class="course_pop">
    <!-- <mu-popup position="bottom" popupClass="mu-popup-full course_pop bg-primary-content" :open="$parent.coursePop"> -->
      <div class="search border-bottom">
        <input type="text" v-model="searchObj.key" placeholder="请输入搜索内容">
        <button @click="searchCourse()"></button>
      </div>
      <div class="search_list bg-primary-w">
        <mu-list>
          <mu-list-item v-for="(item,index) in hotList" :key="index" class="border-bottom" :title="item.g_name">
            <button @click="choose(item)" slot="right" style="margin-top:5px" class="button-sm button-sm-active  font-md">
              {{item.pay_status | hasBuy}}
            </button>
          </mu-list-item>
        </mu-list>
        <!-- </div> -->
        <div v-show="hasMore" style="text-align:center;height:45px;line-height:45px">
          <mu-flat-button @click="loadMore" label="点击加载更多" class="demo-flat-button" />
        </div>
      </div>
    <!-- </mu-popup> -->
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
        pageNo: -1,
        pageSize: globalConfig.pageSize,
        key: ""
      },
      loading: false,
      hotList: [],
      userInfo: {}
    }
  },
  filters:{
    hasBuy(val){
      return val == '0' ? '选择' : '选择'
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
      this.searchObj.pageNo = -1;
      this.loadMore();
    },
    //加载更多
    loadMore() {
      this.searchObj.pageNo ++
      this.searchObj.pageNo = this.searchObj.pageNo * this.searchObj.pageSize;
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
    },
    // 选择支付
    choose (item) {
      this.coursePop = false;
      //页面跳转 选择科目
      utils.jsonp.post("c=apiSubject&a=setsubject&",{
          subjectId: item.g_id,
          subjectName: item.g_name
        },
        res => {
          if (res.CODE) {
            // 设置科目
            this.userInfo.current_subject_id = item.g_id
            this.userInfo.current_subject = item.g_name
            utils.cache.set('user', this.userInfo);
            // 返回首页
            this.$router.push({name: 'examHome'})
          } else {
            utils.ui.toast(res.data.msgs);
          }
        }
      );
    },
    // 支付
    payCourse (item) {
      utils.jsonp.post("c=apisubject&a=subjectpay", {
            userid: this.userInfo.id,
            sid: item.g_id
            // type: '0',
            // money: item.g_money
          },res => {
            if (res.CODE) {
              if (res.data.data.pay_status == '0') {
                 utils.ui.dialog('余额不足，购买失败！',
                  require('../../assets/img/common/icon_warning.png'), ['关闭', '去充值'], index => {
                    if (index == '1') {
                      this.$router.push({name: 'moneyCharge'})
                    }
                  })
              } else {
                item.pay_status = '1'
                this.choose(item)
              }
            } else {
              utils.ui.toast(res.data.msgs);
            }
          }
        )
    }
  },
  mounted() {
    this.userInfo = utils.cache.get("user");
    this.searchCourse();
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
