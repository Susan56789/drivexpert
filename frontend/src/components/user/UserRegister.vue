<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Register</h2>
            <form @submit.prevent="register">
                <input v-model="name" type="text" placeholder="Name" class="input" required />
                <input v-model="email" type="email" placeholder="Email" class="input" required />
                <input v-model="password" type="password" placeholder="Password" class="input" required />
                <input v-model="phone" type="text" placeholder="Phone" class="input" required />
                <button type="submit" class="w-full btn">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserRegister',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            phone: ''
        };
    },
    methods: {
        async register() {
            try {
                const response = await axios.post('https://drivexpert.onrender.com/api/users/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    phone: this.phone
                });
                this.$router.push('/login');

                return response;
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>

<style scoped>
.input {
    width: 100%;
    padding: 8px;
    margin: 8px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #45a049;
}
</style>