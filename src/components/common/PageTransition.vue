<template>
  <div class="main_vue_">
    <navigation>
      <router-view class="child-view"></router-view>
    </navigation>
    <transition name="slide-up">
      <mu-paper v-show="$store.state.common.hasFooter" class="footer-tabs">
        <div class="tabs_bar_MAIN " style="height:48px;">
          <div class="tabs_bar_item " :class="{'active': bottomNav==='examHome'}" @click="handleChange('examHome')">
            <img v-if="bottomNav==='examHome'" :src="'./static/img/tab/make_active.png'" alt="">
            <img v-else :src="'./static/img/tab/make.png'" alt="">
            <span>试题</span>
          </div>
          <div class="tabs_bar_item" :class="{'active': bottomNav==='shopList'}" @click="handleChange('shopList')">
            <img v-if="bottomNav==='shopList'" :src="'./static/img/tab/question_active.png'" alt="">
            <img v-else :src="'./static/img/tab/question.png'" alt="">
            <span>市场</span>
          </div>
          <div class="tabs_bar_item" :class="{'active': bottomNav==='myCenter'}" @click="handleChange('myCenter')">
            <img v-if="bottomNav==='myCenter'" :src="'./static/img/tab/center_active.png'" alt="">
            <img v-else :src="'./static/img/tab/center.png'" alt="">
            <span>我</span>
          </div>
        </div>
      </mu-paper>
    </transition>
    <mu-snackbar v-if="$store.state.common.snackbar" :message="$store.state.common.snackbarMsg" action="关闭" @actionClick="hideSnackbar" @close="hideSnackbar" />

    <mu-dialog :open="$store.state.common.loading && !$store.state.common.loadingDisabled" dialogClass="loadingDialog">
      <img src="../../assets/img/common/loading.gif" />
      <div class="font-load font-md">{{$store.state.common.loadingMsg}}</div>
    </mu-dialog>

    <toast :show="$store.state.common.toast" @update="((val) => $store.state.common.toast = val)">
      <img v-if="$store.state.common.toastImg != ''" :src="$store.state.common.toastImg">
      <div>{{$store.state.common.toastMsg}}</div>
    </toast>

    <mu-dialog style="z-index:201442121" dialogClass="dialog" :open="$store.state.common.dialog" @close="handleDialogButton">
      <div class="center pd-hg">
        <img class="dialog-icon" :src="$store.state.common.dialogImg">
        <div class="dialog-content">{{$store.state.common.dialogMsg}}</div>
      </div>
      <div class="dialog-button-box">
        <button v-for="(item, index) in $store.state.common.dialogButtons" :key="index" @click="handleDialogButton(index)">{{item}}</button>
      </div>
    </mu-dialog>

    <mu-popup position="bottom" :open="$store.state.common.popup" @close="handlePopup">
      <mu-appbar :title="$store.state.common.popupTitle">
        <mu-icon-button disabled slot="left" />
        <mu-icon-button slot="right" icon="close" color="white" @click="handlePopup" />
      </mu-appbar>
      <div class="pd-lg">
        {{$store.state.common.popupMsg}}
      </div>
    </mu-popup>
  </div>
</template>

<script>
import Toast from './Toast.vue'

export default {
  components: {
    'toast': Toast
  },
  data() {
    return {
      bottomNav: 'myCenter',
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight
    }
  },
  methods: {
    hideSnackbar() {
      this.$store.commit('TOGGLE_SNACKBAR', false)
    },
    handleChange(val) {
      this.go(val)
      setTimeout(() => {
        this.bottomNav = val
      }, 200);
    },
    handleDialogButton(index) {
      this.$store.state.common.dialogCallback(index)
      this.$store.state.common.dialog = false
    },
    handlePopup() {
      this.$store.state.common.popupCallback()
      this.$store.state.common.popup = false
    }
  },
  beforeRouteUpdate(to, from, next) {
    // this.bottomNav = to.name == 'examHome' ? to.name == 'shopList'? 'shopList' : 'examHome' : 'myCenter';
    let isBack = this.$router.isBack
    if (from.name == 'access' || to.name == from.name) {
      this.transitionName = null
    } else {
      this.transitionName = 'fade'
    }
    this.$router.isBack = false
    next()
  },
  mounted() {

  }
}
</script>

<style lang="scss" >
.main_vue_ {
  .tabs_bar_MAIN{
    display: flex;
    padding: 5px;
    box-sizing: content-box;
    .active{
      color: rgb(61, 161, 255);
    }
    .tabs_bar_item{
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      img{
        width: 25px;
        height: 25px;
      }
    }
  }
  .child-view {
    top: 0;
    width: 100%;
    height: 100%;
  }

  .loadingDialog {
    position: relative;
    width: 143px;
    min-height: 137px;
    line-height: 24px;
    padding: 8px;
    background: rgba(49, 56, 57, .9);
    text-align: center;
    border-radius: 10px;
  }

  .loadingDialog img {
    border-style: none;
    width: 30px;
    margin-top: 25px;
  }

  .loadingDialog .font-load {
    color: white;
    font-size: 1.3rem;
    margin-top: 15px;
  }

  .loadingDialog .font-primary {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .loadingDialog i {
    display: inline-block;
    -webkit-transform: rotate(360deg);
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }

  @-webkit-keyframes spin {
    from {
      -webkit-transform: rotate(360deg);
    }
    to {
      -webkit-transform: rotate(0deg);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
}
</style>
