<template>
    <router-link :to="`/cars/${car._id}`">
        <div
            class="mx-auto mt-11 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
            <img crossorigin="anonymous" v-if="car.images && car.images.length"
                class="h-48 w-full object-cover object-center" :src="car.images[0].url" :alt="car.carName" />
            <div class="p-4">
                <h2 class="mb-2 text-lg font-medium text-gray-900">{{ car.carName }}</h2>
                <p class="mr-2 text-lg font-semibold text-gray-900">{{ formatCurrency(car.price) }}</p><br />
                <p class="text-base font-medium text-gray-500">{{ car.year }}</p>
                <p class="text-base font-medium text-gray-500">{{ car.transmission }}</p>
                <p class="text-base font-medium text-gray-500">{{ car.condition }}</p>
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
    }
};
</script>

<style scoped></style>
