<template>
  <!-- Modal Component -->
        <modal v-if="showModal"> 
            <div slot="body">
                <div class="md-layout-row">
                    <h2>High Scores</h2>
                    <div class="md-layout">
                        <div class="md-layout-item md-size-50">
                        <ul v-for="item in highScores">
                            <li>{{item.name}} : {{item.score}}</li>
                        </ul>
                        </div>
                        <div class="md-layout-item md-size-50">
                            <h2>Save Your Score</h2>
                            <p>You scored {{currentScore}} points!</p>
                            <md-field>
                                <label>Enter Your Name</label>
                                <md-input v-model="userName"></md-input>
                            </md-field>
                        </div>
                        <md-button @click="saveScore" class="md-raised">Save</md-button>
                        <md-button @click="toggleModal" class="md-raised">Close</md-button>
                    </div>
                </div>
            </div>
        </modal>
</template>

<script>
export default {
  
}
</script>

<style>

</style>
