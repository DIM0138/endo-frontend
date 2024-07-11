<script setup>
import api from '@/services/api';
import { onBeforeMount, ref } from 'vue';


const { paciente } = defineProps(['paciente']);

const relatorios = ref([]);
const relatoriosProcessados = ref([]);

const getRelatorios = (async () => {
    await api.get('/enutri/relatorios/paciente/' + paciente.id)
        .then((response) => {
            relatorios.value = response.data;
            relatoriosProcessados.value = processData(relatorios.value);
        })
        .catch((error) => {
            console.error(error);
        })
})

const processData = (data) => {
    const reorganizedData = {}
    for (const relatorio of data) {
        for (const medicao of relatorio.medicoes) {
            const { nome, unidade } = medicao.medicao
            const key = `${nome} - ${unidade}`
            if (!reorganizedData[key]) {
                reorganizedData[key] = {
                    nome,
                    unidade,
                    medicoes: []
                }
            }
            reorganizedData[key].medicoes.push({
                data_consulta: relatorio.data_consulta,
                valor: medicao.valor
            })
        }
    }

    const organizedData = Object.values(reorganizedData).map(medicao => ({
        nome: medicao.nome,
        unidade: medicao.unidade,
        medicoes: medicao.medicoes
    }))


    organizedData.forEach(medicao => {
        medicao.medicoes.sort((a, b) => new Date(a.data_consulta) - new Date(b.data_consulta));
    });

    return organizedData;
}

onBeforeMount(() => {
    getRelatorios();
})
</script>

<template>
    <div>
        <div v-for="(relatorio, relatorioIndex) in relatoriosProcessados" :key="relatorioIndex">
            <h4>{{ relatorio.nome }}</h4>

            <table class="table table-responsive">
                <thead>
                    <tr>
                        <th v-for="medicao in relatorio.medicoes" :key="medicao.data_consulta">{{ new
            Date(medicao.data_consulta).toLocaleDateString('pt-BR') }}
                        </th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td v-for="medicao in relatorio.medicoes" :key="medicao.data_consulta">{{ medicao.valor }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped></style>