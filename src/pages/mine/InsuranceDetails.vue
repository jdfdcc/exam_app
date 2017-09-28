<template>
  <page class="no-padding mine-detail-inner" v-if="insureDetail">
    <div class="order-header">
      <div class="order-header-title">
        保单号：
        <span>{{insureDetail.base.cPlyNo}}</span>
        <!-- <div class="order-header-copy">复制</div> -->
      </div>
      <div>根据投保人申请，本公司承担下列保险责任，特此签发本保险单为据</div>
    </div>
    <div class="order-inner">
      <div class="order-title">{{insureDetail.cProdNme}}</div>
      <div class="order-price">保费：￥{{insureDetail.base.nPrm | toFixedFilter}}</div>

      <!--投保人信息-->
      <div class="order-item">
        <div class="order-item-name">投保人信息</div>
        <div class="order-item-detail">
          <div class="order-item-param">姓名</div>
          <div class="order-item-value">{{insureDetail.applicant.cAppNme}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件类型</div>
          <div class="order-item-value">{{insureDetail.applicant.cCertfCls | commonFilter('certCode')}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">证件号码</div>
          <div class="order-item-value">{{insureDetail.applicant.cCertfCde}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电话</div>
          <div class="order-item-value">{{insureDetail.applicant.cMobile}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">电子邮箱</div>
          <div class="order-item-value">{{insureDetail.applicant.cEmail}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">常住地</div>
          <div class="order-item-value more-line-super">
            <div class="more-line">{{insureDetail.applicant.cCounty | addressFilter}}，{{insureDetail.applicant.cClntAddr}}</div>
          </div>
        </div>
      </div>

      <!--被保人信息-->
      <div class="order-item" v-for="(insured,index) in insureDetail.insuredList" :key="index">
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

      <!--保单明细-->
      <div class="order-item">
        <div class="order-item-name">保障内容</div>
        <div class="order-item-detail">
          <div class="order-item-param">受益人</div>
          <div class="order-item-value">法定受益人</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">保障权益</div>
          <div class="order-item-value">
            <div class="order-item-value-row" v-for="(cvrg,index) in insureDetail.cvrgList" :key="index">
              <div class="order-item-param">{{cvrg.cCustCvrgNme.replace(/[\\]+/g, '\\')}}</div>
              <!--debug 这里暂时取，最后应该在这里list取-->
              <div class="order-item-value" v-if="cvrg.cCvrgNo != '200300'">{{insureDetail.base.nAmt | moneyFilter}}元</div>
              <div class="order-item-value" v-if="cvrg.cCvrgNo == '200300'">免费赠送</div>
            </div>
          </div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">保障期限</div>
          <div class="order-item-value">{{insureDetail.base.cInsuYear | insuYearFilter(insureDetail.base.tCrtTm)}}</div>
        </div>
        <div class="order-item-detail">
          <div class="order-item-param">缴费类型</div>
          <div class="order-item-value">{{insureDetail.base.cFinTyp | commonFilter('typeCode')}}{{insureDetail.base.NPayTime ? ('，'+insureDetail.base.NPayTime+'年') : ''}}</div>
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
      <div>创建时间：{{insureDetail.base.tCrtTm | dateFilter}}</div>
      <div>订单编号：{{insureDetail.base.cOrderCde}}</div>
    </div>
    <div class="order-hint">尊敬的客户若对保单信息有异议，请尽快联系本公司。全国统一客服电话（400-609-6868）</div>
    <a href="tel:400-609-6868">
      <mu-raised-button class="insure-mobile order-button" label="客服热线 400-609-6868"/>
    </a>
  </page>
</template>

<script>
export default {
  name:'insuranceDetails',
  data() {
    return {
      insureDetail:null, //保单详情
    }
  },
  methods: {
    //保单详情
    getInsureDetail(){
      let requestParam = {
        cPlyNo: this.$route.params.insuranceCode,
      }

      utils.http.post('RHPOLICYDETAILS', requestParam).then(req => {
        this.insureDetail = req.data.plyDetail;
        console.log(this.insureDetail)
      })
    },

    //跳转其他页面
    go(value){
      this.$router.push({ name: value, params: {productId: this.insureDetail.base.cProdNo}});
    },
  },
  mounted(){
    this.getInsureDetail();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.order-header {
  padding: 15px 20px;
  background: $bgcolor;
}

.order-header{
  font-size: 13px;
  color: $normal-color;
  line-height: 21px;
}

.order-header-title {
  font-size: 13px;
  margin-bottom: 10px;
  color: $normal-color;
  line-height: 21px;
  position: relative;
}

.order-header-copy {
  display: inline-block;
  border-radius: 2px;
  border: 1px solid #BABEC6;
  padding: 0px 3px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  color: $normal-color-light;
  position: absolute;
  right: 0px;
  top: 0px;
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

.insure-mobile {
  width: 100%;
  line-height: 44px;
  font-size: 17px;
  border: none;
  border-radius: 2px;
  color: $primary-color;
  background: white;
  letter-spacing: 0.3px;
}
</style>
