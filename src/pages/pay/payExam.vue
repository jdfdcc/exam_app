<template>
  <div class="page page_pay_exam bg-primary-gray">
    <mu-list class="mg-top bg-primary-w">
      <mu-list-item class="border-bottom" title="刘德华">
        <span slot="left">账户</span>
      </mu-list-item>
      <mu-list-item title="名师密卷 王瑞 高等数学考前冲刺一">
        <span slot="left">内容</span>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
    <div>
      <div class="mg-top pay_content bg-primary-w">
        <div @click="choose(item)" v-bind:class="[choosed == item?'bg-primary':'']" v-for="item in payItem" :key="item" class="pay_item  border-color-b font-primary">
          <h3 class="font-hg">{{item}}个月</h3><br/>
          <span class="font-sm">每天只需0.51元</span>
        </div>
      </div>
    </div>
    <div class="pay_mode mg-top bg-primary-w">
      <span class="tishi font-normal-light border-bottom">选择支付方式</span>
      <mu-radio label="钱包余额支付" class="pd-lg pay-redio border-bottom" nativeValue="money" v-model="payType" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" labelLeft/><br/>
      <mu-list-item title="本次总计计算">
        <span slot="right" style="color:red;margin-right:20px">￥{{100.00 * choosed}}</span>
      </mu-list-item>
    </div>
    <div class="center bg-primary-w">
        <mu-raised-button  label="确定" class="w-80 bg-primary" primary/>
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
      choosed:"",
      payType: "money",
      payItem: [1, 2, 3, 6, 9, 12],
      loading: false
    }
  },
  methods: {
    /**
     * 购买
     */
    choose(item){
      this.choosed = item;
    }
  },
  activated() {
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
.page_pay_exam {
  .mu-radio-label,
  .mu-item-title{
    font-size:1.3rem;
  }
  .center{
    text-align: center;
    margin-top: 1px;
    padding-top:20px;
    min-height: 100px;
    line-height: 100px;
  }
  .pay_mode {
    // .mu-item-title{
    //  font-size:16px;
    // }
    .pay-redio {
      width: 100%;
      min-height: 50px;
    }
    .tishi {
      min-height: 40px;
      display: block;
      line-height: 40px;
      &::before {
        content: "";
        border: 3px solid blue;
        border-radius: 1.5px;
        margin-right: 10px;
      }
    }
  }
  .pay_content {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    .pay_item {
      padding: 15px 0px;
      line-height: 10px;
      margin: 10px;
      min-height: 66px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 0 0 25%;
      h3 {
        margin: 0px;
      }
    }
  }
}
</style>
