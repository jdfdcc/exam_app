webpackJsonp([5,23],{564:function(t,e,o){function n(t){o(669)}var i=o(0)(o(603),o(724),n,"data-v-5cc38110",null);t.exports=i.exports},576:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"LogoFooter",data:function(){return{}},methods:{toHome:function(){globalConfig.isDebug&&this.go("/page/home")}},computed:{},activated:function(){}}},577:function(t,e,o){e=t.exports=o(1)(!1),e.push([t.i,".logo_footer[data-v-5bdc432c]{min-height:30px;text-align:center;clear:both;width:100%;padding:20px 0}.logo_footer img[data-v-5bdc432c]{width:183px}.footer-fixed[data-v-5bdc432c]{bottom:0;left:0}",""])},578:function(t,e,o){var n=o(577);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(2)("78a205ee",n,!0)},579:function(t,e,o){function n(t){o(578)}var i=o(0)(o(576),o(580),n,"data-v-5bdc432c",null);t.exports=i.exports},580:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"logo_footer",attrs:{id:"LogoFooter"}})},staticRenderFns:[]}},603:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(153),i=o.n(n),c=(o(19),o(579)),s=o.n(c),r=o(741),a=(o.n(r),o(739)),l=(o.n(a),o(740)),u=(o.n(l),o(145));e.default={name:"access",components:{LogoFooter:s.a},data:function(){return{screenHeight:document.documentElement.clientHeight-84}},methods:i()({isLogin:function(){var t={openId:this.$route.params.id.split("&")[0],token:this.$route.params.id.split("&")[1],menuId:this.$route.params.id.split("&")[2].split("_")[0],producId:this.$route.params.id.split("&")[2].split("_")[1]||""};utils.cache.set("wxConfig",t),setTimeout(function(){window.history.pushState({title:"个人中心",url:"#/page/myCenter"},"个人中心","#/page/myCenter")},900)}},o.i(u.b)({logout:"LOGIN"})),activated:function(t){utils.help.pushState(),utils.cache.clear(),this.logout(null),this.isLogin()},beforeRouteEnter:function(t,e,o){o(!0),"login"!=e.name&&e.name&&utils.wx.wxClose()}}},641:function(t,e,o){e=t.exports=o(1)(!1),e.push([t.i,"",""])},669:function(t,e,o){var n=o(641);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(2)("b0f366b6",n,!0)},724:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"page page_access"},[o("LogoFooter",{staticStyle:{position:"fixed",bottom:"20px"}})],1)},staticRenderFns:[]}},739:function(t,e){t.exports={cCnmAbr:"*",cFixedAmtFlag:"0",cInsEndFlag:"0",cKindNo:"00",cNmeCn:"双百家庭支柱（基础款）",cPkgFlag:"1",cPkgPlyFlag:"0",cProdNo:"130001",cStatus:"1",nMinPrm:"598",tBgnTm:"2017-06-22 09:56:55"}},740:function(t,e){t.exports={cCnmAbr:"*",cFixedAmtFlag:"0",cInsEndFlag:"0",cKindNo:"00",cNmeCn:"爱加保医疗保险(实惠款)",cPkgFlag:"1",cPkgPlyFlag:"0",cProdDesc:"100W保额的价格，买300W的保额，且包含癌症绿通服务。",cProdNo:"AJB00A",cSecurityAge:"0周岁-60周岁",cStatus:"1",nMinPrm:"170",tBgnTm:"2017-09-11 11:38:18"}},741:function(t,e){t.exports={login:"login",shop:"product",product:"productDetail",order:"myOrderList",policy:"myInsuranceList",profile:"myCenter"}}});