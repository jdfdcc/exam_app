<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">
      <span class="header_left $font-md">
        <font class="font-primary-light font-hg">{{activeIndex + 1}}</font>/{{swiperSlides.length}}
        <font class="font-primary-light">单选</font>
      </span>
      <h3 class="header_center font-sm font-primary-light">←左右滑动切换题目→</h3>
      <span @click="isHc=!isHc" class="header_right font-md">
        <img v-bind:style="{width:!isHc?'18px':'20px'}" :src="isHc?'../../assets/img/icon/heart_red.png':'../../assets/img/icon/heart.png'" alt="">
      </span>

      <!-- <img> -->
      <!-- <mu-raised-button class="header_right font-md"  @click="register" label="注册"  /> -->
    </div>
    <div>
      <swiper :options="swiperOption" class="swiper-box" style="height: auto" ref="mySwiper">
        <swiper-slide v-for="(item,index) in swiperSlides" :key="index" class="swiper-item">
          <examItem class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="item"></examItem>
        </swiper-slide>
      </swiper>
    </div>
    <div class="footer">
      <mu-paper>
        <mu-bottom-nav :value="value" @change="handleChange">
          <mu-bottom-nav-item value="card" title="答题卡" icon="assignment_late" />
          <mu-bottom-nav-item value="answer" title="答案解析" icon="assignment_turned_in" />
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
    examItem: r => {
      require.ensure([], () => r(require('./componts/examItem')), 'examItem')
    },
    answerPop: r => {
      require.ensure([], () => r(require('./componts/answerPop')), 'answerPop')
    }
  },
  data() {
    return {
      hasQues: false,
      isHc: false,
      activeIndex: 0,
      swiperOption: {
        //3D效果
        // effect: 'cube',
        // grabCursor: true,
        // cube: {
        //   shadow: true,
        //   slideShadows: true,
        //   shadowOffset: 20,
        //   shadowScale: 0.94
        // },
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onTransitionStart: swiper => {
          this.activeIndex = swiper.activeIndex;
          this.value = "none";
        },
        onTouchMove: swiper => { },
      },
      searchObj: {
        pageNo: 0,
        pageSize: 200,
        key: "",
        sid: "", //科目编号
        cid: "" //章节编号
      },
      showAnswer: false,
      showAnserPop: false,
      swiperSlides: [],
      value: 'none',
      examList: [],
      loading: false
    }
  },
  methods: {
    //点击tab-bar
    handleChange(val) {
      this.value = val;
      this.showAnserPop = val == 'card';
      console.log(this.swiperSlides[this.activeIndex])
      this.swiperSlides[this.activeIndex].showAnswer = val == 'answer';
    },
    //答题卡跳转
    toQus(item, index) {
      this.showAnserPop = false;
      console.log(item, index)
      this.$refs.mySwiper.swiper.slideTo(index)
    },
    //获取问题列表
    getQuestionList() {
      let course = JSON.parse(this.$route.params.course)
      console.log(course)
      this.searchObj.sid = course.g_sid;
      this.searchObj.cid = course.g_id;
      this.searchObj.pageNo = this.searchObj.pageNo * this.searchObj.pageSize;
      utils.jsonp.post("c=apiSubject&a=correntdetails", this.searchObj, res => {
        console.log("题目列表", res)
        if (res.CODE) {
          if (res.data.data.length == 0) {
            utils.ui.dialog("当前习题购买后才能进行训练,请选择！", require('../../assets/img/common/icon_warning.png'), ['返回', '购买'], index => {
              if (index == '1') {
                this.$router.push({
                  name: "payExam",
                  params: {
                    payItem: this.$route.params.course
                  }
                })
              } else if (index == '0') {
                this.back();
              }
            })
          }
          // else if (res.data.data.length == 0) {
          //   utils.ui.alert("当前课程无习题，点击确定返回！！", e => {
          //     this.back();
          //   })
          // }
          else {
            for (let index = 0; index < res.data.data.length; index++) {
              res.data.data[index].showAnswer = false;
              res.data.data[index].value = "100";
            }
            this.swiperSlides = res.data.data;
          }
        } else {
          this.$destroy();
          utils.ui.toast(res.data.data)
        }
      })
    }
  },
  watch: {
    //监听弹出框的变化
    showAnserPop(val) {
      !val && (this.value = "none")
    }
  },
  activated() {
    //默认查询题目列表
    this.getQuestionList()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page_exam_detail {
  .exam_header {
    min-height: 40px;
    padding: 10px 15px;
    .header_left {}
    .header_center {}
    .header_right {
      img {
        width: 20px;
        transition: all .25s linear;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
  }
}
</style>
