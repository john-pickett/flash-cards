<template>
    <div>
      <div v-if="currentLesson === null">
            Loading...
      </div>
      <div v-if="currentLesson !== null">
            <v-layout row wrap>
                <v-flex xs-6>
                    <v-card height="300px">
                        <span class="headline">{{currentLesson.title || "Placeholder"}}</span>
                        <v-card-text>
                            <p class="card-text text-center">{{currentWord}}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn @click="startLesson" color="blue">Start</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
                <v-flex xs-6>
                    <v-card height="300px">
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
                        <!-- <div class="form-group">
                            <input @click="evalGuess($event)" name="group2" type="radio" id="radio1" :value='randomAnswers[0]' />
                            <label class="card-text" for="radio1">{{randomAnswers[0]}}</label>
                        </div>
                        <div class="form-group">
                            <input @click="evalGuess($event)" name="group2" type="radio" id="radio2" :value='randomAnswers[1]' />
                            <label class="card-text" for="radio2">{{randomAnswers[1]}}</label>
                        </div>
                        <div class="form-group">
                            <input @click="evalGuess($event)" name="group2" type="radio" id="radio3" :value='randomAnswers[2]' />
                            <label class="card-text" for="radio3">{{randomAnswers[2]}}</label>
                        </div>
                        <div class="form-group">
                            <input @click="evalGuess($event)" name="group2" type="radio" id="radio4" :value='randomAnswers[3]' />
                            <label class="card-text" for="radio4">{{randomAnswers[3]}}</label>
                        </div>
                        <div class="form-group">
                            <input @click="evalGuess($event)" name="group2" type="radio" id="radio5" :value='randomAnswers[4]' />
                            <label class="card-text" for="radio5">{{randomAnswers[4]}}</label>
                        </div> -->
                    </v-card>
                </v-flex>
            </v-layout>
      </div>
    </div>
</template>

<script>
/* eslint-disable */
import { eventBus } from '@/main.js';


export default {
    components: {
        
    },
    data () {
      return {
        currentWord: "",
        currentGuess: "",
        counter: 0,
        randomAnswers: [],
        currentScore: 0,
        // currentLesson: 'hey',
        timeUp: false,
        currentLesson: {
            title: "test",
            cards: [
            "llamar", "bailar","comer","empezar","correr","tener","hacer","poder","decir","ir","ver","dar","saber","querer","llegar","pasar",
            "deber","poner","parecer","quedar","creer","hablar","llevar","dejar","seguir","encontrar"
            ],
            answers: [
            "to call","to dance","to eat","to begin","to run","to have","to do","to be able","to say","to go","to see","to give",
            "to know","to want","to arrive","to happen","to ought to","to put","to seem", "to stay", "to believe","to speak",
            "to carry","to leave","to follow","to find"
            ],
            length: 26
            }
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
      evalGuess: function (event) {
        let that = this;
        // console.log('val: ' + event.target.value)

        
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
        this.score = 0;
        eventBus.$emit( 'scoreReset', 0 );
        eventBus.$emit( 'startTimer', true);
        this.counter = 0;
        this.displayCards();
        this.getRandomAnswers();
      },
      startLesson () {
          this.setNewLesson();
      }
    },
    mounted () {
      
    },
    created () {
      // this lesson data comes from App.vue
      // it runs on created ()
      eventBus.$on('newLessonData', data => {
        // console.log('receiving lesson data');
        this.currentLesson = data;
      });
    },
    watch: {
      counter: function () {
        this.currentWord = this.currentLesson.cards[this.counter];
      },
      currentGuess: function () {
        console.log(this.currentGuess);
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
          that.nextCard();
        //   var elem = document.getElementById(event.target.id);
        //   elem.checked = false;
        }, 1000);
      },
      currentLesson: function () {
        // console.log("from FC " + JSON.stringify(this.currentLesson))
      }
    }
}
</script>

<style lang="scss" scoped>

  input {
    margin-right: 10px;
  }
  
</style>

