<template>
    <v-container grid-list-md>
        <v-layout row v-if="!getCurrentDeck">
            <v-flex xs6>
                <v-card v-if="loading" height="300px">
                    <h4>Choose a Deck To Recall</h4>
                    <div style="margin: auto">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-card>
                <v-card v-if="!loading" height="300px">
                    <h4>Choose a Deck To Recall</h4>
                    <v-list v-if="myDeckTitles" v-for="deck in myDeckTitles" :key="deck.id">
                        <v-list-tile :id="deck.id" @click="selectDeck($event)">{{deck.title}}</v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row v-if="getCurrentDeck">
            <v-flex xs6>
                <!-- Current Photo Card -->
                <v-card class="pa-3" width=550 height=400px>
                    <h4>Recall</h4>
                    <v-card-media :src="getCurrentDeck.cards[this.counter].url" height=300px></v-card-media>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card class="pa-3" height="400px">
                    <v-card-media height=1></v-card-media>
                    <v-card-text>
                        <p class="current-sentence">{{getCurrentDeck.cards[this.counter].sentence}}</p>
                        <!-- <p>{{getCurrentDeck}}</p> -->
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

export default {
    data () {
        return {
            currentPhoto: '',
            currentSentence: '',
            counter: 0,
            correctAnswer: '',
            correct: null,
            wrong: null,
            userInput: [],
            // photos: [
            //     {title: 'dancing-women', answer: 'bailan', sentence: 'Las mujeres _____'},
            //     {title: 'curious-kitten', answer: 'gatito', sentence: 'El _____ dice "Hola!"'},
            //     {title: 'dog-beach', answer: 'playa', sentence: 'El perro esta en la ____'},
            //     {title: 'sleeping-cat', answer: 'duerme', sentence: 'El gato ____'},
            //     {title: 'yellow-hat', answer: 'amarillo', sentence: 'El sombrero esta ____' }
            // ]
        }
    },
    methods: {
        nextPhoto: function () {
            this.userInput = [];
            this.counter += 1;
            if (this.counter >= this.getCurrentDeck.cards.length) {
                this.counter = 0;
            }
            //this.currentPhoto = this.photos[this.counter].title;
            // how to get answer from sentence??
            //this.correctAnswer = this.photos[this.counter].answer;
            // this.currentSentence = this.photos[this.counter].sentence;
            this.currentSentence = this.getCurrentDeck.cards[this.counter].sentence
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
        },
        selectDeck(event) {
            // console.log(event.target.id);
            this.$store.dispatch('SET_CURRENT_DECK', event.target.id);
        },
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
            return 6;
            // return this.getCurrentDeck.cards[this.counter].sentence.length;
        },
        userAnswer: function () {
            return this.userInput.join('');
        },
        loading: function () {
            return this.$store.getters.isLoading;
        },
        myDeckTitles: function () {
            return this.$store.getters.deckTitles;
        },
        getCurrentDeck: function () {
            return this.$store.getters.currentDeck
        }
    },
    created () {

    },
    mounted () {
        // this.currentPhoto = this.photos[0].title;
        // this.correctAnswer = this.photos[0].answer;
        // // this.currentSentence = this.photos[0].sentence;
        // this.currentSentence = getCurrentDeck.cards[this.counter].sentence
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
