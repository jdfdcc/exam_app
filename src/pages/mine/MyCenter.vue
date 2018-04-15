<template>
  <div class="page mine-page page-mycenter">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 94 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section style="margin-top: -78px;" class="mine-avatar mine-section mg-lg eaxm_box_shadow">
          <div @click=" toUrl('myProfile')">
            <mu-list>
              <mu-list-item class="personal-info-row">
                <mu-avatar  class="heard_img" :src="'http://qn.cutt.com/' + userInfo.headimgurl" slot="leftAvatar" :size="56" />
                <div class="personal-info-col">
                  <div class="has-logged personal-info">
                    <div class="mobile-num">{{userInfo.name || '未设置'}}</div>
                    <div class="points-and-authentication">
                      <div width="48" class="info-col font-md">
                        {{userInfo.phone || '未设置'}}
                      </div>
											<!-- 已认证 -->
											<div width="50" v-if="false" class="info-col">
                        <img src="../../assets/img/mine/icon_id_has_authenticated.png">
                        <div>已认证</div>
                      </div>
											<!-- 未认证 -->
                      <div width="50" v-else class="info-col">
                        <img src="../../assets/img/mine/icon_id_not_authenticated.png">
                        <div>未认证</div>
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
					<!-- item -->
					<div>
						<div class="order-row">
							<!-- 课程库 -->
							<div class="order-col">
								<div @click="go('myInsuranceList')">
									<div class="order-num">--</div>
									<div class="order-type">课程库</div>
								</div>
							</div>
							<!-- 试题库 -->
							<div class="order-col">
								<div>
									<div class="order-num">--</div>
									<div class="order-type">试题库</div>
								</div>
							</div>
							<!-- 考点库 -->
							<div class="order-col">
								<div>
									<div class="order-num">--</div>
									<div class="order-type">考点库</div>
								</div>
							</div>
							<!-- 单词库 -->
							<div class="order-col">
								<div>
									<div class="order-num">--</div>
									<div class="order-type">单词库</div>
								</div>
							</div>
						</div>
					</div>
        </section>

				<!-- 数据 -->
        <section class="mine-section mg-lg">
          <mu-list>
						<!-- 我的钱包充值 我的专属客服 -->
            <section v-for="(item,index) in itemList_one" :key="index">
              <mu-list-item @click=" toUrl(item.url)" :title="item.text">
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
						<!-- 我的排名 我的收藏 我的统计 -->
            <section v-for="(item,index) in itemList" :key="index">
              <mu-list-item @click=" toUrl(item.url)" :title="item.text">
                <img slot="left" :src="item.imgUrl" />
                <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
              </mu-list-item>
              <mu-divider/>
            </section>
						<!-- 考试时间 -->
            <mu-list-item :title="'考试时间'">
              <img slot="left" src="/static/img/exam_img/mine/sj.png" />
              <label slot="after" style="height: 15px;overflow: hidden;text-align:right">
                <span style="position: absolute;right: -20px;top: 1px;">{{time}}</span>
                <dateTime @update = "updateTime" v-model="time" slot="after" style="opacity:0;postiton:absolute:top:0px"></dateTime>
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
// import LogoFooter from './../../components/common/LogoFooter.vue'
export default {
  name: "myCenter",
  components: {
    "rh-footer": r => {
      require.ensure(
        [],
        () => r(require("./../../components/common/LogoFooter.vue")),
        "logoFooter"
      );
    },
    dateTime: r => {
      require.ensure(
        [],
        () => r(require("../../components/common/Datetime.vue")),
        "dateTime"
      );
    }
  },
  data() {
    return {
      userInfo: utils.cache.get("user") || {},
      time: "",
      fromAccess: false,
      itemList_one: [
        {
          text: "我的钱包充值",
          imgUrl: "/static/img/exam_img/mine/qb.png",
          type: "1",
          url: "moneyCharge",
          value:""
        },
        {
          text: "我的专属客服",
          imgUrl: "/static/img/exam_img/mine/kf.png",
          url: "faq",
          type: "faq"
        }
      ],
      itemList: [
        {
          text: "我的排名",
          imgUrl: "/static/img/exam_img/mine/pm.png",
          type: ""
        },
        {
          text: "我的收藏",
          imgUrl: "/static/img/exam_img/mine/sc.png",
          url: "collectList",
          type: ""
        },
        {
          text: "我的统计",
          imgUrl: "/static/img/exam_img/mine/tj.png",
          url: "count",
          type: "count"
        }
      ]
    };
  },
  methods: {
    //页面跳转
    toUrl(url) {
      if (true) {
        this.$router.push({
          name: url,
          params: {
            id: 59
          }
        });
      } else {
        utils.ui.toast("请先选择科目");
      }
    },
    /**
     * 获取用户信息
     */
    getUserInfo() {
      utils.jsonp.post("c=apiuser&a=mine&", {}, res => {
        if (res.CODE) {
          utils.cache.set("user", res.data.data);
          this.userInfo = utils.cache.get("user");
          this.time = this.userInfo.time
					//设置金钱
					this.itemList_one[0].value = this.userInfo.money;
        } else {
          //获取用户信息失败时候处理
          utils.ui.alert("获取用户信息失败，请检查网络或者重新登录!!!", () => {
            this.fromAccess && this.$router.push({ name: "login" });
          });
        }
      });
    },
    /**
     * 更新时间
     */
    updateTime() {
      utils.jsonp.post("c=apiuser&a=edit",{ key: "time", value: this.time },
        res => {
          if (res.CODE) {
            // 更新时间
            this.userInfo.time = this.time
            utils.cache.set("user", this.userInfo);
            utils.ui.toast("修改成功");
          } else {
            utils.ui.toast(res.data.msgs);
          }
        }
      );
    }
  },
  filters: {
    formatNum(value) {
      if (!value) return "";
      value = value.toString();
      return value.substring(0, 3) + "****" + value.substring(7);
    }
  },
  activated() {
    //获取用户信息
    this.getUserInfo();
  },
  beforeRouteEnter(to, from, next) {
    //当从根目录进来的时候 获取不到用户信息 返回首页
    next(vm => {
      vm.fromAccess = from.name == "access";
    });
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "login" && utils.cache.get("user")) {
      next(false);
      utils.wx.wxClose();
    } else {
      next(true);
    }
  }
};
</script>
<style  lang="scss">
.page-mycenter {
  .heard_img {
    .mu-avatar-inner img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>


<style  lang="scss" scoped>
@import "src/assets/css/vars";
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
@import "src/assets/css/mine";
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
