<template>
    <div class="bg-gray-100">
        <div class="relative bg-indigo-800 overflow-hidden">
            <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
                    <div class="sm:max-w-lg">
                        <h1 class="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
                            Join the DriveXpert Team
                        </h1>
                        <p class="mt-4 text-xl text-gray-300">
                            Be part of a dynamic and innovative company that is revolutionizing the automotive industry.
                        </p>
                    </div>
                    <div>
                        <div class="mt-10">
                            <!-- Decorative icon illustrations -->
                            <div aria-hidden="true"
                                class="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full">
                                <div
                                    class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-64">
                                    <div class="sm:rotate-90 lg:rotate-0">
                                        <svg class="blur-sm h-56 w-56 text-indigo-700"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 194 194">
                                            <!-- Icon code -->
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            <div class="absolute inset-0">
                <div class="bg-white h-1/3 sm:h-2/3"></div>
            </div>
            <div class="relative max-w-7xl mx-auto">
                <div class="text-center">
                    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Current Openings</h2>
                    <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Join our passionate team and be part of a company that values excellence, innovation, and
                        customer satisfaction.
                    </p>
                </div>
                <div class="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
                    <div v-for="position in openPositions" :key="position.id"
                        class="flex flex-col rounded-lg shadow-lg overflow-hidden">
                        <div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                            <div>
                                <h3
                                    class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-indigo-100 text-indigo-600">
                                    {{ position.title }}
                                </h3>
                            </div>
                            <div class="mt-4">
                                <p class="text-lg text-gray-500">
                                    {{ position.description }}
                                </p>
                            </div>
                        </div>
                        <div class="p-6 bg-gray-800 sm:p-10 sm:pt-6">
                            <ul role="list" class="space-y-6">
                                <li v-for="responsibility in position.responsibilities" :key="responsibility"
                                    class="flex items-start">
                                    <div class="flex-shrink-0">
                                        <svg class="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <p class="ml-3 text-base text-gray-300">{{ responsibility }}</p>
                                </li>
                            </ul>
                            <div class="mt-8">
                                <a href="#" class="text-base font-medium text-indigo-400 hover:text-indigo-300">
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="closedPositions.length" class="mt-12">
                    <h3 class="text-xl font-semibold text-gray-900">Closed Positions</h3>
                    <ul class="mt-4 space-y-4">
                        <li v-for="position in closedPositions" :key="position.id" class="text-gray-500">
                            {{ position.title }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import positions from './positions.json'

export default {
    name: 'CareersPage',
    data() {
        return {
            positions: positions,
        }
    },
    computed: {
        openPositions() {
            return this.positions.filter(position => position.status === 'open')
        },
        closedPositions() {
            return this.positions.filter(position => position.status === 'closed')
        },
    },
}
</script>