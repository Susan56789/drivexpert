<template>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="(car, index) in displayedCars" :key="index" class="border p-4">
            <img :src="car.image_path" alt="Car Image" class="w-full mb-2">
            <p class="font-bold">{{ getMakeName(car.make_id) }} - {{ getModelName(car.model_id) }}</p>
            <p class="text-gray-700">Price: ${{ car.price }}</p>
        </div>
    </div>
    <div class="mt-4 flex justify-center">
        <button @click="prevPage" :disabled="currentPage === 1" class="mr-2 px-4 py-2 bg-gray-200"
            v-if="totalPages > 1">Previous</button>
        <button @click="nextPage" :disabled="currentPage * pageSize >= cars.length" class="px-4 py-2 bg-gray-200"
            v-if="totalPages > 1">Next</button>
    </div>
</template>

<script>
export default {
    name: 'CarList',
    props: {
        cars: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 12,
            makes: [], // Initialize makes array
            models: [] // Initialize models array
        };
    },
    mounted() {

        this.fetchCarMake();
        this.fetchCarModel();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.cars.length / this.pageSize);
        },
        displayedCars() {
            const startIndex = (this.currentPage - 1) * this.pageSize;
            const endIndex = this.currentPage * this.pageSize;
            return this.cars.slice(startIndex, endIndex);
        }
    },
    methods: {
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        getMakeName(makeId) {
            const make = this.makes.find(make => make.id === makeId);
            return make ? make.name : 'Unknown';
        },
        getModelName(modelId) {
            const model = this.models.find(model => model.id === modelId);
            return model ? model.name : 'Unknown';
        }
    },
    async fetchCarMake() {
        try {
            const response = await fetch('http://localhost:3000/api/makes');
            this.makes = await response.json();
        } catch (error) {
            console.error(error);
        }
    },
    async fetchCarModel() {
        try {
            const response = await fetch('http://localhost:3000/api/models');
            this.models = await response.json();
        } catch (error) {
            console.error(error);
        }
    }
};
</script>
