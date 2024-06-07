<template>
    <router-link :to="`/cars/${car._id}`">
        <div
            class="mx-auto mt-11 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg w-full max-w-xs sm:max-w-sm">
            <img crossorigin="anonymous" v-if="car.images && car.images.length"
                class="h-48 w-full object-cover object-center" :src="getImageUrl(car.images[0].filename)"
                :alt="car.carName" />
            <div class="p-4">
                <h2 class="mb-2 text-lg font-medium text-gray-900">{{ car.carName }}</h2>
                <p class="mr-2 text-lg font-semibold text-gray-900">{{ formatCurrency(car.price) }}</p>
                <div class="flex flex-wrap space-x-2 text-sm font-medium justify-start mt-2">
                    <span class="transition ease-in duration-300 inline-flex items-center
                         text-sm font-medium mb-2 md:mb-0 bg-green-500 px-3 py-1 hover:shadow-lg 
                         tracking-wider text-white rounded-full hover:bg-green-600">
                        <p class="text-base font-medium text-white">{{ car.year }}</p>
                    </span>
                    <span class="transition ease-in duration-300 inline-flex 
                        items-center text-sm font-medium mb-2 md:mb-0 bg-blue-500 px-3 py-1 
                        hover:shadow-lg tracking-wider text-white rounded-full hover:bg-ble-600">
                        <p class="text-base font-medium text-white">{{ car.transmission }}</p>
                    </span>
                    <span class="transition ease-in duration-300 inline-flex items-center
                         text-sm font-medium mb-2 md:mb-0 bg-yellow-500 px-3 py-1 hover:shadow-lg
                          tracking-wider text-white rounded-full hover:bg-yellow-600">
                        <p class="text-base font-medium text-white">{{ car.condition }}</p>
                    </span>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    name: 'CarItem',
    props: {
        car: {
            type: Object,
            required: true
        }
    },
    methods: {
        formatCurrency(value) {
            const numericValue = parseFloat(value);
            return isNaN(numericValue) ? '-' : numericValue.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
        },
        getImageUrl(filename) {
            return `https://drivexpert.onrender.com/api/images/${filename}`;
        }
    }
};
</script>

<style scoped>
@media (max-width: 640px) {
    .card-container {
        width: 100%;
    }
}
</style>
