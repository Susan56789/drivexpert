<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="car">
            <h1 class="text-3xl font-bold mb-4">{{ car.carName }}</h1>
            <div v-if="car.images && car.images.length" class="flex space-x-4 mb-4">
                <carousel :items-to-show="1.5">
                    <slide v-for="image in car.images" :key="image.url">
                        <img crossorigin="anonymous" :src="getImageUrl(image.filename)" :alt="car.carName"
                            class="w-full h-300 object-cover rounded-md" />
                    </slide>
                    <template #addons>
                        <navigation />
                        <pagination />
                    </template>
                </carousel>
            </div>
            <p class="mt-4">{{ car.description }}</p>
            <div class="flex flex-col lg:flex-row gap-4 p-1">
                <div class="w-full lg:w-2/3 rounded-lg p-4 bg-white shadow-md">
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Ad Created
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
            dateTime(car.createdAt) }}</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Price</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
            formatCurrency(car.price) }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Year</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ car.year }}</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fuel Type
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ car.fuelType }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Engine
                                        Size</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
            formatNumber(car.engineSize) }}
                                        CC</td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Transmission</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ car.transmission }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mileage
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{
                                        formatNumber(car.mileage) }} KM
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Condition
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ car.condition }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Location
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ car.currentLocation
                                        }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="w-full lg:w-1/3 rounded-lg p-4 bg-yellow-300 shadow-md">
                    <section class="flex items-center border-l-8 border-yellow-500 bg-yellow-50 p-4 text-gray-900">
                        <div class="min-w-0">
                            <h2 class="text-lg font-semibold">Seller Details</h2>
                            <p>{{ car.seller.name }}</p>
                            <p>{{ car.seller.email }}</p>
                            <p>{{ car.seller.phone }}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import moment from 'moment';

export default {
    name: 'CarDetails',
    components: {
        Carousel,
        Slide,
        Pagination,
        Navigation,
    },
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
        },
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        dateTime(value) {
            return moment(value).format('YYYY-MM-DD');
        },
        formatNumber(number) {
            return Intl.NumberFormat().format(number);
        },
        getImageUrl(filename) {
            return `https://drivexpert.onrender.com/api/images/${filename}`;
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
