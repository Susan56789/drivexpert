<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="car">
            <h1 class="text-3xl font-bold mb-4">{{ car.carName }}</h1>
            <img :src="'https://drivexpert.onrender.com/uploads/' + car.images[0]" :alt="car.carName"
                class="w-full h-48 object-cover rounded-md" />
            <p><strong>Price:</strong> ${{ car.price }}</p>
            <p><strong>Year:</strong> {{ car.year }}</p>
            <p><strong>Fuel Type:</strong> {{ car.fuelType }}</p>
            <p><strong>Engine Size:</strong> {{ car.engineSize }}</p>
            <p><strong>Mileage:</strong> {{ car.mileage }}</p>
            <p><strong>Location:</strong> {{ car.currentLocation }}</p>
            <p class="mt-4">{{ car.description }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'CarDetails',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            car: null
        };
    },
    async created() {
        await this.fetchCarDetails();
    },
    methods: {
        async fetchCarDetails() {
            try {
                const response = await axios.get(`https://drivexpert.onrender.com/api/cars/${this.id}`);
                this.car = response.data;
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        }
    }
};
</script>

<style scoped>
/* Add any scoped styles for your component here */
</style>
