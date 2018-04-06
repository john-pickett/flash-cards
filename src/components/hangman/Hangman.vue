<template>
    <v-container grid-list-md>
    
        <h2>Hangman</h2>
        <v-layout row>
            <v-flex xs-6>
                <v-card class="pa-3" width="550px">
                    <v-card-media :src="require('../../assets/photos/' + this.currentPhoto + '.jpg')" 
                        height="300px"></v-card-media>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card class="pa-3">
                    <p class="current-sentence">{{currentSentence}}</p>
                    <v-text-field
                        name="guess"
                        label="Guess"
                        id="guess"
                        v-model="guess"
                        @keyup.enter="nextPhoto"
                    ></v-text-field>
                    <div v-if="correct" class="correct">
                        Correct!
                    </div>
                    <div v-if="wrong" class="wrong">
                        Nope!
                    </div>
                    <v-layout row>
                        <v-flex xs1 class="text-xs-center">
                            <v-text-field
                                name="guess2_1"
                                label=""
                                id="guess2_1"
                                v-model="guess2_1"
                                @keyup.native="nextInput($event)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                                name="guess2_2"
                                label=""
                                id="guess2_2"
                                v-model="guess2_2"
                                @keyup.native="nextInput($event)"
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_3"
                            label=""
                            id="guess2_3"
                            v-model="guess2_3"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_4"
                            label=""
                            id="guess2_4"
                            v-model="guess2_4"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_5"
                            label=""
                            id="guess2_5"
                            v-model="guess2_5"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                        <v-flex xs1>
                            <v-text-field
                            name="guess2_6"
                            label=""
                            id="guess2_6"
                            v-model="guess2_6"
                            @keyup.native="nextInput($event)"
                        ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <div v-if="correct2">
                        Correct!
                    </div>
                    <div v-if="wrong2">
                        Nope!
                    </div>
                    <v-card-actions>
                        <v-btn color="primary" @click="nextPhoto">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            currentPhoto: '',
            currentSentence: '',
            photoCount: 0,
            answer: '',
            guess: '',
            correct: null,
            wrong: null,
            guess2_1: '',
            guess2_2: '',
            guess2_3: '',
            guess2_4: '',
            guess2_5: '',
            guess2_6: '',
            correct2: null,
            wrong2: null,
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
        nextInput: function (event) {
            // console.log(event.target.id)
            let inputs = document.getElementsByTagName('input');
            // guess2_1
            let currentId = event.target.id;
            let nextId = 'guess2_' + (parseInt(currentId.slice(-1)) + 1);
            // console.log(nextId);
            let next = document.getElementById(nextId)
            if (next) {
                next.focus();
            } else {
                return;
            }
        },
        nextPhoto: function () {
            this.guess = '';
            this.photoCount += 1;
            if (this.photoCount >= this.photos.length) {
                this.photoCount = 0;
            }
            this.currentPhoto = this.photos[this.photoCount].title;
            this.answer = this.photos[this.photoCount].answer;
            this.currentSentence = this.photos[this.photoCount].sentence;
        }
    },
    watch: {
        guess: function () {
            if (this.guess === this.answer) {
                this.correct = true;
            } else {
                this.correct = null;
            }

            if (this.guess.length >= this.answer.length && this.guess !== this.answer) {
                this.wrong = true
            } else if (this.guess.length < this.answer.length || this.correct === true) { 
                this.wrong = null
            }
         },
         guess2: function () {
             console.log(this.guess2);
             if (this.guess2 === this.answer) {
                 this.correct2 = true;
             }
         }
    },
    computed: {
        guess2: function () {
            return this.guess2_1 + this.guess2_2 + this.guess2_3 + this.guess2_4 + this.guess2_5 + this.guess2_6;
        }
    },
    mounted () {
        this.currentPhoto = this.photos[0].title;
        this.answer = this.photos[0].answer;
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
