<template>
    <v-container>
        <v-layout row justify-center>
            <v-flex xs1 class="text-xs-center" v-for="(letter, i) in answerLength" :key="i">
                <v-text-field
                    :label=letter.toString()
                    :id=letter
                    @keyup.native="nextInput"
                    v-model="userAnswer[i]"
                    @keyup.enter="nextPhoto"
                ></v-text-field>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { eventBus } from '@/main.js';

export default {
    props: ['answer'],
    data () {
        return {
            userAnswer: []
        }
    },
    methods: {
        
    },
    computed: {
        answerLength: function () {
            return this.answer.length;
        },
    },
    watch: {
        userAnswer: function () {
            // console.log(this.userAnswer.join(''))
            if (this.userAnswer.join('').toLowerCase() === this.answer.toLowerCase()) {
                console.log('correct')
                eventBus.$emit('correctAnswer', true);
            }
        }
    }
}
</script>

<style>

</style>
