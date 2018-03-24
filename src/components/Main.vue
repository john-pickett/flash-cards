<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <flash-cards></flash-cards>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
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
            apiURL: null
        }
    },
    methods: {
        kebabCase (title) {
            return title.replace(' ', '-').toLowerCase();
        },
        loadLesson (event) {
            // this is hard-coded for now. hard-coding is bad, mmkay?
            console.log(event.target.id);
            if (event.target.id === "spanish-verbs") {
                eventBus.$emit('newLessonData', this.lessons[0]);
            } else if (event.target.id === "spanish-colors") {
                eventBus.$emit('newLessonData', this.lessons[1]);
            } else if (event.target.id === "spanish-family") {
                eventBus.$emit('newLessonData', this.lessons[2]);
            }
        }
    },
    created () {
        if (process.env.LOCATION === "np") {
            this.apiURL = 'https://flash-cards-api.herokuapp.com'
        } else {
            this.apiURL = 'http://localhost:3001'
        }
    },
    beforeMount () {
        let that = this;
        // console.log(' app before mount');
        // console.log('getting ' + this.apiURL)
        axios.get(this.apiURL + '/lessons')
        .then( (doc) => {
            // console.log(JSON.stringify(doc.data, null, 2));
            doc.data.lessons.forEach( (lesson, i) => {
                that.lessons.push(lesson);
                // that.menuItems[0].subItems.push({ title: lesson.title });
            });
            // console.log('that.lessons: ' + JSON.stringify(that.lessons, null, 2));
            // console.log('received lesson data');
            eventBus.$emit('newLessonData', that.lessons[0]);
        });
    }, 
    mounted () {
        // console.log('main mounted')
    }
}
</script>

<style>


</style>
