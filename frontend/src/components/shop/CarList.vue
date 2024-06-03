<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CarItem v-for="(car, index) in displayedCars" :key="index" :car="car" :makes="makes" :models="models" />
    </div>
    <div class="mt-4 flex justify-center">
        <button @click="prevPage" :disabled="currentPage === 1" class="mr-2 px-4 py-2 bg-gray-200"
            v-if="totalPages > 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= cars.length" class="px-4 py-2 bg-gray-200"
            v-if="totalPages > 1">Next</button>
    </div>
</template>

<script>
import CarItem from './CarItem.vue';

export default {
    name: 'CarList',
    components: {
        CarItem
    },
    props: {
        cars: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 12,
            makes: [],
            models: []
        };
    },
    mounted() {
        this.fetchCarMakes();
        this.fetchCarModels();
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
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        async fetchCarMakes() {
            try {
                const response = await fetch('https://drivexpert.onrender.com/api/car-makes');
                this.makes = await response.json();
            } catch (error) {
                console.error('Error fetching car makes:', error);
            }
        },
        async fetchCarModels() {
            try {
                const response = await fetch('https://drivexpert.onrender.com/api/car-models');
                this.models = await response.json();
            } catch (error) {
                console.error('Error fetching car models:', error);
            }
        }
    }
};
</script>
