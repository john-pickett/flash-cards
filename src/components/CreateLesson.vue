<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs-12>
                <v-card class="pa-3">
                    <v-text-field
                        name="title"
                        label="Lesson Title"
                        id="title"
                        v-model="title"
                    ></v-text-field>
                    <!-- <v-btn class="primary">
                        <v-icon>add</v-icon>
                    </v-btn> -->
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs-6>
                <v-card class="pa-3">
                    <span class="headline">Spanish Cards</span>
                    <p>Enter the Spanish words to guess here.</p>
                    <v-text-field
                        name="cards1"
                        label="Card 1"
                        id="card1"
                        v-model="cards[0]"
                    ></v-text-field>
                    <v-text-field
                        name="cards2"
                        label="Card 2"
                        id="card2"
                        v-model="cards[1]"
                    ></v-text-field>
                    <v-text-field
                        name="cards3"
                        label="Card 3"
                        id="card3"
                        v-model="cards[2]"
                    ></v-text-field>
                    <v-text-field
                        name="cards4"
                        label="Card 4"
                        id="card4"
                        v-model="cards[3]"
                    ></v-text-field>
                    <v-text-field
                        name="cards5"
                        label="Card 5"
                        id="card5"
                        v-model="cards[4]"
                    ></v-text-field>
                    <v-text-field
                        name="cards6"
                        label="Card 6"
                        id="card6"
                        v-model="cards[5]"
                    ></v-text-field>
                    <v-text-field
                        name="cards7"
                        label="Card 7"
                        id="card7"
                        v-model="cards[6]"
                    ></v-text-field>
                    <v-text-field
                        name="cards8"
                        label="Card 8"
                        id="card8"
                        v-model="cards[7]"
                    ></v-text-field>
                    <v-text-field
                        name="cards9"
                        label="Card 9"
                        id="card9"
                        v-model="cards[8]"
                    ></v-text-field>
                    <v-text-field
                        name="cards10"
                        label="Card 10"
                        id="card10"
                        v-model="cards[9]"
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs-6>
                <v-card class="pa-3">
                    <span class="headline">Answers Cards</span>
                    <p>Enter the English answers here.</p>
                    <v-text-field
                        name="answers1"
                        label="Answer 1"
                        id="answer1"
                        v-model="answers[0]"
                    ></v-text-field>
                    <v-text-field
                        name="answers2"
                        label="Answer 2"
                        id="answer2"
                        v-model="answers[1]"
                    ></v-text-field>
                    <v-text-field
                        name="answers3"
                        label="Answer 3"
                        id="answer3"
                        v-model="answers[2]"
                    ></v-text-field>
                    <v-text-field
                        name="answers4"
                        label="Answer 4"
                        id="answer4"
                        v-model="answers[3]"
                    ></v-text-field>
                    <v-text-field
                        name="answers5"
                        label="Answer 5"
                        id="answer5"
                        v-model="answers[4]"
                    ></v-text-field>
                    <v-text-field
                        name="answers6"
                        label="Answer 6"
                        id="answer6"
                        v-model="answers[5]"
                    ></v-text-field>
                    <v-text-field
                        name="answers7"
                        label="Answer 7"
                        id="answer7"
                        v-model="answers[6]"
                    ></v-text-field>
                    <v-text-field
                        name="answers8"
                        label="Answer 8"
                        id="answer8"
                        v-model="answers[7]"
                    ></v-text-field>
                    <v-text-field
                        name="answers9"
                        label="Answer 9"
                        id="answer9"
                        v-model="answers[8]"
                    ></v-text-field>
                    <v-text-field
                        name="answers10"
                        label="Answer 10"
                        id="answer10"
                        v-model="answers[9]"
                    ></v-text-field>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs-12>
                <v-card class="pa-3">
                    <v-btn class="primary" @click="saveLesson">Save Lesson</v-btn>
                </v-card>
            </v-flex>
        </v-layout>
        <new-lesson-modal></new-lesson-modal>
    </v-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import {eventBus} from '@/main.js';
import NewLessonModal from './NewLessonModal';

/*
lesson: {
    title: 
    length: 
    timer: 
    cards: []
    answers: []
}
*/

export default {
    components: {
        NewLessonModal
    },
    data () {
        return {
            title: '',
            length: 1,
            timer: 0,
            cards: [],
            answers: []
        }
    },
    methods: {
        saveLesson () {
            let that = this;
            // console.log('saving lesson')
            let lessonData = {
                title: this.title,
                length: this.cards.length,
                timer: this.timer,
                cards: this.cards,
                answers: this.answers
            }
            // console.log(JSON.stringify(lessonData, null, 2));
            axios.post('https://flash-cards-api.herokuapp.com/lessons', {
                title: this.title,
                length: this.cards.length,
                timer: this.timer,
                cards: this.cards,
                answers: this.answers
            }).then( (doc) => {
                // console.log(JSON.stringify(doc.data))
                eventBus.$emit('openLessonModal', true);
            });
        }
    }
}


</script>

<style>

</style>
