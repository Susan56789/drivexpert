<template>
    <div class="bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    Contact Us
                </h2>
                <div class="bg-white rounded-lg shadow-lg p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">
                                Visit Our Dealership
                            </h3>
                            <p class="text-gray-500 mb-4">
                                Come and experience our state-of-the-art facilities and meet our
                                friendly staff.
                            </p>
                            <div class="flex items-start mb-4">
                                <svg class="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p class="text-gray-700">
                                    Nairobi,Kenya
                                </p>
                            </div>
                            <div class="flex items-start mb-4">
                                <svg class="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <p class="text-gray-700">+254 739 456 722</p>
                            </div>
                            <div class="flex items-start">
                                <svg class="h-6 w-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <p class="text-gray-700">devnomoh@gmail.com</p>
                            </div>
                            <div class="mt-8">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8171114.0686216485!2d32.609026953851576!3d0.16492436665450363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c38cf8bdaa9e709%3A0xa50e7ed071cd774!2sQuirkWeb%20Studios%20%7C%20Website%20Design%7C%20Graphic%20Design%7C%20Social%20Media%20Marketing%7C%20Social%20Media%20Management!5e0!3m2!1sen!2sus!4v1710161107070!5m2!1sen!2sus"
                                    width="100%" height="300" frameborder="0" style="border: 0" allowfullscreen=""
                                    aria-hidden="false" tabindex="0"></iframe>
                            </div>
                        </div>
                        <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">
                                Send Us a Message
                            </h3>
                            <form>
                                <div class="mb-4">
                                    <label class="block text-gray-700 font-bold mb-2" for="name">
                                        Name
                                    </label>
                                    <input
                                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="name" type="text" placeholder="Enter your name" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 font-bold mb-2" for="email">
                                        Email
                                    </label>
                                    <input
                                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="email" type="email" placeholder="Enter your email" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-gray-700 font-bold mb-2" for="message">
                                        Message
                                    </label>
                                    <textarea
                                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="message" rows="3" placeholder="Enter your message"></textarea>
                                </div>
                                <div class="flex items-center justify-between">
                                    <button
                                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactUs',
}
</script>