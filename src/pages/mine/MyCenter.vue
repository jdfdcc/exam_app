<template>
  <div class="page mine-page page-mycenter">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 94 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg">
          <div @click="go('myProfile')">
            <mu-list>
              <mu-list-item class="personal-info-row">
                <mu-avatar v-if="!mobileNum" :src="unloggedImg" class="unlogged-avatar" slot="leftAvatar" :size="56" />
                <mu-avatar v-if="mobileNum" :src="headimgurl" slot="leftAvatar" class="wx-avatar" :size="56" />
                <div class="personal-info-col">
                  <div v-if="!mobileNum" class="not-logged personal-info font-bold">未登录</div>
                  <div v-if="mobileNum" class="has-logged personal-info">
                    <div class="mobile-num font-bold">{{mobileNum | formatNum}}</div>
                    <div class="points-and-authentication">
                      <div width="48" v-if="credits>0" class="info-col">
                        <img src="../../assets/img/mine/icon_points_level.png">
                      </div>
                    </div>
                  </div>
                </div>
                <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
              </mu-list-item>
            </mu-list>
          </div>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item v-for="(item,index) in itemList" :key="index" :title="item.text">
              <img slot="left" :src="item.imgUrl" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
          </mu-list>
        </section>
      </section>
    </mu-content-block>
    <div class="pd-hg">
      <mu-raised-button label="注销" class="demo-raised-button button-primary_red" primary/>
    </div>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from './../../components/common/LogoFooter.vue'
import Toast from '../../components/common/Toast.vue'
export default {
  name: 'myCenter',
  components: {
    'rh-footer': LogoFooter,
  },
  data() {
    return {
      itemList: [
        {
          text: "我的钱包充值",
          imgUrl: "./static/img/mine/money.png",
          type: "",
          value: 100 + "元"
        }, {
          text: "我的收藏",
          imgUrl: "./static/img/mine/heat.png",
          type: ""
        }, {
          text: "我的专属客服",
          imgUrl: "./static/img/mine/kefu.png",
          type: ""
        }, {
          text: "我的错题",
          imgUrl: "./static/img/mine/book.png",
          type: ""
        }, {
          text: "我的笔记",
          imgUrl: "./static/img/mine/note.png",
          type: ""
        }
      ],
      orderNum: '--',
      policyServiceNum: '--',
      healthServiceNum: '0',
      mobileNum: '',
      name: '',
      credits: 200,
      headimgurl: '',
      unloggedImg: require('../../assets/img/mine/icon_unlogged.png'),
      loading: false
    }
  },
  methods: {
    //获取订单列表
    getOrderList() {
      let requestParam = {
        ststList: ["01", "08", "03", "06", "02"], //所有状态（待完成、已完成、已取消）
        cOprCde: utils.cache.get('user').cUserId,//操作人
      }
      return utils.http.post('MYORDERLIST', requestParam)
    },
    //获取保单列表
    getPolicyList() {
      let user = utils.cache.get('user');
      let requestParam = {
        CAppName: user.cName,//投保人姓名 *  
        CCertfCde: user.cCertfCde,//证件号码 *
        CCertfCls: user.cCertfCls,//证件类型 *
        ststList: ['0', '1', '4'], //所有状态（待完成、已完成、已取消）
        cOprCde: utils.cache.get('user').cUserId,//操作人
      }
      return utils.http.post('RHPOLICYLIST', requestParam)
    },
  },
  computed: {

  },
  filters: {
    formatNum(value) {
      if (!value) return ''
      value = value.toString()
      return value.substring(0, 3) + '****' + value.substring(7)
    }
  },
  created() {
    //微信头像
    store.commit('LOADING_DISABLED', true)
    utils.wx.wxUserInfo().then(req => {
      console.log("返回数据", req)
      this.headimgurl = req.headimgurl
      console.log(this.headimgurl)
    })
  },
  activated() {
    let userInfo = utils.cache.get('user')
    if (userInfo) {
      //user手机号
      this.mobileNum = userInfo.cMobile
      this.name = userInfo.cName
      //获取订单保单数量
      if (!store.state.common.loading) {
        store.commit('LOADING_DISABLED', true)
        this.loading = true
      }

      let vm = this
      utils.http.axios.all([this.getOrderList(), this.getPolicyList()]).then(utils.http.axios.spread((orders, policy) => {
        vm.loading = false
        store.commit('LOADING_DISABLED', false)
        console.log(orders, policy)
        this.orderNum = orders.data.length
        this.policyServiceNum = policy.data.length
      })).catch(function(e) {
        vm.loading = false
        console.log(e)
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == 'login' && utils.cache.get('user')) {
      next(false)
      utils.wx.wxClose();
    } else {
      next(true)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/assets/css/mine';
.mine-body .mu-divider {
  height: 2px;
}

.page-mycenter {
  .mine-avatar {
    .personal-info-row {
      height: 88px;
      .personal-info-col {
        .not-logged {
          margin-left: 18px;
          font-size: $font-lg;
          color: $normal-color-light;
        }
        .has-logged {
          margin-left: 10px;
          .mobile-num {
            font-size: 1.7rem;
            margin-bottom: 6px;
            color: $normal-color;
          }
          .points-and-authentication {
            display: flex;
            max-width: 160px;
          }
          .info-col {
            flex-grow: 1;
            display: flex;
            height: 17px;
            line-height: 17px;
            font-size: $font-tn;
            color: $memo-color-light;
            img {
              width: 15px;
              height: 17px;
              vertical-align: middle;
            }
            div {
              flex-grow: 1;
              padding-left: 8%;
              padding-top: 1px;
              line-height: 17px;
            }
          }
        }
      }
    }
    .order-row {
      height: 88px;
      text-align: center;
      display: flex;
      .order-col {
        height: 100%;
        flex-grow: 1;
        .order-num {
          height: 44px;
          line-height: 44px;
          font-size: 1.9rem;
          font-weight: bold;
        }
        .order-type {
          height: 44px;
          font-size: 1.3rem;
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/mine';
.page-mycenter {
  .mine-avatar {
    .personal-info-row {
      .mu-item {
        height: 88px;
        .mu-item-left {
          width: 56px;
          margin-top: 8px;
          margin-left: 6px;
          .mu-avatar {
            background-color: $input-border-color;
          }
          .unlogged-avatar img {
            width: 28px;
            height: 28px;
            margin: 0px;
            border-radius: 0%;
          }
          .wx-avatar img {
            width: 56px;
            height: 56px;
            margin: 0px;
          }
        }
        .mu-item-content {
          padding-left: 15%;
          padding-right: -5%;
        }
        .mu-item-right {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
