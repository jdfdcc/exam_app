<template>
  <div class="answer_pop">
    <mu-popup position="bottom" popupClass="mu-popup-full answer_pop" :open="$parent.showAnserPop">
      <mu-content-block style="padding-top: 0px;padding-left: 0px;padding-right: 0px;" class="has-footer">
        <div class="bg-primary-content pd-md" style="">提醒：点击题目序号，可切换至相应题目</div>
        <section class="pd-md answer_content">
          <h3>单项选择器</h3>
          <div class="answer_list font-hg" >
            <mu-raised-button @click="toItem" style="font-weight:100" v-bind:class="[index%2 == 0?'bg-primary':'']" v-for="(item,index) in data" :key="index" :label="index+1+''" class="answer_button  " />
          </div>
        </section>
        <mu-raised-button @click="$parent.showAnserPop = false" class="button-second" label="我知道了" />
      </mu-content-block>
    </mu-popup>
  </div>
</template>

<script>
export default {
  name: 'answer_pop',
  components: {
    // vueScroll
  },
  props: {
    date: {
      type: Object
    }
  },
  data() {
    return {
      data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1, 1]
    }
  },
  methods: {
    toItem(item){
      this.$emit("toQus",item);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.answer_pop {
  .button-second{
    position: fixed;
    bottom: 0px;
    left:0px;
  }
  .answer_content {
    h3 {
      margin: 5px;
    }
    .answer_list {
      // justify-content: space-between;
      flex-wrap: wrap;
      flex-direction: row;
      display: flex;
      .answer_button {
        min-width: 35px;
        height: 35px;
        border-radius: 50%;
        margin: 5px 10px;
        .mu-raised-button-label {
          padding: 0px;
        }
      }
    }
  }
}
</style>
