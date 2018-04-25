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
                                value="feminine"
                                
                            ></v-select>
                            <noun-table :gender="chosenGender"></noun-table>
                        </v-flex>
                        <v-flex xs6 class="pl-5">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>puella, <em>fem</em></th>
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
                                            <input type="text" name="mynom" id="fem0" class="mytext"
                                            @focus="onFocus($event)" @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem0correct" class="answerspan">Correct</span>
                                                <span id="fem0wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mynomp" id="fem1" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem1correct" class="answerspan">Correct</span>
                                                <span id="fem1wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Genitive</td>
                                        <td>
                                            <input type="text" name="mygen" id="fem2" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem2correct" class="answerspan">Correct</span>
                                                <span id="fem2wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mygenp" id="fem3" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem3correct" class="answerspan">Correct</span>
                                                <span id="fem3wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Dative</td>
                                        <td>
                                            <input type="text" name="mydat" id="fem4" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem4correct" class="answerspan">Correct</span>
                                                <span id="fem4wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="mydatp" id="fem5" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem5correct" class="answerspan">Correct</span>
                                                <span id="fem5wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Accusative</td>
                                        <td>
                                            <input type="text" name="myacc" id="fem6" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem6correct" class="answerspan">Correct</span>
                                                <span id="fem6wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myaccp" id="fem7" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem7correct" class="answerspan">Correct</span>
                                                <span id="fem7wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Ablative</td>
                                        <td>
                                            <input type="text" name="myabl" id="fem8" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem8correct" class="answerspan">Correct</span>
                                                <span id="fem8wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myablp" id="fem9" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem9correct" class="answerspan">Correct</span>
                                                <span id="fem9wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top">Vocative</td>
                                        <td>
                                            <input type="text" name="myvoc" id="fem10" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem10correct" class="answerspan">Correct</span>
                                                <span id="fem10wrong" class="answerspan">Wrong</span>
                                            </div>
                                        </td>
                                        <td>
                                            <input type="text" name="myvocp" id="fem11" class="mytext"
                                            @focus="onFocus($event)"  @keyup="watchEntry($event)"
                                            @blur="validateEntry($event)"
                                            />
                                            <div class="spancon">
                                                <span id="fem11correct" class="answerspan">Correct</span>
                                                <span id="fem11wrong" class="answerspan">Wrong</span>
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
            chosenGender: 'feminine',
            femAnswers: [ 'puella', 'puellae', 'puellae', 'puellarum', 'puellae', 'puellis', 'puellam', 'puellas',
                'puella', 'puellis', 'puella', 'puellae' ]
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
            if (elem.value === this.femAnswers[counter]) {
                elem.classList.add('mytextcorrect')
                let correctSpan = document.getElementById('fem' + counter + 'correct');
                correctSpan.classList.remove('answerspan')
                correctSpan.classList.add('spancorrect')
                let wrongSpan = document.getElementById('fem' + counter + 'wrong');
                wrongSpan.classList.remove('spanwrong');
                wrongSpan.classList.add('answerspan');
                let next = document.getElementById('fem' + (parseInt(counter) + 1));
                next.focus();
            } else if (elem.value.length >= this.femAnswers[counter].length) {
                console.log('wrong')
                elem.classList.add('mytextwrong');
                let thisSpan = document.getElementById('fem' + counter + 'wrong');
                thisSpan.classList.remove('answerspan')
                thisSpan.classList.add('spanwrong')
            }
        },
        validateEntry: function (event) {
            // console.log('validateEntry')
            let elem = document.getElementById(event.target.id);
            let counter = elem.id.slice(3);
            // console.log(counter)
            if (elem.value === this.femAnswers[counter]) {
                elem.classList.add('mytextcorrect')
            } else {
                elem.classList.add('mytextwrong')
            }
        }
    },
    watch: {

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
