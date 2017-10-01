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
        <mu-radio :disabled="value != '100' || $parent.$parent.$parent.showAnswer" :nativeValue="index+''" v-model="value" class="demo-radio" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" />
        <p class="text font-md">{{item}}</p>
      </label>
    </div>
    <div v-show="value != '100' || $parent.$parent.$parent.showAnswer" class="answer_content font-md">
      <font class="font-memo">答案</font><br/> 正确答案
      <font class="font-primary">B</font>
      <span v-show="value != '100'" >
       ，您的答案
      <font style="color:red">{{value | answerFilter}}</font><br/>
      </span>
      <p>
        <font class="font-memo">解析</font><br/> 通过合同跟踪，可能会发现合同实施中存在着偏差，即工程实施实际情况偏离了你的呃大的撒打算大声道的热热我肌肉较为嗲悍刀行大四的骄傲。
      </p>
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
      value: '100',
      answer: [
        'A.不同项目合同偏',
        'B.合同实施的趋势',
        'C.偏差跟踪情况',
        'D.业主对合同偏差的态度'
      ]
    }
  },
  filters:{
    answerFilter:(val)=>{
      return val == 100?'无':val;
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
  text-align: left;
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
  .answer_content {
    border-top: 1px solid #e5e5e5;
    margin: 20px 0px;
    padding-top: 10px;
    p {
      margin: 0px;
      margin-top: 16px;
    }
  }
}
</style>
