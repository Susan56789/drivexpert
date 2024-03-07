<template>
  <ScrollToTop />
  <router-view></router-view>
</template>

<script>
import ScrollToTop from './components/ScrollToTop.vue';




export default {
  name: 'App',
  components: {
    ScrollToTop
  }

}
</script>
