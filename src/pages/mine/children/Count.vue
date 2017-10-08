<template>
  <div class="page page-count">
    <mu-content-block class="has-header no-padding">
      <section class="count_header bg-primary">
        <vm-progress stroke-color="white" track-color="gray" :stroke-width="10" type="circle" :percentage="percentage" style="vertical-align: middle;">
          <div slot="default" style="color:white;font-size:3.5rem">{{percentage}}%</div>
        </vm-progress>
        <!-- <circle-css color="#3498db" width=120 font-size=48 pv=120 bold=8 text-bg-color='#f0f0f0'></circle-css> -->
      </section>
      <section class="count_content">
        <div class="row">
          <div class="col">
            <span>累积答题</span>
            <p>{{countObj.all}}</p>
          </div>
          <div class="col">
            <span>正确率</span>
            <p>{{countObj.correct_rate}}</p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <span>回答正确</span>
            <p>{{countObj.correct}}</p>
          </div>
          <div class="col">
            <span>收藏题目</span>
            <p>{{countObj.collect}}</p>
          </div>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'faq',
  components: {
    vmProgress: r => {
      require.ensure([], () => r(require('vue-multiple-progress')), 'vmProgress')
    },
  },
  data() {
    return {
      percentage: 0,
      countObj: {}
    }
  },
  methods: {
    //获取统计详情
    getCont() {
      utils.jsonp.post("c=apiSubject&a=analysis", {}, res => {
        if (res.CODE) {
          this.countObj = res.data.data;
          console.log('错题列表', this.countObj, parseFloat(this.countObj.target))
          setTimeout(() => {
            this.percentage = parseFloat(this.countObj.target);

          }, 300);
        } else {
          utils.ui.toast(res.data.data)
        }
      })
    }
  },
  activated() {
    this.getCont();
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
