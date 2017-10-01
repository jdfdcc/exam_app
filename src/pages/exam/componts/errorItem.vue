<template>
  <div class="error_item ">
    <div class="item">
      <p class="item_left font-md font-normal-light ">
        下列诗句照片你大声道的人道主义是真呃特别那时候撒大师大师的撒打算大阿萨德阿打算啊...下列诗句照片你大声道的人道主义是真呃特别那时候撒大师大师的撒打算大阿萨德阿打算啊...
      </p>
      <div class="item_right">
        <mu-raised-button @click="toEaxm" label="重做" class="demo-raised-button bg-primary item_right font-sm" primary/>
        <mu-raised-button :label="'删除'" class="demo-raised-button bg-primary-w item_right font-sm" style="margin-top:5px" primary/>
      </div>
    </div>
    <div class="item font-memo-light" style="padding-top:5px;">
      <p style="flex:0 0 60%" class="item_left font-md font-normal-light font-memo-light">第{{date.index}}章:基础知识</p>
      <span class="font-md item_right">22小时前</span>
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
.error_item {
  min-height: 100px;
  background: white;
  padding: 6px;
  .item {
    padding-bottom: 5px;
    padding-left: 5px;
    &:not(:last-child) {
      border-bottom: 1px dashed #e5e5e5;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item_left {
      p {
        padding: 10px 0px;
      }
      max-height: 60px;
      overflow: hidden;
      flex:0 0 70%;
      font-weight: 400;
      margin: 0px;
      display: block;
      text-align: left;
    }
    .item_right {
      // flex:0 0 10%;
      // height: 25px;
      text-align: right;
      padding: 0px 10px; // min-width: 50px;
      .demo-raised-button {
        height: 25px;
        min-width:75px;
        .mu-raised-button-label{
          padding:0px;
        }
      }
    }
  }
}
</style>
