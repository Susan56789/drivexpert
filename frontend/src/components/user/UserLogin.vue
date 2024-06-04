<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Login</h2>
            <form @submit.prevent="login">
                <input v-model="email" type="email" placeholder="Email" class="input" required />
                <input v-model="password" type="password" placeholder="Password" class="input" required />
                <button type="submit" class="w-full btn">Login</button>
            </form>
            <div class="text-center mt-4">
                <router-link to="/register" class="link">Register</router-link>
                <router-link to="/reset-password" class="link ml-4">Forgot Password?</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserLogin',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        async login() {
            try {
                const response = await axios.post('https://drivexpert.onrender.com/api/users/login', {
                    email: this.email,
                    password: this.password
                });
                localStorage.setItem('token', response.data.token);
                this.$router.push('/dashboard');
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

.link {
    color: #4CAF50;
    text-decoration: none;
}

.link:hover {
    text-decoration: underline;
}
</style>
