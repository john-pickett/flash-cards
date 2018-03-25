<template>
    <div>
        <span class="headline">Timer</span>
        <p class="card-text text-center">{{timeRemaining}}</p>
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
            timeRemaining: null
        }
    },
    methods: {
        timer () {
            var begin = new Date().getTime();
            var timesUp = begin + 30000;
    
            var x = setInterval( () => {
                var now = new Date().getTime();
                var timeLeft = timesUp - now;
            
                var secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);
                //   console.log('left: ' + secondsLeft);
                this.timeRemaining = secondsLeft
                
                if (timeLeft <= 1000) {
                    this.timeRemaining = "Time's Up!"
                    clearInterval(x);
                    // to FlashCards
                    eventBus.$emit('timeUp', true);
                    }
                }, 1000);
        },
        stopTimer () {
            this.timeRemaining = null;
            
        }
    },
    created () {
        // from setNewLesson in FlashCards
        eventBus.$on( 'startTimer', data => {
            this.timer();
        });
        eventBus.$on( 'stopTimer', data => {
            this.stopTimer();
        });
    }
}
</script>

<style lang="scss" scoped>
    
</style>