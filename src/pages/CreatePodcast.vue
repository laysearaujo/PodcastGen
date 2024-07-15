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
          v-model="podcastName"
          label="Nome do Podcast"
          outlined
          :rules="[val => !!val || 'O nome é obrigatório']"
          class="q-mt-md"
          style="flex: 1;"
        />
        <!-- Botão com sombra removida -->
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
          v-model="releaseDate"
          type="date"
          label="Data de Lançamento"
          outlined
          :rules="[val => !!val || 'A data é obrigatória']"
          style="flex: 1;"
        />
        <q-select
          v-model="category"
          :options="categories"
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
import { ref } from 'vue'

const podcastName = ref('')
const releaseDate = ref('')
const category = ref(null)

const categories = [
  'Tecnologia',
  'Entretenimento',
  'Educação',
  'Notícias',
  'Esportes'
]

const handleSubmit = () => {
  if (podcastName.value && releaseDate.value && category.value) {
    console.log('Novo podcast criado:', {
      name: podcastName.value,
      date: releaseDate.value,
      category: category.value
    })
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
  box-shadow: none;
}

.q-btn:before {
  box-shadow: none !important; /* Remove a sombra do botão */
  box-shadow: none;
}

</style>