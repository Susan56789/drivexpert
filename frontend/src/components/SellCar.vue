<template>
    <div class="container mx-auto px-4 py-8">
        <div class="flex flex-col md:flex-row">
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
            <div class="md:w-2/3">
                <h1 class="text-3xl font-bold mb-8 text-center">Sell Your Car</h1>

                <div class="bg-white rounded-lg shadow-md p-8">
                    <form @submit.prevent="submitForm" class="space-y-4">
                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="make">
                                Make
                            </label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="make" v-model="form.make" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="model">
                                Model
                            </label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="model" v-model="form.model" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="year">
                                Year
                            </label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="year" v-model="form.year" type="number" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="mileage">
                                Mileage
                            </label>
                            <input
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="mileage" v-model="form.mileage" type="number" required />
                        </div>

                        <div class="mb-4">
                            <label class="block text-gray-700 font-semibold mb-2" for="description">
                                Description
                            </label>
                            <textarea
                                class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                                id="description" v-model="form.description" rows="4" required></textarea>
                        </div>

                        <div>
                            <label class="block text-gray-700 font-semibold mb-2" for="images">
                                Upload Images
                            </label>
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

                        <button
                            class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-all duration-300"
                            type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SellCar',
    data() {
        return {
            form: {
                make: '',
                model: '',
                year: '',
                mileage: '',
                description: '',
                images: [],
            },
        };
    },
    methods: {
        handleFileUpload(event) {
            this.form.images = event.target.files;
        },
        submitForm() {
            // Code to handle form submission goes here
            console.log(this.form);
        },
    },
};
</script>