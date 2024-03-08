<template>
    <article class="bg-white rounded-lg p-6 shadow-md">
        <h2 class="text-xl font-semibold">{{ post.title }}</h2>
        <img :src="post.image" alt="Blog Image" class="my-4 rounded-lg">
        <p class="text-gray-700">{{ post.body }}</p>
        <p class="text-gray-500 mt-2">Published on: {{ post.date }}</p>
    </article>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        }
    }
}
</script>