<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row>
            <v-flex xs4>
                <v-card v-if="loading" height="300px">
                    <h4>Choose a Lesson</h4>
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
    </v-container>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        selectDeck(event) {
            console.log(event.target.id);
        }
    },
    computed: {
        loading: function () {
            return this.$store.getters.isLoading;
        },
        myDeckTitles: function () {
            return this.$store.getters.deckTitles;
        }
    }
}
</script>

<style>

</style>
