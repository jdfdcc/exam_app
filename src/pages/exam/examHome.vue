<template>
  <div class="page page_exam">
    <mu-content-block class="has-header no-padding has-logo">
      <section class="header ">
        <img class="head_img" src="../../assets/img/mine/heard.jpg" />
        <div class="minddle">
          <h2 class="font-md">距离考试
            <font style="color:gold;font-size:22px"> 103 </font>天</h2>
          <span class="font-sm">当前科目:
            <font style="color:gold">语文</font>
          </span>
        </div>
        <span @click="coursePop  =true" class="chooseExam font-sm">选择科目
          <img class="icon_right" src="../../assets/img/icon/down1.png" />
        </span>
        <!-- <img class="img-footer" src="../../assets/img/common/bg-header.png" /> -->
      </section>
      <section class="content">
        <div class="center bg-primary-content" style="padding-bottom:20px">
          <mu-raised-button @click="go('examDetail')" label="随机模拟" class="demo-raised-button" primary/>
          <mu-raised-button @click="go('simulateExam')" label="全真模拟" class="demo-raised-button " primary/>
          <mu-raised-button @click="go('testList')" label="章节练习" class="demo-raised-button " primary/>
          <mu-raised-button @click="go('errorList')" label="我的错题" class="demo-raised-button" primary/>
        </div>
      </section>
    </mu-content-block>
    <coursePop></coursePop>
  </div>
</template>

<script>
export default {
  name: 'page_exam',
  components: {
    coursePop: r => { require.ensure([], () => r(require('./componts/coursePop')), 'coursePop') },
  },
  data() {
    return {
      coursePop: false,
      showDialog: false,
    }
  },
  methods: {
    choose(item) {
      console.log(item)
      this.coursePop = false;
    }
  },
  activated() {
  },
  // ,
  beforeRouteLeave(to, from, next) {
    next(!this.coursePop);
    this.coursePop = false;
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.page_exam {
  .header {
    display: flex;
    height: 140px;
    background-size: 100% 100%;
    align-items: center;
    position: relative; // box-shadow: 0px 3px 5px grey;
    background-image: url('../../assets/img/common/bg-header.png');
    .img-footer {
      height: 50px;
      position: absolute;
      width: 100%;
      bottom: -49px;
    }
    .head_img {
      padding: 10px;
      flex: .5;
      width: 35px;
      border-radius: 50%;
    }
    .minddle {
      flex: 1;
      color: white;
      h2 {
        margin-top: 1px;
        margin-bottom: 3px;
      }
    }
    .chooseExam {
      flex: .5;
      color: white;
      margin: 10px 20px;
      text-align: center;
      position: relative;
      .icon_right {
        width: 10px;
        height: 10px;
        top: 3px;
        position: absolute;
        background-size: 100% 100%;
      }
    }
  }
  .content {
    height: 100%;
    .demo-raised-button {
      color: #394043; // height: 44px;
      width: 80%;
      height: 44px;
      background: white; // color: black;
      margin-top: 10px;
      font-size: 15px;
    }
  }
}
</style>
