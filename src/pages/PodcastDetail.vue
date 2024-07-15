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
              {{ podcast.releaseDate }}
            </q-chip>
          </div>
        </div>
  
        <!-- Container flexível para centralizar o áudio e o botão de download -->
        <div class="audio-container q-mb-md">
          <audio controls :src="podcast.audioUrl" class="audio-player">
            Seu navegador não suporta o elemento <code>audio</code>.
          </audio>
          <q-btn
            icon="download"
            :href="podcast.audioUrl"
            download
            class="download-btn"
            flat
          />
        </div>
  
        <div class="text-h6 q-mb-sm">Transcrição:</div>
        <pre class="q-mb-md">{{ podcast.transcription }}</pre>
      </div>
    </q-page>
</template>
  
<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const podcast = ref({
  title: 'Podcast de Teste', 
  category: 'Tecnologia',
  releaseDate: '2024-07-15',
  transcription: 'Esta é uma transcrição de exemplo para o podcast de teste.',
  audioUrl: 'https://www.example.com/audio/test-podcast.mp3',
  id: 23
})
  
  onMounted(() => {
    // Simulação de recuperação dos dados do podcast
    const podcastId = route.params.id
    // Aqui você pode adicionar lógica para modificar o podcast com base no ID, se necessário
    console.log(`Recuperando detalhes para o podcast com ID: ${podcastId}`)
  })
</script>

<style scoped>
/* Estilo para o container do áudio e botão de download */
.audio-container {
  width: 60vw; /* Define a largura do container de áudio para 70% da largura da tela */
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
</style>