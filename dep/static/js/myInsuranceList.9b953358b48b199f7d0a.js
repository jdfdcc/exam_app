webpackJsonp([18],{571:function(t,e,i){function a(t){i(694)}var n=i(0)(i(625),i(757),a,"data-v-771c40d4",null);t.exports=n.exports},625:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"myInsuranceList",data:function(){return{activeTab:"tab2",insureList:[]}},methods:{handleTabChange:function(t){this.activeTab=t,this.getInurseList()},go:function(t,e){"insuranceDetails"===t?this.$router.push({name:t,params:{insuranceCode:e.CPlyNo}}):this.$router.push({name:t})},getInurseList:function(){var t=this,e=utils.cache.get("user"),i={CAppName:e.cName,CCertfCde:e.cCertfCde,CCertfCls:e.cCertfCls,ststList:null,cOprCde:utils.cache.get("user").cUserId};i.ststList="tab1"==this.activeTab?["0"]:"tab2"==this.activeTab?["1"]:["4"],utils.http.post("RHPOLICYLIST",i).then(function(e){console.log(e),t.insureList=e.data}).catch(function(e){t.insureList=[],utils.ui.toast("网络异常")})}},mounted:function(){this.getInurseList()}}},656:function(t,e,i){e=t.exports=i(1)(!1),e.push([t.i,'.mine-page[data-v-771c40d4]{background-color:#f9f9f9}.mine-page .mu-item-left img[data-v-771c40d4]{width:18px;height:18px;margin-left:4px}.mine-page .mu-item-content[data-v-771c40d4]{margin-left:-10px}.mine-page .mu-item-title[data-v-771c40d4]{font-size:1.3rem;color:#556074}.mine-page .mu-item-after[data-v-771c40d4]{font-size:1.3rem;color:#babec6;margin-right:-20px}.mine-page .mu-item-right .arrow-right[data-v-771c40d4]{width:14px;height:14px}.mine-page-list[data-v-771c40d4]{background-color:#f9f9f9}.mine-page-list .mu-content-block[data-v-771c40d4],.mine-page .mu-content-block[data-v-771c40d4]{min-height:480px}.mine-page-list .mu-content-block .mine-list-nav[data-v-771c40d4],.mine-page .mu-content-block .mine-list-nav[data-v-771c40d4]{-webkit-box-shadow:0 3px 15px 0 #e8ecf2;box-shadow:0 3px 15px 0 #e8ecf2}.mine-page-list .mine-header[data-v-771c40d4],.mine-page .mine-header[data-v-771c40d4]{min-height:104px;text-align:center}.mine-page-list .mine-section[data-v-771c40d4],.mine-page .mine-section[data-v-771c40d4]{background:#fff;border-radius:2px;color:#556074}.mine-page-list .mine-section .mine-inner-group .memo[data-v-771c40d4],.mine-page .mine-section .mine-inner-group .memo[data-v-771c40d4]{font-size:1.2rem;line-height:18px;padding-top:24px;padding-bottom:24px}.mine-page-list .mine-section .mine-inner-group .field[data-v-771c40d4],.mine-page .mine-section .mine-inner-group .field[data-v-771c40d4]{height:44px;margin-bottom:14px;font-size:1.2rem}.mine-page-list .mine-section .mine-inner-group .field label[data-v-771c40d4]:first-child,.mine-page .mine-section .mine-inner-group .field label[data-v-771c40d4]:first-child{-webkit-box-flex:0;-ms-flex:0 0 70px;flex:0 0 70px;color:#394043}.mine-page-list .mine-avatar[data-v-771c40d4],.mine-page .mine-avatar[data-v-771c40d4]{margin-top:-88px}.mine-page-list .toast[data-v-771c40d4],.mine-page .toast[data-v-771c40d4]{margin:160px auto auto}.mine-page-list .toast img[data-v-771c40d4],.mine-page .toast img[data-v-771c40d4]{width:34px}.mine-nav[data-v-771c40d4]{-webkit-box-shadow:0 6px 16px #f5f5f5!important;box-shadow:0 6px 16px #f5f5f5!important;z-index:2;width:100%;border-radius:0!important;position:fixed;top:0;left:0}.mine-inner[data-v-771c40d4]{padding:20px 10px 5px;background:#fff;margin-top:50px}.mine-detail-inner[data-v-771c40d4]{padding-bottom:54px!important}.mine-card-item[data-v-771c40d4]{margin-bottom:25px}.mine-card-header[data-v-771c40d4]{padding:0 10px;font-size:12px;line-height:30px;color:#556074;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;background:#f9f9f9}.mine-header-title[data-v-771c40d4]{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:left}.mine-header-operate[data-v-771c40d4]{-webkit-box-flex:0;-ms-flex:none;flex:none;width:90px;text-align:right;color:#ff7431}.mine-header-operate i[data-v-771c40d4]{vertical-align:middle;position:relative;top:-1px}.mine-card-content[data-v-771c40d4]{padding:0 7px;position:relative}.mine-card-flag[data-v-771c40d4]{position:absolute;top:13px;right:5px}.mine-card-flag span[data-v-771c40d4]{display:block;padding:1px 3px;background:#f9f9f9;font-size:12px;margin-bottom:5px}.mine-card-flag .insure[data-v-771c40d4]{color:#c88544}.mine-card-flag .health[data-v-771c40d4]{color:#33bf31}.mine-card-title[data-v-771c40d4]{font-size:15px;color:#394043;line-height:15px;padding:16px 0 10px}.mine-card-detail[data-v-771c40d4]{font-size:12px;line-height:20px;color:#556074}.order-button[data-v-771c40d4]{height:54px;position:fixed;bottom:0;left:0}.mine-line-title[data-v-771c40d4]{position:relative;text-align:center;line-height:21px;margin:13px 10px;color:#bb844f;font-size:12px}.mine-line-title[data-v-771c40d4]:after,.mine-line-title[data-v-771c40d4]:before{content:"";height:0;width:calc(50% - 40px);border-bottom:1px dashed #bb844f;position:absolute;top:10px}.mine-line-title[data-v-771c40d4]:before{left:0}.mine-line-title[data-v-771c40d4]:after{right:0}.mine-attestation[data-v-771c40d4]{margin:0 10px;background:#fff;padding:15px 10px;border:1px solid #e9ecee;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mine-attestation-avatar[data-v-771c40d4]{-webkit-box-flex:0;-ms-flex:none;flex:none;width:25px;height:25px;background-image:url('+i(716)+");background-size:100% 100%}.mine-attestation-content[data-v-771c40d4]{-webkit-box-flex:1;-ms-flex:1;flex:1;padding:0 5px 0 15px;line-height:20px}.mine-attestation-title[data-v-771c40d4]{font-size:15px;color:#394043}.mine-attestation-detail[data-v-771c40d4]{font-size:13px;color:#556074}.mine-attestation-icon[data-v-771c40d4]{-webkit-box-flex:0;-ms-flex:none;flex:none;font-size:28px;color:#556074}",""])},694:function(t,e,i){var a=i(656);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i(2)("766d19f7",a,!0)},716:function(t,e,i){t.exports=i.p+"static/img/icon_attestation.png"},757:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("page",{staticClass:"no-padding"},[i("div",{staticClass:"nav mine-nav"},[i("mu-tabs",{staticClass:"tab",attrs:{value:t.activeTab},on:{change:t.handleTabChange}},[i("mu-tab",{attrs:{value:"tab1",title:"待生效"}}),t._v(" "),i("mu-tab",{attrs:{value:"tab2",title:"已生效"}}),t._v(" "),i("mu-tab",{attrs:{value:"tab3",title:"已失效"}})],1)],1),t._v(" "),i("div",{staticClass:"mine-inner"},[i("div",{staticClass:"mine-card-list"},t._l(t.insureList,function(e,a){return i("div",{key:a,staticClass:"mine-card-item",on:{click:function(i){t.go("insuranceDetails",e)}}},[i("div",{staticClass:"mine-card-header"},[i("div",{staticClass:"mine-header-title"},[t._v("保单号："+t._s(e.CPlyNo))]),t._v(" "),i("div",{staticClass:"mine-header-operate"},[i("span",[t._v(t._s(t._f("commonFilter")(e.CPlySts,"insuranceCode")))]),t._v(" "),i("mu-icon",{attrs:{value:"keyboard_arrow_right"}})],1)]),t._v(" "),i("div",{staticClass:"mine-card-content"},[i("div",{staticClass:"mine-card-title"},[t._v(t._s(e.CNmeCn))]),t._v(" "),i("div",{staticClass:"mine-card-flag"},["01"==e.CType?i("span",{staticClass:"insure"},[t._v("保险")]):t._e(),t._v(" "),"02"==e.CType?i("span",{staticClass:"health"},[t._v("健康")]):t._e()]),t._v(" "),i("div",{staticClass:"mine-card-detail"},[i("div",[t._v("投保人："+t._s(e.CAppNme))]),t._v(" "),i("div",[t._v("被保人："+t._s(e.CInsuredNme))]),t._v(" "),i("div",[t._v("保障期限："+t._s(t._f("insuYearFilter")(e.CInsuYear,e.TAppTm)))]),t._v(" "),i("div",[t._v("基本保额："+t._s(t._f("moneyFilter")(e.NAmt))+"元")]),t._v(" "),i("div",[t._v("保费："+t._s(t._f("toFixedFilter")(e.NPrm))+"元")])])])])}))])])},staticRenderFns:[]}}});