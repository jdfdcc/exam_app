<template>
  <div class="page page_access">
		<!-- <input v-model="value"/> -->
    <LogoFooter style="position:fixed;bottom:20px"></LogoFooter>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from '../../components/common/LogoFooter'
import {
  mapGetters,
  mapMutations
} from 'vuex'

export default {
  name: 'access',
  components: {
    LogoFooter
  },
  data() {
    return {
			value:"",
      screenHeight: document.documentElement.clientHeight - 84
    }
  },
  methods: {
		// 获取用户信息
		getUserInfo () {
      // 塞入token
      utils.cache.set("token",params[0])
			let params =  this.$route.params.id.split("&");
			this.$router.replace("/page/myCenter");
		},
    isLogin () {
      // 清除token
      utils.cache.removeItem('token')
			let params =  this.$route.params.id.split("&")
			let token = params[0];
			if (params[1]&&params[1] == 2) {
				this.$router.replace('/page/login')
			} else {
				this.getUserInfo();
			}
    }
  },
  activated(to) {
    //清空缓存
    utils.cache.clear();
    this.isLogin();
  },
  beforeRouteEnter(to, from, next) {
    next(true);
    if (from.name != 'login' && from.name) {
      utils.wx.wxClose();
    }
  }
}
</script>
