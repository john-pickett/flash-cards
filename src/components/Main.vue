<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row v-if="!currentLessonCheck">
            <v-flex xs4>
                <v-card height="300px">
                <h4>Choose a Lesson</h4>
                <div v-if="!myLessonTitles">
                    Loading...
                </div>
                <v-list v-if="myLessonTitles" v-for="item in myLessonTitles" :key="item.id">
                    <v-list-tile :id="item.id" @click="chooseLesson($event)">{{item.title}}</v-list-tile>
                </v-list>
                <!-- <p>{{getCurrentLesson}}</p> -->
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="currentLessonCheck">
            <v-flex xs12>
                <flash-cards></flash-cards>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="currentLessonCheck">
            <v-flex xs4>
                <v-card height="300px" class="flash-cards">
                    <timer></timer>
                </v-card>
            </v-flex>
            <v-flex xs8>
                <v-card height="300px" class="flash-cards">
                    <evaluate></evaluate>
                </v-card>
            </v-flex>
        </v-layout>    
    </v-container>
</template>

<script>
import { eventBus } from '@/main.js';
import axios from 'axios';

import FlashCards from '@/components/FlashCards';
import Timer from '@/components/Timer';
import Evaluate from '@/components/Evaluate';
export default {
    components: {
        FlashCards,
        Timer,
        Evaluate
    },
    data () {
        return {
            // lesson data from Mongo is stored here
            lessons: [],
            // lessonSelected: false
        }
    },
    methods: {
        // kebabCase (title) {
        //     return title.replace(' ', '-').toLowerCase();
        // },
        // loadLesson (event) {
        //     // this is hard-coded for now. hard-coding is bad, mmkay?
        //     console.log(event.target.id);
        //     if (event.target.id === "spanish-verbs") {
        //         eventBus.$emit('newLessonData', this.lessons[0]);
        //     } else if (event.target.id === "spanish-colors") {
        //         eventBus.$emit('newLessonData', this.lessons[1]);
        //     } else if (event.target.id === "spanish-family") {
        //         eventBus.$emit('newLessonData', this.lessons[2]);
        //     }
        // },
        chooseLesson (event) {
            // console.log('choosing lesson ' + event.target.id);
            let myLesson = this.lessons.filter(lesson => lesson._id === event.target.id)[0];
            this.$store.dispatch('SET_CURRENT_LESSON', {myLesson});
            this.lessonSelected = true;
        }
    },
    computed: {
        myLessonTitles: function () {
            return this.$store.getters.lessonTitles;
        },
        getLessons: function () {
            return this.$store.getters.allLessons;
        },
        getCurrentLesson: function () {
            return this.$store.getters.currentLesson;
        },
        currentLessonCheck: function () {
            if (this.$store.getters.currentLesson) {
                return true;
            } else {
                return false;
            }
        }
    },
    created () {
        // if (process.env.LOCATION === "np") {
        //     this.apiURL = 'https://flash-cards-api.herokuapp.com'
        // } else {
        //     this.apiURL = 'http://localhost:3001'
        // }
    },
    beforeMount () {
        if (this.$store.state.lessons.length > 1) {
            this.lessons = this.getLessons;
        }
    }, 
    mounted () {
        // this is loading the data twice when it runs - fix?
        if (this.$store.state.lessons.length === 0) {
            this.$store.dispatch('GRAB_LESSON_DATA').then( () => {
            console.log('data is ready');
            this.lessons = this.getLessons;
        })
        }
        
    }
}
</script>

<style scoped>

    li {
        font-size: 18px !important;
    }


</style>
