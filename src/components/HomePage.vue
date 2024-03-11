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
                            <!-- <p>
                                Your trusted destination for expert guidance, exceptional service, and a seamless
                                car-buying experience. Discover your perfect vehicle with us today.
                            </p> -->
                        </div>
                        <button class="discover-btn">
                            <a href="#">discover </a> <span>
                                <i class="fa-solid fa-circle-arrow-right"></i>
                            </span>
                        </button>
                        <!-- <div class="information">
                            <div class="production">
                                <h2>Inception</h2>
                                <p>Established in 2010 by automotive enthusiasts with a vision.</p>
                            </div>
                            <div class="production">
                                <h2>Evolution</h2>
                                <p>From a local dealership to a global authority, DriveXpert redefines car buying.</p>
                            </div>
                        </div> -->
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
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            currentIndex: 0,
            items: [
                { image: '/assets/images/car9.png' },
                { image: '/assets/images/car2.png' },
                { image: '/assets/images/car3.png' },
                { image: '/assets/images/car4.png' },
                { image: '/assets/images/car5.png' },
            ]
        };
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