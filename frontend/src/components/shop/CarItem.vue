<template>
    <div class="border border-gray-300 p-4">
        <img :src="car.image_path" alt="Car Image" class="w-full h-48 object-cover mb-4">
        <div class="text-xl font-bold mb-2">{{ getMakeName(car.make_id) }} - {{ getModelName(car.model_id) }}</div>
        <div class="text-lg mb-2">{{ car.price }}</div>
    </div>
</template>

<script>
export default {
    props: {
        car: Object,
        makes: Array,
        models: Array
    },
    methods: {
        getMakeName(makeId) {
            const make = this.makes.find(make => make.id === makeId);
            return make ? make.name : 'Unknown';
        },
        getModelName(modelId) {
            const model = this.models.find(model => model.id === modelId);
            return model ? model.name : 'Unknown';
        }
    }
}
</script>
