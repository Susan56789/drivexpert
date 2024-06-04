<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Cars Sold</h1>
        <div class="bg-white rounded-lg shadow-md p-6">
            <div v-if="cars.length">
                <ul>
                    <li v-for="car in cars" :key="car._id" class="mb-4">
                        <h2 class="text-xl font-semibold">{{ car.carName }}</h2>
                        <p><strong>Price:</strong> ${{ car.price }}</p>
                        <p><strong>Year:</strong> {{ car.year }}</p>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>You haven't sold any cars yet.</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CarsSold',
    data() {
        return {
            cars: []
        };
    },
    async created() {
        const token = localStorage.getItem('token');
        if (!token) {
            this.$router.push('/login');
        } else {
            try {
                const response = await axios.get('https://drivexpert.onrender.com/api/cars/sold', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                this.cars = response.data;
            } catch (error) {
                console.error('Error fetching sold cars:', error);
            }
        }
    }
};
</script>

<style scoped></style>
