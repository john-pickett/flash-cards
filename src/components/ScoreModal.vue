<template>
  <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition"
        :overlay="false"
        scrollable
      >
        <v-card tile>
            
            <v-toolbar card dark color="primary">
                <v-toolbar-title>High Scores</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark flat @click.native="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <!-- <v-btn icon @click.native="dialog = false" dark>
                        
                    </v-btn> -->
                </v-toolbar-items>
                <v-menu bottom right offset-y>
                    <!-- <v-btn slot="activator" dark icon>
                        <v-icon>more_vert</v-icon>
                    </v-btn> -->
                    <!-- this is what appears in the dropdown menu -->
                    <!-- <v-list>
                        <v-list-tile v-for="(item, i) in items" :key="i" @click="">
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list> -->
                </v-menu>
            </v-toolbar>
            <v-layout row wrap class="pa-3">
                <v-flex md6>
                    <v-card class="text-md-center pa-2 mr-2" height="100%">
                        <span class="headline">High Scores</span>
                        <v-list-tile v-for="(item, i) in highScores" :key="i" class="text-md-center">
                            <v-list-tile-title class="text-md-center">{{item.name}} : {{item.score}}</v-list-tile-title>
                        </v-list-tile>
                        <v-spacer class="py-2"></v-spacer>
                        <p class="headline">Save Your Score?</p>
                        <v-layout row>
                            <v-flex xs8 offset-xs1>
                                <v-text-field
                                name="input-1"
                                label="Your Name"
                                id="userName"
                                v-model="userName"
                                ></v-text-field>
                            </v-flex>
                            <v-flex>
                                Score: {{userScore}}
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex sm-3>
                                <v-btn dark @click.native="saveMyScore">Save</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-flex>
                <v-flex md6>
                    <v-card class="text-md-center" height="100%">
                        <span class="headline">Second Card</span>
                    </v-card>
                </v-flex>
            </v-layout>
          <div style="flex: 1 1 auto;"/>
        </v-card>
      </v-dialog>
</template>

<script>
import { eventBus } from '@/main.js';
import axios from 'axios';

export default {
    props: [
        'userScore', 
        'highScores',
        'lessonId'
        ],
    data () {
        return {
            dialog: false,
            userName: '',
            apiURL: null
        }
    },
    methods: {
        saveMyScore () {
            console.log('saving score' + this.userName + this.userScore);
            let name = this.userName;
            let score = this.userScore;
            this.highScores.push( { "name": name, "score": score });
            this.highScores = this.highScores.sort( (a,b) => b.score - a.score);
            axios.patch(this.apiURL + '/lessons/' + this.lessonId, {
                "high_scores": this.highScores
            }).then( (doc) => {
                console.log(doc.data);
            });
      },
    },
    created () {
        if (process.env.LOCATION === "np") {
            this.apiURL = 'https://flash-cards-api.herokuapp.com'
        } else {
            this.apiURL = 'http://localhost:3001'
        }
        // from TimeModal
        eventBus.$on('openScoreModal', data => {
            this.dialog = data
        });

    }
}
</script>

<style>

</style>
