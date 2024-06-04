<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-md">
            <h2 class="text-center text-3xl font-extrabold text-gray-900">Profile</h2>
            <div>
                <p><strong>Name:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
                <p><strong>Phone:</strong> {{ user.phone }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'UserProfile',
    data() {
        return {
            user: {}
        };
    },
    async created() {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://drivexpert.onrender.com/api/users/profile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            this.user = response.data;
        } catch (error) {
            console.error(error);
        }
    }
};
</script>

<style scoped></style>