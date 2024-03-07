<template>
    <div>
        <button v-show="showScrollToTop"
            class="fixed bottom-4 right-4 z-50 rounded-full bg-gray-600 p-3 text-white transition-all duration-300 hover:bg-gray-700"
            @click="scrollToTop">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18">
                </path>
            </svg>
        </button>
    </div>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            showScrollToTop: false,
        };
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    beforeUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    },
    methods: {
        handleScroll() {
            this.showScrollToTop = window.pageYOffset > 300;
        },
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    },
};
</script>