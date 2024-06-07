<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8 text-center">Available Cars</h1>
        <div v-if="loading" class="text-center">Loading cars...</div>
        <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <car-item v-for="car in cars" :key="car._id" :car="car"></car-item>
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
            loading: true,
            error: ''
        };
    },
    async created() {
        try {
            const response = await axios.get('https://drivexpert.onrender.com/api/cars');
            this.cars = response.data;
        } catch (error) {
            this.error = 'Failed to fetch cars. Please try again later.';
        } finally {
            this.loading = false;
        }
    }
};
</script>

<style scoped>

</style>
