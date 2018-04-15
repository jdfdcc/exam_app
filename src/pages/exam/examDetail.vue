<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">

			<span class="header_left font-md">
			  <div>
					<font class="font-primary-light font-hg">{{questionIndex + 1}}</font>/{{swiperSlides.length}}
        	<font class="font-primary-light">单选</font>
				</div>
      </span>

			<div  class="header_right font-md">
        <!-- <div v-if="swiperSlides.length > 0">
          <mu-raised-button  @click="handleChange('card')" label="答题卡" class="demo-flat-button"/>
				</div>
        <div v-if="swiperSlides.length > 0">
					<mu-icon-button  @click="handleChange('answer')"  tooltip="default tooltip" :icon="swiperSlides[questionIndex].isSc?'help':'help'" />
				</div>
				<div v-if="swiperSlides.length > 0">
					<mu-icon-button  @click="collectQues" :iconClass="swiperSlides[questionIndex].isSc ? 'red':''" tooltip="default tooltip" :icon="swiperSlides[questionIndex].isSc?'favorite':'favorite_border'" />
				</div> -->
        <img  @click="handleChange('card')"  :src="'./static/img/exam_img/answer.png'"/>
        <!-- '+(swiperSlides[questionIndex].isSc?'_a':'')+ -->
        <img  @click="handleChange('answer')"  :src="'./static/img/exam_img/pen.png'"/>
        <img  @click="collectQues"  :src="'./static/img/exam_img/sc'+(swiperSlides[questionIndex].isSc?'_a':'')+'.png'"/>
      </div>

    </div>
    <div style="width:100%" v-if="swiperSlides.length > 0">
      <examItem  class="scroll_content"  :date="swiperSlides[questionIndex]"></examItem>
    </div>
    <div class="footer">
      <mu-raised-button @click="nextQues(-1)"  class="footer_item">上一题</mu-raised-button>
      <mu-raised-button @click="nextQues(1)"  class="footer_item">下一题</mu-raised-button>
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
      searchObj: {
        pageNo: 0,
        pageSize: 150,
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
    // 下一题
    nextQues (type) {
      if (type === -1 && this.questionIndex === 0){
        // 提示没有上一题了
        utils.ui.alert("当前为第一题")
      } else if  (type === 1 && this.questionIndex + 1 === this.swiperSlides.length){
        // 提示没有下一题了
        utils.ui.alert("当前为最后一题")
      } else {
        this.questionIndex += type
      }
    },
    //收藏
    collectQues() {
      let obj = this.swiperSlides[this.questionIndex];
      utils.jsonp.post("c=apiuser&a=collect", {
        sid: obj.g_sid,
        cid: obj.g_cid,
        tid: obj.g_id,
        type: '1'
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
      console.log('获取题目列表')
      let course = JSON.parse(this.$route.params.course)
      console.log(course)
      this.searchObj.sid = course.g_sid || course.sid;
      this.searchObj.cid = course.g_id || course.cid;
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
              // this.$refs.mySwiper.swiper.slideTo(1)
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
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import './../../assets/css/vars';
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
    .header_right {
      display: flex;
      align-items: center;
      justify-content: space-around;
      img{
        width: 40px;
      }
      // .mu-raised-button{
      //   min-width: 80px;
      // }
      // .mu-icon-button {
      //   padding: 0px;
      //   height: auto;
      //   .red {
      //     color: red;
      //   }
      // }
    }
  }
  .footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    height: 50px;
    .footer_item{
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: $primary-color;
      font-size: $font-hg;
      // color:white;
      height: 100%;
      &:first-of-type{
        border-right: 1px solid $shadow-color;
      }
    }
  }
}
</style>
