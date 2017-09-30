<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">
      <span class="header_left $font-md">
        <font class="font-primary-light font-hg">1</font>/22
        <font class="font-primary-light">单选</font>
      </span>
      <h3 class="header_center font-sm font-primary-light">←左右滑动切换题目→</h3>
      <div class="header_right $font-md">收藏</div>
    </div>
    <div>
       <examItem></examItem>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'page_exam_detail',
  components: {
    examItem: r => { require.ensure([], () => r(require('./componts/examItem')), 'examItem') }
  },
  data() {
    return {
      examList: [],
      loading: false
    }
  },
  methods: {
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
.page_exam_detail {
  .exam_header {
    min-height: 40px;
    padding: 10px 15px;
    .header_left {}
    .header_center {}
    .header_right {}
  }
}
</style>
