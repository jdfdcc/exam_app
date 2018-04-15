<template>
  <div class="answer_pop">
    <mu-popup position="bottom" popupClass="mu-popup-full answer_pop" :open="$parent.showAnserPop">
      <mu-content-block  style="padding-top: 0px;padding-left: 0px;padding-right: 0px;overflow: hidden;">
        <div class="bg-primary-content pd-md" style="">提醒：点击题目序号，可切换至相应题目</div>
        <section class="answer_content">
          <h3>单项选择器</h3>

          <div class="menu_question">
            <div @click="menuIndex(item)" v-for="(item,index) in menu" :key="index" class="menu_question_answer">{{item*menuItemList + 1}}-{{(index+1)*menuItemList}}</div>
          </div>

          <div class="answer_list font-hg"  v-bind:style="{'max-height': scrollHeight - 200 + 'px'}">
            <mu-raised-button @click="toItem(item.detail,item.id)" style="font-weight:100" v-bind:class="[item.detail.value != 100?'bg-primary':'']" v-for="(item,index) in indexList" :key="index" :label="item.id - 0 + 1 + ''" class="answer_button  " />
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
      menu:[],
      indexList:[],
      menuItemList: 50,
      scrollHeight: window.innerHeight
    }
  },
  methods: {
    toItem(item,index) {
      this.$emit("toQus", item,index);
    },
    // 获取内容信息
    menuIndex(index){
      this.indexList = []
      if (index != this.menu.length -1 || this.$parent.swiperSlides.length % this.menuItemList ==0){
        for (let i = 0; i < this.menuItemList; i++) {
          let itemIndex = index*this.menuItemList +i;
          this.indexList.push({
            id:itemIndex,
            detail:this.$parent.swiperSlides[itemIndex]
          })
        }
      }else{
        // 当为最后一个划分的时候
        let length = this.$parent.swiperSlides.length % this.menuItemList
        for(let i = 0; i < length; i++){
          let itemIndex = index*this.menuItemList +i;
          this.indexList.push({
            id:itemIndex,
            detail:this.$parent.swiperSlides[itemIndex]
          })
        }
      }
    }
  },
  watch: {
    '$parent.showAnserPop'(){
      this.menu = []
      let index = Math.ceil(this.$parent.swiperSlides.length / (this.menuItemList + 1))
      console.log(index)
      for (let i = 0; i < index; i++) {
        this.menu.push(i)
      }
      if (this.indexList.length === 0) {
        this.menuIndex(0)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.answer_pop {
  .menu_question{
    display: flex;
    height: 60px;
    overflow-x: scroll;
    width: 100vw;
    // flex-wrap: wrap;
    border-bottom: 1px solid rgba(0,0,0,.5);
    padding-bottom: 10px;
    .menu_question_answer{
      min-width: 90px;
      width:80px;
      font-size: 13px;
      padding: 10px;
      border: 1px solid rgba(0,0,0,.5);
      border-radius: 3px;
      text-align: center;
      margin: 10px 0px 0px 10px;
    }
  }
  .button-second {
    bottom: 0px;
    left: 0px;
    position: absolute;
  }
  .answer_content {
    position: absolute;
    overflow: hidden;
    h3 {
      margin: 5px;
    }
    .answer_list {
      overflow: scroll;
      // justify-content: space-between;
      flex-wrap: wrap;
      flex-direction: row;
      display: flex;
      .answer_button {
        min-width: 30px;
        height: 30px;
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
