<template>
  <page class="no-padding">
    <div class="nav mine-nav">
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="tab1" title="待完成" />
        <mu-tab value="tab2" title="已完成" />
        <mu-tab value="tab3" title="已取消" />
      </mu-tabs>
    </div>
    <div class="mine-inner">
      <div class="mine-card-list">
        <!--去支付-->
        <div class="mine-card-item" v-for="(order,index) in orderList" :key="index" @click="go(order)">
          <div class="mine-card-header">
            <div class="mine-header-title">订单号：{{order.COrderCde}}</div>
            <div class="mine-header-operate">
              <span>{{order.COrderStatus | commonFilter('orderCode')}}</span>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </div>
          </div>
          <div class="mine-card-content">
            <div class="mine-card-title">{{order.CNmeCn}}</div>
            <div class="mine-card-flag">
              <span class="insure" v-if="order.CType == '01'">保险</span>
              <span class="health" v-if="order.CType == '02'">健康</span>
            </div>
            <div class="mine-card-detail">
              <!-- {{order}} -->
              <div>投保人：{{order.CAppNme}}</div>
              <div>被保人：{{order.CInsuredNme}}</div>
              <div>保障期限：{{order.CInsuYear | insuYearFilter(order.TOrderTm)}}</div>
              <div>基本保额：{{order.NAmt | moneyFilter}}元</div>
              <div>保费：{{order.NTotalAmt | toFixedFilter}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: 'myOrderList',
  data() {
    return {
      activeTab: 'tab2',
      orderList: [],
    }
  },
  methods: {
    handleTabChange(val) {
      this.activeTab = val;
      this.getOrderList()
    },
    go(order) {
      this.$router.push({name:'orderDetails',params:{orderCode:order.COrderCde,isShare:false}});
    },
    //获取订单列表
    getOrderList() {
      let requestParam = {
        ststList: [],//要查询的订单状态
        cOprCde: utils.cache.get('user').cUserId,//操作人
      }

      requestParam.ststList = this.activeTab == 'tab1' ? ['03', '06'] : (this.activeTab == 'tab2' ? ['01', '08'] : ['02'])
      utils.http.post('MYORDERLIST', requestParam).then(req => {
        this.orderList = req.data;
        console.log(this.orderList)
      }).catch(e => {
        this.orderList = [];
        utils.ui.toast('网络异常');
      })
    }
  },
  mounted() {
    this.getOrderList();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
</style>
