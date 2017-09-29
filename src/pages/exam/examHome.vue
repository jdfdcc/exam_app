<template>
  <div class="page page_exam">
    <mu-content-block class="has-header no-padding has-logo">
      <section class="header bg-primary">
        <img class="head_img" src="../../assets/img/head_bg.jpg" />
        <div class="minddle">
          <h2 class="font-md">距离考试
            <font style="color:gold;font-size:20px"> 103 </font>天</h2>
          <span class="font-tn">当前科目:
            <font style="color:gold">语文</font>
          </span>
        </div>
        <span class="chooseExam font-tn">选择科目
          <img class="icon_right" src="../../assets/img/icon/down1.png" />
        </span>
      </section>
      <section class="content">
        <div class="center bg-primary-content">
          <mu-raised-button @click="go('testList')" label="章节练习" class="demo-raised-button " primary/>
          <mu-raised-button label="全真模拟" class="demo-raised-button " primary/>
          <mu-raised-button label="随机考场" class="demo-raised-button" primary/>
          <mu-raised-button label="我的错题" class="demo-raised-button" primary/>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>

<script>
import Vue from 'vue'
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'login',
  components: {},
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
  },
  activated() {
  }
  // ,
  // beforeRouteEnter(to, from, next) {
  //   next(true);
  //   this.$store.commit('LOADING', {
  //     loading: false
  //   })
  // }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.page_exam {
  .header {
    display: flex;
    height: 140px;
    align-items: center;
    box-shadow: 0px 3px 5px grey;
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
        margin-bottom: 3px; // &::before {
        //   content: "考";
        //   font-size: 10px;
        //   color: red;
        //   border: 1px solid gold;
        //   border-radius: 2px;
        //   padding: 0px 3px;
        //   margin-right: 5px;
        // }
      }
      span {}
    }
    .chooseExam {
      flex: .5;
      color: white;
      margin: 10px 20px;
      text-align: right;
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
      background: white; // color: black;
      margin-top: 25px;
    }
  }
}
</style>
