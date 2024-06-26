<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Shop</h1>
        <div class="flex items-center justify-between mb-4 flex-wrap">
            <div class="mb-2 md:mb-0">
                <label for="minPrice" class="mr-2">Price Range:</label>
                <input type="number" v-model.number="minPrice" placeholder="Min" class="mr-2 border p-1">
                <input type="number" v-model.number="maxPrice" placeholder="Max" class="mr-2 border p-1">
                <button @click="filterCars" class="px-4 py-2 bg-red-500 text-white rounded">Apply</button>
            </div>
            <div class="mb-2 md:mb-0">
                <label for="minYear" class="mr-2">Year:</label>
                <input type="number" v-model.number="minYear" placeholder="Min Year" class="mr-2 border p-1">
                <input type="number" v-model.number="maxYear" placeholder="Max Year" class="mr-2 border p-1">
                <button @click="filterCars" class="px-4 py-2 bg-red-500 text-white rounded">Apply</button>
            </div>
            <div class="mb-2 md:mb-0">
                <label for="keyword" class="mr-2">Keyword:</label>
                <input type="text" v-model="keyword" placeholder="Search by keyword" class="mr-2 border p-1">
                <button @click="filterCars" class="px-4 py-2 bg-red-500 text-white rounded">Apply</button>
            </div>
        </div>
        <div v-if="displayedCars && displayedCars.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <CarItem v-for="car in displayedCars" :key="car._id" :car="car" />
        </div>
        <div v-else>
            <h2>No Cars Posted Yet</h2>
        </div>
        <Pagination :total="totalPages" @page-change="changePage" />
    </div>
</template>

<script>
import CarItem from './CarItem.vue';
import Pagination from './Pagination.vue';
import axios from 'axios';

export default {
    components: {
        CarItem,
        Pagination
    },
    data() {
        return {
            cars: [],
            minPrice: null,
            maxPrice: null,
            minYear: null,
            maxYear: null,
            keyword: '',
            currentPage: 1,
            itemsPerPage: 12
        };
    },
    computed: {
        filteredCars() {
            let filteredCars = this.cars;

            if (this.minPrice !== null) {
                filteredCars = filteredCars.filter(car => car.price >= this.minPrice);
            }

            if (this.maxPrice !== null) {
                filteredCars = filteredCars.filter(car => car.price <= this.maxPrice);
            }

            if (this.minYear !== null) {
                filteredCars = filteredCars.filter(car => car.year >= this.minYear);
            }

            if (this.maxYear !== null) {
                filteredCars = filteredCars.filter(car => car.year <= this.maxYear);
            }

            if (this.keyword) {
                const keywordLower = this.keyword.toLowerCase();
                filteredCars = filteredCars.filter(car =>
                    car.carName.toLowerCase().includes(keywordLower) ||
                    car.description.toLowerCase().includes(keywordLower)
                );
            }

            return filteredCars;
        },
        displayedCars() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredCars.slice(startIndex, startIndex + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredCars.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchCarData() {
            try {
                const response = await axios.get('https://drivexpert.onrender.com/api/cars');
                this.cars = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        },
        filterCars() {
            this.currentPage = 1; // Reset to first page after filtering
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        }
    },
    mounted() {
        this.fetchCarData();
    }
};
</script>

<style scoped></style>
