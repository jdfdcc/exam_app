<template>
  <div class="page page_pay_exam bg-primary-gray">
    <mu-list class="mg-top bg-primary-w">
      <mu-list-item class="border-bottom" title="刘德华">
        <span class="font-md" slot="left">账户</span>
      </mu-list-item>
      <mu-list-item :title="payObj.g_name">
        <span class="font-md" slot="left">内容</span>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
    <div>
      <div class="mg-top pay_content bg-primary-w">
        <div @click="choose(item)" v-bind:class="[choosed == item?'bg-primary':'']" v-for="item in payItem" :key="item" class="pay_item  border-color-b font-primary">
          <h3 class="font-hg">{{item}}个月</h3><br/>
          <span class="font-tn">每天只需0.51元</span>
        </div>
      </div>
    </div>
    <div class="pay_mode mg-top bg-primary-w">
      <span class="font-md tishi font-normal-light border-bottom">选择支付方式</span>
      <mu-radio label="钱包余额支付" class="pd-lg pay-redio border-bottom" nativeValue="money" v-model="payType" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" labelLeft/><br/>
      <mu-list-item title="本次总计计算">
        <span slot="right" class=" font-hg" style="color:red;margin-right:20px">￥{{100.00 * choosed}}</span>
      </mu-list-item>
    </div>
    <div class="center bg-primary-w">
      <button class="btn_pay bg-primary">确认充值</button>
      <p class="waring  font-sm" style="width:90%;margin-left:5%">
        温馨提示 1、请在网络状态良好的情况下进行充值，为保证充值顺利请耐心等待充值返回，不要进行其他无关操作。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_pay_exam',
  components: {
  },
  data() {
    return {
      choosed: "",
      payType: "money",
      payItem: [1, 2, 3, 6, 9, 12],
      loading: false,
      payObj: {}//购买对象
    }
  },
  methods: {
    /**
     * 购买
     */
    choose(item) {
      console.log(this.choosed)
      this.choosed = item;
    }
  },
  activated() {
    console.log(this.$route.params.payItem)
    this.payObj = JSON.parse(this.$route.params.payItem);
  }
  // ,
  // beforeRouteEnter(to, from, next) {
  //   next(true);
  //   this.$store.commit('LOADING', {
  //     loading: false
  //   })
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/vars.scss';
.page_pay_exam {
  .mu-radio-label,
  .mu-item-title {
    font-size: 1.4rem;
  }
  .center {
    margin-top: 6px;
    text-align: center;
    padding: 20px 0px; // min-height: 100px;
  }
  .pay_mode {
    // .mu-item-title{
    //  font-size:16px;
    // }
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
  }
}
</style>
