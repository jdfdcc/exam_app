<template>
  <div>
    <slot></slot>
    <div v-if="noMsg" class="none_list">
      <img src="../../assets/img/common/iv_loadmore_null.png" alt=""><br/><br/>
      <mu-raised-button @click="back" label="返回" class="bg-primary" primary/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page',
  props: {
    noMsg: {
      type: Boolean,
      defult: false
    }
  }
}
</script>

<style lang="scss" scoped>
.none_list {
  text-align: center;
  margin-top: 30%;
  img {
    width: 60%;
  }
}
</style>
