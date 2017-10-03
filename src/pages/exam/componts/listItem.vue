<template>
  <div class="com_item">
    <div class="item">
      <h2 v-bind:class="[date.index%2==0?'needPay':'free']" class=" item_left font-hg">第{{date.index}}章:基础知识</h2>
      <mu-raised-button @click="toEaxm" label="做题" class="demo-raised-button bg-primary item_right font-sm" primary/>
      <!-- <button @click="toEaxm" class="btn_pay demo-raised-button bg-primary item_right font-sm">做题</button> -->
    </div>
    <div class="item">
      <h2 class="item_left  font-sm font-normal-light ">
        试题数量：
        <font style="color:rgb(32, 152, 239)">365</font>
        | 已做数量：
        <font style="color:rgb(32, 152, 239)">365</font>
      </h2>
      <!-- :label="date.index%2==0?'免费':'购买'" -->
       <!-- <button style="color:black;background:white" @click="$parent.toPay" class="btn_pay demo-raised-button item_right font-sm">{{date.index%2==0?'做题':'购买'}}</button> -->
      <mu-raised-button v-show="date.index%2==0" @click="$parent.toPay" :label="'购买'" class="demo-raised-button bg-primary-w item_right font-sm" primary/>
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
  min-height: 80px;
  background: white;
  padding: 6px;
  .item {
    &:not(:last-child) {
      border-bottom: 1px dashed #e5e5e5;
    }
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item_left {
      font-weight: 400;
      margin: 0px;
      flex: 0 0 70%;
      display: block;
      text-align: left;
      &.free::before {
        content: "免费";
        color: $normal-color-disabled;
        font-size: 12px;
        border: 1px solid $normal-color-disabled;
        border-radius: 3px;
        padding: 2px;
        margin-right: 5px;
      }
      &.hasPay::before {
        content: "已购";
        color: $normal-color-disabled;
        font-size: 12px;
        border: 1px solid $normal-color-disabled;
        border-radius: 3px;
        padding: 2px;
        margin-right: 5px;
      }
      &.needPay::before {
        content: "付费";
        color: $primary-color;
        font-size: 12px;
        border: 1px solid $primary-color;
        border-radius: 3px;
        padding: 2px;
        margin-right: 5px;
      }
    }
    .item_right {
      width: 60px;
      line-height: 25px;
      height: 25px;
      min-width: 50px;
    }
  }
}
</style>
