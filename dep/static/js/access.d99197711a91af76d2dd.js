webpackJsonp([11],{562:function(t,e,n){function o(t){n(666)}var c=n(0)(n(603),n(720),o,"data-v-5cc38110",null);t.exports=c.exports},603:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n(30),c=n.n(o),s=n(150),i=n.n(s),a=n(18),r=n(146),u=n.n(r),l=n(739),p=n.n(l),d=n(737),m=n.n(d),g=n(738),f=n.n(g),h=n(148);e.default={name:"access",components:{LogoFooter:u.a},data:function(){return{screenHeight:document.documentElement.clientHeight-84}},methods:i()({isLogin:function(){var t=this,e={openId:this.$route.params.id.split("&")[0],token:this.$route.params.id.split("&")[1],menuId:this.$route.params.id.split("&")[2].split("_")[0],producId:this.$route.params.id.split("&")[2].split("_")[1]||""};console.log(e),utils.cache.set("wxConfig",e),utils.http.post("FINDUSERINFO",{openID:e.openId}).then(function(n){n.data.getUserInfo.isAuth=!1,utils.cache.set("user",n.data.getUserInfo),a.a.commit("LOGIN",n.data.getUserInfo),t.$router.push({name:p.a[e.menuId],params:{product:JSON.parse("2"==e.producId?m.a:f.a)}})}).catch(function(n){console.log(p.a[e.menuId]),t.$router.push({name:p.a[e.menuId],params:{product:c()("2"==e.producId?m.a:f.a)}})})}},n.i(h.b)({logout:"LOGIN"})),activated:function(t){utils.cache.clear(),this.logout(null),this.isLogin()},beforeRouteEnter:function(t,e,n){n(!0),"login"!=e.name&&e.name&&utils.wx.wxClose()}}},634:function(t,e,n){e=t.exports=n(1)(!1),e.push([t.i,"",""])},666:function(t,e,n){var o=n(634);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);n(2)("b0f366b6",o,!0)},720:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page page_access"},[n("LogoFooter",{staticStyle:{position:"fixed",bottom:"20px"}})],1)},staticRenderFns:[]}},737:function(t,e){t.exports={cCnmAbr:"*",cFixedAmtFlag:"0",cInsEndFlag:"0",cKindNo:"00",cNmeCn:"双百家庭支柱（基础款）",cPkgFlag:"1",cPkgPlyFlag:"0",cProdNo:"130001",cStatus:"1",nMinPrm:"598",tBgnTm:"2017-06-22 09:56:55"}},738:function(t,e){t.exports={cCnmAbr:"*",cFixedAmtFlag:"0",cInsEndFlag:"0",cKindNo:"00",cNmeCn:"爱加保医疗保险(实惠款)",cPkgFlag:"1",cPkgPlyFlag:"0",cProdDesc:"100W保额的价格，买300W的保额，且包含癌症绿通服务。",cProdNo:"AJB00A",cSecurityAge:"0周岁-60周岁",cStatus:"1",nMinPrm:"170",tBgnTm:"2017-09-11 11:38:18"}},739:function(t,e){t.exports={login:"login",shop:"product",product:"productDetail",order:"myOrderList",policy:"myInsuranceList",profile:"myCenter"}}});