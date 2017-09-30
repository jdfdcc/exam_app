<template>
  <div class="exam_item">
      习题详情
  </div>
</template>

<script>
export default {
  name: 'exam_item',
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
    toEaxm(){
      this.$router.push({name:"examDetail"})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
.exam_item {
}
</style>
