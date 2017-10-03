<template>
  <div class="page mine-page page-myprofile">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div class="avatar-row">
            <div class="avatar">
              <mu-avatar @click="toLogin" :src="headimgurl" :size="56" />
            </div>
            <div v-if="!idNum" class="personal-info font-bold">{{mobileNum | formatNum}}</div>
            <div v-if="idNum" class="personal-info font-bold">{{name}}</div>
          </div>
          <mu-list>
            <mu-list-item to="changeMsg/name" title="疯狂的西红柿">
              <img slot="left" src="../../assets/img/mine/icon_id_authenticate.png" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
        <section class="contact-section mine-section mg-lg">
          <mu-list>
            <mu-list-item :title="'13771162355'">
              <img slot="left" src="../../assets/img/mine/icon_mobile_num.png" />
            </mu-list-item>
            <mu-divider />
            <mu-list-item title="QQ" to="changeMsg/qq">
              <img slot="left" src="../../assets/img/mine/icon_email.png" />
              <div slot="after">
                80982388
              </div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="学校" to="changeMsg/xx">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div slot="after">安徽大学</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="专业" to="changeMsg/zy">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div slot="after">计算机科学与技术</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="报考类别" to="changeMsg/lb">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div slot="after">会计</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="目标学校" to="changeMsg/mbxx">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div slot="after">清华大学</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="目标专业" to="changeMsg/mbzy">
              <img slot="left" src="../../assets/img/mine/icon_address.png" />
              <div slot="after">烧烤</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item title="修改密码" to="changePassword">
              <img slot="left" src="../../assets/img/mine/icon_change_password.png" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from '../../components/common/LogoFooter.vue'
export default {
  name: 'myProfile',
  components: {
    'rh-footer': LogoFooter
  },
  data() {
    return {
      mobileNum: '',
      name: '',
      idNum: '',
      email: '',
      emailFlag: '', //0:未认证，1:已认证, 空：未提交过email
      address: '',
      headimgurl: '',
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    toLogin() {
      if (globalConfig.isDebug) {
        this.go("/page/login")
      }
    },
    assignUserInfo(userInfo) {
      this.mobileNum = userInfo.cMobile
      if (userInfo.cCertfCde && userInfo.cCertfCls == '0') {
        this.idNum = userInfo.cCertfCde
        this.name = userInfo.cName
      }
      if (userInfo.cEmail) {
        this.email = userInfo.cEmail
        if (userInfo.cEmailFlag) {
          this.emailFlag = userInfo.cEmailFlag
        }
      }
      if (userInfo.cAddrProvince) {
        let district = utils.help.getAddressOfCn(userInfo.cAddrDistrict)
        this.address = district + userInfo.cAddrDetail
      }
    }
  },
  computed: {

  },
  filters: {
    formatNum(value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0, 3) + '****' + value.substring(7)
    },
    formatIdNum(value) {
      if (!value) return ''
      value = value.toString()
      if (value.length == 18) {
        return value.substring(0, 6) + '********' + value.substring(value.length - 4)
      } else {
        return value.substring(0, 6) + '*****' + value.substring(value.length - 4)
      }
    }
  },
  created() {
    // //微信头像
    // utils.wx.wxUserInfo().then(req => {
    //   console.log("返回数据", req)
    //   this.headimgurl = req.headimgurl
    //   console.log(this.headimgurl)
    // });
    //从cache里获取user信息
    let userInfo = utils.cache.get('user')
    console.log(userInfo)
    this.assignUserInfo(userInfo)
  },
  activated() {
    //从后台更新user信息
    let openId = utils.cache.get('wxConfig').openId
    store.commit('LOADING_DISABLED', true)
    // utils.http.post('FINDUSERINFO', { openID: openId })
    //   .then(response => {
    //     //暂时定义没有进行实名认证
    //     response.data.getUserInfo.isAuth = false;
    //     utils.cache.set('user', response.data.getUserInfo)
    //     store.commit('LOGIN', response.data.getUserInfo)
    //     this.assignUserInfo(response.data.getUserInfo)
    //   }).catch(error => {

    //   })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar {
    min-height: 153px;
    .avatar-row {
      padding-top: 24px;
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
        margin-bottom: 20px;
      }
    }
    .authenticated-info {
      div {
        color: $normal-color-light;
        font-size: 1.3rem;
        line-height: 24px;
      }
    }
  }
  .flag {
    font-size: 1.1rem;
    padding: 1px 3px;
    margin-right: 6px;
  }
  .flag.un-auth {
    color: $memo-color;
    background: #FAEDD8;
  }
  .flag.auth {
    color: $primary-color;
    background: #E2F2E1;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar .mu-item-left img {
    width: 24px;
    height: 24px;
    margin-left: 1px;
    vertical-align: middle;
  }
  .contact-section .mu-item-title {
    line-height: 1.5rem;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  }
}
</style>
