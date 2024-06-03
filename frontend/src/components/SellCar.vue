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
                    <!-- Car Form -->
                    <form @submit.prevent="submitCarForm" class="space-y-4">
                        <h2 class="text-xl font-semibold mb-4">Car Information</h2>

                        <!-- Name Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="name">Name</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="name" v-model="carForm.name" required />
                        </div>

                        <!-- Fuel Type Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="fuelType">Fuel Type</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="fuelType" v-model="carForm.fuelType" required />
                        </div>

                        <!-- Engine Size Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="engineSize">Engine Size</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="engineSize" v-model="carForm.engineSize" required />
                        </div>

                        <!-- Mileage Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="mileage">Mileage</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="mileage" v-model.number="carForm.mileage" type="number" required />
                        </div>

                        <!-- Price Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="price">Price</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="price" v-model.number="carForm.price" type="number" required />
                        </div>

                        <!-- Year Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="year">Year</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="year" v-model.number="carForm.year" type="number" required />
                        </div>

                        <!-- Current Location Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="currentLocation">Current
                                Location</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="currentLocation" v-model="carForm.currentLocation" required />
                        </div>

                        <!-- Description Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="description">Description</label>
                            <textarea
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="description" v-model="carForm.description" rows="4" required></textarea>
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
                        <div v-if="carForm.images.length" class="mt-4">
                            <h3 class="text-lg font-semibold mb-2">Image Preview:</h3>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div v-for="(image, index) in carForm.images" :key="index" class="relative">
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
                            type="submit">Submit Car Info</button>
                    </form>

                    <!-- Seller Form -->
                    <form @submit.prevent="submitSellerForm" class="space-y-4 mt-8">
                        <h2 class="text-xl font-semibold mb-4">Seller Information</h2>

                        <!-- Seller Name Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="sellerName">Seller Name</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="sellerName" v-model="sellerForm.name" required />
                        </div>

                        <!-- Seller Email Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="sellerEmail">Seller Email</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="sellerEmail" v-model="sellerForm.email" type="email" required />
                        </div>

                        <!-- Seller Phone Field -->
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="sellerPhone">Seller Phone</label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="sellerPhone" v-model="sellerForm.phone" type="tel" required />
                        </div>

                        <!-- Submit Button -->
                        <button
                            class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                            type="submit">Submit Seller Info</button>
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
            carForm: {
                name: '',
                fuelType: '',
                engineSize: '',
                mileage: '',
                price: '',
                year: '',
                currentLocation: '',
                description: '',
                images: [],
            },
            sellerForm: {
                name: '',
                email: '',
                phone: ''
            },
        };
    },
    methods: {
        handleFileUpload(event) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.carForm.images.push({ file, preview: e.target.result });
                };
                reader.readAsDataURL(file);
            });
        },
        removeImage(index) {
            this.carForm.images.splice(index, 1);
        },
        async submitCarForm() {
            try {
                const formData = new FormData();
                formData.append('name', this.carForm.name);
                formData.append('fuelType', this.carForm.fuelType);
                formData.append('engineSize', this.carForm.engineSize);
                formData.append('mileage', this.carForm.mileage);
                formData.append('price', this.carForm.price);
                formData.append('year', this.carForm.year);
                formData.append('currentLocation', this.carForm.currentLocation);
                formData.append('description', this.carForm.description);

                this.carForm.images.forEach((image, index) => {
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
                    this.resetCarForm();
                } else {
                    alert('Failed to post car.');
                }
            } catch (error) {
                console.error('Error posting car:', error);
                alert('An error occurred while posting the car.');
            }
        },
        async submitSellerForm() {
            try {
                const response = await axios.post('https://drivexpert.onrender.com/api/users', this.sellerForm, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 201) {
                    alert('Seller information submitted successfully!');
                    this.resetSellerForm();
                } else {
                    alert('Failed to submit seller information.');
                }
            } catch (error) {
                console.error('Error submitting seller information:', error);
                alert('An error occurred while submitting the seller information.');
            }
        },
        resetCarForm() {
            this.carForm = {
                name: '',
                fuelType: '',
                engineSize: '',
                mileage: '',
                price: '',
                year: '',
                currentLocation: '',
                description: '',
                images: [],
            };
            document.getElementById('images-input').value = '';
        },
        resetSellerForm() {
            this.sellerForm = {
                name: '',
                email: '',
                phone: ''
            };
        },
    },
};
</script>

<style scoped></style>
