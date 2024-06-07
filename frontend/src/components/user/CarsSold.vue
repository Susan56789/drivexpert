<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Cars Sold</h1>
        <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
        <div v-if="cars && cars.length">
            <div v-for="car in displayedCars" :key="car._id" class="mb-6">
                <div class="flex rounded-xl shadow-lg bg-white border border-white">
                    <div v-if="car.images && car.images.length" class="w-1/3">
                        <img crossorigin="anonymous" :src="getImageUrl(car.images[0].filename)" :alt="car.carName"
                            class="h-48 w-full object-cover rounded-l-xl" />
                    </div>
                    <div class="w-2/3 p-3 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-center">
                                <p class="text-gray-500 font-medium">{{ car.carName }}</p>
                                <div class="flex items-center space-x-2">
                                    <div class="bg-yellow-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                        {{ car.condition }}
                                    </div>
                                    <div class="bg-green-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800">
                                        {{ car.year }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p class="text-xl font-black text-gray-800">{{ formatCurrency(car.price) }}</p>
                            <p class="text-sm font-grey text-gray-800">{{ dateTime(car.createdAt) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>You haven't sold any cars yet.</p>
        </div>
        <Pagination :total="totalPages" @page-change="changePage" />
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Pagination from '../shop/Pagination.vue';

export default {
    name: 'CarsSold',
    components: {

        Pagination
    },
    data() {
        return {
            cars: [],
            error: null,
            currentPage: 1,
            itemsPerPage: 4
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

            this.cars = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));


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
    computed: {
        displayedCars() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.cars.slice(startIndex, startIndex + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.cars.length / this.itemsPerPage);
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
        getImageUrl(filename) {
            return `https://drivexpert.onrender.com/api/images/${filename}`;
        },
        filterCars() {
            this.currentPage = 1; // Reset to first page after filtering
        },
        changePage(pageNumber) {
            this.currentPage = pageNumber;
        }
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
