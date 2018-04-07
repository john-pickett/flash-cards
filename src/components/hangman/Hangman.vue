<template>
    <v-container grid-list-md>
        <h2>Hangman</h2>
        <v-layout row>
            <v-flex xs-6>
                <v-card class="pa-3" width="550px" height="350px">
                    <v-card-media :src="require('../../assets/photos/' + this.currentPhoto + '.jpg')" 
                        height="300px"></v-card-media>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card class="pa-3" height="350px">
                    <v-card-text>
                        <p class="current-sentence">{{currentSentence}}</p>
                        <v-layout row justify-center>
                            <v-flex xs1 class="text-xs-center" v-for="(letter, i) in answerLength" :key="i">
                                <v-text-field
                                    :id=letter
                                    @keyup.native="nextInput"
                                    v-model="userInput[i]"
                                    @keyup.enter="nextPhoto"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <div v-if="correct" class="correct">
                            Correct!
                        </div>
                        <div v-if="wrong" class="wrong">
                            Nope!
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="nextPhoto">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { eventBus } from '@/main.js';
import MakeInputs from './MakeInputs';

export default {
    components: {
        MakeInputs
    },
    data () {
        return {
            currentPhoto: '',
            currentSentence: '',
            photoCount: 0,
            correctAnswer: '',
            correct: null,
            wrong: null,
            userInput: [],
            photos: [
                {title: 'dancing-women', answer: 'bailan', sentence: 'Las mujeres _____'},
                {title: 'curious-kitten', answer: 'gatito', sentence: 'El _____ dice "Hola!"'},
                {title: 'dog-beach', answer: 'playa', sentence: 'El perro esta en la ____'},
                {title: 'sleeping-cat', answer: 'duerme', sentence: 'El gato ____'},
                {title: 'yellow-hat', answer: 'amarillo', sentence: 'El sombrero esta ____' }
            ]
        }
    },
    methods: {
        nextPhoto: function () {
            this.userInput = [];
            this.photoCount += 1;
            if (this.photoCount >= this.photos.length) {
                this.photoCount = 0;
            }
            this.currentPhoto = this.photos[this.photoCount].title;
            this.correctAnswer = this.photos[this.photoCount].answer;
            this.currentSentence = this.photos[this.photoCount].sentence;
            document.getElementById('1').focus();
        },
        nextInput: function (event) {
            // console.log(event.target.id)
            let inputs = document.getElementsByTagName('input');
            // guess2_1
            let currentId = event.target.id;
            let next = document.getElementById(parseInt(currentId) + 1)
            if (next) {
                next.focus();
            } else {
                return;
            }
        }
    },
    watch: {
        userInput: function () {
            if (this.userAnswer === this.correctAnswer) {
                this.correct = true;
            } else {
                this.correct = null;
            }

            if (this.userAnswer.length >= this.correctAnswer.length && this.userAnswer !== this.correctAnswer) {
                this.wrong = true
            } else if (this.userAnswer.length < this.correctAnswer.length || this.correct === true) { 
                this.wrong = null
            }
         },
    },
    computed: {
        answerLength: function () {
            return this.photos[this.photoCount].answer.length;
        },
        userAnswer: function () {
            return this.userInput.join('');
        }
    },
    created () {

    },
    mounted () {
        this.currentPhoto = this.photos[0].title;
        this.correctAnswer = this.photos[0].answer;
        this.currentSentence = this.photos[0].sentence;
    }
}
</script>

<style scoped>
    .current-sentence {
        font-size: 22px;
        text-align: center;
    }

    .correct, .wrong {
        font-size: 22px;
        text-align: center;
    }

</style>
