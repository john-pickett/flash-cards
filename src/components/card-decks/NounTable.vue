<template>
    <table>
        <thead>
            <tr>
                <th></th>
                <th colspan="2" v-if="gender.toLowerCase() === 'feminine'">Feminine</th>
                <th colspan="2" v-if="gender.toLowerCase() === 'masculine'">Masculine</th>
                <th colspan="2" v-if="gender.toLowerCase() === 'neuter'">Neuter</th>
            </tr>
            <tr>
                <th></th>
                <th v-if="gender.toLowerCase() === 'feminine'">Singular</th>
                <th v-if="gender.toLowerCase() === 'feminine'">Plural</th>
                <th v-if="gender.toLowerCase() === 'masculine'">Singular</th>
                <th v-if="gender.toLowerCase() === 'masculine'">Plural</th>
                <th v-if="gender.toLowerCase() === 'neuter'">Singular</th>
                <th v-if="gender.toLowerCase() === 'neuter'">Plural</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Nominative</td>
                <td v-if="gender.toLowerCase() === 'feminine'">a</td>
                <td v-if="gender.toLowerCase() === 'feminine'">ae</td>
                <td v-if="gender.toLowerCase() === 'masculine'">us/r</td>
                <td v-if="gender.toLowerCase() === 'masculine'">i</td>
                <td v-if="gender.toLowerCase() === 'neuter'">um</td>
                <td v-if="gender.toLowerCase() === 'neuter'">a</td>
            </tr>
            <tr>
                <td>Genitive</td>
                <td v-if="gender.toLowerCase() === 'feminine'">ae</td>
                <td v-if="gender.toLowerCase() === 'feminine'">arum</td>
                <td v-if="gender.toLowerCase() === 'masculine'">i</td>
                <td v-if="gender.toLowerCase() === 'masculine'">orum</td>
                <td v-if="gender.toLowerCase() === 'neuter'">i</td>
                <td v-if="gender.toLowerCase() === 'neuter'">orum</td>
            </tr>
            <tr>
                <td>Dative</td>
                <td v-if="gender.toLowerCase() === 'feminine'">ae</td>
                <td v-if="gender.toLowerCase() === 'feminine'">is</td>
                <td v-if="gender.toLowerCase() === 'masculine'">o</td>
                <td v-if="gender.toLowerCase() === 'masculine'">is</td>
                <td v-if="gender.toLowerCase() === 'neuter'">o</td>
                <td v-if="gender.toLowerCase() === 'neuter'">is</td>
            </tr>
            <tr>
                <td>Accusative</td>
                <td v-if="gender.toLowerCase() === 'feminine'">am</td>
                <td v-if="gender.toLowerCase() === 'feminine'">as</td>
                <td v-if="gender.toLowerCase() === 'masculine'">um</td>
                <td v-if="gender.toLowerCase() === 'masculine'">os</td>
                <td v-if="gender.toLowerCase() === 'neuter'">um</td>
                <td v-if="gender.toLowerCase() === 'neuter'">a</td>
            </tr>
            <tr>
                <td>Ablative</td>
                <td v-if="gender.toLowerCase() === 'feminine'">a</td>
                <td v-if="gender.toLowerCase() === 'feminine'">is</td>
                <td v-if="gender.toLowerCase() === 'masculine'">o</td>
                <td v-if="gender.toLowerCase() === 'masculine'">is</td>
                <td v-if="gender.toLowerCase() === 'neuter'">o</td>
                <td v-if="gender.toLowerCase() === 'neuter'">is</td>
            </tr>
            <tr>
                <td>Vocative</td>
                <td v-if="gender.toLowerCase() === 'feminine'">a</td>
                <td v-if="gender.toLowerCase() === 'feminine'">ae</td>
                <td v-if="gender.toLowerCase() === 'masculine'">e, i</td>
                <td v-if="gender.toLowerCase() === 'masculine'">i</td>
                <td v-if="gender.toLowerCase() === 'neuter'">um</td>
                <td v-if="gender.toLowerCase() === 'neuter'">a</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ['gender']
}
</script>

<style>
    table {
        text-align: center;
    }

    th, td {
        padding: 3px;
    }

    th, td {
        font-size: 18px;
    }
</style>
