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
            <v-flex xs6>
                <!-- Current Photo Card -->
                <v-card height=400>
                    <h4>Teach</h4>
                    <v-card-media :src="getCurrentDeck.cards[this.counter].url" height=300 contain>
                    </v-card-media>
                    <v-card-text>
                        {{getCurrentDeck.cards[0].url}}
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" class="right" @click="nextCard">Next</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card height=400>
                    <v-card-text>
                        <p class="card-text">{{getCurrentDeck.cards[this.counter].sentence}}</p>
                        <!-- <p>current: {{getCurrentDeck}}</p> -->
                        <v-tooltip bottom>
                            <span slot="activator" class="card-text">{{getCurrentDeck.cards[this.counter].sentence}}</span>
                            <span class="card-text">The trumpet is yellow</span>
                        </v-tooltip>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            counter: 0
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
        }
    },
    watch: {
        counter: function () {
            if (this.counter >= this.getCurrentDeck.cards.length) {
                this.counter = 0;
            }
        }
    }
}
</script>

<style>
    .card-text {
        font-size: 22px;
        text-align: center;
    }
</style>
