<template>
    <div>
        <p class="headline">Scoring</p>
        <span class="card-text">Your Score: {{score}}</span>
        <span v-if="answerCorrect === true" class="card-text">Correct!</span>
        <span v-if="answerCorrect === false" class="card-text">Nope!</span>
    </div>
</template>

<script>
/* eslint-disable */
import { eventBus } from '@/main.js';

export default {
    components: {

    },
    data () {
        return {
            answerCorrect: null,
            score: 0
        }
    },
    methods: {
        resetEval: function () {
            let that = this;
            setTimeout(function () {
                that.answerCorrect = null;
            }, 1000);
        }
    },
    created () {
        eventBus.$on( 'answerPicked', data => {
            this.score = data[1];
            if (data[0] === true) {
                this.answerCorrect = true;
                this.resetEval();
            } else {
                this.answerCorrect = false;
                this.resetEval();
            }
        });
        eventBus.$on( 'scoreReset', data => {
            this.score = data;
        });
    }
}
</script>

<style>

</style>
