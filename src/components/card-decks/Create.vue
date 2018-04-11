<template>
    <v-container grid-list-md>
        <v-layout row>
            <v-flex xs6>
            <!-- DECK TITLE -->
                <v-card v-if="!hasTitle" class="pa-3">
                    <v-card-text>
                        <span class="headline">Give Your Deck A Title</span>
                        <v-text-field
                            label="Title"
                            v-model="deckTitle"
                            @keyup.enter="setTitle"   
                        >
                        </v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="setTitle">
                            Next
                        </v-btn>
                    </v-card-actions>
                </v-card>
            <!-- CREATING CURRENT CARD -->
                <v-card v-if="hasTitle && !isViewingCurrentDeck" class="pa-3" width="580" id="currentCard">
                    <span class="headline">Current Card</span>
                    <div v-if="selectedPhoto">
                        {{selectedPhoto.title}}
                        <v-card-media :src="selectedPhoto.url" height=300>
                        </v-card-media>
                    </div>
                    <v-card-text>
                        <p>Write a sentence that describes the photo.</p>
                    </v-card-text>
                    <v-text-field
                        label="Sentence"
                        v-model="currentSentence"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn color="secondary" @click="viewCurrentDeck">View Deck</v-btn>
                        <v-btn color="primary" @click="createNextCard">Create Next Card</v-btn>
                    </v-card-actions>
                </v-card>
            <!-- VIEWING CURRENT DECK -->
                <v-card v-if="hasTitle && isViewingCurrentDeck" class="pa-3">
                    <span class="headline">{{deckTitle}}</span>
                    <ul v-for="(card, i) in currentDeck" :key="card.id">
                        <li>Card {{i + 1}}</li>
                        <li><img :src="card.url" /></li>
                        <li>{{card.sentence}}</li>
                    </ul>
                    <v-card-actions>
                        <v-btn color="secondary" @click="backToCreate">Add More Cards</v-btn>
                        <v-btn color="primary" @click="saveMyDeck">Save This Deck</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <!-- PHOTO SEARCH  -->
            <v-flex xs6 v-if="hasTitle">
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
            <!-- SEARCH RESULTS  -->
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
import axios from 'axios';

export default {
    data () {
        return {
            deckTitle: '',
            hasTitle: false,
            userSearch: '',
            searchResults: [],
            isActive: false,
            selectedPhoto: null,
            currentDeck: [],
            counter: 0,
            currentSentence: '',
            isViewingCurrentDeck: false
        }
    },
    methods: {
        setTitle: function () {
            this.hasTitle = true;
        },
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
        },
        viewCurrentDeck: function () {
            console.log('view current deck')
            this.isViewingCurrentDeck = true;
        },
        createNextCard: function () {
            console.log('create next card')
            this.currentDeck[this.counter] = {
                id:  this.counter,
                title: this.selectedPhoto.title,
                sentence: this.currentSentence,
                url: this.selectedPhoto.url
            }
            this.counter += 1;
            this.selectedPhoto = null;
            this.currentSentence = '';
            this.userSearch = '';
            this.searchResults = [];
        },
        backToCreate: function () {
            this.isViewingCurrentDeck = false;
        },
        saveMyDeck: function () {
            /* 
            title: ,
            scores: [],
            cards: [
                id: ,
                title: ,
                sentence: ,
                url:
            ]
            */
           let myDeck = {
               
           }
        //    this.$store.dispatch('CREATE_NEW_DECK', [this.currentDeck]).then( () => {
        //     console.log('data is ready, man');
        // })
            axios.post('https://flash-cards-api.herokuapp.com/decks', {
                title: this.deckTitle,
                scores: [],
                cards: this.currentDeck
            }).then( (res) => {
                console.log('success ' + res.data)
            }, (e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>
    #currentCard {
        position: fixed;
    }

    ul li {
        font-size: 18px;
        list-style-type: none;
    }

    p {
        font-size: 18px;
    }
    
</style>
