<template>
    <div>
        <div class="car-movement">
            <img src="https://images.unsplash.com/photo-1618846446712-a4eda2adc05f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxhbWJvcmdoaW5pfGVufDB8fDB8fHww"
                alt="Car" class="car" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped>
.car-movement {
    overflow: hidden;
    font-size: 40px;
    height: 50px;
}

.car-movement>.car {
    position: relative;
    display: inline-block;
    animation: linear infinite;
    animation-name: run;
    animation-duration: 5s;
}


@keyframes run {
    0% {
        transform: rotateY(180deg);
        left: -100px;
    }

    50% {
        transform: rotateY(180deg);
        left: 100%;
    }

    51% {
        transform: rotateY(0deg);
        left: calc(100% + 100px);
    }

    100% {
        transform: rotateY(0deg);
        left: -100px;
    }
}
</style>