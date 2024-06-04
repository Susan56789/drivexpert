<template>
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-3xl mx-auto">
            <h1 class="text-3xl font-bold mb-8 text-center">Sell Your Car with Ease</h1>
            <div class="bg-white rounded-lg shadow-md p-8">
                <p class="mb-6 text-center">
                    At DrivExpert, we make it easy for you to sell your car. Our dedicated team will guide you through
                    the entire process, ensuring a smooth and hassle-free experience. Simply fill out the form below,
                    and our experts will get in touch with you to discuss the next steps. We pride ourselves on offering
                    fair and competitive prices for your vehicle.
                </p>
                <form @submit.prevent="submitForm" class="space-y-6">
                    <h2 class="text-xl font-semibold mb-4">Car Information</h2>
                    <!-- Car Information Fields -->
                    <div v-for="(field, index) in carFields" :key="index" class="mb-4">
                        <label :for="field.id" class="block text-gray-700 font-semibold mb-2">{{ field.label }}</label>
                        <input v-if="field.type !== 'textarea'" :type="field.type" :id="field.id"
                            v-model="form[field.model]" :class="field.class" :required="field.required" />
                        <textarea v-else :id="field.id" v-model="form[field.model]" :class="field.class"
                            :rows="field.rows" :required="field.required"></textarea>
                    </div>

                    <!-- Image Upload Field -->
                    <div>
                        <label for="images-input" class="block text-gray-700 font-semibold mb-2">Upload Images</label>
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
                                    accept="image/png, image/jpeg, image/webp" @change="handleFileUpload" />
                            </label>
                        </div>
                    </div>

                    <!-- Image Preview -->
                    <div v-if="form.images.length" class="mt-4">
                        <h3 class="text-lg font-semibold mb-2">Image Preview:</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div v-for="(image, index) in form.images" :key="index" class="relative">
                                <img :src="image.preview" alt="Preview" class="w-full h-32 object-cover rounded-md" />
                                <button @click="removeImage(index)"
                                    class="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full">×</button>
                            </div>
                        </div>
                    </div>

                    <!-- Hidden Seller Information Fields -->
                    <input type="hidden" v-model="form.sellerName" />
                    <input type="hidden" v-model="form.sellerEmail" />
                    <input type="hidden" v-model="form.sellerPhone" />

                    <!-- Submit Button -->
                    <button
                        class="w-full bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                        type="submit">Submit</button>
                </form>
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
                carName: '',
                fuelType: '',
                engineSize: '',
                mileage: '',
                price: '',
                year: '',
                currentLocation: '',
                description: '',
                images: [],
                sellerName: '',
                sellerEmail: '',
                sellerPhone: ''
            },
            carFields: [
                { id: 'name', label: 'Name', model: 'carName', type: 'text', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'fuelType', label: 'Fuel Type', model: 'fuelType', type: 'text', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'engineSize', label: 'Engine Size', model: 'engineSize', type: 'text', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'mileage', label: 'Mileage', model: 'mileage', type: 'number', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'price', label: 'Price', model: 'price', type: 'number', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'year', label: 'Year', model: 'year', type: 'number', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'currentLocation', label: 'Current Location', model: 'currentLocation', type: 'text', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', required: true },
                { id: 'description', label: 'Description', model: 'description', type: 'textarea', class: 'w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500', rows: 4, required: true },
            ],
        };
    },
    methods: {
        async fetchUserProfile() {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication token is missing.');

                const response = await axios.get('https://drivexpert.onrender.com/api/users/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const { name, email, phone } = response.data;
                this.form.sellerName = name;
                this.form.sellerEmail = email;
                this.form.sellerPhone = phone;
            } catch (error) {
                console.error('Error fetching user profile:', error);
                alert('An error occurred while fetching the user profile.');
            }
        },
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
                Object.keys(this.form).forEach(key => {
                    if (key !== 'images') {
                        formData.append(key, this.form[key]);
                    }
                });

                this.form.images.forEach((image, index) => {
                    formData.append(`images[${index}]`, image.file);
                });

                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication token is missing.');

                const response = await axios.post('https://drivexpert.onrender.com/api/cars', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
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
                carName: '',
                fuelType: '',
                engineSize: '',
                mileage: '',
                price: '',
                year: '',
                currentLocation: '',
                description: '',
                images: [],
                sellerName: '',
                sellerEmail: '',
                sellerPhone: ''
            };
            document.getElementById('images-input').value = '';
        },
    },
    created() {
        this.fetchUserProfile();
    }
};
</script>

<style scoped></style>
