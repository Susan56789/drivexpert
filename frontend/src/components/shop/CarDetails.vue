<template>
    <div class="container mx-auto px-4 py-8">
        <div v-if="car">
            <h1 class="text-3xl font-bold mb-4">{{ car.carName }}</h1>
            <div v-if="car.images && car.images.length" class="flex space-x-4 mb-4">
                <carousel :items-to-show="1.5">
                    <slide v-for="image in car.images" :key="image.url">
                        <img crossorigin="anonymous" :src=image.url :alt="car.carName"
                            class="w-full h-400 object-cover rounded-md" />
                    </slide>

                    <template #addons>
                        <navigation />
                        <pagination />
                    </template>
                </carousel>

            </div>
            <p class="mt-4">{{ car.description }}</p>
            <div class="mx-auto flex max-w-4xl  gap-4  p-1">
                <div class="col-span-2 rounded-lg p-32 ">
                    <!-- Main Content -->
                    <div class="flex flex-col">

                        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                            <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="overflow-hidden">
                                    <table class="min-w-full">
                                        <tbody>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Ad Created
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ dateTime(date, car.createdAt) }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Price
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ formatCurrency(car.price) }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Year
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ car.year }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Fuel Type
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ car.fuelType }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Engine Size
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ car.engineSize }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Mileage
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ car.mileage }}
                                                </td>
                                            </tr>
                                            <tr class="bg-gray-100 border-b">

                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    Location
                                                </td>
                                                <td
                                                    class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {{ car.currentLocation }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-12 rounded-lg  p-16 sm:col-span-4">
                    <!-- Sidebar -->
                    <section class="flex place-items-center bg-red-300 p-16">
                        <div
                            class="flex max-w-xs items-center border-l-8 border-red-500 bg-red-50 p-4 text-white-900 shadow-lg">
                            <div class="min-w-0">
                                <h2 class="overflow-hidden text-ellipsis whitespace-nowrap">Seller Details</h2>
                                <p>{{ car.seller.name }}</p>
                                <p>{{ car.seller.email }}</p>
                                <p>{{ car.seller.phone }}</p>
                            </div>
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
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
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
        getImageUrl(filename) {
            return `https://drivexpert.onrender.com/uploads/${filename}`;
        },
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
