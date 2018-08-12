<template>
  <div class="exam_item pd-hg">
    <div style="height:50px;"></div>
    <section class="question">
      <p class="font-md">
        {{date.g_question}}
      </p>
      <h4 class="font-md">{{date.g_title}}</h4>
    </section>
    <div class="answer">
      <label class="answer_item" v-for="(item,index) in answer" :key="index">
        <mu-radio @change = 'commitQues(date)' :disabled="date.value != '100' || date.showAnswer" :nativeValue="index+''" v-model="date.value" class="demo-radio" uncheckIcon="check_box_outline_blank" checkedIcon="check_box" />
        <p class="text font-md">{{item}}</p>
      </label>
    </div>
    <div v-show="date.value != '100' || date.showAnswer" class="answer_content font-sm">
      <font class="font-memo">答案</font><br/> 正确答案
      <font class="font-primary">{{date.g_correct}}</font>
      <span v-show="date.value != '100'">
        ，您的答案
        <font style="color:red">{{date.value | answerFilter}}</font><br/>
      </span>
      <p>
        <font class="font-memo">解析</font><br/> {{date.g_analysis}}
      </p>
    </div>
    <div style="height:50px;"></div>
  </div>
</template>

<script>
let map = {
  0: "A",
  1: "B",
  2: "C",
  3: "D"
}
export default {
  name: 'exam_item',
  components: {},
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
      ]
    }
  },
  filters: {
    answerFilter: (val) => {
      return val == 100 ? '无' : map[val];
    }
  },
  watch: {
    date () {
      console.log('dsada')
      this.answer = []
      this.getAnswer()
    }
  },
  methods: {
    //跳转到习题详情
    toEaxm() {
      this.$router.push({ name: "examDetail" })
    },
    // 错题操作
    commitQues (item) {
      setTimeout(() => {
        if (map[item.value] !== item.g_correct) {
          utils.jsonp.post("c=apiSubject&a=mysubject", {
            sid: item.g_sid,
            cid: item.g_cid,
            tid: item.g_id,
            type: '2'
          }, res => {
            // utils.ui.toast('收藏成功')
          })
        }
      }, 200);

    },
    getAnswer () {
      this.answer.push(this.date.g_answer1)
      this.answer.push(this.date.g_answer2)
      this.answer.push(this.date.g_answer3)
      this.answer.push(this.date.g_answer4)
    }
  },
  mounted () {
    this.getAnswer()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.exam_item {
  height: calc(100%);
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
