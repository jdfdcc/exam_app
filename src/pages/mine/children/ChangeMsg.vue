<template>
  <div class="page mine-page page-email-authentication">
    <mu-content-block class="has-header no-padding ">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section class="mine-avatar mine-section mg-lg eaxm_box_shadow">
          <div class="mine-inner-group mg-lg">
            <div class="memo font-memo">修改个人信息:
              <font style="color:black">{{$route.params.type|getMsg}}</font>
            </div>
          </div>
          <div class="mine-inner-group mg-lg">
            <ValidatorInput btnClear="true" :form.sync="validateObj.text" :validator="{rules:['require']}" v-model="text" hintText="请输入" fullWidth/>
          </div>
          <div class="mine-inner-group mg-lg submit-btn">
            <mu-raised-button @click="submit" :disabled="!validateObj.text.status" class="demo-raised-button button-primary" :label="'更改'" primary/>
          </div>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import LogoFooter from "./../../../components/common/LogoFooter.vue";
import Toast from "../../../components/common/Toast.vue";
let codeMap = {
  name: "name",
  qq: "qq",
  sf: "province",
  xx: "school",
  jdzy: "major",
  bklb: "报考类别",
  mbzgzs: "certificate",
  mbxx: "target_school",
  mbzy: "target_major"
};
export default {
  name: "emailAuthentication",
  components: {
    "rh-footer": LogoFooter,
    toast: Toast
  },
  data() {
    return {
      user: utils.cache.get("user"),
      text: utils.cache.get("user")[codeMap[this.$route.params.type]],
      validateObj: {
        text: {}
      }
    };
  },
  methods: {
    showToast(flag) {
      this.toast = flag;
    },
    showDialog(flag) {
      this.isShowDialog = flag;
    },
    submit() {
      let userInfo = utils.cache.get("user");
      console.log(userInfo);
      utils.jsonp.post(
        "c=apiuser&a=edit",
        {
          key: codeMap[this.$route.params.type],
          value: this.text
        },
        res => {
          if (res.CODE) {
            userInfo[codeMap[this.$route.params.type]] = this.text;
            utils.cache.set("user", userInfo);
            utils.ui.toast("修改成功",'',()=>{
              this.back();
            });
          } else {
            console.log(res.data.msgs);
            utils.ui.toast(res.data.msgs);
            // utils.ui.toast(res.data.data);
          }
        }
      );
    },
    returnProfile() {
      this.showDialog(false);
      window.history.back();
    }
  },
  computed: {},
  activated() {
    //获取user信息
    console.log(this.$route.params.type);
  },
  filters: {
    //获取中文信息
    getMsg(val) {
      let map = {
        name: "真实姓名",
        qq: "QQ",
        sf: "省份",
        xx: "学校",
        jdzy: "就读专业",
        bklb: "报考类别",
        mbzgzs: "目标资格证书",
        mbxx: "目标学校",
        mbzy: "目标专业"
      };
      return map[val];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import "src/assets/css/mine";
.page-email-authentication {
  .mine-avatar {
    height: 220px;
    .mine-inner-group {
      margin-top: 0px;
      margin-bottom: -2px;
    }
  }
  .submit-btn {
    padding-top: 10px;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
.mu-dialog.dialog.mine-feedback-dialog {
  position: absolute;
  top: 18.5%;
  left: 8.5%;
  width: 83%;
  height: 30%;
  .mu-dialog-body {
    height: 100%;
    .center {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
  }
  .mine-dialog-icon {
    margin-top: 10px;
  }
  .mine-dialog-title {
    font-size: 1.5rem;
    line-height: 1.5rem;
    margin-top: -5px;
  }
  .mine-dialog-description {
    font-size: 1.3rem;
    line-height: 1.5rem;
    padding-top: 12px;
  }
}
</style>
