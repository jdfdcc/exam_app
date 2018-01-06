<template>
  <div class="page page_money_charge bg-primary-gray">
    <mu-tabs :value="activeTab" @change="handleTabChange" class="api-view-tabs">
      <mu-tab value="tab1" title="在线充值" />
      <mu-tab value="tab2" title="充值码充值" />
    </mu-tabs>
    <div>
      <mu-list class="mg-top bg-primary-w">
        <mu-list-item class="border-bottom" :title="userInfo.name">
          <span class="font-md" slot="left">账户</span>
        </mu-list-item>
        <mu-list-item title="310元">
          <span class="font-md" slot="left">余额</span>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
    </div>
    <div class="bg-primary-w" style="min-height:150px;">
      <div class="pd-hg money_code" v-show="activeTab == 'tab2'">
        <span class="font-sm" style="color:gray">请输入充值码</span>
        <input class="money_ipt" />
      </div>
      <div class="money_code" v-show="activeTab == 'tab1'">
        <div class="mg-top pay_content bg-primary-w">
          <div @click="choose(item)" v-bind:class="[choosed == item?'bg-primary':'']" v-for="item in payItem" :key="item" class="pay_item  border-color-b font-primary">
            <h3 class="font-hg">{{item}}个月</h3><br/>
            <span class="font-tn">每天只需0.51元</span>
          </div>
        </div>
        <!-- </div>
                      <div class="pay_mode mg-top bg-primary-w"> -->
        <!-- <span class="tishi font-md font-normal-light border-bottom">选择支付方式</span>
        <label class="pay-type">
          <img src="../../assets/img/icon_wx.png" />
          <mu-radio label="微信" class="pd-lg pay-redio border-bottom" nativeValue="money1" v-model="payType" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" labelLeft/><br/>
        </label>
        <label class="pay-type">
          <img src="../../assets/img/icon_zf.png" />
          <mu-radio label="支付宝" class="pd-lg pay-redio border-bottom" nativeValue="money2" v-model="payType" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" labelLeft/><br/>
        </label> -->
        <mu-list-item title="本次总计计算">
          <span class="font-hg" slot="right" style="color:red;margin-right:20px">￥{{100.00 * choosed}}</span>
        </mu-list-item>
      </div>
    </div>
    <div class="center bg-primary-w">
      <button @click="charge()" class="btn_pay bg-primary">确认充值</button>
      <!-- <mu-raised-button label="确认充值" style="width:90%" class="bg-primary" primary/> -->
      <p class="waring  font-sm" style="width:90%;margin-left:5%">
        温馨提示 1、请在网络状态良好的情况下进行充值，为保证充值顺利请耐心等待充值返回，不要进行其他无关操作。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "page_money_charge",
  components: {},
  data() {
    return {
      activeTab: "tab1",
      payType: "money1",
      payItem: [1, 2, 3, 6, 9, 12],
      loading: false,
      choosed: "",
      userInfo: {}
    };
  },
  methods: {
		/** 
		 * 充值 
		 *  金钱100.00 * choosed
		 */
		charge(){
			console.log(this.userInfo)
			// 
			//调用后台生产订单
			 utils.jsonp.post(
        "c=apiorder&a=orderpay&",
        {
          userid: this.userInfo.id,
					cid: '0',
					type:"1",
					money:0.01 * this.choosed+".00"
        },
        res => {
          if (res.CODE) {
						console.log(res);
						window.location.href = "http://zhiyue.cutt.com/jsapi/pay/438059/"+res.data.data.id;
          } else {
            utils.ui.toast(res.data.data.msgs);
          }
        }
      );
		},
    //tab切换
    handleTabChange(val) {
      this.activeTab = val;
    },
    /**
    * 购买
    */
    choose(item) {
      this.choosed = item;
    }
  },
  activated() {
    this.userInfo = utils.cache.get("user");
    console.log("用户信息", this.userInfo);
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

<style rel="stylesheet/scss" lang="scss" >
@import "src/assets/css/vars.scss";
.page_money_charge {
  .mu-radio.label-left .mu-radio-ripple-wrapper {
    left: -12px;
  }
  .center {
    text-align: center;
    padding: 20px 0px; // min-height: 100px;
  }
  .mu-radio-label,
  .mu-item-title {
    font-size: 1.4rem;
  }
  .pay-redio {
    width: calc(100% - 12px);
    min-height: 50px;
  }
  .tishi {
    min-height: 40px;
    display: block;
    line-height: 40px;
    &::before {
      content: "";
      border: 3px solid $primary-color;
      border-radius: 1.5px;
      margin-right: 10px;
    }
  }
  .money_code {
    .pay-type {
      display: flex;
      align-items: center;
      img {
        width: 25px;
        height: 25px;
        margin-left: 10px;
      }
    }
    span {
      // color: $normal-color-light;
      display: block;
    }
    .money_ipt {
      margin-top: 5px;
      width: 100%;
      height: 50px;
      border-radius: 5px;
      border: none;
      outline-style: none;
      font-size: 20px;
      padding: 10px 11px;
      background: rgb(220, 220, 220);
    }
  }
}
</style>
