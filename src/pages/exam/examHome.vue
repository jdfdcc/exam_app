<template>
  <div class="page page_exam">
    <mu-content-block class="has-header no-padding has-logo">
      <div v-bind:style="{'min-height':screenHeight - 124 +'px'}">
        <section class="header ">
          <img class="head_img" :src="'http://qn.cutt.com/' + userInfo.headimgurl" />
          <div class="minddle">
            <h2 class="font-md">距离考试
              <font style="color:gold;font-size:22px"> {{userInfo.time | timeFilter}} </font>天</h2>
            <span class="font-sm">当前科目:
              <font style="color:gold">{{showObj.chooseCourse.g_name || '未选择'}}</font>
            </span>
          </div>
          <span @click="chooseCourse()" class="chooseExam font-sm">选择科目
            <img class="icon_right" src="../../assets/img/icon/down1.png" />
          </span>
          <!-- <img class="img-footer" src="../../assets/img/common/bg-header.png" /> -->
        </section>
        <section class="content">
          <div class="center bg-primary-content" style="padding-bottom:20px">
            <mu-raised-button @click="toUrl('examDetail')" label="智能练习" class="demo-raised-button" primary/>
            <mu-raised-button @click="toUrl('simulateExam')" label="全真模拟" class="demo-raised-button " primary/>
            <mu-raised-button @click="toUrl('testList')" label="章节练习" class="demo-raised-button " primary/>
            <mu-raised-button @click="toUrl('errorList')" label="我的错题" class="demo-raised-button" primary/>
						<!-- <mu-raised-button @click="testPay()" label="测试支付" class="demo-raised-button" primary/> -->
          </div>
        </section>
      </div>
      <rh-footer></rh-footer>
    </mu-content-block>
    <!-- <coursePop></coursePop> -->
  </div>
</template>

<script>
export default {
  name: "page_exam",
  components: {
    "rh-footer": r => {
      require.ensure(
        [],
        () => r(require("./../../components/common/LogoFooter.vue")),
        "logoFooter"
      );
    }
    // coursePop: r => {
    //   require.ensure([], () => r(require("./componts/coursePop")), "coursePop");
    // }
  },
  filters: {
    timeFilter : function (value) {
      if(value){
        let temp = value.replace(/-/g,'/')
        return parseInt((new Date(temp) - new Date()) / (1000*3600*24) + 1)
      }else{
       return '未知'
      }
    }
  },
  data() {
    return {
      coursePop: false,
      showDialog: false,
      userInfo: {},
      //已选科目
      showObj: {
        chooseCourse: {
					g_id:"",
					g_name:""
				}
      }
    };
  },
  methods: {
    testPay() {
      window.location.href = "http://zhiyue.cutt.com/jsapi/pay/438059/21";
    },
    //选择科目
    chooseCourse () {
      this.$router.push({name:'chooseCourse'})
    },
    //页面跳转
    toUrl(url) {
      if (this.showObj.chooseCourse.g_id) {
        this.$router.push({
          name: url,
          params: {
            id: this.showObj.chooseCourse.g_id,
            course: JSON.stringify({ sid: "32131", cid: "dd" })
          }
        });
      } else {
        utils.ui.toast("请先选择科目");
      }
    },
    // 支付
    payCourse (item) {
      utils.jsonp.post("c=apiorder&a=orderpay",{
            userid: this.userInfo.id,
            cid: item.g_id,
            type: '0',
            money: item.g_money
          },res => {
            if (res.CODE) {
              console.log(res);
            } else {
              utils.ui.toast(res.data.msgs);
            }
          }
        )
    }
  },
  activated() {
    this.userInfo = utils.cache.get("user");
    this.showObj.chooseCourse.g_id = this.userInfo.current_subject_id;
    this.showObj.chooseCourse.g_name = this.userInfo.current_subject;
  },
  // ,
  beforeRouteLeave(to, from, next) {
    next(!this.coursePop);
    this.coursePop = false;
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.page_exam {
  .header {
    display: flex;
    height: 140px;
    background-size: 100% 100%;
    align-items: center;
    position: relative; // box-shadow: 0px 3px 5px grey;
    background-image: url("../../assets/img/common/bg-header.png");
    .img-footer {
      height: 50px;
      position: absolute;
      width: 100%;
      bottom: -49px;
    }
    .head_img {
      padding: 10px;
      flex: 0.5;
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
      flex: 0.5;
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
