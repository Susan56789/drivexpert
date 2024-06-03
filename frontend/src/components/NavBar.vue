<template>
    <div class="bg-gray-900 text-white">
        <div class="container mx-auto px-4 py-6 flex justify-between items-center">
            <div class="logo">
                <a href="/" class="text-xl font-bold uppercase">DrivExpert</a>
            </div>
            <div class="hidden md:block">
                <ul class="flex space-x-6">
                    <li>
                        <a href="/" class="text-gray-300 
                        hover:text-white py-2 px-4 rounded-md transition duration-300"
                            :class="{ 'bg-gray-700': isActive === 'Home' }" @click="isActive = 'Cars'">Home</a>
                    </li>
                    <li>
                        <a href="/cars" class="text-gray-300 
                        hover:text-white py-2 px-4 rounded-md transition duration-300"
                            :class="{ 'bg-gray-700': isActive === 'Cars' }" @click="isActive = 'Cars'">Cars</a>
                    </li>
                    <li>
                        <a href="/about" class="text-gray-300 hover:text-white 
                        py-2 px-4 rounded-md transition duration-300"
                            :class="{ 'bg-gray-700': isActive === 'About Us' }" @click="isActive = 'About Us'">About
                            Us</a>
                    </li>
                    <li>
                        <a href="/contact" class="text-gray-300 hover:text-white 
                        py-2 px-4 rounded-md transition duration-300"
                            :class="{ 'bg-gray-700': isActive === 'Contact Us' }"
                            @click="isActive = 'Contact Us'">Contact Us</a>
                    </li>
                    <li>
                        <a href="#" class="text-gray-300 hover:text-white py-2
                         px-4 rounded-md transition duration-300" :class="{ 'bg-gray-700': isActive === 'Reviews' }"
                            @click="isActive = 'Reviews'">Reviews</a>
                    </li>
                </ul>
            </div>
            <div class="md:hidden">
                <button @click="isOpen = !isOpen" class="text-gray-300 hover:text-white focus:outline-none">
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path v-if="isOpen" fill-rule="evenodd" clip-rule="evenodd"
                            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                        <path v-if="!isOpen" fill-rule="evenodd"
                            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                    </svg>
                </button>
            </div>
        </div>
        <div v-show="isOpen" class="md:hidden">
            <ul class="bg-gray-800 py-4 px-6 space-y-2">
                <li>
                    <a href="/cars"
                        class="block text-gray-300 hover:text-white py-2 px-4 rounded-md transition duration-300"
                        :class="{ 'bg-gray-700': isActive === 'Cars' }" @click="isActive = 'Cars'">Cars</a>
                </li>
                <li>
                    <a href="#"
                        class="block text-gray-300 hover:text-white py-2 px-4 rounded-md transition duration-300"
                        :class="{ 'bg-gray-700': isActive === 'About Us' }" @click="isActive = 'About Us'">About Us</a>
                </li>
                <li>
                    <a href="#"
                        class="block text-gray-300 hover:text-white py-2 px-4 rounded-md transition duration-300"
                        :class="{ 'bg-gray-700': isActive === 'Contact Us' }" @click="isActive = 'Contact Us'">Contact
                        Us</a>
                </li>
                <li>
                    <a href="#"
                        class="block text-gray-300 hover:text-white py-2 px-4 rounded-md transition duration-300"
                        :class="{ 'bg-gray-700': isActive === 'Reviews' }" @click="isActive = 'Reviews'">Reviews</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "NavBar",
    data() {
        return {
            isOpen: false,
            isActive: "",
        };
    },
};
</script>