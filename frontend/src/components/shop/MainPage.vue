<!-- components/ShopPage.vue -->
<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-4">Shop</h1>
        <div class="flex items-center justify-between mb-4">
            <div>
                <label for="make">Make:</label>
                <select v-model="selectedMake" @change="filterCars">
                    <option value="">All Makes</option>
                    <option v-for="make in makes" :key="make.id" :value="make.id">{{ make.name }}</option>
                </select>
            </div>
            <div>
                <label for="model">Model:</label>
                <select v-model="selectedModel" @change="filterCars">
                    <option value="">All Models</option>
                    <option v-for="model in models" :key="model.id" :value="model.id">{{ model.name }}</option>
                </select>
            </div>
            <div>
                <label for="price">Price Range:</label>
                <input type="number" v-model="minPrice" placeholder="Min">
                <input type="number" v-model="maxPrice" placeholder="Max">
                <button @click="filterCars">Apply</button>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-4">
            <CarItem v-for="car in displayedCars" :key="car.model_id" :car="car" :makes="makes" :models="models" />
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
            makes: [],
            models: [],
            selectedMake: '',
            selectedModel: '',
            minPrice: null,
            maxPrice: null,
            currentPage: 1,
            itemsPerPage: 12
        }
    },
    computed: {
        displayedCars() {
            let filteredCars = this.cars;

            if (this.selectedMake) {
                filteredCars = filteredCars.filter(car => car.make_id === this.selectedMake);
            }

            if (this.selectedModel) {
                filteredCars = filteredCars.filter(car => car.model_id === this.selectedModel);
            }

            if (this.minPrice !== null && this.maxPrice !== null) {
                filteredCars = filteredCars.filter(car => car.price >= this.minPrice && car.price <= this.maxPrice);
            }

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return filteredCars.slice(startIndex, startIndex + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.displayedCars.length / this.itemsPerPage);
        }
    },
    methods: {
        async fetchCarData() {
            try {
                const response = await axios.get('http://localhost:3000/api/cars');
                this.cars = response.data;

                const makeIds = [...new Set(this.cars.map(car => car.make_id))];
                const modelIds = [...new Set(this.cars.map(car => car.model_id))];

                await Promise.all([
                    this.fetchMakes(makeIds),
                    this.fetchModels(modelIds)
                ]);
            } catch (error) {
                console.error(error);
                // Handle error gracefully
            }
        },
        async fetchMakes(makeIds) {
            try {
                const response = await axios.get(`http://localhost:3000/api/makes?ids=${makeIds.join(',')}`);
                this.makes = response.data;
            } catch (error) {
                console.error(error);
                // Handle error gracefully
            }
        },
        async fetchModels(modelIds) {
            try {
                const response = await axios.get(`http://localhost:3000/api/models?ids=${modelIds.join(',')}`);
                this.models = response.data;
            } catch (error) {
                console.error(error);
                // Handle error gracefully
            }
        },
        filterCars() {
            // Implement filtering logic here
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        }
    },
    mounted() {
        this.fetchCarData();
    }
}
</script>
