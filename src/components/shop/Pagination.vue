<!-- components/Pagination.vue -->
<template>
    <div class="flex justify-center mt-8">
        <button @click="prevPage" :disabled="currentPage === 1"
            class="mr-4 bg-red-500 text-white px-4 py-2 rounded">Previous</button>
        <div>{{ currentPage }} / {{ total }}</div>
        <button @click="nextPage" :disabled="currentPage === total"
            class="ml-4 bg-red-500 text-white px-4 py-2 rounded">Next</button>
    </div>
</template>

<script>
export default {
    name: 'PaginationPage',
    props: {
        total: Number
    },
    data() {
        return {
            currentPage: 1
        }
    },
    methods: {
        nextPage() {
            this.currentPage++;
            this.$emit('page-change', this.currentPage);
        },
        prevPage() {
            this.currentPage--;
            this.$emit('page-change', this.currentPage);
        }
    }
}
</script>