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
                        <!-- {{getCredentials}} -->
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="setTitle" depressed>
                            Next
                        </v-btn>
                    </v-card-actions>
                </v-card>
            <!-- CREATING CURRENT CARD -->
                <v-card v-if="hasTitle && !isViewingCurrentDeck" class="pa-3" width="580" id="currentCard">
                    <span class="headline">Current Card</span>
                    <div v-if="selectedPhoto">
                        <!-- {{selectedPhoto.title}} -->
                        <v-card-media :src="selectedPhoto.url" height=300>
                        </v-card-media>
                    </div>
                    <v-card-text>
                        <p>Give the word for the card</p>
                    </v-card-text>
                    <v-text-field
                        label="Vocabulary Word"
                        v-model="currentVocab"
                    ></v-text-field>
                    <v-card-actions>
                        <v-btn color="secondary" @click="viewCurrentDeck" depressed>View Deck</v-btn>
                        <v-btn color="primary" @click="createNextCard" depressed>Save Card</v-btn>
                    </v-card-actions>
                </v-card>
            <!-- VIEWING CURRENT DECK -->
                <v-card v-if="hasTitle && isViewingCurrentDeck" class="pa-3" width=580>
                    <span class="headline">{{deckTitle}}</span>
                    <ul v-for="(card, i) in currentDeck" :key="card.id">
                        <li>Card {{i + 1}}</li>
                        <li>{{card.vocab}}</li>
                        <li><img :src="card.url" height=300 /></li>
                    </ul>
                    <!-- <v-card-media :src="card.url" height=300></v-card-media> -->
                    <v-card-actions>
                        <v-btn color="secondary" @click="backToCreate" depressed>Add More Cards</v-btn>
                        <v-btn color="primary" @click="saveMyDeck" depressed 
                            :loading="saving" :disabled="saving" >Save This Deck</v-btn>
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
                        <v-btn color="error" @click.native="clearSearch" 
                            :disabled="loading" depressed>
                            Clear Search
                        </v-btn>
                        <v-btn color="primary" @click.native="goSearch" 
                            :disabled="loading" :loading="loading" depressed>
                            Search
                        </v-btn>
                    </v-card-actions>
                    <!-- <v-card-actions>
                        <v-btn v-if="isLoading" color="error" @click="clearSearch" disabled>
                            Clear Search
                        </v-btn>
                        <v-btn color="primary" @click="goSearch" disabled>
                            Search
                        </v-btn>
                    </v-card-actions> -->
                </v-card>
            <!-- SEARCH RESULTS  -->
                <v-flex xs12>
                    <!-- <v-card v-if="searchResults.length > 1" class="mt-4 pa1">
                        <h4 class="text-xs-center">Select a Photo</h4>
                    </v-card> -->
                    <v-card @click.native="selectPhoto($event)" v-for="(photo,i) in searchResults" 
                        :key=i :id=photo.id
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
import Unsplash, { toJson } from "unsplash-js";
const unsplash = new Unsplash({
    applicationId: "acce000b4cf68048308c192635342c85dbe5d85cfdd0bcdf60a528c4309d7d3e",
    secret: "1f278ba2cdf7f7cb72cd6b9ed641a159413c9ed9269e7b9fd7d3b0ddd80705d4",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public"
]);

import axios from 'axios';

export default {
    data () {
        return {
            deckTitle: '',
            hasTitle: false,
            userSearch: 'dog',
            searchResults: [],
            isActive: false,
            selectedPhoto: null,
            currentDeck: [],
            counter: 0,
            currentSentence: '',
            currentVocab: '',
            isViewingCurrentDeck: false,
            loading: false,
            saving: false
        }
    },
    methods: {
        setTitle: function () {
            this.hasTitle = true;
        },
        goSearch: function () {
            let that = this;
            this.searchResults = [];
            that.loading = true;
            
            // this.searchResults = [
            //    { id: 1, url: 'http://lorempicsum.com/up/627/300/1' },
            //    { id: 2, url: 'http://lorempicsum.com/up/627/300/2' },
            //    { id: 3, url: 'http://lorempicsum.com/up/627/300/3' },
            //    { id: 4, url: 'http://lorempicsum.com/up/627/300/4' },
            //    { id: 5, url: 'http://lorempicsum.com/up/627/300/5' },
            //    { id: 6, url: 'http://lorempicsum.com/up/627/300/6' },
            //    { id: 7, url: 'http://lorempicsum.com/up/627/300/7' },
            //    { id: 8, url: 'http://lorempicsum.com/up/627/300/8' }
            // ]
            unsplash.search.photos(this.userSearch, 1, 20)
            .then(toJson)
            .then(json => {
                // console.log(json["results"],null, 2)
                json["results"].forEach( (pic) => {
                    that.searchResults.push(
                        {
                            id: pic.id,
                            url: pic.urls.regular
                        }
                    )
                })
                that.loading = false;
            });
        },
        clearSearch: function () {
            this.searchResults = [];
            this.userSearch = '';
        },
        selectPhoto: function (event) {
            console.log(event.target.parentElement.parentElement.id)
            let photoId = event.target.parentElement.parentElement.id
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
                url: this.selectedPhoto.url,
                vocab: this.currentVocab
            }
            this.counter += 1;
            this.selectedPhoto = null;
            this.currentVocab = '';
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
            //    this.$store.dispatch('CREATE_NEW_DECK', [this.currentDeck]).then( () => {
            //     console.log('data is ready, man');
            // })
            this.saving = true;
            let that = this;
            let myDeck = {};
            
            axios.post('https://flash-cards-api.herokuapp.com/decks', {
                title: this.deckTitle,
                scores: [],
                cards: this.currentDeck
            }).then( (res) => {
                console.log('success ' + res.data)
                alert('deck saved!');
                that.saving = false;
                that.$store.dispatch('GRAB_LESSON_DATA');
                that.$router.push('/teach');
            }, (e) => {
                console.log(e)
            })
        }
    },
    watch: {
        selectedPhoto: function () {
            console.log('photo selected')
            console.log(this.selectedPhoto)
        },
        loading: function () {
            console.log('loading is ' + this.loading)
        }
    },
    computed: {
        getCredentials: function () {
            return this.$store.getters.getCreds;
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
