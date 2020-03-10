<script>
import {routerMap} from '@/router/routes'
export default {
  name: "home",
  beforeRouteEnter(to, from, next) {
    next({
      path: routerMap[to.meta.authPermisstion].path
    });
  }
};
</script> f