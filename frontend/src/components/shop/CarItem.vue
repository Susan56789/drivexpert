<template>
    <div class="car-item bg-white rounded-lg shadow-md p-4">
        <router-link :to="`/cars/${car._id}`">
            <img :src="'https://drivexpert.onrender.com/uploads/' + car.images[0].jpg" :alt="car.carName"
                class="w-full h-48 object-cover rounded-md" />
            <h2 class="text-xl font-semibold mt-2">{{ car.carName }}</h2>
        </router-link>
        <p><strong>Price:</strong> ${{ car.price }}</p>
        <p><strong>Year:</strong> {{ car.year }}</p>
        <p><strong>Fuel Type:</strong> {{ car.fuelType }}</p>
        <p><strong>Engine Size:</strong> {{ car.engineSize }}</p>
        <p><strong>Mileage:</strong> {{ car.mileage }}</p>
        <p><strong>Location:</strong> {{ car.currentLocation }}</p>
        <p class="mt-2">{{ car.description }}</p>
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
    }
};
</script>
<style scoped>
.car-item {
    transition: transform 0.3s;
}

.car-item:hover {
    transform: scale(1.05);
}
</style>