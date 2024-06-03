<template>
    <div>
        <NavBar />
        <router-view />
        <FooterPage />
    </div>
</template>

<script>
import NavBar from './NavBar.vue';
import FooterPage from './FooterPage.vue';
export default {
    name: 'PageLayout',
    components: {
        NavBar,
        FooterPage
    }
}
</script>