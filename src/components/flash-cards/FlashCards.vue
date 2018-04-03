<template>
    <div>
        <v-layout row wrap>
            <v-flex xs-6>
                <v-card height="300px" id="foreign-card" class="flash-cards">
                    <span class="headline">{{currentLesson.title}}</span>
                    <v-card-text>
                        <p class="card-text text-center">{{currentWord}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="!lessonRunning" @click="setNewLesson" color="blue" id="start-btn">Start!</v-btn>
                        <!-- <v-btn color="primary" dark @click.stop="openScoreModal">Open Dialog 1</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card height="300px" id="english-card" class="flash-cards">
                    <span class="headline">English</span>
                    <div v-if="timeUp" id="time-up">
                        Time's Up!
                    </div>
                    <v-radio-group v-model="currentGuess">
                        <v-radio
                            v-for="n, i in randomAnswers"
                            :key="n"
                            :label="`${n}`"
                            :value="n"
                            :id="`radio${i}`"
                        ></v-radio>
                    </v-radio-group>
                </v-card>
            </v-flex>
        </v-layout>
        <score-modal 
            :userScore="currentScore" 
            :highScores="currentLesson.high_scores" 
            :lessonId="currentLesson._id"
        ></score-modal>
        <time-modal></time-modal>
        <score-confirm-modal></score-confirm-modal>
    </div>
</template>

<script>
/* eslint-disable */
import { eventBus } from '@/main.js';
import ScoreModal from '@/components/flash-cards/ScoreModal';
import TimeModal from '@/components/flash-cards/TimeModal';
import ScoreConfirmModal from '@/components/flash-cards/ScoreConfirmModal';

export default {
    components: {
        ScoreModal,
        TimeModal,
        ScoreConfirmModal
    },
    data () {
        return {
            currentWord: "",
            currentGuess: "",
            counter: 0,
            randomCounterArray: [],
            randomAnswers: [],
            currentScore: 0,
            timeUp: false,
            lessonRunning: false,
            dialog: false,
            userName: '',
            highScores: []
        }
    },
    methods: {
        setNewLesson: function () {
            this.lessonRunning = true;
            this.score = 0;
            // to Evaluate
            eventBus.$emit( 'scoreReset', 0 );
            // to Timer
            eventBus.$emit( 'startTimer', true);
            this.counter = 0;
            this.displayCards();
            this.getRandomAnswers();
        },
        displayCards: function () {
            this.setRandomCounter();
            console.log('display ' + this.counter)
            this.currentWord = this.currentLesson.cards[this.randomCounterArray[this.counter]];
        },
        setRandomCounter: function () {
            let length = this.currentLesson.length;
            let randomArray = [];
            for (let i = 0; randomArray.length < length; i ++) {
                let possibleRand = this.random(length);
                if (randomArray.indexOf(possibleRand) === -1) {
                    randomArray.push(possibleRand);
                }
            }
            // console.log(randomArray);
            this.randomCounterArray = randomArray;
        },
        getRandomAnswers: function () {
            if (this.randomAnswers.length > 0) {
                this.randomAnswers = []
        }
        console.log('length ' + this.currentLesson.length);
        // console.log('random a ' + this.counter)
        let currentAnswer = this.currentLesson.answers[this.randomCounterArray[this.counter]];
            while (this.randomAnswers.length <= 3) {
                let possibleAnswer = this.currentLesson.answers[this.random(this.currentLesson.length)];
                if (this.randomAnswers.indexOf(possibleAnswer) === -1 && possibleAnswer !== currentAnswer) {
                this.randomAnswers.push(possibleAnswer);
                }
            }
            this.randomAnswers.splice(this.random(4), 0, currentAnswer);
        },
        nextCard: function () {
            
            this.counter += 1;
            if (this.counter >= this.currentLesson.length) {
                this.counter = 0;
            }
            this.getRandomAnswers();
        },
        random: function (range) {
            return Math.floor(Math.random() * range);
        }
        
    //   resetForNewLesson() {
    //       console.log('reset for new lesson in flashcards.vue')
    //     this.lessonRunning = false;
    //     this.score = 0;
    //     // to Evaluate
    //     eventBus.$emit( 'scoreReset', 0 );
    //     // to Timer
    //     eventBus.$emit( 'stopTimer', true);
    //   }
    },
    computed: {
        currentLesson: function () {
            return this.$store.getters.currentLesson.myLesson;
        }
    },
    watch: {
        counter: function () {
            this.currentWord = this.currentLesson.cards[this.randomCounterArray[this.counter]];
        },
        currentGuess: function () {
            // console.log(this.currentGuess);
            if (this.currentGuess === null) {
                return;
            }
            if (this.currentLesson.answers.indexOf(this.currentGuess) === this.randomCounterArray[this.counter]) {
                console.log('correct')
                this.currentScore += 10;
                eventBus.$emit( 'answerPicked', [true, this.currentScore] );
            } else {
                this.currentScore -= 5;
                eventBus.$emit( 'answerPicked', [false, this.currentScore] );
            }
            
            let that = this;
            setTimeout(function () {
                that.currentGuess = null;
                that.nextCard();
            }, 1000);
        }
    },
    created () {
        // from timer in Timer
        eventBus.$on('timeUp', data => {
            // to TimeModal
            eventBus.$emit('openTimeModal', [true, this.currentScore]);
        })
    }
}
</script>

<style lang="scss" scoped>

  input {
    margin-right: 10px;
  }

  #foreign-card {
      position: relative;
  }

  #start-btn {
      position: absolute !important;
      bottom: 10px !important;
      right: 10px !important;
  }
  
</style>

