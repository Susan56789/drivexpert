<template>
    <div class="border border-gray-300 p-4">
        <img :src="car.image_path" alt="Car Image" class="w-full h-48 object-cover mb-4">
        <div class="text-xl font-bold mb-2">{{ car.make_name }} - {{ car.model_name }}</div>
        <div class="text-lg mb-2">{{ car.price }}</div>
    </div>
</template>

<script>
export default {
    props: {
        car: Object
    }
}
</script>
