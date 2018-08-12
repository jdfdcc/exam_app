<template>
  <page class="page_shop_detail">
    {{shopDetail.g_name}}
    <div class="buy_footer">
      <div class="left price">￥{{shopDetail.g_money}}</div>
      <div class="content">
        <span>距离停售<font>111</font>天</span>
        <span>已有<font>1122</font>人购买</span>
      </div>
      <div class="right">
        <button class="btn_buy">购买</button>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: "form",
  components: {
  },
  data() {
    return {
      shopDetail: {}
    };
  },
  methods: {
    getShopDetail() {
      console.log(this.$route.params)
      let id = this.$route.params.id
      utils.jsonp.post("c=apiSubject&a=newsubjectsdetails", {sid : id}, res => {
        if (res.CODE) {
          this.shopDetail = res.data.data[0]
        } else {
          utils.ui.toast(res.data.msgs);
        }
      });
    }
  },
  mounted() {
    this.getShopDetail()
  }
};
</script>
<style lang='scss'>
.page_shop_detail{
  .buy_footer{
    height: 50px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    display: flex;
    align-items: center;
    border-top: 1px solid #e0e0e0;
    font-size: 1.4rem;
    .left{
      flex: 0 0 80px;
      align-items: center;
      line-height: 50px;
      text-align: center;
      color: rgb(252, 79, 8);
      font-size: 2rem;
    }
    .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font{
        color:  rgb(252, 79, 8)
      }
    }
    .right{
      flex: 0 0 100px;
      text-align: center;
      .btn_buy{
        color: #ffffff;
        background: rgb(252, 79, 8);
        width: 60px;
        border: none;
        height: 35px;
        border-radius: 5px;
      }
    }
  }
}

</style>


