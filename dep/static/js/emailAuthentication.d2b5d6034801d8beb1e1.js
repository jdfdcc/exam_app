webpackJsonp([2,31],{565:function(e,i,t){function a(e){t(684),t(683)}var o=t(0)(t(619),t(749),a,"data-v-4511737e",null);e.exports=o.exports},578:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"LogoFooter",data:function(){return{}},methods:{toHome:function(){globalConfig.isDebug&&this.go("/page/home")}},computed:{},activated:function(){}}},579:function(e,i,t){i=e.exports=t(1)(!1),i.push([e.i,".logo_footer[data-v-5bdc432c]{min-height:30px;text-align:center;clear:both;width:100%;padding:20px 0}.logo_footer img[data-v-5bdc432c]{width:183px}.footer-fixed[data-v-5bdc432c]{bottom:0;left:0}",""])},580:function(e,i,t){var a=t(579);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(2)("78a205ee",a,!0)},581:function(e,i,t){function a(e){t(580)}var o=t(0)(t(578),t(582),a,"data-v-5bdc432c",null);e.exports=o.exports},582:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement;return(e._self._c||i)("div",{staticClass:"logo_footer",attrs:{id:"LogoFooter"}})},staticRenderFns:[]}},583:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0}),i.default={name:"toast",props:["show"],data:function(){return{slowShow:this.show,visible:!1}},methods:{},computed:{},watch:{show:function(e){var i=this;e&&(this.visible=!0,this.slowShow=e,setTimeout(function(){i.slowShow=!1,setTimeout(function(){i.$emit("update",!1),i.visible=!1},500)},3e3))}},mounted:function(){}}},584:function(e,i,t){i=e.exports=t(1)(!1),i.push([e.i,".toast[data-v-3a967811]{position:fixed;z-index:99999;display:-webkit-box;display:-ms-flexbox;display:flex;padding:10px;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:auto;left:0;top:0;right:0;bottom:0;height:160px;width:190px;text-align:center;color:#fff;border-radius:8px;font-size:15px;background-color:rgba(57,64,67,.9);-webkit-transition:all .5s;transition:all .5s;opacity:0}.show[data-v-3a967811]{opacity:1}",""])},585:function(e,i,t){var a=t(584);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(2)("1975644e",a,!0)},587:function(e,i,t){function a(e){t(585)}var o=t(0)(t(583),t(588),a,"data-v-3a967811",null);e.exports=o.exports},588:function(e,i){e.exports={render:function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("div",{staticClass:"toast",class:{show:e.slowShow},style:{visibility:e.visible?"visible":"hidden"}},[t("div",[e._t("default")],2)])},staticRenderFns:[]}},591:function(e,i){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABGdBTUEAALGPC/xhBQAAAphJREFUeAHtnEFuwyAQRZ3u2htU3UXqQXLYdJsj9B7tulfoNh0iu6IWwWBmmG/3I6GAgZn/nyEbOxkGFhIgARIgARIgARIgARIgARIggT0TuF6vR6kXqWepz3vxGryMnoK3o5kvCR4STOVDGi9myToFDh6kBi9TudSkfqiZLHO/o/mv0n6XrJuFOGp/Fx/By1Rij9M1nU9JGLZ6fLeke+tvDqLonu+8yYvtV1Mm8WYguntwF9BwoGC0wwipgAmnGU5QBiasVlhhEUx4jcgCkbVF93gYEIUiavoDbd5BEoykZc4p20cQjqAhC2lp0NOAZ+4lLlXjHkY8clZBqZ3c01DPXLUcmub3MNYjRxOE1sWWBi1jt/pWXW9h1CKmqmntYJqGNWNp+zSNp2FcI4apSevgLQBa1lr76hp/DYg1a7qa6p2sBkjN3N4+XPOVgCmZ42rCO3kOUG7MWzdU/gyoXTxG7QL7DkS5/Ft28TaEKUxBlXrgHQhCwqt9tcMUHoM3EsjsvrADQ4HchY22dZYLnNTRDcBCjQshzpELnXvwwvW7Y/M4/7JfAqhkDuEJpbEkj6iMcSfGu2QNkDVr4py7abeAaFm7C4AaADRibBKmpnHNWJuAaWHYIiYkTEujlrEhYPYw2COHC8yexnrm6gLTw5BHThOYnkY8c6vARDCAoGEVTCThSFqKYCIKRtSUhIksFFnbDSa8QFEJqxFWWOKcwGmFE5SANr8EoxlGyJxQQd9du7uAAkhLU9w8SGL+5H/p7uTGBeCb1LgkHwDlYiCNiZHUg6pzjcbaVzseo+Cf0j4dDoev6NqmmqP2k4gOXqbyNDXUP+WO7fmPd8Lpsv3jHfU7woAkQAIkQAIkQAIkQAIkQAIkQAIrCPwA7BKijN8dWaoAAAAASUVORK5CYII="},595:function(e,i){e.exports="data:image/png;base64,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"},619:function(e,i,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=t(581),o=t.n(a),n=t(587),l=t.n(n);i.default={name:"emailAuthentication",components:{"rh-footer":o.a,toast:l.a},data:function(){return{oldEmail:"",emailFlag:"",emailModel:{Email:"",userId:"",userName:"",reSendEmail:""},toast:!1,validateObj:{email:{}},toastLabel:"",feedbackLabel:"",isShowDialog:!1,screenHeight:document.documentElement.clientHeight}},methods:{showToast:function(e){this.toast=e},showDialog:function(e){this.isShowDialog=e},submit:function(){var e=this;this.emailModel.userName||utils.wx.wxUserInfo().then(function(i){console.log("返回数据",i),e.emailModel.userName=i.nickname}),this.oldEmail&&this.oldEmail==this.emailModel.Email?this.emailModel.reSendEmail=!0:this.emailModel.reSendEmail=!1,utils.http.post("SENDEMAIL",this.emailModel).then(function(i){if(console.log(i.data),e.emailModel.reSendEmail)e.feedbackLabel="验证邮件已重新发送";else{var t=utils.cache.get("user");t.cEmail=e.emailModel.Email,t.cEmailFlag="0",utils.cache.set("user",t),e.feedbackLabel="邮箱地址已提交"}e.showDialog(!0)}).catch(function(i){if(console.log(i),i.isLogicError){var a=i.errorMessage.indexOf("用户信息更新失败")>=0;if(i.errorMessage.indexOf("验证邮件发送失败")>=0){var o=utils.cache.get("user");o.cEmail=e.emailModel.Email,o.cEmailFlag="0",utils.cache.set("user",o),utils.ui.dialog(i.errorMessage,t(146),["稍后再说","重新发送"],function(i){i?e.submit():e.go("myProfile")})}else a?(e.toastLabel="邮箱提交错误",e.showToast(!0)):utils.ui.dialog(i.errorMessage,t(146),[],function(e){})}})},returnProfile:function(){this.showDialog(!1),window.history.back()}},computed:{isDisabled:function(){return!this.validateObj.email.status||this.oldEmail&&this.oldEmail==this.emailModel.Email&&"1"==this.emailFlag},buttonClassObject:function(){return{"button-primary":!this.isDisabled,"button-disabled":this.isDisabled}},submitLabel:function(){return this.oldEmail?this.oldEmail==this.emailModel.Email?"1"==this.emailFlag?"此邮箱已验证":"再次发送验证邮件":"更改并验证邮箱":"验证邮箱"}},activated:function(){console.log(utils.cache.get("user"));var e=utils.cache.get("user");this.emailModel.userId=e.cUserId,this.emailModel.userName=e.cName,e.cEmail&&(this.oldEmail=this.emailModel.Email=e.cEmail,this.emailFlag=e.cEmailFlag)}}},645:function(e,i,t){i=e.exports=t(1)(!1),i.push([e.i,".mu-dialog.dialog.mine-feedback-dialog{position:absolute;top:18.5%;left:8.5%;width:83%;height:30%}.mu-dialog.dialog.mine-feedback-dialog .mu-dialog-body{height:100%}.mu-dialog.dialog.mine-feedback-dialog .mu-dialog-body .center{height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:distribute;justify-content:space-around}.mu-dialog.dialog.mine-feedback-dialog .mine-dialog-icon{margin-top:10px}.mu-dialog.dialog.mine-feedback-dialog .mine-dialog-title{font-size:1.5rem;line-height:1.5rem;margin-top:-5px}.mu-dialog.dialog.mine-feedback-dialog .mine-dialog-description{font-size:1.3rem;line-height:1.5rem;padding-top:12px}",""])},646:function(e,i,t){i=e.exports=t(1)(!1),i.push([e.i,".mine-page[data-v-4511737e]{background-color:#f9f9f9}.mine-page .mu-item-left img[data-v-4511737e]{width:18px;height:18px;margin-left:4px}.mine-page .mu-item-content[data-v-4511737e]{margin-left:-10px}.mine-page .mu-item-title[data-v-4511737e]{font-size:1.3rem;color:#556074}.mine-page .mu-item-after[data-v-4511737e]{font-size:1.3rem;color:#babec6;margin-right:-20px}.mine-page .mu-item-right .arrow-right[data-v-4511737e]{width:14px;height:14px}.mine-page-list[data-v-4511737e]{background-color:#f9f9f9}.mine-page-list .mu-content-block[data-v-4511737e],.mine-page .mu-content-block[data-v-4511737e]{min-height:480px}.mine-page-list .mu-content-block .mine-list-nav[data-v-4511737e],.mine-page .mu-content-block .mine-list-nav[data-v-4511737e]{-webkit-box-shadow:0 3px 15px 0 #e8ecf2;box-shadow:0 3px 15px 0 #e8ecf2}.mine-page-list .mine-header[data-v-4511737e],.mine-page .mine-header[data-v-4511737e]{min-height:104px;text-align:center}.mine-page-list .mine-section[data-v-4511737e],.mine-page .mine-section[data-v-4511737e]{background:#fff;border-radius:2px;color:#556074}.mine-page-list .mine-section .mine-inner-group .memo[data-v-4511737e],.mine-page .mine-section .mine-inner-group .memo[data-v-4511737e]{font-size:1.2rem;line-height:18px;padding-top:24px;padding-bottom:24px}.mine-page-list .mine-section .mine-inner-group .field[data-v-4511737e],.mine-page .mine-section .mine-inner-group .field[data-v-4511737e]{height:44px;margin-bottom:14px;font-size:1.2rem}.mine-page-list .mine-section .mine-inner-group .field label[data-v-4511737e]:first-child,.mine-page .mine-section .mine-inner-group .field label[data-v-4511737e]:first-child{-webkit-box-flex:0;-ms-flex:0 0 70px;flex:0 0 70px;color:#394043}.mine-page-list .mine-avatar[data-v-4511737e],.mine-page .mine-avatar[data-v-4511737e]{margin-top:-88px}.mine-page-list .toast[data-v-4511737e],.mine-page .toast[data-v-4511737e]{margin:160px auto auto}.mine-page-list .toast img[data-v-4511737e],.mine-page .toast img[data-v-4511737e]{width:34px}.mine-nav[data-v-4511737e]{-webkit-box-shadow:0 6px 16px #f5f5f5!important;box-shadow:0 6px 16px #f5f5f5!important;z-index:2;width:100%;border-radius:0!important;position:fixed;top:0;left:0}.mine-inner[data-v-4511737e]{padding:20px 10px 5px;background:#fff;margin-top:50px}.mine-detail-inner[data-v-4511737e]{padding-bottom:54px!important}.mine-card-item[data-v-4511737e]{margin-bottom:25px}.mine-card-header[data-v-4511737e]{padding:0 10px;font-size:12px;line-height:30px;color:#556074;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;background:#f9f9f9}.mine-header-title[data-v-4511737e]{-webkit-box-flex:1;-ms-flex:1;flex:1;text-align:left}.mine-header-operate[data-v-4511737e]{-webkit-box-flex:0;-ms-flex:none;flex:none;width:90px;text-align:right;color:#ff7431}.mine-header-operate i[data-v-4511737e]{vertical-align:middle;position:relative;top:-1px}.mine-card-content[data-v-4511737e]{padding:0 7px;position:relative}.mine-card-flag[data-v-4511737e]{position:absolute;top:13px;right:5px}.mine-card-flag span[data-v-4511737e]{display:block;padding:1px 3px;background:#f9f9f9;font-size:12px;margin-bottom:5px}.mine-card-flag .insure[data-v-4511737e]{color:#c88544}.mine-card-flag .health[data-v-4511737e]{color:#33bf31}.mine-card-title[data-v-4511737e]{font-size:15px;color:#394043;line-height:15px;padding:16px 0 10px}.mine-card-detail[data-v-4511737e]{font-size:12px;line-height:20px;color:#556074}.order-button[data-v-4511737e]{height:54px;position:fixed;bottom:0;left:0}.page-email-authentication .mine-avatar[data-v-4511737e]{height:220px}.page-email-authentication .mine-avatar .mine-inner-group[data-v-4511737e]{margin-top:0;margin-bottom:-2px}.page-email-authentication .submit-btn[data-v-4511737e]{padding-top:10px}",""])},683:function(e,i,t){var a=t(645);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(2)("3a5c97d2",a,!0)},684:function(e,i,t){var a=t(646);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(2)("2e7cecbc",a,!0)},749:function(e,i,t){e.exports={render:function(){var e=this,i=this,a=i.$createElement,o=i._self._c||a;return o("div",{staticClass:"page mine-page page-email-authentication"},[o("mu-content-block",{staticClass:"has-header no-padding"},[o("section",{style:{"min-height":i.screenHeight-81+"px"}},[o("section",{staticClass:"mine-header bg-primary"}),i._v(" "),o("section",{staticClass:"mine-avatar mine-section mg-lg"},[o("div",{staticClass:"mine-inner-group mg-lg"},[o("div",{staticClass:"memo font-memo"},[i._v("只需登录您填写的邮箱，点击链接认证即可。验证通过后，账号更安全。")])]),i._v(" "),o("div",{staticClass:"mine-inner-group mg-lg"},[o("ValidatorInput",{attrs:{btnClear:"true",form:i.validateObj.email,validator:{rules:["require","email",{reg:/^\S{0,30}$/,msg:"邮箱地址不超过30个字符"}]},hintText:"输入常用邮箱地址",fullWidth:""},on:{"update:form":function(e){i.validateObj.email=e}},model:{value:i.emailModel.Email,callback:function(e){i.emailModel.Email=e},expression:"emailModel.Email"}})],1),i._v(" "),o("div",{staticClass:"mine-inner-group mg-lg submit-btn"},[o("mu-raised-button",{class:i.buttonClassObject,attrs:{disabled:i.isDisabled,label:i.submitLabel},on:{click:i.submit}})],1)])]),i._v(" "),o("rh-footer")],1),i._v(" "),o("toast",{attrs:{show:i.toast},on:{update:function(i){return e.toast=!1}}},[o("div",[o("img",{attrs:{src:t(591)}}),i._v(" "),o("div",[i._v(i._s(i.toastLabel))])])]),i._v(" "),o("mu-dialog",{attrs:{dialogClass:"dialog mine-feedback-dialog",open:i.isShowDialog},on:{close:function(e){i.returnProfile()}}},[o("div",{staticClass:"center pd-hg"},[o("div",{staticClass:"mine-dialog-icon"},[o("img",{staticClass:"dialog-icon",attrs:{src:t(595)}})]),i._v(" "),o("div",[o("div",{staticClass:"dialog-content mine-dialog-title"},[i._v(i._s(i.feedbackLabel))]),i._v(" "),o("div",{staticClass:"dialog-content mine-dialog-description"},[i._v("请前往邮件内进行验证")])])])])],1)},staticRenderFns:[]}}});