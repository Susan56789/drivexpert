<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row">
            <!-- Left Panel -->
            <div class="md:w-1/3 mb-8 md:mb-0">
                <div class="bg-red-500 text-white p-8 rounded-lg shadow-lg">
                    <h2 class="text-2xl font-bold mb-4">Sell Your Car with Ease</h2>
                    <p class="mb-4">
                        At DrivExpert, we make it easy for you to sell your car. Our dedicated team will guide you
                        through the entire process, ensuring a smooth and hassle-free experience.
                    </p>
                    <p class="mb-4">
                        Simply fill out the form on the right, and our experts will get in touch with you to discuss the
                        next steps. We pride ourselves on offering fair and competitive prices for your vehicle.
                    </p>
                    <p>
                        Don't hesitate to reach out to us if you have any questions or concerns. We're here to help you
                        every step of the way.
                    </p>
                </div>
            </div>

            <!-- Right Panel -->
            <div class="md:w-2/3">
                <h1 class="text-3xl font-bold mb-8 text-center">Sell Your Car</h1>
                <div class="bg-white rounded-lg shadow-md p-8">
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <!-- Name Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="name">Name</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="name" v-model="form.name" required />
                        </div>

                        <!-- Model Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="model">Model</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="model" v-model="form.model" required />
                        </div>

                        <!-- Year Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="year">Year</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="year" v-model.number="form.year" type="number" required />
                        </div>

                        <!-- Mileage Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="mileage">Mileage</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="mileage" v-model.number="form.mileage" type="number" required />
                        </div>

                        <!-- Price Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="price">Price</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="price" v-model.number="form.price" type="number" required />
                        </div>

                        <!-- Description Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="description">Description</label>
                            <textarea
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="description" v-model="form.description" rows="4" required></textarea>
                        </div>

                        <!-- Image Upload Field -->
                        <div>
                            <label class="block text-gray-700 font-semibold mb-2" for="images">Upload Images</label>
                            <div class="flex items-center justify-center w-full">
                                <label for="images-input"
                                    class="flex flex-col w-full h-32 border-4 border-dashed border-gray-400 hover:bg-gray-100 rounded-lg cursor-pointer transition-all duration-300">
                                    <div class="flex flex-col items-center justify-center pt-7">
                                        <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                                        <p class="text-sm text-gray-500">
                                            <span class="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                    </div>
                                    <input id="images-input" type="file" multiple class="hidden"
                                        @change="handleFileUpload" />
                                </label>
                            </div>
                        </div>

                        <!-- Image Preview -->
                        <div v-if="form.images.length" class="mt-4">
                            <h3 class="text-lg font-semibold mb-2">Image Preview:</h3>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div v-for="(image, index) in form.images" :key="index" class="relative">
                                    <img :src="image.preview" alt="Preview"
                                        class="w-full h-32 object-cover rounded-md" />
                                    <button @click="removeImage(index)"
                                        class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">×</button>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Button -->
                        <button
                            class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                            type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'SellCar',
    data() {
        return {
            form: {
                name: '',
                model: '',
                year: '',
                mileage: '',
                price: '',
                description: '',
                images: [],
            },
        };
    },
    methods: {
        handleFileUpload(event) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.form.images.push({ file, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            });
        },
        removeImage(index) {
            this.form.images.splice(index, 1);
        },
        async submitForm() {
            try {
                const formData = new FormData();
                formData.append('name', this.form.name);
                formData.append('model', this.form.model);
                formData.append('year', this.form.year);
                formData.append('mileage', this.form.mileage);
                formData.append('price', this.form.price);
                formData.append('description', this.form.description);

                this.form.images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image.file);
                });

                const response = await axios.post('https://drivexpert.onrender.com/api/cars', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 201) {
                    alert('Car posted successfully!');
                    this.resetForm();
                } else {
                    alert('Failed to post car.');
                }
            } catch (error) {
                console.error('Error posting car:', error);
                alert('An error occurred while posting the car.');
            }
        },
        resetForm() {
            this.form = {
                name: '',
                model: '',
                year: '',
                mileage: '',
                price: '',
                description: '',
                images: [],
            };
            document.getElementById('images-input').value = '';
        },
    },
};
</script>

<style scoped></style>
