<template>
  <div class="exam_item pd-hg">
    <section class="question">
      <p class="font-lg">
        承保单位对施工合同实施进行分析，其内容包括；产品合同念头的原因，合同实施的责任及（）。
      </p>
      <h4 class="font-md">（2010年建设施工管理真题）</h4>
    </section>
    <div class="answer">
      <label class="answer_item" v-for="(item,index) in answer" :key="index">
        <mu-radio name="group" nativeValue="index" v-model="value" class="demo-radio" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" />
        <p class="text font-md">{{item}}</p>
      </label>
    </div>
  </div>
</template>

<script>
// import vueScroll from '../../../components/common/IonScroll'
export default {
  name: 'exam_item',
  components: {
    // vueScroll
  },
  props: {
    date: {
      type: Object

    }
  },
  data() {
    return {
      showDialog: false,
      value: "2",
      answer: [
        'A.不同项目合同偏',
        'B.合同实施的趋势',
        'C.偏差跟踪情况',
        'D.业主对合同偏差的态度'
      ]
    }
  },
  methods: {
    //跳转到习题详情
    toEaxm() {
      this.$router.push({ name: "examDetail" })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.exam_item {
  height: 100%;
  overflow: scroll;
  text-align:left;
  .question {
    // padding: 5% 10px;
    padding-bottom: 10px; // text-indent: 20px;
    margin-bottom: 5px;
    p {
      margin: 0px;
    }
    h4 {
      margin: 0px;
      font-weight: 300;
    }
  }
  .answer {
    .answer_item {
      margin-top: 15px;
      display: flex;
      .demo-radio {
        flex: 0 0 35px;
      }
      .text {
        padding: 0px;
        margin: 0px;
      }
    }
  }
}
</style>
