<template>
    <v-container grid-list-md>
        <v-layout row v-if="!getCurrentDeck">
            <v-flex xs6>
                <v-card v-if="loading" height="300px">
                    <h4>Choose a Deck To Teach</h4>
                    <div style="margin: auto">
                        <v-progress-circular indeterminate color="primary"></v-progress-circular>
                    </div>
                </v-card>
                <v-card v-if="!loading" height="300px">
                    <h4>Choose a Deck</h4>
                    <v-list v-if="myDeckTitles" v-for="deck in myDeckTitles" :key="deck.id">
                        <v-list-tile :id="deck.id" @click="selectDeck($event)">{{deck.title}}</v-list-tile>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout v-if="getCurrentDeck">
            <v-flex xs12 v-if="!viewAll">
                <!-- Current Photo Card -->
                <v-card class="pa-3">
                    <v-layout>
                        <v-flex xs3>
                            <v-checkbox
                                label="View All"
                                v-model="viewAll"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <v-card-media :src="getCurrentDeck.cards[this.counter].url" height=300 contain>
                    </v-card-media>
                    <v-card-text>
                        <!-- {{getCurrentDeck.cards[0].url}} -->
                        <p class="card-text">Vocab Word: {{getCurrentDeck.cards[this.counter].vocab}} </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" class="right" @click="nextCard">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 v-if="viewAll">
                <v-card class="pa-3">
                    <v-layout>
                        <v-flex xs3>
                            <v-checkbox
                                label="View All"
                                v-model="viewAll"
                            ></v-checkbox>
                        </v-flex>
                    </v-layout>
                    <v-list v-for="card in getCurrentDeck.cards" :key="card.id">
                        <v-card-media :src="card.url" height=300 contain>
                        </v-card-media>
                        <v-card-text>
                            <!-- {{getCurrentDeck.cards[0].url}} -->
                            <p class="card-text">Vocab Word: {{card.vocab}} </p>
                        </v-card-text>
                        <v-card-actions>
                        
                        </v-card-actions>
                    </v-list>
                </v-card>
            </v-flex>
            <!-- <v-flex xs6>
                <v-card height=455 class="pa-3">
                    <v-card-text>
                        <p class="card-text">{{getCurrentDeck.cards[this.counter].sentence}}</p> 
                        <p>current: {{getCurrentDeck}}</p> 
                        <span class="activator card-text">La trompeta <span class="tooltip">the trumpet</span></span> 
                        <span class="card-text">está</span>
                        <span class="activator card-text">amarillo<span class="tooltip">yellow</span></span>
                    </v-card-text>
                </v-card>
            </v-flex> -->
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            counter: 0,
            hide1: true,
            hide2: true,
            viewAll: false
        }
    },
    methods: {
        selectDeck(event) {
            console.log(event.target.id);
            this.$store.dispatch('SET_CURRENT_DECK', event.target.id);
        },
        nextCard () {
            console.log('next card')
            this.counter += 1;
        },
        toggleText (event) {
            // console.log(event.target.id)
            if (event.target.id == 1) {
                this.hide1 = !this.hide1;
            } else if (event.target.id == 2) {
                this.hide2 = !this.hide2;
            }
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.isLoading;
        },
        myDeckTitles: function () {
            return this.$store.getters.deckTitles;
        },
        getCurrentDeck: function () {
            return this.$store.getters.currentDeck
        },
        toolSentence: function () {
            return this.getCurrentDeck.cards[this.counter].sentence
        },
        toolTemplate () {
            return 
        }
    },
    watch: {
        counter: function () {
            if (this.counter >= this.getCurrentDeck.cards.length) {
                this.counter = 0;
            }
        }
    },
    mounted () {
        // clears currentDeck when user switches page
        this.$store.commit('CLEAR_CURRENT_DECK');
    }
}
</script>

<style>
    .card-text {
        font-size: 22px;
        text-align: center;
    }

    .hidden {
        display: none;
    }

    .activator {
        position: relative;
        display: inline-block;
        cursor: pointer;
        text-decoration: underline dotted gray;
    }

    .activator .tooltip {
        padding: 2px;
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: #fff;
        text-align: center;
        border-radius: 6px;
 
        /* Position the tooltip text - see examples below! */
        position: absolute;
        z-index: 1;
        top: 100%;
        left: 50%; 
        margin-left: -60px;
        opacity: 0;
        transition: opacity 1s;

    }

    .activator:hover .tooltip {
        visibility: visible;
        opacity: 1;
    }

    .activator .tooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
}
</style>