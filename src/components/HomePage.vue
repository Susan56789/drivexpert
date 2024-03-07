<template>
    <div>
        <section>

            <div class="hero">
                <div class="row">
                    <div class="left-sec">
                        <div class="content">
                            <h2>
                                <span>DrivExpert <br>Automotive</span>
                            </h2>
                            <p>
                                Satisfaction Driven, Expertly Delivered.
                            </p>
                        </div>
                        <button class="discover-btn">
                            <a href="#">discover </a> <span>
                                <i class="fa-solid fa-circle-arrow-right"></i>
                            </span>
                        </button>
                        <div class="information">
                            <div class="production">
                                <p>Production</p>
                                <h2>199</h2>
                            </div>
                            <div class="production">
                                <p>Designer</p>
                                <h2>Sue</h2>
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
    name: 'HomePage'
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
    padding-right: 50px;

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
</style>