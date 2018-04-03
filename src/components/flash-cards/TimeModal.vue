<template>
    <v-dialog v-model="dialog" max-width="500px" persistent=true>
        <v-card>
          <v-card-title>
            <span class="headline text-xs-center">Time's Up!</span>
          </v-card-title>
          <v-card-text>
              You scored {{userScore}} points!
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click="closeModal()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
    data () {
        return {
            dialog: false,
            userScore: 0
        }
    },
    methods: {
        closeModal () {
            console.log('closing');
            this.dialog = false;
            // to ScoreModal
            eventBus.$emit('openScoreModal', true);
        }
    },
    created () {
        eventBus.$on('openTimeModal', data => {
            this.userScore = data[1];
            this.dialog = data[0];
        })
    }
}
</script>

<style lang="scss">

</style>
