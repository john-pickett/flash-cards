<template>
    <v-dialog v-model="dialog" max-width="500px" persistent=true>
        <v-card>
          <v-card-title>
            <span class="headline text-xs-center">Time's Up!</span>
          </v-card-title>
          
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
</template>

<script>
import {eventBus} from '@/main.js'

export default {
    data () {
        return {
            dialog: false
        }
    },
    created () {
        eventBus.$on('openTimeModal', data => {
            this.dialog = data;
            setTimeout( () => {
                eventBus.$emit('openScoreModal', true);
            }, 2000);
        })
    }
}
</script>

<style lang="scss">

</style>
