webpackJsonp([16],{561:function(e,t,n){function s(e){n(695)}var i=n(0)(n(636),n(746),s,null,null);e.exports=i.exports},636:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"page_exam_detail",components:{examItem:function(e){n.e(22).then(function(){return e(n(730))}.bind(null,n)).catch(n.oe)},answerPop:function(e){n.e(23).then(function(){return e(n(728))}.bind(null,n)).catch(n.oe)}},data:function(){var e=this;return{isHc:!1,activeIndex:1,swiperOption:{pagination:".swiper-pagination",slidesPerView:1,paginationClickable:!0,spaceBetween:0,mousewheelControl:!0,onTransitionStart:function(t){e.activeIndex=t.activeIndex+1,e.value="none"}},showAnswer:!1,showAnserPop:!1,swiperSlides:[{},{},{}],value:"none",examList:[1,1,1,1,1,1,1,1],loading:!1}},methods:{handleChange:function(e){this.value=e,this.showAnserPop="card"==e,this.showAnswer="answer"==e},changeSwipe:function(e,t){console.log("swipe from "+e+" to "+t)},toQus:function(e){this.showAnserPop=!1,console.log(e)}},mounted:function(){},watch:{showAnserPop:function(e){!e&&(this.value="none")}},beforeRouteLeave:function(e,t,n){n(!this.showAnserPop),this.showAnserPop&&(this.showAnserPop=!1,this.value="none")}}},671:function(e,t,n){t=e.exports=n(1)(!1),t.push([e.i,".page_exam_detail .exam_header{min-height:40px;padding:10px 15px}.page_exam_detail .exam_header .header_right img{width:20px;-webkit-transition:all .25s linear;transition:all .25s linear}.page_exam_detail .footer{position:fixed;bottom:0;width:100%}",""])},695:function(e,t,n){var s=n(671);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n(2)("3e51fa76",s,!0)},746:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"page page_exam_detail"},[n("div",{staticClass:"exam_header eaxm_box_shadow"},[n("span",{staticClass:"header_left $font-md"},[n("font",{staticClass:"font-primary-light font-hg"},[e._v(e._s(e.activeIndex))]),e._v("/"+e._s(e.swiperSlides.length)+"\n      "),n("font",{staticClass:"font-primary-light"},[e._v("单选")])],1),e._v(" "),n("h3",{staticClass:"header_center font-sm font-primary-light"},[e._v("←左右滑动切换题目→")]),e._v(" "),n("span",{staticClass:"header_right font-md",on:{click:function(t){e.isHc=!e.isHc}}},[n("img",{style:{width:e.isHc?"20px":"18px"},attrs:{src:e.isHc?"../../assets/img/icon/heart_red.png":"../../assets/img/icon/heart.png",alt:""}})])]),e._v(" "),n("div",[n("swiper",{staticClass:"swiper-box",staticStyle:{height:"auto"},attrs:{options:e.swiperOption}},e._l(e.swiperSlides,function(t,s){return n("swiper-slide",{key:s,staticClass:"swiper-item"},[n("examItem",{staticClass:"scroll_content",style:{width:"100%",height:e.screenHeight-105+"px"},attrs:{date:t}})],1)}))],1),e._v(" "),n("div",{staticClass:"footer"},[n("mu-paper",[n("mu-bottom-nav",{attrs:{value:e.value},on:{change:e.handleChange}},[n("mu-bottom-nav-item",{attrs:{value:"card",title:"答题卡",icon:"assignment_late"}}),e._v(" "),n("mu-bottom-nav-item",{attrs:{value:"answer",title:"答案解析",icon:"assignment_turned_in"}})],1)],1)],1),e._v(" "),n("answerPop",{on:{toQus:e.toQus}})],1)},staticRenderFns:[]}}});