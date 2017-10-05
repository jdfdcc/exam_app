<template>
  <div class="page mine-page page-mycenter">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 94 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.12)" class="mine-avatar mine-section mg-lg">
          <div @click="go('myProfile')">
            <mu-list>
              <mu-list-item class="personal-info-row">
                <mu-avatar class="heard_img" :src="unloggedImg" slot="leftAvatar" :size="56" />
                <div class="personal-info-col">
                  <div class="has-logged personal-info">
                    <div class="mobile-num">疯狂的小李子</div>
                    <div class="points-and-authentication">
                      <div width="48" class="info-col font-md">
                        13773213499
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
            <section v-for="(item,index) in itemList_one" :key="index">
              <mu-list-item @click="go(item.url)" :title="item.text">
                <img slot="left" :src="item.imgUrl" />
                <div slot="after">
                  {{item.value}}
                </div>
                <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
                <!-- <span>{{item.value}}</span> -->
              </mu-list-item>
              <mu-divider/>
            </section>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <section v-for="(item,index) in itemList" :key="index">
              <mu-list-item @click="go(item.url)" :title="item.text">
                <img slot="left" :src="item.imgUrl" />
                <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
              </mu-list-item>
              <mu-divider/>
            </section>
            <mu-list-item :title="'考试时间'">
              <img slot="left" src="static/img/mine/note.png" />
              <label slot="after" style="height: 15px;overflow: unset;">
                {{time}}
                <dateTime v-model="time" slot="after" style="opacity:0;postiton:absolute:top:0px"></dateTime>
              </label>
              <img slot="right" src="../../assets/img/icon/date.png" class="arrow-right" />
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
import dateTime from '../../components/common/Datetime.vue'
export default {
  name: 'myCenter',
  components: {
    'rh-footer': LogoFooter, dateTime
  },
  data() {
    return {
      time: "2012-01-01",
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
        text: "我的排名",
        imgUrl: "./static/img/mine/heat.png",
        type: ""
      }, {
        text: "我的收藏",
        imgUrl: "./static/img/mine/heat.png",
        type: ""
      }, {
        text: "我的统计",
        imgUrl: "./static/img/mine/book.png",
        url: "count",
        type: "count"
      }
        // , {
        //   text: "考试时间",
        //   imgUrl: "./static/img/mine/note.png",
        //   type: ""
        // }
      ],
      orderNum: '--',
      policyServiceNum: '--',
      healthServiceNum: '0',
      mobileNum: '',
      name: '',
      credits: 200,
      headimgurl: '',
      unloggedImg: require('../../assets/img/mine/heard.jpg'),
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
  .heard_img {
    .mu-avatar-inner img {
      width: 100%!important;
      height: 100%!important;
    }
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
            font-size: 1.5rem;
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
            // width: 28px;
            // height: 28px;
            // margin: 0px;
            // border-radius: 0%;
          }
          .wx-avatar img {
            // width: 56px;
            // height: 56px;
            // margin: 0px;
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
