<template>
    <div class="container mx-auto px-4 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <CarItem v-for="car in displayedCars" :key="car._id" :car="car" />
        </div>
        <div class="mt-4 flex justify-center">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="mr-2 px-4 py-2 bg-gray-200 disabled:bg-gray-400" v-if="totalPages > 1">Previous</button>
            <button @click="nextPage" :disabled="currentPage * pageSize >= cars.length"
                class="px-4 py-2 bg-gray-200 disabled:bg-gray-400" v-if="totalPages > 1">Next</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CarItem from './CarItem.vue';

export default {
    name: 'CarList',
    components: {
        CarItem
    },
    data() {
        return {
            cars: [],
            currentPage: 1,
            pageSize: 12
        };
    },
    async created() {
        await this.fetchCars();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.cars.length / this.pageSize);
        },
        displayedCars() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.currentPage * this.pageSize;
            return this.cars.slice(startIndex, endIndex);
        }
    },
    methods: {
        async fetchCars() {
            try {
                const response = await axios.get('https://drivexpert.onrender.com/api/cars');
                this.cars = response.data;
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        }
    }
};
</script>

<style scoped>
button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
}
</style>
