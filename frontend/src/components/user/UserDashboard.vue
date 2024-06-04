<template>
    <div>
        <h2 class="text-center text-3xl font-extrabold text-gray-900">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div v-for="car in cars" :key="car.id" class="bg-white p-4 rounded-lg shadow-md">
                <h3 class="text-xl font-bold">{{ car.name }}</h3>
                <p>{{ car.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserDashboard',
    data() {
        return {
            cars: []
        };
    },
    async created() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://drivexpert.onrender.com/api/cars', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            this.cars = response.data;
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<style scoped>
.grid {
    display: grid;
    gap: 16px;
}
</style>