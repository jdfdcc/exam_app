<template>
  <page class="page_shop_list has-footer">
    <div class="list_content" >
      <div class="list_item" v-for="(item, index) in list" :key="index" @click="go('shopDetail/' + item.g_id)">
        <h3>{{item.g_classType}}</h3>
        <p>{{item.g_name}}</p>
        <div class="options">
          <div class="left">
            <img v-for="(item1, index) in item.g_usersImg" :key="index" :src="'http://qn.cutt.com/' + item1" alt="">
          </div>
          <div class="right">
            <span>最低￥{{item.g_money}}起</span>
            <span>{{item.g_buycount}}人已购买</span>
          </div>
        </div>
      </div>
    </div>
  </page>
</template>

<script>
export default {
  name: "form",
  components: {
  },
  data() {
    return {
      page: {
        pageNo: 0,
        pageSize: 10
      },
      list: []
    };
  },
  methods: {
    getShopList () {
      utils.jsonp.post("c=apiSubject&a=newsubjects", this.page, res => {
        if (res.CODE) {
          this.list = res.data.data
        } else {
          utils.ui.toast(res.data.msgs);
        }
      });
    }
  },
  mounted() {
    this.getShopList()
  }
};
</script>
<style lang='scss'>
.page_shop_list{
  padding: 0 5px;
  .list_item{
    min-height: 100px;
    margin-top: 10px;
    box-shadow: 1px 0px 5px #e0e0e0;
    background: #ffffff;
    padding: 1px 10px 2px 10px;
    p{
      margin-bottom: 15px;
    }
    h3{
      margin: 5px;
      font-size: 2rem;
      display: flex;
      align-items: center;
      &::before{
        content: '荐';
        // display: block;
        background: rgb(223,173, 105);
        color: #ffffff;
        font-size: 1.2rem;
        width: 20px;
        height: 20px;
        // padding: 5px;
        line-height: 25px;
        text-align: center;
        margin-right: 3px;
        border-radius: 2px;
      }
    }
    p{
      font-size: 1.5rem;
    }
    .options{
      max-height: 100px;
      overflow: hidden;
      display: flex;
      .left{
        flex: 1;
        img{
          width: 30px;
          margin-right: 6px;
          border-radius: 50%;
        }
      }
      .right{
        font-size: 1.3rem;
        flex: 0 0 100px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
        :first-child{
          color: rgb(252, 93, 8);
        }
        :nth-child(2){
          color: gray;
        }
      }
    }
  }
}

</style>


