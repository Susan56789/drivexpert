<template>
    <div class="container mx-auto px-4 py-8">
        <router-link :to="`/cars/${car._id}`">
            <div class="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white 
                 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img class="h-48 w-full object-cover object-center"
                    :src="getImageUrl(car.images[0].filename, car.images[0].extension)" :alt="car.carName" />
                <div class="p-4">
                    <h2 class="mb-2 text-lg font-medium text-gray-900">{{ car.carName }}</h2>
                    <p class="mb-2 text-base text-gray-700">{{ car.description }}</p>
                    <p class="mr-2 text-lg font-semibold text-gray-900 ">${{ car.price }}</p><br />
                    <p class="text-base font-medium text-gray-500">{{ car.year }}</p>
                </div>
            </div>
        </router-link>
    </div>
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
        getImageUrl(filename, extension) {
            return `https://drivexpert.onrender.com/uploads/${filename}.${extension}`;
        }
    }
};
</script>
