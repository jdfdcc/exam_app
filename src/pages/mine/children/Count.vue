<template>
  <div class="page page-count">
    <mu-content-block class="has-header no-padding">
      <section class="count_header bg-primary">
        <vm-progress stroke-color="white" track-color="gray" stroke-width="10" type="circle" :percentage="percentage" style="vertical-align: middle;">
          <div slot="default" style="color:white;font-size:3.5rem">{{percentage}}%</div>
        </vm-progress>
        <!-- <circle-css color="#3498db" width=120 font-size=48 pv=120 bold=8 text-bg-color='#f0f0f0'></circle-css> -->
      </section>
      <section class="count_content">
        <div class="row">
          <div class="col">
            <span>累积答题</span>
            <p>3211道</p>
          </div>
          <div class="col">
            <span>正确率</span>
            <p>99%</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>回答正确</span>
            <p>3211道</p>
          </div>
          <div class="col">
            <span>收藏题目</span>
            <p>3211道</p>
          </div>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>

<script>
import Vue from 'vue'
import vmProgress from 'vue-multiple-progress'
export default {
  name: 'faq',
  components: {
    vmProgress: vmProgress
  },
  data() {
    return {
      percentage: 90,
      questionTab: 'tab0',
      screenHeight: document.documentElement.clientHeight,
      questionList: [{ show: false }, { show: false }]
    }
  },
  methods: {
    handleQuestionTabChange(value) {
      this.questionTab = value
    },
    changeQuestionStatus(index) {
      Vue.set(this.questionList, index, !this.questionList[index]);
    },
    /**
     * 1 客户
     * 2 热线
     */
    showUrl(type) {
      if (type == 1) {
        location.href = 'http://wpa.qq.com/msgrd?v=3&uin=2685605589&site=qq&menu=yes';
        // location.href = "http://wpa.qq.com/msgrd?v=3&uin=" + globalConfig.qq;
      } else {
        location.href = "tel:" + globalConfig.tel;
      }
    }
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/vars';
.page-count {
  .count_header {
    height: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .count_content {
    .row {
      display: flex;
      align-items: center;
      .col {
        padding: 10px 0px;
        border-right: 1px solid $border-line;
        border-bottom: 1px solid $border-line;
        flex: 1;
        align-items: center;
        min-height: 80px;
        span {
          display: block;
          text-align: center;
        }
        p {
          text-align: center;
          color: $primary-color;
          font-size: 2rem;
          margin: 5px;
        }
      }
    }
  }
}
</style>
