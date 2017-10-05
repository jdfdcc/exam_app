<template>
  <div class="page page_exam_simulate">
    <div v-for="(item,index) in simulateList" :key="index" class="simulate_item">
      <div style="width:80%;margin-left:10%;">
        <p class="font-primary font-md">语文文言文基础知识</p>
      </div>
      <div class="end">
        <span class="font-sm font-memo">
          共100道题<br/> 分数：0
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page_exam_simulate',
  components: {
  },
  data() {
    return {
      simulateList: [1, 1, 1, 1, 1, 1, 1]
    }
  },
  methods: {
  },
  mounted() {
    // setInterval(() => {
    //   console.log('simulate async data')
    //   let swiperSlides = this.swiperSlides
    //   if (swiperSlides.length < 100) swiperSlides.push({})
    // }, 300)
  },
  watch: {
  },
  // ,
  beforeRouteLeave(to, from, next) {
    next(!this.showAnserPop);
    if (this.showAnserPop) {
      this.showAnserPop = false
      this.value = "none"
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.page_exam_simulate {
  display: flex;
  flex-wrap: wrap;
  .simulate_item {
    position: relative;
    flex: 0 0 50%;
    background-image: url('../../assets/img/common/exam_bg_blue.png');
    height: 200px;
    background-size: 100% 100%;
    padding-top: 60px;
    text-align: center;
    p {
      margin: 0px;
    }
    span {
      display: block;
    }
    .end {
      width: 100%;
      position: absolute;
      bottom: 30px;
    }
  }
}
</style>
