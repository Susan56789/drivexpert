<template>
    <div class="container px-6 py-12 mx-auto">
        <section>
            <div class="hero">
                <div class="row !grid md:!grid-cols-2 sm:!grid-cols-1">
                    <div class="left-sec !col-span-1">
                        <div class="content">
                            <h2>
                                <span>DrivExpert <br>Automotive</span>
                            </h2>

                        </div>
                        <button class="discover-btn">
                            <a href="#">discover </a> <span>
                                <i class="fa-solid fa-circle-arrow-right"></i>
                            </span>
                        </button>

                    </div>
                    <div class='right-sec  !col-span-1'>
                        <div class="my-car">
                            <div v-for="(item, index) in items" :key="index"
                                :class="{ active: currentIndex === index }">
                                <img :src="item.image" alt="Drivexpert-Display-Cars" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <!-- Featured Services Section -->
        <section class="featured-services py-12">
            <h2 class="text-3xl font-bold text-center mb-8">Featured Services</h2>
            <div class="service-cards !grid md:!grid-cols-2 sm:!grid-cols-1 gap-8">
                <div class="service-card bg-gray-100 rounded-lg overflow-hidden">
                    <div class="card-image h-48 bg-cover bg-center"
                        style="background-image: url('/assets/images/motor-oil.png')"></div>
                    <div class="card-content p-6">
                        <h3 class="text-2xl font-bold mb-2">Oil Change and Maintenance</h3>
                        <p class="text-gray-600 mb-4">Keep your vehicle running smoothly with our comprehensive
                            maintenance services.</p>
                        <a href="#" class="text-red-500 hover:text-red-700">Learn More</a>
                    </div>
                </div>
                <div class="service-card bg-gray-100 rounded-lg overflow-hidden">
                    <div class="card-image h-48 bg-cover bg-center"
                        style="background-image: url('/assets/images/tire.png')"></div>
                    <div class="card-content p-6">
                        <h3 class="text-2xl font-bold mb-2">Tire Rotation and Replacement</h3>
                        <p class="text-gray-600 mb-4">Ensure optimal tire performance and safety with our expert tire
                            services.</p>
                        <a href="#" class="text-red-500 hover:text-red-700">Learn More</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Car Insurance Section -->
        <section class="car-insurance bg-red-500 text-white py-12">
            <div class="container mx-auto px-6">
                <h2 class="text-3xl font-bold mb-4">Car Insurance Made Easy</h2>
                <p class="mb-8">At DrivExpert, we understand the importance of having the right car insurance. That's
                    why we've partnered with top insurance providers to offer you the best coverage options for your
                    vehicle.</p>
                <button
                    class="get-quote bg-white text-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded">Get
                    a Quote</button>
            </div>
        </section>

        <!-- Reviews Section -->
        <section class="reviews bg-gray-100 py-12">
            <h2 class="text-3xl font-bold text-center mb-8">New Arrivals</h2>
            <div v-if="loading" class="text-center">Loading cars...</div>
            <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <car-item v-for="car in cars" :key="car._id" :car="car"></car-item>
            </div>
            <div class="text-center mt-8">
                <a href="/cars"
                    class="view-all-reviews bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">View
                    All Cars</a>
            </div>
        </section>

        <!-- Call to Action Section -->
        <section class="cta bg-red-500 text-white py-12">
            <div class="container mx-auto px-6 text-center">
                <h2 class="text-3xl font-bold mb-4">Experience the DrivExpert Difference</h2>
                <p class="mb-8">Bring your vehicle to us and discover the ultimate in automotive care and expertise.</p>
                <button
                    class="bg-white text-red-500 hover:bg-red-700 hover:text-white font-bold py-2 px-4 rounded">Schedule
                    Service</button>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios';
import CarItem from '../components/shop/CarItem.vue';

export default {
    name: 'HomePage',
    components: {
        CarItem
    },
    data() {
        return {
            currentIndex: 0,
            cars: [],
            loading: true,
            error: '',
            items: [
                { image: '/assets/images/car9.png' },
                { image: '/assets/images/car2.png' },
                { image: '/assets/images/car3.png' },
                { image: '/assets/images/car4.png' },
                { image: '/assets/images/car5.png' },
            ]
        };
    },
    async created() {
        try {
            const response = await axios.get('https://drivexpert.onrender.com/api/cars');
            const carData = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            this.cars = carData.slice(0, 4)
        } catch (error) {
            this.error = 'Failed to fetch cars. Please try again later.';
        } finally {
            this.loading = false;
        }
    },
    methods: {
        moveNext() {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
        },
        startCarousel() {
            this.carouselInterval = setInterval(() => {
                this.moveNext();
            }, 3000);
        },
        stopCarousel() {
            clearInterval(this.carouselInterval);
        }
    },
    mounted() {
        this.startCarousel();
    },
    unmounted() {
        this.stopCarousel();
    }
}
</script>

<style scoped>
.hero {
    width: 100%;
}

.row {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 50px;
    margin: auto;
}

.left-sec {
    width: 30%;
    margin-top: 100px;
    margin-left: 50px;
}

.left-sec h2 {
    font-size: 85px;
    color: #000;
    text-transform: capitalize;
}

.left-sec h2 span {
    color: #d43242;
}

.left-sec p {
    margin: 20px 0;
    color: #000;
    line-height: 29px;
    /* padding-right: 50px; */

}

.discover-btn {
    display: flex;
    align-items: center;
    outline: none;
    border-radius: 50px;
    cursor: pointer;
    margin-top: 50px;
    padding: 0 25px;
    border: 3px solid #ffa938;
    background-color: #d43242;
    box-shadow: 5px 7px 20px #000;
}

.discover-btn a {
    color: #fff;
    font-size: 25px;
    letter-spacing: 2px;
    margin-right: 15px;
    text-transform: capitalize;
}

.discover-btn span {
    color: #fff;
    font-size: 45px;
}

.information {
    width: 100%;
    display: flex;
    margin-top: 100px;
}

.production {
    margin-right: 50px;
    line-height: 3px;
}

.production h2 {
    font-size: 20px;
    letter-spacing: 1px;
}

.production p {
    padding-right: 0;
    letter-spacing: 1px;
}


.my-car {
    display: flex;
    overflow: hidden;
    position: relative;
}

.my-car div {
    transition: transform 0.5s ease;
}

.my-car div.active {
    transform: translateX(0);
}

.my-car div:not(.active) {
    transform: translateX(100%);
    position: absolute;
    top: 0;
    right: 0;
}

.my-car img {
    width: 100%;
}
</style>