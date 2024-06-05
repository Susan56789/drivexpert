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
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <p class="text-gray-600 font-bold text-sm ml-1">Available</p>
                            </div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-500"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div
                                class="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                                {{ car.year }}</div>
                        </div>
                        <p class="text-xl font-black text-gray-800">${{ car.price }}</p>
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
    }
};
</script>

<style scoped>
/* Add any additional styles if needed */
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
