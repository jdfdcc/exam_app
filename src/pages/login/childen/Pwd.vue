<template>
  <div class="page page_pwd">
    <!-- <mu-appbar title="忘记密码"> </mu-appbar> -->
    <mu-content-block class="has-header">
      <section style="margin-top:32px">
        <div class="center pd-lg">
          <mu-stepper :activeStep="activeStep" class="step">
            <mu-step>
              <mu-step-label style="flex-direction:column;">
                <span>验证账号</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                <span>重置密码</span>
              </mu-step-label>
            </mu-step>
            <mu-step>
              <mu-step-label>
                <span>　完成　</span>
              </mu-step-label>
            </mu-step>
          </mu-stepper>
        </div>
      </section>
      <section class="pw_body">
        <br>
        <div>
          <section class="pw_main" v-show="activeStep==0">
            <ValidatorInput :form.sync="validateObj.phone" :validator="{rules:['require:请输入手机号','mobile:请输入正确的手机号']}" type="tel" hintText="请输入您要找回的手机号码" v-model="model.phone" />
            <section class="primary_yzm">
              <ValidatorInput type="tel" :form.sync="validateObj.verifyCode" :validator="{rules:['require:请输入4位验证码',{reg:/^\S{4,4}$/,msg:'请输入4位验证码'}]}" v-model="model.verifyCode" hintText="请输入验证码" />
              <img class="yzm" src="../../../assets/img/yzm.png"/>
            </section>
            <div style="margin-top:20px">
              <mu-raised-button :disabled="!validateObj.phone.status||!validateObj.verifyCode.status" @click="nextStep()" label="下一步" class="demo-raised-button bg-primary" primary/>
            </div>
          </section>
          <section class="pw_main pwd_info" v-show="activeStep==1">
            <ValidatorInput hintText="请输入新密码" :form.sync="validateObj.newPwd" :validator="{rules:['require','pwd']}" v-bind:class="[validateObj.newPwd.status || model.newPwd=='' ? 'error_gray':'']" v-model="model.newPwd" type="password" errorMsg="密码由6-20个字符组成，允许出现英文字母、数字符号组合。" />
            <mu-text-field style="margin-top:30px" :errorText="confirmPwd && model.newPwd != confirmPwd?'两次密码输入不一致':''" v-model="confirmPwd" hintText="请确认新密码" type="password" />
            <div style="margin-top:20px">
              <mu-raised-button :disabled="!validateObj.newPwd.status || model.newPwd != confirmPwd" @click="nextStep()" label="密码重置" class="demo-raised-button  bg-primary" primary/>
            </div>
          </section>
          <section class="pw_main pw_success" v-show="activeStep==2">
            <img src="../../../assets/img/common/success.png" />
            <span style="margin-top:10px;margin-bottom:24px;display:block">密码重置成功</span>
            <div style="margin-top:20px">
              <mu-raised-button @click="nextStep()" label="重新登录" class="demo-raised-button bg-primary" primary/>
            </div>
          </section>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>
<script>
import Vue from 'vue'
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  name: 'forgetPwd',
  components: {
  },
  data() {
    return {
      title: "忘记密码？",
      bottomPopup: false,
      activeStep: 3,
      time: 60,
      btn_yzm: "获取验证码",
      btn_disabled: false,
      model: {
        phone: "",
        verifyCode: "",
        newPwd: ""
      },
      validateObj: {
        phone: {},
        newPwd: {
          status: false
        },
        verifyCode: {}
      },
      confirmPwd: ""
    }
  },
  methods: {
    //获取验证码
    getYzCode() {
    },
    //开始倒计时
    beginTime() {
    },
    //下一步
    nextStep() {
      if (this.activeStep == 2) {
        utils.cache.removeItem("pwd_data")
        window.history.back();
        // this.$router.push('/page/login')
        this.$destroy();
      } else {
        this.activeStep++;
      }
    },
    //弹出密码不可用弹出框
    showModal(position) {
      this.title = "手机号不可用？";
      //设置监听
      window.addEventListener("popstate", e => {
        this.hideModal('bottom');
      }, false);
      this[position + 'Popup'] = true;
      utils.help.pushState()
    },
    //弹出密码不可用弹出框
    hideModal(position) {
      this.title = "忘记密码？";
      this[position + 'Popup'] = false;
      window.addEventListener("popstate", e => {
        this.hideModal('bottom');
      }, false);
    },
    //判断是否为不可点击状态
    isDisabled() {
      return this.activeStep == 0 ? !this.validateObj.phone.status || !this.validateObj.verifyCode.status
        : !this.validateObj.newPwd.status || this.confirmPwd == this.model.newPwd;
      console.log(this.confirmPwd == this.model.newPwd)
    }
  },
  created() {
    this.activeStep = 0;
    if (utils.cache.get("pwd_data")) {
      this.btn_disabled = true;
      this.time = parseInt(utils.cache.get("pwd_data").time);
      this.model = utils.cache.get("pwd_data").model;
      this.beginTime();
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/login';
.answer {
  .text_body {
    line-height: 24px!important;
    margin-top: 9px;
  }
}

.page_pwd {
  background-color: rgb(242, 244, 245)!important;
  height: 100%;
  .mu-content-block {
    padding: 0px;
  }

  .pw_body {
    margin-left: 16px;
    width: calc(100% - 32px);
    padding: 0px 16px; // position: absolute;
    margin-top: 8px;
    background: #FFFFFF;
    border-radius: 2px;
    padding-top: 16px;
    padding-bottom: 24px; // min-height: 285px;
    .demo-raised-button {
      height: 44px;
      border-radius: 2px;
      font-size: 1.5rem;
      width: 100%;
    }
    .demo-raised-button:disabled {
      background: #BABEC6;
      color: white;
    }
    .pw_main {
      .lg_sp {
        text-align: right;
        display: block;
        margin-bottom: 16px;
        margin-top: 16px;
        font-size: 1.2rem;
      }
    }
    .pw_success {
      text-align: center;
      img {
        width: 87px;
        height: auto;
      }
      span {
        font-size: 1.9rem;
      }
    }
  }
}
</style>
