<template>
  <page class="no-padding mine-detail-inner" paddingBottom='110' v-if="orderDetail">
    <!--只有06待支付的才有倒计时-->
    <div class="order-countdown" v-if="orderDetail.cOrderStatus == '06'">请在
      <CountTimes v-on:endCountTimes="endCountTimes()"></CountTimes>内完成支付，否则订单将会取消</div>
    <div class="order-inner">
      <div class="order-title">{{orderDetail.infoList[0].base.cProdNme}}</div>
      <div class="order-price">保费：￥{{orderDetail.nTotalAmt | toFixedFilter}}</div>

      <!--投保人信息-->
      <div class="order-item">
        <div class="order-item-name">投保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.cAppNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.cCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.cCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.cMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value">{{orderDetail.infoList[0].applicant.cEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line">{{orderDetail.infoList[0].applicant.cCounty | addressFilter}}，{{orderDetail.infoList[0].applicant.cClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--被保人信息-->
      <div class="order-item" v-for="(insured,index) in orderDetail.infoList[0].insuredList" :key="index">
        <div class="order-item-name">被保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">与投保人关系</div>
          <div class="order-item-value">{{insured.cApplRel | commonFilter('relationCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{insured.cInsuredNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{insured.cCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value">{{insured.cCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value">{{insured.cMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value">{{insured.cEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line">{{insured.cCounty | addressFilter}}，{{insured.cClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--订单明细-->
      <div class="order-item">
        <div class="order-item-name">保障内容</div>
        <div class="order-item-detail">
          <div class="order-item-param">受益人</div>
          <div class="order-item-value">法定受益人</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">保障期限</div>
          <div class="order-item-value">{{orderDetail.infoList[0].base.cInsuYear |insuYearFilter(orderDetail.infoList[0].base.tCrtTm)}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">缴费类型</div>
          <div class="order-item-value">{{orderDetail.infoList[0].base.cFinTyp | commonFilter('typeCode')}}{{orderDetail.infoList[0].base.NPayTime ? ('，'+orderDetail.infoList[0].base.NPayTime+'年') : ''}}</div>
        </div>
        <!-- <div class="order-item-detail">
          <div class="order-item-param">特别约定</div>
          <div class="order-item-value">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </div>
        </div> -->
        <div class="order-item-detail" @click="go('clauseList')">
          <div class="order-item-param">产品条款</div>
          <div class="order-item-value">
            <mu-icon value="keyboard_arrow_right"></mu-icon>
          </div>
        </div>
      </div>
    </div>
    <div class="order-detail">
      <div>创建时间：{{orderDetail.infoList[0].base.tCrtTm | dateFilter}}</div>
      <div>订单编号：{{orderDetail.infoList[0].base.cOrderCde}}</div>
    </div>
    <div class="order-hint">尊敬的客户若对订单信息有异议，请尽快联系本公司。全国统一客服电话（400-609-6868）</div>

    <mu-raised-button v-if="orderDetail.cOrderStatus == '06' && !isShare" @click="continueOper('policyPay')" class="button-second order-button" label="去支付" />
    <mu-raised-button v-if="orderDetail.cOrderStatus == '03' && !isShare" @click="continueOper('health')" class="button-second order-button" label="继续投保" />
  </page>
</template>

<script>
import CodeData from '../../assets/data/CodeData'
import CountTimes from '../../components/common/CountTimes'

export default {
  name:'orderDetail',
  data() {
    return {
      orderDetail:null, //订单详情
      beforeScrollTop: null, //保存当次滚动高度
      id: null, //接收到传递过来的id
      isShare:null, //接收到传递过来的是否微信分享
    }
  },
  components:{
    CountTimes
  },
  methods: {
    //订单详情
    getOrderDetail(){
      let requestParam = {
        cOrderCde: this.id,
      }

      utils.http.post('RHORDERDETAILS', requestParam).then(req => {
        console.log(req.data.orderInfo.order)
        this.orderDetail = req.data.orderInfo.order;
      }).catch(()=>{
        utils.ui.toast('获取订单详情失败');
      })
    },

    //倒计时结束
    endCountTimes(){
      utils.ui.dialog('支付超时', require('../../assets/img/common/icon_warning.png'), ['确定'], index => {
        this.go('myOrderList');
      })
    },

    //跳转其他页面
    go(value){
      this.$router.push({ name: value, params: {productId: this.orderDetail.cProdNo}});
    },

    //去支付、继续投保
    continueOper(routerValue) {
      let req = {
        openId: utils.cache.get('wxConfig').openId,
        orderId: this.orderDetail.infoList[0].base.cOrderCde,
      }

      //获取订单信息
      utils.http.post('ORDERUNFINISHEDINFO', req).then(response => {
        response.data.risk.calculateJson = JSON.stringify(response.data.risk.calculateJson);
        utils.cache.set("PUTPOLICYINFO", response.data);
        this.$router.push({name:routerValue});
      }).catch(error => {
        if(error.isLogicError){
           utils.ui.alert(error.errorMessage,e=>{})
        }
      })
    },

    //统一入口,正常进入，分享进入
    enter(){
      //配置微信config
      utils.wx.wxConfig();
      this.isShare = this.$route.params.isShare == 'true' ? true : false;
      // 是微信分享过来的
      if(this.isShare){
        this.id = DES3.decrypt('',this.$route.params.orderCode);
        //不允许再次分享了
        utils.wx.wxHideMenuList();
      }else{
        this.id = this.$route.params.orderCode;
      }
      this.getOrderDetail();
      this.wxShareFriend();
    },


    //设置分享到朋友圈的内容
    wxShareFriend(){
      let req = {
        title:'订单详情',
        link:globalConfig.wxUrl + 'dist/#/page/orderDetails/' + DES3.encrypt('',this.id) +'/true',
        // link:'http://10.0.16.48:8888/#/page/orderDetails/' + DES3.encrypt('',this.id) +'/true',
      }
      console.log(req)
      utils.wx.wxShareFriend(req).then((e)=>{
        console.log(e)
      });
    }
  },
  mounted(){
    this.enter();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';

.order-countdown {
  font-size: 12px;
  color: $normal-color;
  padding: 11px 24px;
  background: #FFF2F2;
  line-height: 30px;
}

.order-inner,.order-detail,.order-hint {
  padding: 10px 12px;
}

.order-inner{
  background: white;
}

.order-title {
  font-size: 19px;
  line-height: 30px;
  color: $normal-color;
}

.order-price {
  color: $price-color;
  font-size: 13px;
  padding-top: 8px;
}

.order-item {
  padding: 10px 0px 20px 0px;
}

.order-item-name {
  font-size: 15px;
  color: $normal-color;
  text-align: center;
  line-height: 40px;
  background: $bgcolor;
}

.order-item-detail {
  margin-top: 5px;
  padding: 0px 5px;
  line-height: 44px;
  font-size: 13px;
  color: $normal-color-light;
  display: flex;
  border-bottom: 1px solid $input-border-color;
}

.order-item-detail {}

.order-item-param {
  flex: none;
  width: 90px;
  text-align: left;
}

.order-item-value {
  flex: 1;
  text-align: right;
}

.order-item-value-row {
  border-bottom: 1px solid $input-border-color;
  display: flex;
}

.order-item-value-row:last-child {
  border: none;
}

.order-item-value i {
  position: relative;
  top: 6px;
}

.more-line-super {
  display: flex;
  align-items: center;
}

.more-line {
  flex: 1px;
  line-height: 18px;
}

.order-detail {
  font-size: 12px;
  line-height: 21px;
  border-bottom: 1px dashed $input-border-color;
}

.order-hint {
  font-size: 12px;
  line-height: 21px;
}

</style>
