<template>
  <div class="page page_access">
    <LogoFooter style="position:fixed;bottom:20px"></LogoFooter>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from '../../components/common/LogoFooter'
import menuConfig from '../../assets/data/menuConfig'
import chanpin from '../../assets/data/chanpin'
import chanpin1 from '../../assets/data/chanpin1'
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
      screenHeight: document.documentElement.clientHeight - 84
    }
  },
  methods: {
		//获取用户信息
		getUserInfo(){
			console.log("token存在 获取用户信息")
			this.$router.replace("/page/login");
		},
    isLogin() {
			alert(this.$route.params.id)
			let token = this.$route.params.id;
			if(token == 'null'){
				this.$router.replace("/page/login");
			}else{
				this.getUserInfo();
			}
    }
  },
  activated(to) {
    // utils.help.pushState()
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
