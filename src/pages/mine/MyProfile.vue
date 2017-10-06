<template>
  <div class="page mine-page page-myprofile">
    <mu-content-block class="has-header no-padding">
      <section v-bind:style="{'min-height':screenHeight - 81 +'px'}">
        <section class="mine-header bg-primary">
        </section>
        <section style="box-shadow:0px 0px 10px rgba(0, 0, 0, 0.12)" class="mine-avatar mine-section mg-lg">
          <div class="avatar-row">
            <div class="avatar">
              <mu-avatar @click="toLogin" :src="headimgurl" :size="56" />
            </div>
            <div v-if="!idNum" class="personal-info font-bold">{{mobileNum }}</div>
            <div v-if="idNum" class="personal-info font-bold">{{name}}</div>
          </div>
          <mu-list>
            <mu-list-item to="changeMsg/name" title="疯狂的西红柿">
              <img slot="left" src="../../assets/img/exam_img/info/xm.png" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
        <section class="contact-section mine-section mg-lg">
          <mu-list>
            <mu-list-item :title="'13771162355'">
              <img slot="left" src="../../assets/img/exam_img/info/sj.png" />
            </mu-list-item>
            <mu-divider />
            <!-- QQ -->
            <mu-list-item title="QQ" to="changeMsg/qq">
              <img slot="left" src="../../assets/img/exam_img/info/qq.png" />
              <div slot="after">
                80982388
              </div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <!-- 省份 -->
            <mu-list-item title="地址">
              <img slot="left" src="../../assets/img/exam_img/info/sf.png" />
              <div slot="after">安徽</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <!-- 学校 -->
            <mu-list-item title="学校" to="changeMsg/xx">
              <img slot="left" src="../../assets/img/exam_img/info/xx.png" />
              <div slot="after">安徽大学</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <!--  -->
            <mu-list-item :title="'入学时间'">
              <img slot="left" src="../../assets/img/exam_img/mine/sj.png" />
              <label slot="after" style="height: 15px;overflow: unset;">
                {{time}}
                <dateTime v-model="time" slot="after" style="opacity:0;postiton:absolute:top:0px"></dateTime>
              </label>
              <img slot="right" src="../../assets/img/icon/date.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="就读专业" to="changeMsg/zy">
              <img slot="left" src="../../assets/img/exam_img/info/zy.png" />
              <div slot="after">计算机科学与技术</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
          </mu-list>
        </section>
        <section class="mine-section mg-lg">
          <mu-list>
            <mu-list-item title="报考类别" to="changeMsg/lb">
              <img slot="left" src="../../assets/img/exam_img/info/bklb.png" />
              <div slot="after">会计</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="目标学校" to="changeMsg/mbxx">
              <img slot="left" src="../../assets/img/exam_img/info/xx.png" />
              <div slot="after">清华大学</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="目标专业" to="changeMsg/mbzy">
              <img slot="left" src="../../assets/img/exam_img/info/zy.png" />
              <div slot="after">烧烤</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="目标职业资格证书" to="changeMsg/mbzy">
              <img slot="left" src="../../assets/img/exam_img/info/zs.png" />
              <div slot="after">烧烤</div>
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
            <mu-divider/>
            <mu-list-item title="修改密码" to="changePassword">
              <img slot="left" src="../../assets/img/exam_img/info/mm.png" />
              <img slot="right" src="../../assets/img/icon_right.png" class="arrow-right" />
            </mu-list-item>
          </mu-list>
        </section>
      </section>
      <rh-footer></rh-footer>
    </mu-content-block>
  </div>
</template>

<script>
import store from '../../vuex/store'
import LogoFooter from '../../components/common/LogoFooter.vue'
import dateTime from '../../components/common/Datetime.vue'
export default {
  name: 'myProfile',
  components: {
    'rh-footer': LogoFooter,
    dateTime
  },
  data() {
    return {
      time: "2012-01-01",
      mobileNum: '',
      name: '',
      idNum: '',
      email: '',
      emailFlag: '', //0:未认证，1:已认证, 空：未提交过email
      address: '',
      headimgurl: require('../../assets/img/mine/heard.jpg'),
      screenHeight: document.documentElement.clientHeight,
    }
  },
  methods: {
    toLogin() {
    },
    assignUserInfo(userInfo) {
    }
  },
  computed: {

  },
  filters: {
  },
  created() {
  },
  activated() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped >
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar {
    min-height: 140px;
    .avatar-row {
      padding-top: 12px;
      .avatar {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
      }
      .personal-info {
        width: 100%;
        text-align: center;
        color: $normal-color;
        font-size: 1.7rem;
        margin-bottom: 20px;
      }
    }
    .authenticated-info {
      div {
        color: $normal-color-light;
        font-size: 1.3rem;
        line-height: 24px;
      }
    }
  }
  .flag {
    font-size: 1.1rem;
    padding: 1px 3px;
    margin-right: 6px;
  }
  .flag.un-auth {
    color: $memo-color;
    background: #FAEDD8;
  }
  .flag.auth {
    color: $primary-color;
    background: #E2F2E1;
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
@import 'src/assets/css/mine';
.page-myprofile {
  .mine-avatar .mu-item-left img {
    width: 24px;
    height: 24px;
    margin-left: 1px;
    vertical-align: middle;
  }
  .contact-section .mu-item-title {
    line-height: 1.5rem;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    margin-right: 20px;
  }
}
</style>
