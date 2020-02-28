import { mapMutations } from 'vuex'

export default {
  data() {
    return {

    }
  },
  methods: {
    // 路由跳转
    jumpTo(route) {
      this.$router.push(route)
    },
    // 统一通知系统错误提示
    showNotice(description = '发生了问题', message = `${this.$t('deleteUser.notice')}`, duration = 2) {
      this.$notification.open({
        message,
        description,
        duration // 1秒
      });
    },
    // 格式化时间 输入: 123120908000 输出: 2019-09-01 18:00:07
    formatTime(time) {
      let date = new Date(time);
      let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
      let datee = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
      let hour = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`;
      let minute = date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`;
      let second = date.getSeconds() > 9 ? date.getSeconds() : `0${date.getSeconds()}`;
      return `${date.getFullYear()}.${month}.${datee} ${hour}:${minute}:${second}`;
    }
  }
}
