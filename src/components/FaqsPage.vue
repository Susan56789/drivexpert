<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

        <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
            <div class="bg-gray-200 p-4 rounded-md cursor-pointer" @click="toggleAnswer(index)">
                <h3 class="text-lg font-semibold">{{ faq.question }}</h3>
                <div v-if="faq.showAnswer" class="mt-2">
                    <p class="text-gray-700">{{ faq.answer }}</p>
                </div>
                <i class="fas fa-chevron-down transition-transform duration-300"
                    :class="{ 'rotate-180': faq.showAnswer }"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FaqsPage',
    data() {
        return {
            faqs: [
                {
                    question: "What services do you offer?",
                    answer:
                        "At DrivExpert, we offer a wide range of automotive services, including general repair and maintenance, oil changes, tire rotations and replacements, brake service, engine diagnostics and repair, and more. We also offer car sales for both new and pre-owned vehicles.",
                    showAnswer: false,
                },
                {
                    question: "Do you offer loaner cars or shuttle service?",
                    answer:
                        "Yes, we offer complimentary loaner cars and shuttle service for customers who need transportation while their vehicles are being serviced. Please inquire about availability when scheduling your appointment.",
                    showAnswer: false,
                },
                {
                    question: "How do I schedule an appointment?",
                    answer:
                        "You can schedule an appointment by calling our service department or by using our online appointment scheduling system on our website.",
                    showAnswer: false,
                },
                {
                    question: "Do you offer any warranties or guarantees?",
                    answer:
                        "Absolutely. We stand behind our work and offer warranties on parts and labor. We also honor manufacturer warranties on new vehicles sold through our dealership.",
                    showAnswer: false,
                },
                {
                    question: "What forms of payment do you accept?",
                    answer:
                        "We accept cash, credit cards (Visa, Mastercard, American Express, and Discover), and cashier's checks. We also offer financing options for qualified customers.",
                    showAnswer: false,
                },
            ],
        };
    },
    methods: {
        toggleAnswer(index) {
            this.faqs[index].showAnswer = !this.faqs[index].showAnswer;
        },
    },
};
</script>