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
                <div class="turn_right" slot="right">
                  <img src="../../assets/img/icon_right.png" class="arrow-right" />
                </div>
              </mu-list-item>
            </mu-list>
          </div>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item @click="go(item.url)" v-for="(item,index) in itemList_one" :key="index" :title="item.text">
              <img slot="left" :src="item.imgUrl" />
              <div class="turn_right" slot="right">
                <img src="../../assets/img/icon_right.png" class="arrow-right" />
                <span>{{item.value}}</span>
              </div>
            </mu-list-item>
            <mu-divider/>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item @click="go(item.url)" v-for="(item,index) in itemList" :key="index" :title="item.text">
              <img slot="left" :src="item.imgUrl" />
              <div class="turn_right" slot="right">
                <img src="../../assets/img/icon_right.png" class="arrow-right" />
                <span>{{item.value}}</span>
              </div>
            </mu-list-item>
            <mu-divider/>
          </mu-list>
        </section>
      </section>
    </mu-content-block>
    <div class="pd-hg">
      <!-- <mu-raised-button label="注销" class="demo-raised-button button-primary_red" primary/> -->
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
      itemList_one: [
        {
          text: "我的钱包充值",
          imgUrl: "./static/img/mine/money.png",
          type: "1",
          url: "moneyCharge",
          value: 100 + "元"
        }, {
          text: "我的专属客服",
          imgUrl: "./static/img/mine/kefu.png",
          url: "faq",
          type: "faq"
        }],
      itemList: [{
        text: "我的收藏",
        imgUrl: "./static/img/mine/heat.png",
        type: ""
      }, {
        text: "我的错题",
        imgUrl: "./static/img/mine/book.png",
        url: "errorList",
        type: "errorList"
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
  },
  activated() {
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
<style  lang="scss">
.page-mycenter {
  .mu-item-right {
    width: 90px;
  }
  .turn_right {
    display: flex;
    justify-content: right;
    width: 100px;
    align-items: center;
    flex-direction: row-reverse;
  }
}
</style>


<style  lang="scss" scoped>
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
