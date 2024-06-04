<template>
    <div class="flex min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-md">
            <div class="p-6">
                <h2 class="text-2xl font-bold text-center">Dashboard</h2>
                <nav class="mt-8">
                    <ul class="space-y-2">
                        <li>
                            <router-link to="/dashboard" class="block py-2 px-4 rounded hover:bg-gray-200"
                                exact>Profile</router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/sell-car" class="block py-2 px-4 rounded hover:bg-gray-200">Sell
                                Car</router-link>
                        </li>
                        <li>
                            <router-link to="/dashboard/cars-sold"
                                class="block py-2 px-4 rounded hover:bg-gray-200">Cars Sold</router-link>
                        </li>
                        <li>
                            <button @click="logout"
                                class="block w-full text-left py-2 px-4 rounded hover:bg-gray-200">Logout</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
        <!-- Main Content -->
        <div class="flex-1 p-6">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserDashboard',
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push('/login');
        }
    }
};
</script>

<style scoped>
aside {
    width: 250px;
}
</style>
