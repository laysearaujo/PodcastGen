<template>
  <q-page class="q-pa-md flex flex-center">
    <q-form @submit="handleSubmit" class="q-gutter-md" style="width: 60%; max-width: 800px;">
      <div class="text-h6 q-mb-md">Criar Novo Podcast</div>

      <div class="q-mb-md flex" style="align-items: center; gap: 16px;">
        <div class="info-text" style="flex: 1; margin-right: 8px;">
          O nome do podcast 
          <br />
          ficará acessível para todos
        </div>
        <q-input
          v-model="title"
          label="Nome do Podcast"
          outlined
          :rules="[val => !!val || 'O título é obrigatório']"
          class="q-mt-md"
          style="flex: 1;"
        />
        <q-btn
          label="Criar"
          color="transparent"
          text-color="transparent"
          class="no-shadow-btn disabled-btn"
          style="flex-shrink: 0; cursor: default;"
        />
      </div>

      <div class="q-mb-md flex" style="align-items: baseline; gap: 16px;">
        <q-input
          v-model="period"
          type="date"
          label="Data de Lançamento"
          outlined
          :rules="[val => !!val || 'A data é obrigatória']"
          style="flex: 1;"
        />
        <q-input
          v-model="category"
          label="Categoria"
          outlined
          :rules="[val => !!val || 'A categoria é obrigatória']"
          style="flex: 1;"
        />
        <q-btn
          label="Criar"
          color="primary"
          type="submit"
          style="flex-shrink: 0;"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const title = ref('') // Título do Podcast
const category = ref('') // Categoria do Podcast
const period = ref('') // Período do Podcast

// Função para obter a data atual no formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Definir a data atual como valor inicial para o campo period
onMounted(() => {
  period.value = getCurrentDate()
})

const handleSubmit = async () => {
  if (title.value && category.value && period.value) {
    try {
      const response = await axios.post('https://podcast-gen-back.onrender.com/podcast', {
        title: title.value,
        category: category.value,
        period: period.value
      })
      console.log('Novo podcast criado:', response.data)
    } catch (error) {
      console.log(title.value, category.value, period.value)
      let titleType = typeof title.value;
      let categoryType = typeof category.value;
      let periodType = typeof period.value;
      console.log(titleType, categoryType, periodType)
      if (error.response) {
        // O servidor respondeu com um status diferente de 2xx
        console.error('Erro ao criar podcast:', error.response.data)
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        console.error('Erro ao criar podcast:', error.request)
      } else {
        // Algo deu errado na configuração da requisição
        console.error('Erro ao criar podcast:', error.message)
      }
    }
  } else {
    console.log('Preencha todos os campos obrigatórios.')
  }
}
</script>

<style scoped>
.info-text {
  font-size: 1rem; /* Tamanho da fonte */
  line-height: 1.5; /* Altura da linha */
  color: #444; /* Cor do texto */
  border-radius: 4px; /* Bordas arredondadas */
}

.no-shadow-btn {
  box-shadow: none !important; /* Remove a sombra do botão */
}

.q-btn:before {
  box-shadow: none !important; /* Remove a sombra do botão */
}
</style>