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
    isLogin() {
      // let params = this.$route.params.id.split("&")
      let wxConfig = {
        openId: this.$route.params.id.split("&")[0],
        token: this.$route.params.id.split("&")[1],
        menuId: this.$route.params.id.split("&")[2].split("_")[0],
        producId: this.$route.params.id.split("&")[2].split("_")[1] || ""
      }
      utils.cache.set('wxConfig', wxConfig)
      setTimeout(() => {
        this.$router.push({
          name: menuConfig[wxConfig.menuId]
        });
      }, 200);


      // console.log(wxConfig)
      // // wxConfig.openId = 'oM9JHwcWfu7iypSEV9AaehIDT5HY'
      // utils.cache.set('wxConfig', wxConfig)
      // utils.http.post('FINDUSERINFO', {
      //   openID: wxConfig.openId
      // }).then(response => {
      //   //暂时定义没有进行实名认证
      //   response.data.getUserInfo.isAuth = false;
      //   utils.cache.set('user', response.data.getUserInfo)
      //   store.commit('LOGIN', response.data.getUserInfo)
      //   this.$router.push({
      //     name: menuConfig[wxConfig.menuId],
      //     params: {
      //       product: JSON.parse(wxConfig.producId == '2' ? chanpin : chanpin1)
      //     }
      //   });
      // }).catch(error => {
      //   console.log(menuConfig[wxConfig.menuId])
      //   this.$router.push({
      //     name: menuConfig[wxConfig.menuId],
      //     params: {
      //       product: JSON.stringify(wxConfig.producId == '2' ? chanpin : chanpin1)
      //     }
      //   });
      // })
    },
    ...mapMutations({
      logout: 'LOGIN'
    }),
  },
  activated(to) {
    utils.help.pushState()
    //清空缓存
    utils.cache.clear();
    this.logout(null)
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
