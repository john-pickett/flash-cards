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
            <v-flex xs12>
                <!-- Current Photo Card -->
                <v-card class="pa-3">
                    <v-card-media :src="getCurrentDeck.cards[this.counter].url" height=300 contain></v-card-media>
                    <v-card-text>
                        <div id="vocab-word" >
                            <transition name="fade">
                            <p class="card-text" v-show="showVocab">
                                {{getCurrentDeck.cards[this.counter].vocab}}
                            </p>
                            </transition>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="secondary" @click="showVocab = true" depressed>Show Vocabulary Word</v-btn>
                        <v-btn color="primary" @click="nextPhoto" depressed>Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <!-- <v-flex xs-6>
                <v-card class="pa-3" height="400px">
                    <v-card-media height=1></v-card-media>
                    <v-card-text>
                        <p class="current-sentence">{{getCurrentDeck.cards[this.counter].sentence}}</p>
                        <p>{{getCurrentDeck}}</p>
                        <v-layout row justify-center v-if="userStart">
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
                        </div> -->
                        <!-- <v-btn v-if="!userStart" color="primary" @click="startMe">Start</v-btn>
                    </v-card-text>
                    
                </v-card>
            </v-flex>  -->
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
            // correctAnswer: '',
            correct: null,
            wrong: null,
            userInput: [],
            userStart: true,
            showVocab: false
            /* {
                    "id": 1,
                    "title": "boy-trumpet",
                    "sentence": "La trompeta esta amarillo",
                    "url": "http://lorempicsum.com/up/627/300/1",
                    "answer": "blue"
                }
            */
        }
    },
    methods: {
        nextPhoto: function () {
            this.showVocab = false;
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
            console.log(this.currentSentence)
            
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
        startMe () {
            this.userStart = true;
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
        // correctAnswer: function () {
        //     return this.getCurrentDeck.cards[this.counter].answer
        // },
        answerLength: function () {
            // return this.correctAnswer.length;
            return 8;
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
        // clears currentDeck when user switches between pages
        this.$store.commit('CLEAR_CURRENT_DECK');
    },
    updated () {
        
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

    #vocab-word {
        height: 25px;
    }

    .fade-enter-active {
        transition: opacity .5s;
    }

    .fade-leave-active {
        transition: opacity 0;
    }

    .fade-leave {
        opacity: 0;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

</style>
