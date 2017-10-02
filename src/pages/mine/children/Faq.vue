<template>
  <div class="page mine-page page-faq">
    <mu-content-block class="has-header no-padding">
      <section class="mine-section" v-bind:style="{'min-height':screenHeight - 24 +'px'}">
        <div class="question-tab-row">
          <div @click="showUrl('1')" class="question-tab-row-inner">
            <div>
              <img src="../../../../static/img/mine/kefu.png" />
              <span>在线客服</span>
            </div>
          </div>
          <div @click="showUrl('2')" class="question-tab-row-inner">
            <div>
              <img src="../../../../static/img/mine/phone.png" />
              <span> 客服热线</span>
            </div>
          </div>
        </div>
        <!--保障问题-->
        <div class="question-list ">
          <div v-for="(item,index) in questionList" :key="index" class="question-item">
            <div class="question-param" @click="item.show = !item.show">发生理赔事故时，我该如何通知保险公司？</div>
            <!-- <transition name="slide-up"> -->
            <div class="question-value tran_ani" v-bind:class="[item.show?'':'noheight']">
              <div class="question-value-item">
                <ol>
                  <li>
                    <p class="font-bold">如何报案？</p>
                    <p>拨打24小时服务热线400-609-6868进行报案，我们会提醒您理赔应备材料及相关注意事项。</p>
                  </li>
                  <li>
                    <p class="font-bold">如何提交理赔申请？</p>
                    <p>请您准备齐全相关理赔材料后通过以下方式及时向我司递交理赔申请。</p>
                    <p>（1） 申请填写及材料准备：请登陆瑞华健康险官网www.***.com，下载《理赔申请书》并按要求完整填写并提供相关理赔材料。（注意选择双面打印）</p>
                    <p>（2） 提交理赔材料：索赔材料准备齐全后提交至我司，应备材料详见《理赔材料一览表》。</p>
                  </li>
                </ol>
              </div>
            </div>
            <!-- </transition> -->
          </div>
        </div>
      </section>
    </mu-content-block>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'faq',
  components: {
  },
  data() {
    return {
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
        location.href = "http://wpa.qq.com/msgrd?v=3&uin="+globalConfig.qq;
      } else {
        location.href = "tel:"+globalConfig.tel;
      }
    }
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-faq {
  .noheight {
    height: 0px;
    display: none;
    opacity: 0;
  }
  .mine-section {
    height: 100%;
    .question-tab-row {
      top: 0px;
      left: 0px;
      width: 100%;
      z-index: 99;
      overflow: hidden;
      box-shadow: 0 6px 16px $shadow-color;
      display: flex;
      align-items: center;
    }
    .question-tab-row-inner {
      height: 100px;
      border-left: 1px solid $shadow-color;
      padding: 15px 0px;
      display: flex;
      justify-content: center;
      flex: 1;
      img {
        margin-left: 6px;
        width: 40px;
        display: block;
      }
    }
  }
  .question-list {
    padding: 1px 10px 10px 10px;
    margin-top: 24px;
  }
  .question-item {
    position: relative;
    margin-top: 10px;
  }
  .question-param {
    padding: 10px 10px 10px 48px;
    min-height: 40px;
    background: $bgcolor;
    font-size: 1.3rem;
    font-weight: bold;
    color: $normal-color-light;
  }
  .question-param::before {
    content: '';
    background: url(../../../assets/img/icon_Q.png);
    background-size: 100% 100%;
    width: 23px;
    height: 23px;
    position: absolute;
    top: 8px;
    left: 10px;
  }
  .question-value {
    position: relative;
    margin-top: 12px;
    margin-bottom: 16px;
    opacity: 1;
  }
  .question-value-item {
    padding: 10px 10px 10px 48px;
    font-size: 1.3rem;
    color: $normal-color-light;
    ol {
      padding: 0 0 0 16px;
      margin: 0px;
    }
    li {
      margin-bottom: 6px;
    }
    p {
      margin: 0px;
    }
    dl {
      margin: 0px;
    }
    dd {
      margin-left: 0px;
      margin-bottom: 6px;
    }
  }
  .question-value-item::before {
    content: '';
    background: url(../../../assets/img/icon_A.png);
    background-size: 100% 100%;
    width: 23px;
    height: 23px;
    position: absolute;
    top: 8px;
    left: 10px;
  }
}
</style>
