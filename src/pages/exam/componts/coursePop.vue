<template>
  <div class="course_pop">
    <mu-popup position="bottom" popupClass="mu-popup-full course_pop bg-primary-content" :open="$parent.coursePop">
      <div class="search border-bottom">
        <input type="text" placeholder="请输入搜索内容">
        <button></button>
      </div>
      <div class="search_list bg-primary-w">
        <mu-list>
          <mu-list-item v-for="(item,index) in hotList" :key="index" class="border-bottom" :title="item">
            <button @click="$parent.choose(item)" slot="right" style="margin-top:5px" class="button-sm button-sm-active  font-md">
              选择
            </button>
          </mu-list-item>
        </mu-list>
        <!-- </div> -->
        <div style="text-align:center;height:45px;line-height:45px">
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
      loading: false,
      hotList: '导游领队-专转本语文-计算机理论-PS-会计-四级-excl-高等数学-excl-高等数学-excl-高等数学-excl-高等数学'.split("-"),
    }
  },
  props: {
    date: {
      type: Object
    }
  },
  methods: {
    toItem(item) {
      this.$emit("toQus", item);
    },
    loadMore() {
      for (let index = 0; index < 10; index++) {
        this.hotList.push("高等数学");
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
