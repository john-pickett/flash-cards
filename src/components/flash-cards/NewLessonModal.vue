<template>
    <v-dialog v-model="modal" max-width="500px">
        <v-card>
          <v-card-title>
            Lesson Saved!
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat @click.stop="closeModal">Close</v-btn>
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
    methods: {
        closeModal () {
            console.log('bye bye')
            this.modal = false;
            this.$store.dispatch('GRAB_LESSON_DATA');
            this.$router.push('/cards');
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
