<template>
    <div class="my-4">
        <input v-model="make" type="text" placeholder="Make" class="border p-2 mr-2" @input="applyFilters">
        <input v-model="model" type="text" placeholder="Model" class="border p-2 mr-2" @input="applyFilters">
        <input v-model.number="minPrice" type="number" placeholder="Min Price" class="border p-2 mr-2"
            @input="applyFilters">
        <input v-model.number="maxPrice" type="number" placeholder="Max Price" class="border p-2 mr-2"
            @input="applyFilters">
    </div>
</template>

<script>
export default {
    name: 'FilterSection',
    data() {
        return {
            make: '',
            model: '',
            minPrice: 0,
            maxPrice: Infinity
        };
    },
    methods: {
        applyFilters() {
            this.$emit('filter', {
                make: this.make,
                model: this.model,
                minPrice: this.minPrice,
                maxPrice: this.maxPrice
            });
        }
    }
};
</script>