<template>
  <div class="page page_exam_detail">
    <div class="exam_header eaxm_box_shadow">
      
			<span class="header_left font-md" v-if="showLeft">
			  <div v-if="searchObj.pageNo != 1">
					<font class="font-primary-light font-hg">{{activeIndex}}</font>/{{swiperSlides.length}}
        	<font class="font-primary-light">单选</font>
				</div>
				<div v-else>
					<font class="font-primary-light font-hg">{{activeIndex + 1}}</font>/{{swiperSlides.length}}
        	<font class="font-primary-light">单选</font>
				</div>
      </span>

			<span v-else  class="header_left font-md">
			</span>

      <h3 class="header_center font-sm font-primary-light">← 左右滑动切换题目 →	</h3>
      
			<span v-if="showRight"  class="header_right font-md">
				<div v-if="searchObj.pageNo == 1">
					<mu-icon-button  @click="collectQues" :iconClass="swiperSlides[activeIndex].isSc ? 'red':''" tooltip="default tooltip" :icon="swiperSlides[activeIndex].isSc?'favorite':'favorite_border'" />
				</div>
				<div v-else>
					<mu-icon-button  @click="collectQues" :iconClass="swiperSlides[activeIndex - 1].isSc ? 'red':''" tooltip="default tooltip" :icon="swiperSlides[activeIndex -1].isSc?'favorite':'favorite_border'" />
				</div>
      </span>
			
			<span v-else  class="header_right font-md">
			</span>

    </div>
    <div>
      <swiper :options="swiperOption" class="swiper-box" style="height: auto" ref="mySwiper">
				<!-- 上一页 -->
				<swiper-slide v-if="searchObj.pageNo != 1" class="swiper-item next_page">
					 <div @click="lastPage()">
						 上一页
					 </div>
        </swiper-slide>
        
				<swiper-slide v-for="(item,index) in swiperSlides" :key="index" class="swiper-item">
          <examItem class="scroll_content" :style="{width:'100%',height:screenHeight - 105 +'px'}" :date="item"></examItem>
        </swiper-slide>
				<!-- 下一页 -->
				<swiper-slide class="swiper-item next_page">
					 <div @click="nextPage()">
						 下一页
					 </div>
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
      activeIndex: 0,
      swiperOption: {
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        mousewheelControl: true,
        onTransitionStart: swiper => {
          let index = swiper.activeIndex;
					this.activeIndex = index;
          this.value = "none";
					//判断是否显示第一页
					this.justShow()
        },
			
        onTouchMove: swiper => { },
      },
      searchObj: {
        pageNo: 0,
        pageSize: 10,
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
		// 下一页
		nextPage (){
			this.$refs.mySwiper.swiper.slideTo(1)
			this.getQuestionList()
		},
		// 上一页
		lastPage () {
			this.searchObj.pageNo = this.searchObj.pageNo - 2;
			this.getQuestionList()
		},
		// 判断是否显示
		justShow (){
			console.log(this.activeIndex,this.searchObj.pageNo)
			let index = this.activeIndex, pageNo = this.searchObj.pageNo;
			//第一页的情况下 左边按钮
			if(pageNo == 1){
				this.showLeft = index != this.searchObj.pageSize;
				this.showRight = index != this.searchObj.pageSize;
			}else{
				this.showLeft = index != 0 && index != (this.searchObj.pageSize + 1);
				this.showRight = index != 0 && index != (this.searchObj.pageSize + 1);
			}
			
		},
    //收藏
    collectQues() {
      let obj = this.swiperSlides[this.activeIndex];
      utils.jsonp.post("c=apiuser&a=collect", {
        sid: obj.g_sid,
        cid: obj.g_cid,
        tid: obj.g_id
      }, res => {
        console.log("收藏题目", res)
        if (res.CODE) {
          this.swiperSlides[this.activeIndex].isSc = true;
        } else {
          utils.ui.toast(res.data.data)
        }
      })
    },
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
			this.searchObj.pageNo ++ ;
      utils.jsonp.post("c=apiSubject&a=topics", this.searchObj, res => {
        if (res.CODE) {
					this.justShow()
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
              res.data.data[index].isSc = false;
            }
            this.swiperSlides = res.data.data;
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
    .header_left {}
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
