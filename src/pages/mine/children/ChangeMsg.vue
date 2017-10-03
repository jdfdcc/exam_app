<template>
  <div class="page mine-page page-email-authentication">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="mine-inner-group mg-lg">
            <div class="memo font-memo">修改个人信息:
              <font style="color:black">{{$route.params.type|getMsg}}</font>
            </div>
          </div>
          <div class="mine-inner-group mg-lg">
            <ValidatorInput btnClear="true" :form.sync="validateObj.text" :validator="{rules:['require']}" v-model="text" hintText="请输入" fullWidth/>
          </div>
          <div class="mine-inner-group mg-lg submit-btn">
            <mu-raised-button @click="submit" :disabled="!validateObj.text.status" class="demo-raised-button button-primary" :label="'更改'" primary/>
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import LogoFooter from './../../../components/common/LogoFooter.vue'
import Toast from '../../../components/common/Toast.vue'
export default {
  name: 'emailAuthentication',
  components: {
    'rh-footer': LogoFooter,
    'toast': Toast,
  },
  data() {
    return {
      text: "",
      oldEmail: '',
      emailFlag: '',
      emailModel: {
        'Email': '',
        'userId': '',
        'userName': '',  //姓名？姓名：微信昵称
        'reSendEmail': '',  //当为true时，后台只重发邮件
      },
      toast: false,
      validateObj: {
        text: {},
      },
      toastLabel: '',
      feedbackLabel: '',
      isShowDialog: false,
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    showDialog(flag) {
      this.isShowDialog = flag
    },
    submit() {
      console.log("修改信息成功")
      window.history.back();
    },
    returnProfile() {
      this.showDialog(false)
      window.history.back()
    }
  },
  computed: {
    isDisabled() {
      return !this.validateObj.email.status || (this.oldEmail && this.oldEmail == this.emailModel.Email && this.emailFlag == '1')
    },
    // buttonClassObject() {
    //   return {
    //     'button-primary': !this.isDisabled,
    //     'button-disabled': this.isDisabled,
    //   }
    // },
    submitLabel() {
      let str = ''
      if (!this.oldEmail) {
        str = "验证邮箱"
      } else if (this.oldEmail == this.emailModel.Email) {
        if (this.emailFlag == '1') {
          str = "此邮箱已验证"
        } else {
          str = "再次发送验证邮件"
        }
      } else {
        str = "更改并验证邮箱"
      }
      return str
    }
  },
  activated() {
    //获取user信息
    console.log(this.$route.params.type)
    let userInfo = utils.cache.get('user')
    this.emailModel.userId = userInfo.cUserId
    this.emailModel.userName = userInfo.cName
    if (userInfo.cEmail) {
      this.oldEmail = this.emailModel.Email = userInfo.cEmail
      this.emailFlag = userInfo.cEmailFlag
    }
  },
  filters: {
    //获取中文信息
    getMsg(val) {
      let map = {
        "name": "昵称",
        "qq": "QQ",
        "xx": "学校",
        "zy": "专业",
        "lb": "报考类别",
        "mbxx": "目标学校",
        "mbzy": "目标专业"
      };
      return map[val]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-email-authentication {
  .mine-avatar {
    height: 220px;
    .mine-inner-group {
      margin-top: 0px;
      margin-bottom: -2px;
    }
  }
  .submit-btn {
    padding-top: 10px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.mu-dialog.dialog.mine-feedback-dialog {
  position: absolute;
  top: 18.5%;
  left: 8.5%;
  width: 83%;
  height: 30%;
  .mu-dialog-body {
    height: 100%;
    .center {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .mine-dialog-icon {
    margin-top: 10px;
  }
  .mine-dialog-title {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-top: -5px;
  }
  .mine-dialog-description {
    font-size: 1.3rem;
    line-height: 1.5rem;
    padding-top: 12px;
  }
}
</style>
