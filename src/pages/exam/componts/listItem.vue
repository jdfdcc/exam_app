<template>
  <div class="com_item" @click="toEaxm">
    <div class="item_left">
      <h2 class="font-md">第一章节金融市场系</h2>
      <span class="font-sm font-memo-light">0/137</span>
    </div>
    <div class="item_right">
      <img src="../../../assets/img/icon/pen.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'com_item',
  components: {},
  props: {
    date: {
      type: Object
    }
  },
  data() {
    return {
      showDialog: false,
    }
  },
  methods: {
    //跳转到习题详情
    toEaxm() {
      this.$router.push({ name: "examDetail" })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
@import 'src/assets/css/vars';
.com_item {
  min-height: 50px;
  background: white;
  padding: 6px;
  width: 90%;
  margin: 0 5%;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  .item_left {
    padding-left: 10px;
    h2 {
      margin: 3px 0px;
      font-weight: 400;
    }
  }
  .item_right {
    flex: 0 0 50px;
    text-align: center;
    padding-top: 5px;
    img {
      width: 15px;
    }
  }
}
</style>
