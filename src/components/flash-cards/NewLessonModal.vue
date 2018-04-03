<template>
    <v-dialog v-model="modal" max-width="500px">
        <v-card>
          <v-card-title>
            Lesson Saved!
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="modal=false">Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import {eventBus} from '@/main.js';

export default {
    data () {
        return {
            modal: false
        }
    },
    created () {
        eventBus.$on('openLessonModal', data => {
            this.modal = true;
        });
    }
}
</script>

<style>


</style>
