<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xs12>
                <flash-cards></flash-cards>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs4>
                <v-card height="300px" class="flash-cards">
                    <timer></timer>
                </v-card>
            </v-flex>
            <v-flex xs8>
                <v-card height="300px" class="flash-cards">
                    <evaluate></evaluate>
                </v-card>
            </v-flex>
        </v-layout>    
    </v-container>
</template>

<script>
import { eventBus } from '@/main.js';
import axios from 'axios';

import FlashCards from '@/components/FlashCards';
import Timer from '@/components/Timer';
import Evaluate from '@/components/Evaluate';
export default {
    components: {
        FlashCards,
        Timer,
        Evaluate
    }
  
}
</script>

<style>


</style>
