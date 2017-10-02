<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">
      <span class="header_left $font-md">
        <font class="font-primary-light font-hg">{{activeIndex}}</font>/{{swiperSlides.length}}
        <font class="font-primary-light">单选</font>
      </span>
      <h3 class="header_center font-sm font-primary-light">←左右滑动切换题目→</h3>
      <div class="header_right $font-md">保存</div>
    </div>
    <div>
      <swiper :options="swiperOption" class="swiper-box" style="height: auto">
        <swiper-slide v-for="(item,index) in swiperSlides" :key="index" class="swiper-item">
          <examItem class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="item"></examItem>
        </swiper-slide>
      </swiper>
    </div>
    <div class="footer">
      <mu-paper>
        <mu-bottom-nav :value="value" @change="handleChange">
          <mu-bottom-nav-item value="card" title="答题卡" icon="restore" />
          <mu-bottom-nav-item value="answer" title="答案解析" icon="favorite" />
        </mu-bottom-nav>
      </mu-paper>
    </div>
    <answerPop @toQus="toQus"></answerPop>
  </div>
</template>

<script>
export default {
  name: 'page_exam_detail',
  components: {
    examItem: r => { require.ensure([], () => r(require('./componts/examItem')), 'examItem') },
    answerPop: r => { require.ensure([], () => r(require('./componts/answerPop')), 'answerPop') }
  },
  data() {
    return {
      activeIndex: 1,
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onTransitionStart: swiper => {
          this.activeIndex = swiper.activeIndex + 1;
          this.value = "none";
        },
      },
      showAnswer: false,
      showAnserPop: false,
      swiperSlides: [{}, {}, {}],
      value: 'none',
      examList: [1, 1, 1, 1, 1, 1, 1, 1],
      loading: false
    }
  },
  methods: {
    handleChange(val) {
      this.value = val;
      this.showAnserPop = val == 'card';
      this.showAnswer = val == 'answer';
    },
    changeSwipe(newIndex, oldIndex) {
      console.log(`swipe from ${newIndex} to ${oldIndex}`);
    },
    toQus(item) {
      this.showAnserPop = false;
      console.log(item)
    }
  },
  mounted() {
    // setInterval(() => {
    //   console.log('simulate async data')
    //   let swiperSlides = this.swiperSlides
    //   if (swiperSlides.length < 100) swiperSlides.push({})
    // }, 300)
  },
  watch: {
    showAnserPop(val) {
      !val && (this.value = "none")
    }
  },
  // ,
  beforeRouteLeave(to, from, next) {
    next(!this.showAnserPop);
    if (this.showAnserPop) {
      this.showAnserPop = false
      this.value = "none"
    }
  }
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
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
}
</style>
