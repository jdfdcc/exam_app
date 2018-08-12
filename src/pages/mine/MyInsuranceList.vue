<template>
  <page class="no-padding">
    <div slot="content" class="nav mine-nav">
      <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
        <mu-tab value="tab1" title="待生效" />
        <mu-tab value="tab2" title="已生效" />
        <mu-tab value="tab3" title="已失效" />
      </mu-tabs>
    </div>
    <div class="mine-inner">
      <div class="mine-card-list">
        <div class="mine-card-item" v-for="(insure,index) in insureList" :key="index" @click="go('insuranceDetails',insure)">
          <div class="mine-card-header">
            <div class="mine-header-title">保单号：{{insure.CPlyNo}}</div>
            <div class="mine-header-operate">
              <span>{{insure.CPlySts | commonFilter('insuranceCode')}}</span>
              <mu-icon value="keyboard_arrow_right"></mu-icon>
            </div>
          </div>
          <div class="mine-card-content">
            <div class="mine-card-title">{{insure.CNmeCn}}</div>
            <div class="mine-card-flag">
              <span class="insure" v-if="insure.CType == '01'">保险</span>
              <span class="health" v-if="insure.CType == '02'">健康</span>
            </div>
            <div class="mine-card-detail">
              <div>投保人：{{insure.CAppNme}}</div>
              <div>被保人：{{insure.CInsuredNme}}</div>
              <div>保障期限：{{insure.CInsuYear | insuYearFilter(insure.TAppTm)}}</div>
              <div>基本保额：{{insure.NAmt | moneyFilter}}元</div>
              <div>保费：{{insure.NPrm | toFixedFilter}}元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--猜你想做-->
    <!-- <div class="mine-line-title">猜你想做</div>
      <div class="mine-attestation" @click="go('idAuthentication')">
        <div class="mine-attestation-avatar"></div>
        <div class="mine-attestation-content">
          <div class="mine-attestation-title">身份认证</div>
          <div class="mine-attestation-detail">完善个人信息，查询全渠道保单</div>
        </div>
        <mu-icon class="mine-attestation-icon" value="keyboard_arrow_right"></mu-icon>
      </div> -->
  </page>
</template>

<script>
export default {
  name: 'myInsuranceList',
  data() {
    return {
      activeTab: 'tab2',
      insureList: [],
    }
  },
  methods: {
    //菜单栏切换
    handleTabChange: function(val) {
      this.activeTab = val;
      this.getInurseList()
    },
    go(name, value) {
      if (name === 'insuranceDetails') {
        this.$router.push({ name: name, params: { insuranceCode: value.CPlyNo } });
      } else {
        this.$router.push({ name: name });
      }
    },

    //获取保单列表
    getInurseList() {
      let user = utils.cache.get('user');
      let requestParam = {
        CAppName: user.cName,//投保人姓名 *,  
        CCertfCde: user.cCertfCde,//证件号码 *
        CCertfCls: user.cCertfCls,//证件类型 *
        ststList: null, //要查询的保单状态
        cOprCde: utils.cache.get('user').cUserId,//操作人
      }

      requestParam.ststList = this.activeTab == 'tab1' ? ['0'] : (this.activeTab == 'tab2' ? ['1'] : ['4'])
      utils.http.post('RHPOLICYLIST', requestParam).then(req => {
        console.log(req)
        this.insureList = req.data;
      }).catch(e => {
        this.insureList = [];
        utils.ui.toast('网络异常');
      })
    },
  },
  mounted () {
    alert(1)
    this.getInurseList();
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';

//-----猜你想做------
.mine-line-title {
  position: relative;
  text-align: center;
  line-height: 21px;
  margin: 13px 10px;
  color: $memo-color;
  font-size: 12px;
}

.mine-line-title::before,
.mine-line-title::after {
  content: "";
  height: 0px;
  width: -webkit-calc(50% - 40px);
  width: calc(50% - 40px);
  border-bottom: 1px dashed $memo-color;
  position: absolute;
  top: 10px;
}

.mine-line-title::before {
  left: 0px;
}

.mine-line-title::after {
  right: 0px;
}

//身份认证
.mine-attestation {
  margin: 0px 10px;
  background: white;
  padding: 15px 10px;
  border: 1px solid $input-border-color;
  display: flex;
  align-items: center;
}

.mine-attestation-avatar {
  flex: none;
  width: 25px;
  height: 25px;
  background-image: url(../../assets/img/icon_attestation.png);
  background-size: 100% 100%;
}

.mine-attestation-content {
  flex: 1;
  padding: 0px 5px 0px 15px;
  line-height: 20px;
}

.mine-attestation-title {
  font-size: 15px;
  color: $normal-color;
}

.mine-attestation-detail {
  font-size: 13px;
  color: $normal-color-light;
}

.mine-attestation-icon {
  flex: none;
  font-size: 28px;
  color: $normal-color-light;
}
</style>
