<template>
    <div>
        <v-layout row wrap>
            <v-flex xs-6>
                <v-card height="300px" id="foreign-card" class="flash-cards">
                    <span class="headline">{{currentLesson.title || "Placeholder"}}</span>
                    <v-card-text>
                        <p class="card-text text-center">{{currentWord}}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn v-if="!lessonRunning" @click="startLesson" color="blue" id="start-btn">Start!</v-btn>
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
import ScoreModal from '@/components/ScoreModal';
import TimeModal from '@/components/TimeModal';
import ScoreConfirmModal from '@/components/ScoreConfirmModal';

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
            randomAnswers: [],
            currentScore: 0,
            timeUp: false,
            lessonRunning: false,
            dialog: false,
            userName: '',
            highScores: [
                // { name: "John", score: 100 },
                // { name: "Mary", score: 90 },
                // { name: "Lucy", score: 80 },
                // { name: "David", score: 70 }
            ]
        }
    },
    methods: {
      displayCards: function () {
        this.currentWord = this.currentLesson.cards[this.counter];
      },
      nextCard: function () {
        // console.log('nextCard running')
        this.counter += 1;
        if (this.counter >= this.currentLesson.length) {
          this.counter = 0;
        }
        this.getRandomAnswers();
      },
      getRandomAnswers: function () {
        if (this.randomAnswers.length > 0) {
          this.randomAnswers = []
        }
        
        let currentAnswer = this.currentLesson.answers[this.counter];
        while (this.randomAnswers.length <= 3) {
          let possibleAnswer = this.currentLesson.answers[this.random(10)];
          if (this.randomAnswers.indexOf(possibleAnswer) === -1 && possibleAnswer !== currentAnswer) {
            this.randomAnswers.push(possibleAnswer);
          }
        }
        this.randomAnswers.splice(this.random(4), 0, currentAnswer);
      },
      random: function (range) {
        return Math.floor(Math.random() * range);
      },
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
      startLesson () {
        this.setNewLesson();
      },
      resetForNewLesson() {
        this.lessonRunning = false;
        this.score = 0;
        // to Evaluate
        eventBus.$emit( 'scoreReset', 0 );
        // to Timer
        eventBus.$emit( 'stopTimer', true);
      }
    },
    mounted () {
      console.log('flash cards mounted')
    },
    created () {
      // this lesson data comes from Main.vue
      // it runs on beforeMount ()
      eventBus.$on('newLessonData', data => {
        console.log('receiving lesson data in FlashCards');
        this.currentLesson = data;
        this.resetForNewLesson();
      });
      // from timer in Timer
      eventBus.$on('timeUp', data => {
          // to TimeModal
          eventBus.$emit('openTimeModal', [true, this.currentScore]);
      })
    },
    computed: {
        currentLesson: function () {
            return this.$store.getters.currentLesson.myLesson;
        }
    },
    watch: {
        counter: function () {
            this.currentWord = this.currentLesson.cards[this.counter];
        },
        currentGuess: function () {
            console.log(this.currentGuess);
            if (this.currentGuess === null) {
                return;
            }
            if (this.currentLesson.answers.indexOf(this.currentGuess) === this.counter) {
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

