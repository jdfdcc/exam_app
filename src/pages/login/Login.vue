<template>
  <div class="page page_login">
    <mu-content-block class="has-header no-padding has-logo">
      <section v-bind:style="{'min-height':screenHeight - 64 +'px'}">
        <section class="lg_header bg-primary">
          <img src="../../assets/img/logo.png" @click="test" />
        </section>
        <section class="lg_body eaxm_box_shadow ">
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
                <mu-raised-button :disabled="!validateObj.phone.status || !validateObj.pwd.status" @click="login" label="登录" class="demo-raised-button button-primary" primary/>
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
                <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入4位验证码',{reg:/^\S{4,4}$/,msg:'请输入4位验证码'}]}" v-model="loginModel.verifyCode" hintText="请输入验证码" />
                <img @click="yzmUrl = yzmUrl+'?'+new Date().getTime()" class="yzm" :src="yzmUrl" />
              </section>
              <div class="center">
                <mu-raised-button :disabled="!validateObj.phone.status || !validateObj.verifyCode.status||!validateObj.pwd.status" @click="register" label="注册" class="demo-raised-button bg-primary" primary/>
              </div>
            </section>
          </div>
        </section>
      </section>
      <rh_footer></rh_footer>
    </mu-content-block>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "login",
  components: {
    rh_footer: r => {
      require.ensure(
        [],
        () => r(require("../../components/common/LogoFooter")),
        "logoFooter"
      );
    }
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
        phone: "",
        password: "",
        verifyCode: "",
        loginType: "P", //P密码 Y验证码
        openId: ""
      },
      validateObj: {
        phone: {},
        pwd: {
          status: false
        },
        verifyCode: {}
      },
      activeTab: "tab1",
      openModal: false,
      checked: false
    };
  },
  methods: {
    //勾选
    check() {
      console.log(this.checked);
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
      document.title = this.activeTab == "tab1" ? "登录" : "注册";
    },
    // 注册接口
    register() {
      utils.jsonp.post("c=apiuser&a=register", this.loginModel, res => {
        if (res.CODE) {
          this.activeTab = "tab1";
          this.loginModel.password = "";
          utils.ui.toast("恭喜您注册成功,请您登陆");
        } else {
          utils.ui.toast(res.data.msgs);
        }
      });
    },
    //登陆接口
    login() {
      if (!globalConfig.isDebug) {
        utils.cache.set("user", { phone: 13771162366 });
        this.$router.push({ name: "myCenter" });
      } else {
        utils.jsonp.post("c=apiuser&a=login&", this.loginModel, res => {
          if (res.CODE) {
            //存入token信息
            utils.cache.set('token', res.data.data);
            this.$router.push({ name: 'myCenter' });
          } else {
            this.$destroy();
            utils.ui.toast(res.data.data);
          }
        });
      }
    },
    getUserInfo() {
      utils.jsonp.post("c=apiuser&a=mine&", this.loginModel, res => {
        if (res.CODE) {
          utils.cache.set("user", res.data.data);
        } else {
          this.$destroy();
          utils.ui.toast(res.data.data);
        }
      });
      // console.log("用户信息", res.data.data)
      // utils.cache.set('token', res.data.data)
      // this.$router.push({ name: "myCenter" })
      // utils.cache.set('user', res.data.data)
      // this.$destroy();
    },
    test() {
      if (globalConfig.isDebug) {
        this.loginModel = {
          phone: "13700000001",
          password: "123456",
          verifyCode: "1234",
          loginType: "P" //P密码 Y验证码
        };
      }
    }
  },
  activated() {
    this.$store.commit("LOADING", {
      loading: false
    });
  }
  // ,
  // beforeRouteEnter(to, from, next) {
  //   next(true);
  //   this.$store.commit('LOADING', {
  //     loading: false
  //   })
  // }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/assets/css/login";
.page_login {
  .mu-content-block {
    min-height: 480px;
  }
  background-color: rgb(242, 244, 245);
  .lg_header {
    min-height: 140px;
    text-align: center;
    img {
      margin-top: 32px; // width: 163.8px;
      height: 45px;
    }
  }

  .lg_body {
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-top: -40px;
    background: #ffffff;
    border-radius: 2px;
    min-height: 285px;
    .demo-raised-button {
      height: 4rem;
      border-radius: 2px;
      font-size: 1.5rem;
      width: 100%;
    }
    .demo-raised-button:disabled {
      background: #babec6;
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
          color: #828ca0;
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
