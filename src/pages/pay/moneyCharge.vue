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
        <mu-list-item :title="userInfo.money">
          <span class="font-md" slot="left">余额</span>
        </mu-list-item>
        <mu-divider/>
      </mu-list>
    </div>
    <div class="bg-primary-w" style="min-height:150px;">
      <div class="pd-hg money_code" v-show="activeTab == 'tab2'">
        <!-- <span class="font-sm" style="color:gray">请输入充值码</span> -->
        <input ref="code_input" class="money_ipt" placeholder="请输入充值码"/>
      </div>
      <div class="money_code" v-show="activeTab == 'tab1'">
        <span style="padding:10px 18px 0px 18px;font-size:1.3rem">选择充值金额</span>
        <div class="pay_content bg-primary-w">
          <div @click="charge(item)" v-bind:class="[choosed == item?'bg-primary':'']" v-for="item in payItem" :key="item" class="pay_item  border-color-b font-primary">
            <h3 class="font-hg" style="font-weight: 300;">{{item}}元</h3>
            <!-- <br/> -->
            <!-- <span class="font-tn">售价{{item}}元</span> -->
          </div>
        </div>
        <!-- <mu-list-item title="本次总计计算">
          <span class="font-hg" slot="right" style="color:red;margin-right:20px">￥{{100.00 * choosed}}</span>
        </mu-list-item> -->
      </div>
    </div>
    <div class="center bg-primary-w">
      <button style="height: 50px" @click="charge()" v-if="activeTab == 'tab2'" class="btn_pay bg-primary">确认充值</button>
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
      payItem: [10, 20, 30, 50, 100, 200],
      loading: false,
      choosed: 1,
      userInfo: {}
    };
  },
  methods: {
		/**
		 * 充值
		 * 金钱100.00 * choosed
		 */
		charge(item){
      this.choosed = item
			//调用后台生产订单
			 utils.jsonp.post('c=apiorder&a=orderpay&',{
          userid: this.userInfo.id,
					cid: '0',
					type:'1',
					money: item + '.00'
        },res => {
          if (res.CODE) {
						window.location.href = 'http://zhiyue.cutt.com/jsapi/pay/438059/' + res.data.data.id;
          } else {
            utils.ui.toast(res.data.msgs);
          }
        }
      );
		},
    /**
     * tab切换购买方式
     */
    handleTabChange(val) {
      this.activeTab = val;
      if (val == 'tab2') {
        setTimeout(() => {
          this.$refs.code_input.focus()
        }, 800)
      }
    },
    /**
    * 购买
    */
    choose(item) {

    }
  },
  activated() {
    this.userInfo = utils.cache.get("user");
  }
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
    margin-top:0px;
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
