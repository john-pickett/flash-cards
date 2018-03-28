<template>
    <v-dialog v-model="modal" max-width="500px">
        <v-card>
          <v-card-title>
            Score Saved!
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
import { eventBus } from '@/main.js';

export default {
    data () {
        return {
            modal: false
        }
    },
    methods: {
        closeModal: function () {
            this.modal = false;
            this.$store.dispatch('SET_CURRENT_LESSON', null);
        }
    },
    created () {
        eventBus.$on('openConfirm', data => {
            this.modal = true;
        });
    }
}
</script>

<style>

</style>
