<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row v-if="!currentLessonCheck">
            <v-flex xs4>
                <v-card v-if="loading" height="300px">
                    <h4>Choose a Lesson</h4>
                    <div style="margin: auto">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-card>
                <v-card v-if="!loading" height="300px">
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

import FlashCards from '@/components/flash-cards/FlashCards';
import Timer from '@/components/flash-cards/Timer';
import Evaluate from '@/components/flash-cards/Evaluate';
export default {
    components: {
        FlashCards,
        Timer,
        Evaluate
    },
    data () {
        return {
            // lesson data from Mongo is stored here
            lessons: []
        }
    },
    methods: {
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
        loading: function () {
            return this.$store.getters.isLoading;
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

    },
    beforeMount () {
        if (this.$store.state.lessons.length > 1) {
            this.lessons = this.getLessons;
        }
    }, 
    mounted () {
        // this is loading the data twice when it runs - fix?
        // same API call is in App.vue
        if (this.$store.state.lessons.length === 0) {
            this.$store.dispatch('GRAB_LESSON_DATA').then( () => {
            console.log('data is ready, dude');
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
