<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">

			<span class="header_left font-md">
			  <div>
					<font class="font-primary-light font-hg">{{questionIndex + 1}}</font>/{{swiperSlides.length}}
        	<font class="font-primary-light">单选</font>
				</div>
      </span>

      <h3 class="header_center font-sm font-primary-light">← 左右滑动切换题目 →	</h3>

			<span  class="header_right font-md">
				<div v-if="swiperSlides.length > 3">
					<mu-icon-button  @click="collectQues" :iconClass="swiperSlides[questionIndex].isSc ? 'red':''" tooltip="default tooltip" :icon="swiperSlides[questionIndex].isSc?'favorite':'favorite_border'" />
				</div>
      </span>

    </div>
    <div v-if="swiperSlides.length > 3">
      <swiper :options="swiperOption" class="swiper-box" style="height: auto" ref="mySwiper">
				<!-- 上一页 -->
				<swiper-slide class="swiper-item ">
						<examItem v-if="questionIndex > 0" class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="swiperSlides[questionIndex - 1]"></examItem>
            <div v-else>
              没有题目了
            </div>
        </swiper-slide>
        <!--  v-for="(item,index) in swiperSlides" :key="index" -->
				<swiper-slide class="swiper-item ">
          <examItem class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="swiperSlides[questionIndex]"></examItem>
        </swiper-slide>
				<!-- 下一页 -->
				<swiper-slide class="swiper-item ">
					 <examItem class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="swiperSlides[questionIndex + 1]"></examItem>
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
      isSc: false,
			showLeft:false,
      showRight:false,
      questionIndex: 0,
      activeIndex: 0,
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onSlideNextStart: swiper => {
          this.$nextTick(() => {
            this.$refs.mySwiper.swiper.slideTo(1, 0)
          }, 0)
        },
        onSlidePrevStart: swiper => {
          this.$nextTick(() => {
            this.$refs.mySwiper.swiper.slideTo(1, 0)
          }, 0)
        },
         onSlideNextEnd: swiper => {
           if(this.questionIndex > 0){
            this.questionIndex --
           }
        },
        onSlidePrevEnd: swiper => {
          //执行++
          if(this.questionIndex < this.swiperSlides.length){
            this.questionIndex ++
          }
        }
      },
      searchObj: {
        pageNo: 0,
        pageSize: 100000,
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
    //收藏
    collectQues() {
      let obj = this.swiperSlides[this.questionIndex];
      utils.jsonp.post("c=apiuser&a=collect", {
        sid: obj.g_sid,
        cid: obj.g_cid,
        tid: obj.g_id
      }, res => {
        console.log("收藏题目", res)
        if (res.CODE) {
          this.swiperSlides[this.questionIndex].isSc = true;
        } else {
          utils.ui.toast(res.data.data)
        }
      })
    },
    //点击tab-bar
    handleChange(val) {
      this.value = "none"
      this.showAnserPop = val == 'card';
      this.swiperSlides[this.questionIndex ].showAnswer = val == 'answer';
    },
    //答题卡跳转
    toQus(item, index) {
      this.showAnserPop = false;
      this.questionIndex = index;
    },
    //获取问题列表
    getQuestionList() {
      let course = JSON.parse(this.$route.params.course)
      console.log(course)
      this.searchObj.sid = course.g_sid;
      this.searchObj.cid = course.g_id;
			this.searchObj.pageNo ++ ;
      utils.jsonp.post("c=apiSubject&a=topics", this.searchObj, res => {
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
          else {
            for (let index = 0; index < res.data.data.length; index++) {
              res.data.data[index].showAnswer = false;
              res.data.data[index].value = "100";
              res.data.data[index].isSc = false;
            }
            this.swiperSlides = res.data.data;
            this.$nextTick(e => {
              this.$refs.mySwiper.swiper.slideTo(1)
            })
          }
        } else {
					this.$destroy();
          utils.ui.toast(res.data.msgs)
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
  },
   mounted () {
   }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page_exam_detail {
	.next_page{
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2rem;
		div{
			margin-top: 30%;
			background:rgb(61, 161, 255);
			color: rgb(255, 255, 255);
			width: 150px;
			height: 150px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 50%;
		}
	}
  .exam_header {
    min-height: 50px;
    padding: 10px 15px;
    .header_left {
      flex: .7;
      font-size:10px;
    }
    .header_center {}
    .header_right {
      .mu-icon-button {
        padding: 0px;
        height: auto;
        .red {
          color: red;
        }
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
