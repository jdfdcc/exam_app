<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">
      <span class="header_left $font-md">
        <font class="font-primary-light font-hg">{{activeIndex}}</font>/{{swiperSlides.length}}
        <font class="font-primary-light">单选</font>
      </span>
      <h3 class="header_center font-sm font-primary-light">←左右滑动切换题目→</h3>
      <div class="header_right $font-md">收藏</div>
    </div>
    <div :style="{width:'100%',height:screenHeight - 105 +'px'}" ref="wrapper">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide v-for="(item,index) in swiperSlides" :key="index" class="swiper-item">
          <examItem></examItem>
        </swiper-slide>
      </swiper>
    </div>
    <div class="footer">
      <mu-paper>
        <mu-bottom-nav :value="value" @change="handleChange">
          <mu-bottom-nav-item value="name3" title="答题卡" icon="restore" />
          <mu-bottom-nav-item value="2" title="答案解析" icon="favorite" />
          <mu-bottom-nav-item value="3" title="笔记" icon="location_on" />
        </mu-bottom-nav>
      </mu-paper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_exam_detail',
  components: {
    examItem: r => { require.ensure([], () => r(require('./componts/examItem')), 'examItem') }
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
          console.log(this.activeIndex)
          this.activeIndex = swiper.activeIndex + 1;
        },
      },
      swiperSlides: [1, 2, 3, 4, 5],
      value: 'name3',
      examList: [1, 1, 1, 1, 1, 1, 1, 1],
      loading: false
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
      this.value = val;
    },
    changeSwipe(newIndex, oldIndex) {
      console.log(`swipe from ${newIndex} to ${oldIndex}`);
    }
  },
  activated() {
  },
  mounted() {
    // setInterval(() => {
    //   console.log('simulate async data')
    //   let swiperSlides = this.swiperSlides
    //   if (swiperSlides.length < 10) swiperSlides.push(swiperSlides.length + 1)
    // }, 3000)
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
html,
body {
  position: relative;
  height: 100%;
}

body {
  background: #eee;
}

.swiper-box {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.swiper-item {
  height: 100%;
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

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
