<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs6>
                <v-card class="pa-3" width="580" id="currentCard">
                    <span class="headline">Current Card</span>
                    <div v-if="selectedPhoto">
                        {{selectedPhoto.title}}
                        <v-card-media :src="selectedPhoto.url" height=300>
                        </v-card-media>
                    </div>
                    <v-card-text>Write a sentence that describes the photo.</v-card-text>
                    <v-text-field
                        label="Sentence"
                    ></v-text-field>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card class="pa-3">
                    <span class="headline">Search for Photos...</span>
                    <v-text-field
                        label="Search Terms"
                        v-model="userSearch"
                        @keyup.enter="goSearch"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn color="error" @click="clearSearch">
                            Clear Search
                        </v-btn>
                        <v-btn color="primary" @click="goSearch">
                            Search
                        </v-btn>
                    </v-card-actions>
                </v-card>
                
                <v-flex xs12>
                    <v-card v-if="searchResults.length > 1" class="mt-4 pa1">
                        <h4 class="text-xs-center">Select a Photo</h4>
                    </v-card>
                    <v-card @click.native="selectPhoto($event)" v-for="(photo,i) in searchResults" :key=i :id=photo.id
                         hover class="my-3 pa-2">
                        <v-card-media :src="photo.url" height=300>
                        </v-card-media>
                    </v-card>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            userSearch: '',
            searchResults: [],
            isActive: false,
            selectedPhoto: null
        }
    },
    methods: {
        goSearch: function () {
            console.log('go search')
            setTimeout(() => {
                this.searchResults = [
                    { id: 1, title: 'Curious Kitten', url: 'http://lorempicsum.com/up/627/300/1' },
                    { id: 2, title: 'Dancing Women', url: 'http://lorempicsum.com/up/627/300/2' },
                    { id: 3, title: 'Dog Beach', url: 'http://lorempicsum.com/up/627/300/3' },
                    { id: 4, title: 'Green Jacket', url: 'http://lorempicsum.com/up/627/300/4' },
                    { id: 5, title: 'Green Trees', url: 'http://lorempicsum.com/up/627/300/5' },
                    { id: 6, title: 'Ice Cream', url: 'http://lorempicsum.com/up/627/300/6' },
                    { id: 7, title: 'Sleeping Cat', url: 'http://lorempicsum.com/up/627/300/7' },
                    { id: 8, title: 'Yellow Hat', url: 'http://lorempicsum.com/up/627/300/8' }
                ]
            }, 100)
        },
        clearSearch: function () {
            this.searchResults = [];
        },
        selectPhoto: function (event) {
            // event is running on p element, not the card element
            // this may change
            // console.log(event.target.parentElement.parentElement.id)
            let photoId = parseInt(event.target.parentElement.parentElement.id)
            this.selectedPhoto = this.searchResults.filter( photo => photo.id === photoId )[0]
        }
    }
}
</script>

<style>
    #currentCard {
        position: fixed;
    }
    
</style>
