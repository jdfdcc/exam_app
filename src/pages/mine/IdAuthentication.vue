<template>
  <div class="page mine-page page-id-authentication">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 84 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="avatar-row">
            <div class="avatar"><mu-avatar :src="headimgurl" :size="56"/></div>
            <div class="personal-info font-bold">{{mobileNum | formatNum}}</div>
          </div>
          <div class="mine-inner-group mg-lg">
            <div class="field">
              <label>姓名</label>
              <ValidatorInput :form.sync="validateObj.name" :validator="{rules:['require:','name',{reg:/^\S{2,10}$/,msg:'姓名为2-10个字符'}]}" v-model="idModel.userName" hintText="请输入姓名" fullWidth />
            </div>
            <mu-raised-button :disabled="isDisabled" :class="buttonClassObject" class="submitBtn"
              @click="submit"  label="提交"/>
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
    <toast :show="toast" @update="handleResult">
      <div v-if="isAuthenticationSucceed">
        <img src="../../assets/img/mine/icon_authenticate_succeeded.png">
        <div>身份信息修改成功</div>
      </div>
      <div v-if="!isAuthenticationSucceed">
        <img src="../../assets/img/mine/icon_authenticate_failed.png">
        <div>身份信息修改错误</div>
      </div>
    </toast>
  </div>
</template>

<script>
import LogoFooter from './../../components/common/LogoFooter.vue'
import Toast from '../../components/common/Toast.vue'
export default {
  name:'idAuthentication',
  components: {
    'rh-footer': LogoFooter,
    'toast': Toast,
  },
  data() {
    return {
      mobileNum: '',
      toast: false,
      idModel: {
        'userName': '',
        'IDCard': '',
        'userId':'',
      },
      validateObj: {
        name: {},
        idcard: {},
      },
      isAuthenticationSucceed: true,
      headimgurl: '',
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    showToast(flag) {
      this.toast = flag
    },
    submit() {
      utils.http.post('AUTHENTICATION', this.idModel).then(response => {
        console.log(response.data)
        //存cache
        let user = utils.cache.get('user')
        user.cCertfCde = this.idModel.IDCard
        user.cName = this.idModel.userName
        utils.cache.set('user', user)
        this.isAuthenticationSucceed = true
        this.showToast(true)
      }).catch(error => {
        console.log(error)
        if (error.isLogicError) {
          this.isAuthenticationSucceed = false;
          this.showToast(true)
        }
      })
    },
    handleResult(){
      this.toast = false
      if(this.isAuthenticationSucceed){
        window.history.back()
      }
    }
  },
  computed: {
    isDisabled() {
      return !(this.validateObj.name.status && this.validateObj.idcard.status)
    },
    buttonClassObject() {
      return {
        'button-primary': !this.isDisabled,
        'button-disabled': this.isDisabled,
      }
    }
  },
  filters: {
    formatNum (value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0,3)+'****'+value.substring(7)
    }
  },
  created() {
    //微信头像
    // utils.wx.wxUserInfo().then(req => {
    //   console.log("返回数据", req)
    //   this.headimgurl = req.headimgurl
    //   console.log(this.headimgurl)
    // });
  },
  activated() {
    //获取user信息
    console.log(utils.cache.get('user'))
    let userInfo = utils.cache.get('user')
    this.mobileNum = userInfo.cMobile
    this.idModel.userId = userInfo.cUserId
    if(userInfo.cCertfCde && userInfo.cCertfCls == '0'){
      this.idModel.IDCard = userInfo.cCertfCde
      this.idModel.userName = userInfo.cName
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-id-authentication {
  .mine-avatar {
    height: 274px;
    .avatar-row {
      padding-top:24px;
      padding-bottom: 24px;
      .avatar {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }
      .personal-info {
        width: 100%;
        text-align: center;
        color: $normal-color;
        font-size: 1.7rem;
      }
    }
  }
  .mine-inner-group {
    margin-top:6px;
    .submitBtn{
      margin-top: 10px;
    }
  }
}
</style>
