<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">User Profile</h1>
        <div class="bg-white rounded-lg shadow-md p-6">
            <p><strong>Name:</strong> {{ user.name }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Phone:</strong> {{ user.phone }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserProfile',
    data() {
        return {
            user: {
                name: '',
                email: '',
                phone: ''
            }
        };
    },
    created() {
        // Fetch user data from the server or localStorage
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            this.user = {
                name: payload.name,
                email: payload.email,
                phone: payload.phone || 'N/A'
            };
        } else {
            this.$router.push('/login');
        }
    }
};
</script>
