<template>
    <v-container grid-list-md>
    
        <h2>Hangman</h2>
        <v-layout row>
            <v-flex xs-6>
                <v-card class="pa-3" width="550px">
                    <v-card-media :src="require('../../assets/dancing2.jpg')" height="300px"></v-card-media>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card class="pa-3">
                    <v-text-field
                        name="guess"
                        label="Guess"
                        id="guess"
                        v-model="guess"
                    ></v-text-field>
                    <div v-if="correct">
                        Correct!
                    </div>
                    <div v-if="wrong">
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
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            answer: 'bailar',
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
            wrong2: null
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
    }
}
</script>

<style scoped>
    
    
</style>
