<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Reset Password</h2>
            <form @submit.prevent="resetPassword">
                <input v-model="email" type="email" placeholder="Email" class="input" required />
                <button type="submit" class="w-full btn">Send Reset Link</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ResetPassword',
    data() {
        return {
            email: ''
        };
    },
    methods: {
        async resetPassword() {
            try {
                const payload = { email: this.email };
                console.log('Request payload:', payload);

                const response = await axios.post('https://drivexpert.onrender.com/api/users/reset-password', payload);
                console.log('Response:', response);

                alert('A reset link has been sent to your email.');
            } catch (error) {
                console.error('Reset Password error:', error.response ? error.response.data : error.message);
                alert('Failed to send reset link. Please try again.');
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
    background-color: #eb1212;
    color: white;
    padding: 10px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn:hover {
    background-color: #eb1212;
}
</style>
