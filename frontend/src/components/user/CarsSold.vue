<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Cars Sold</h1>
        <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
        <div v-if="cars && cars.length">
            <div v-for="car in cars" :key="car._id" class="flex flex-col justify-center mb-6">
                <div
                    class="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                    <div v-if="car.images && car.images.length"
                        class="w-full md:w-1/3 bg-white grid place-items-center">
                        <img crossorigin="anonymous" :src=car.images[0].url :alt="car.carName"
                            class="w-full h-48 object-cover rounded-md" />
                    </div>
                    <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                        <div class="flex justify-between items-center">
                            <p class="text-gray-500 font-medium hidden md:block">{{ car.carName }}</p>
                            <div class="flex items-center">
                                <div
                                    class="bg-yellow-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                    {{ car.condition }}</div>
                            </div>

                            <div
                                class="bg-green-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                {{ car.year }}</div>
                        </div>
                        <p class="text-xl font-black text-gray-800">{{ formatCurrency(car.price) }}</p>
                        <p class="text-sm font-grey text-gray-800">{{ dateTime(car.createdAt) }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>You haven't sold any cars yet.</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
    name: 'CarsSold',
    data() {
        return {
            cars: [], // Initialize as an empty array
            error: null // Error message state
        };
    },
    async created() {
        const token = localStorage.getItem('token');

        if (!token) {
            this.$router.push('/login');
            return;
        }

        try {
            const response = await axios.get('https://drivexpert.onrender.com/api/cars/sold', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            this.cars = response.data

            // console.log('CARS SOLD:', response.data)


        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Token is invalid or expired
                localStorage.removeItem('token');
                this.$router.push('/login');
            } else {
                this.error = 'Failed to fetch sold cars. Please try again later.';
                console.error('Error fetching sold cars:', error.response ? error.response.data : error.message);
            }
        }
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        dateTime(value) {
            return moment(value).format('YYYY-MM-DD');
        },
    }
};
</script>

<style scoped>
.flex-shrink-0 {
    flex-shrink: 0;
}

.overflow-x-scroll {
    overflow-x: scroll;
}

.space-x-4>*+* {
    margin-left: 1rem;
}
</style>
