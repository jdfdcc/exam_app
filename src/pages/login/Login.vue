<template>
  <div class="page page_login">
    <mu-content-block class="has-header no-padding has-logo">
      <section v-bind:style="{'min-height':screenHeight - 64 +'px'}">
        <section class="lg_header bg-primary">
          <!-- <img src="../../assets/img/lg/logo.png" @click="test" /> -->
        </section>
        <section class="lg_body">
          <!-- {{'022' | commonFilter('relationCode')}} -->
          <div>
            <mu-tabs :value="activeTab" @change="handleTabChange" class="api-view-tabs">
              <mu-tab value="tab1" title="登录" />
              <mu-tab value="tab2" title="注册" />
            </mu-tabs>
            <br/>
            <section v-show="activeTab === 'tab1'" class="lg_main">
              <ValidatorInput inputType="lg" :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入手机号码" v-model="loginModel.phone" />
              <ValidatorInput :form.sync="validateObj.pwd" :validator="{rules:['require:请输入密码','pwd']}" v-if="isPwd" type="password" hintText="请输入密码" v-model="loginModel.password" />
              <section class="primary_yzm " v-else>
                <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入6位验证码',{reg:/^\S{6,6}$/,msg:'请输入6位验证码'}]}" v-model="loginModel.verifyCode" hintText="请输入6位验证码" />
                <button :disabled="btn_disabled || !validateObj.phone.status" @click="getYzCode(true)" class="yzm font-primary">{{btn_yzm}}</button>
              </section>
              <div class="center" style="margin-top:16px">
                <mu-raised-button v-if="isPwd" :disabled="!validateObj.phone.status || !validateObj.pwd.status" @click="login" label="登录" class="demo-raised-button button-primary" primary/>
                <mu-raised-button v-else :disabled="!validateObj.phone.status || !validateObj.verifyCode.status" @click="login" label="登录" class="demo-raised-button button-primary" primary/>
                <div class="lg_sp">
                  <span></span>
                  <!-- <span class=" font-normal" @click="changeLoginMethod()">{{isPwd?'手机验证登录':'密码登录'}}</span> -->
                  <router-link to="/page/pwd">
                    <span class=" font-normal" style="font-size:1.2rem">忘记密码？</span>
                  </router-link>
                </div>
              </div>
            </section>
            <!-- 注册页面 -->
            <section v-show="activeTab === 'tab2'" class="lg_reg pwd_info" style="padding-bottom:24px">
              <ValidatorInput :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入手机号码" v-model="loginModel.phone" />
              <ValidatorInput class="error" hintText="请输入密码" :form.sync="validateObj.pwd" :validator="{rules:['require:请输入密码','pwd']}" v-bind:class="[validateObj.pwd.status || loginModel.password==''?'error_gray':'']" v-model="loginModel.password" type="password" errorMsg="密码由6-20个字符组成，允许出现英文字母、数字符号组合。" />
              <section class="primary_yzm" style="margin-top:24px">
                <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入4位验证码',{reg:/^\S{4,4}$/,msg:'请输入4位验证码'}]}" v-model="loginModel.verifyCode" hintText="请输入6位验证码" />
                <img class="yzm" src="../../assets/img/yzm.png"/>
              </section>
              <!-- <section style="margin:30px 0px 20px 0px;">
                <mu-checkbox @change="check" v-model="checked" label="我已阅读并接受" class="demo-checkbox" />
                <span style="position: absolute;margin-top: 3px;font-size:1.2rem" @click="showModal('bottom')">《瑞华保险会员服务协议》</span>
              </section> -->
              <div class="center">
                <mu-raised-button :disabled="!checked || !validateObj.phone.status || !validateObj.verifyCode.status||!validateObj.pwd.status" @click="register" label="注册" class="demo-raised-button bg-primary" primary/>
              </div>
            </section>
          </div>
        </section>
      </section>
      <rh_footer></rh_footer>
    </mu-content-block>
    <ContentTemplet :openModal="openModal" :type="'1'"></ContentTemplet>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'login',
  components: {
    'rh_footer': r => { require.ensure([], () => r(require('../../components/common/LogoFooter')), 'logoFooter') },
    ContentTemplet: r => { require.ensure([], () => r(require('../../components/common/ContentTemplate')), 'contentTemplate') }
  },
  data() {
    return {
      isPwd: true,
      time: 60,
      reTime: 60,
      showDialog: false,
      lock: false,
      btn_yzm: "获取验证码",
      btn_yzm_re: "获取验证码",
      btn_disabled: false,
      btn_disabled_re: false,
      loginModel: {
        "phone": "",
        "password": "",
        "verifyCode": "",
        "loginType": "P",//P密码 Y验证码
        "openId": utils.cache.get('wxConfig').openId
      },
      validateObj: {
        phone: {},
        pwd: {
          status: true
        },
        verifyCode: {}
      },
      activeTab: 'tab1',
      openModal: false,
      checked: false
    }
  },
  methods: {
    //勾选
    check() {
      console.log(this.checked)
      if (!globalConfig.isDebug && !this.checked) {
        // this.showModal('bottom');
      }
    },
    //改变登录方式
    changeLoginMethod() {
      this.isPwd = !this.isPwd;
    },
    //tab切换
    handleTabChange(val) {
      this.activeTab = val;
      document.title = this.activeTab == 'tab1' ? "登录" : "注册";
    },
    //获取验证码
    getYzCode(isLogin) {
    },
    //显示协议对象
    showModal(position) {
    },
    //登录接口
    login() {
      utils.ui.toast("恭喜登陆成功");
      this.$router.push({name:"myCenter"})
      // window.history.back();
    },
    //注册接口
    register() {
      utils.ui.toast("恭喜注册成功")
    },
    //获取登录
    // getUserMsg(param) {
    //   let req = {
    //   }
    //   utils.http.post('USERREGISTER', req).then(response => {
    //     response.data.userLogin.isAuth = false;
    //     utils.cache.set('user', response.data.userLogin)
    //     //ss
    //     this.$store.commit('LOGIN', utils.cache.get('user'))
    //     this.$destroy();
    //     //dsad
    //     window.history.back();
    //   }).catch(error => {
    //     utils.ui.toast(error.errorMessage)
    //   })
    // },
    test() {
      if (globalConfig.isDebug) {
        console.log(JSON.stringify(this.validateObj))
        this.loginModel = {
          "phone": "13700000001",
          "password": "123456",
          "verifyCode": "1234567",
          "loginType": "P",//P密码 Y验证码
          "openId": utils.cache.get('wxConfig').openId
        };
        // utils.wx.wxConfig().then(req => {
        //   console.log("获取微信配置返回数据", req)
        // });
      }
    }
  },
  activated() {
    this.$store.commit('LOADING', {
      loading: false
    })
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
@import 'src/assets/css/login';
.page_login {
  .mu-content-block {
    min-height: 480px;
  }
  background-color: rgb(242, 244, 245);
  .lg_header {
    min-height: 80px;
    text-align: center;
    img {
      margin-top: 32px; // width: 163.8px;
      height: 40px
    }
  }

  .lg_body {
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-top: -40px;
    background: #FFFFFF;
    border-radius: 2px;
    min-height: 285px;
    .demo-raised-button {
      height: 4rem;
      border-radius: 2px;
      font-size: 1.5rem;
      width: 100%;
    }
    .demo-raised-button:disabled {
      background: #BABEC6;
      color: white;
    }
    .lg_sp {
      font-size: 1.2rem;
      margin-top: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
    }
    .lg_reg,
    .lg_main {
      padding: 0px 16px;
      padding-bottom: 1px;
      .demo-checkbox {
        font-size: 1.2rem;
        .mu-checkbox-label {
          color: #828CA0;
        }
      }
    }
  }
  .lg_xy {
    p {
      font-size: 1.3rem;
      color: #556074;
      line-height: 28px;
    }
  }
}
</style>
