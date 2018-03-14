<template>
    <v-container grid-list-md text-xs-center>
        <h4>main</h4>
        <v-layout row wrap>
            <v-flex xs12>
                
                <flash-cards></flash-cards>
                
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs6>
                <v-card>
                    <timer></timer>
                </v-card>
            </v-flex>
            <v-flex xs6>
                <v-card>
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
