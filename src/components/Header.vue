<template>
    <a-row class="main" id="mainHeader">
        <a-row type="flex" justify="space-between" class="top">
            <!--伸缩按钮-->
            <a-col :span="10">
                <a-icon class="fold" :type="collapsed? 'menu-fold':'menu-unfold'" @click="handleHide"/>
                <!--        <a-breadcrumb class="bread">-->
                <!--          <a-breadcrumb-item v-for="(item,key) in menu" :key="key">-->
                <!--            <a href="javascript:void(0);" @click="jumpTo(item.path)">{{item.name}}</a>-->
                <!--          </a-breadcrumb-item>-->
                <!--        </a-breadcrumb>-->
            </a-col>
            <!--右边用户头像-->
            <a-col :span="10" class="right">
                <a-popover>
                    <img :src="avatar" alt="" class="avatar">
                    <span>{{userName}}</span>
                    <template slot="content">
                        <p @click="logout" style="width:80px;cursor: pointer;text-align: center">
                            {{ this.$t('login.logout') }}
                        </p>
                    </template>
                </a-popover>
            </a-col>
        </a-row>
        <change-language class="changeLang"></change-language>

        <!--    <a-row class="bottom">-->

        <!--    </a-row>-->
    </a-row>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { logout } from "../api/login"
import mixin from '../common/js/mixin'
import '../utils/resizeDetector'
import ChangeLanguage from '@/components/changeLanguage';

export default {
  mixins: [mixin],
  components: {
    ChangeLanguage
  },
  props: {
    collapsed: {
      type: Boolean
    }
  },
  mounted() {
    // 侧边栏伸缩时也要让echarts重绘,不然宽度会出现bug
    // eslint-disable-next-line new-cap,no-undef
    let erd = new elementResizeDetectorMaker();
    erd.listenTo(document.getElementById("mainHeader"), element => {
      // 只有首页才需要触发重绘
      if (this.section[0] === 'index') {
        let myEvent = new Event('resize');
        window.dispatchEvent(myEvent);
      }
    });
  },
  methods: {
    ...mapMutations({
      setLogin: 'SET_LOGIN'
    }),
    // 侧边栏切换
    handleHide() {
      this.$emit('handleHide')
    },
    // 登出
    logout() {
      logout()
        .then(res => {
          this.setLogin(false);
          this.jumpTo('/login')
        })
        .catch(err => {
          this.showNotice(`${this.$t('systemNotice.systemCode[400]')}`);
        })
    }
  },
  computed: {
    ...mapGetters([
      'menu',
      'userName',
      'avatar',
      'section'
    ])
  }
}
</script>

<style scoped lang="stylus">
    .main {
        .top {
            background-color: #fff
            padding 0 24px

            .fold {
                cursor pointer
                vertical-align center
            }

            .right {
                text-align right
            }

            .bell {
                vertical-align middle
            }

            // 头像

            .avatar {
                width 24px
                height 24px
                vertical-align middle
                margin 0 10px
            }
        }

        .changeLang {
            position: absolute;
            z-index: 1000;
            margin-top: -64px;
            margin-left: 82%;
        }

        .bottom {
            height 54px
            background-color #fff
            margin-top 2px
            padding 0 50px
        }

        // 面包屑导航

        .bread {
            height 54px
            line-height 54px
            font-size 16px
            margin-left 20px
            display inline-block
        }

    }
</style>
