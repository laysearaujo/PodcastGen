<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <div class="q-mb-md flex items-center justify-between q-mt-lg">
        <div class="text-h4">
          {{ podcast.title }}
        </div>
        <div class="flex gap-md">
          <q-chip class="q-mb-sm" color="primary" text-color="white">
            {{ podcast.category }}
          </q-chip>
          <q-chip class="q-mb-sm" color="secondary" text-color="white">
            {{ podcast.period }}
          </q-chip>
        </div>
      </div>

      <!-- Container flexível para centralizar o áudio e o botão de download -->
      <div class="audio-container q-mb-md">
        <audio controls :src="podcast.audioUrl" class="audio-player">
          Seu navegador não suporta o elemento <code>audio</code>.
        </audio>
        <a :href="podcast.audioUrl" download>
          <q-btn
            icon="download"
            class="download-btn"
            flat
          />
        </a>
      </div>

      <div class="text-h6 q-mb-sm">Transcrição:</div>
      <div class="summary">{{ podcast.summary }}</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const podcast = ref({})

// Função para buscar os detalhes do podcast
const fetchPodcastDetails = async (podcastId) => {
  try {
    const response = await axios.get(`https://podcast-gen-back.onrender.com/podcast/${podcastId}`)
    podcast.value = response.data
    console.log(podcast.value)
  } catch (error) {
    console.error('Erro ao buscar detalhes do podcast:', error)
  }
}

// Observar mudanças no parâmetro de rota `id` e buscar os detalhes do podcast
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchPodcastDetails(newId)
  }
})

// Buscar detalhes do podcast ao montar o componente
onMounted(() => {
  const podcastId = route.params.id
  if (podcastId) {
    fetchPodcastDetails(podcastId)
  }
})
</script>

<style scoped>
/* Estilo para o container do áudio e botão de download */
.audio-container {
  width: 60vw; /* Define a largura do container de áudio para 60% da largura da tela */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem auto; /* Adiciona uma margem superior maior e centraliza horizontalmente o container */
}

.audio-player {
  flex: 1; /* Faz o player de áudio ocupar o máximo de espaço disponível */
}

.download-btn {
  background: transparent; /* Remove o fundo */
  color: inherit; /* Usa a cor do texto atual */
  border: none; /* Remove a borda */
  box-shadow: none; /* Remove a sombra */
  cursor: pointer; /* Muda o cursor para indicar um botão */
  flex-shrink: 0; /* Impede o botão de encolher */
}

/* Estilo para a transcrição */
.summary {
  white-space: pre-wrap; /* Faz o texto quebrar automaticamente e preservar espaços em branco */
  word-wrap: break-word; /* Faz o texto quebrar na borda da caixa, se necessário */
}
</style>