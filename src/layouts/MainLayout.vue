<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      show-if-above
      bordered
      class="column q-pa-none"
      style="display: flex; flex-direction: column;"
    >
      <q-item-label header class="flex flex-center">
        <q-btn outline class="q-ma-xs" style="width: 75%; color: blue;" label="PODCAST" icon="add" size="lg" @click="goToCreatePodcast"/>
      </q-item-label>
      
      <div class="q-pa-none" style="flex: 1; overflow-y: auto;">
        <q-list class="q-mt-none q-mb-none">
          <q-item
            v-for="podcast in podcastsList"
            :key="podcast.id"
            clickable
            v-ripple
            class="justify-center"
            @click="goToPodcastDetail(podcast.id)"
          >
            <q-item-section>
              <q-item-label class="text-center text-h6" style="font-weight: normal;">{{ podcast.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      
      <div class="q-pa-md flex flex-center" style="margin-top: auto;">
        PODCASTGEN
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

defineOptions({
  name: 'MainLayout'
})

const podcastsList = ref([])
const router = useRouter()

// Função para redirecionar para detalhes do podcast
const goToPodcastDetail = (podcastId) => {
  router.push({ path: `/podcast/${podcastId}` })
}

// Função para redirecionar para a página de criação de podcast
const goToCreatePodcast = () => {
  router.push({ path: '/create' })
}

// Função para buscar a lista de podcasts da API
const fetchPodcasts = async () => {
  try {
    const response = await axios.get('https://podcast-gen-back.onrender.com/podcast')
    podcastsList.value = response.data
  } catch (error) {
    console.error('Erro ao buscar podcasts:', error)
  }
}

// Buscar podcasts ao montar o componente
onMounted(() => {
  fetchPodcasts()
})
</script>