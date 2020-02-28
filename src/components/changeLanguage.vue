<template>
    <div>
        <a-dropdown>
            <a class="ant-dropdown-link" href="#">
                <img style="width: 30px; height: 30px;" src="../i18n/icons/translate.png">
            </a>
            <a-menu slot="overlay">
                <a-menu-item @click="ZH_CN">
                    <a href="javascript:;">中文</a>
                </a-menu-item>
                <a-menu-item @click="EN">
                    <a href="javascript:;">English</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>
export default {
  name: "changeLanguage",
  methods: {
    ZH_CN() {
      this.$i18n.locale = 'ZH_CN';
      localStorage.setItem('lang', this.$i18n.locale)
    },
    EN() {
      this.$i18n.locale = 'EN';
      localStorage.setItem('lang', this.$i18n.locale)
    }
  }
}
</script>

<style scoped>

</style>
