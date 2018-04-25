<template>
    <v-container>
        <v-layout row>
            <v-flex xs12>
                <v-card class="pa-3">
                    <v-layout row>
                        <v-flex xs6 sm4>
                            <span>Nouns</span>
                            <v-select
                                :items="genders"
                                label="Choose Gender"
                                v-model="chosenGender"
                                single-line
                            ></v-select>
                            <noun-table :gender="chosenGender"></noun-table>
                        </v-flex>
                        <v-flex xs6 class="pl-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Vocab Word: {{exampleWord}}</th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Singular</th>
                                        <th>Plural</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td valign="top">Nominative</td>
                                        <td>
                                            <input type="text" name="mynom" id="ans0" class="mytext"
                                            @focus="onFocus($event)" @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans0correct" class="answerspan">Correct</span>
                                                <span id="ans0wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mynomp" id="ans1" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans1correct" class="answerspan">Correct</span>
                                                <span id="ans1wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Genitive</td>
                                        <td>
                                            <input type="text" name="mygen" id="ans2" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans2correct" class="answerspan">Correct</span>
                                                <span id="ans2wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mygenp" id="ans3" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans3correct" class="answerspan">Correct</span>
                                                <span id="ans3wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Dative</td>
                                        <td>
                                            <input type="text" name="mydat" id="ans4" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans4correct" class="answerspan">Correct</span>
                                                <span id="ans4wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mydatp" id="ans5" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans5correct" class="answerspan">Correct</span>
                                                <span id="ans5wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Accusative</td>
                                        <td>
                                            <input type="text" name="myacc" id="ans6" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans6correct" class="answerspan">Correct</span>
                                                <span id="ans6wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myaccp" id="ans7" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans7correct" class="answerspan">Correct</span>
                                                <span id="ans7wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Ablative</td>
                                        <td>
                                            <input type="text" name="myabl" id="ans8" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans8correct" class="answerspan">Correct</span>
                                                <span id="ans8wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myablp" id="ans9" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans9correct" class="answerspan">Correct</span>
                                                <span id="ans9wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Vocative</td>
                                        <td>
                                            <input type="text" name="myvoc" id="ans10" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans10correct" class="answerspan">Correct</span>
                                                <span id="ans10wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myvocp" id="ans11" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="ans11correct" class="answerspan">Correct</span>
                                                <span id="ans11wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import NounTable from './NounTable'
export default {
    components: {
        NounTable
    },
    data () {
        return {
            genders: ['Feminine', 'Masculine', 'Neuter'],
            exampleWord: 'puella',
            chosenGender: 'Feminine',
            femAnswers: [ 'puella', 'puellae', 'puellae', 'puellarum', 'puellae', 'puellis', 'puellam', 'puellas',
                'puella', 'puellis', 'puella', 'puellae' ],
            mascAnswers: [ 'hortus', 'horti', 'horti', 'hortorum', 'horto', 'hortis', 'hortum', 'hortos', 'horto', 
                'hortis', 'horte', 'horti'],
            neuAnswers: [ 'regnum', 'regna', 'regni', 'regnorum', 'regno', 'regnis', 'regnum', 'regna', 'regno',
                'regnis', 'regnum', 'regna']
        }
    },
    methods: {
        onFocus: function (event) {
            // console.log('onfocus' + event.target.id)
            let elem = document.getElementById(event.target.id)
            // elem.classList.add('purple');

        },
        watchEntry: function (event) {
            let elem = document.getElementById(event.target.id);
            let counter = elem.id.slice(3);
            let answers;
            if (this.chosenGender === 'Feminine') {
                answers = this.femAnswers
            } else if (this.chosenGender === 'Masculine') {
                answers = this.mascAnswers
            } else if (this.chosenGender === 'Neuter') {
                answers = this.neuAnswers
            }

            if (elem.value === answers[counter]) {
                elem.classList.add('mytextcorrect')
                let correctSpan = document.getElementById('ans' + counter + 'correct');
                correctSpan.classList.remove('answerspan')
                correctSpan.classList.add('spancorrect')
                let wrongSpan = document.getElementById('ans' + counter + 'wrong');
                wrongSpan.classList.remove('spanwrong');
                wrongSpan.classList.add('answerspan');
                let next = document.getElementById('ans' + (parseInt(counter) + 1));
                next.focus();
            } else if (elem.value.length >= answers[counter].length) {
                console.log('wrong')
                elem.classList.add('mytextwrong');
                let thisSpan = document.getElementById('ans' + counter + 'wrong');
                thisSpan.classList.remove('answerspan')
                thisSpan.classList.add('spanwrong')
            }
        },
        validateEntry: function (event) {
            // console.log('validateEntry')
            let elem = document.getElementById(event.target.id);
            let counter = elem.id.slice(3);
            // console.log(counter)
            // if (elem.value === this.femAnswers[counter]) {
            //     elem.classList.add('mytextcorrect')
            // } else {
            //     elem.classList.add('mytextwrong')
            // }
        }
    },
    watch: {
        chosenGender: function () {
            if (this.chosenGender === 'Feminine') {
                this.exampleWord = 'puella'
            } else if (this.chosenGender === 'Masculine') {
                this.exampleWord = 'hortus'
            } else if (this.chosenGender === 'Neuter') {
                this.exampleWord = 'regnum'
            }
        }
    }
}
</script>

<style>
    .vocab {
        font-size: 18px;
        text-align: center;
    }

    span {
        font-size: 16px;
    }

    .left-col {
        margin-right: 5px;
    }

    .mytext {
        padding-top: 2px;
        border-bottom: 1px solid gray;
        padding-bottom: 1px;
    }

    .mytext:focus {
        outline: none;
        border-bottom: 2px solid gray;
        padding-bottom: 0px;
    }

    .mytextfocus {
        outline: none;
        border-bottom: 2px solid #2985FA;
        padding-bottom: 0px;
    }

    .mytextwrong {
        outline: none;
        border-bottom: 2px solid red !important;
        padding-bottom: 0px;
    }

    .mytextcorrect {
        outline: none;
        border-bottom: 2px solid green !important;
        padding-bottom: 0px;
    }

    .spancon {
        min-height: 20px;
    }

    .answerspan {
        visibility: hidden;
    }

    .spancorrect {
        visibility: visible !important;
        color: green;
    }

    .spanwrong {
        visibility: visible !important;
        color: red;
    }

</style>
