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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'MainLayout'
})
// Simula uma lista de podcasts
const podcastsList = ref([
  { id: 1, title: 'Podcast 1' },
  { id: 2, title: 'Podcast 2' },
  { id: 3, title: 'Podcast 3' },
  { id: 4, title: 'Podcast 4' },
  { id: 5, title: 'Podcast 5' },
  { id: 6, title: 'Podcast 6' },
  { id: 7, title: 'Podcast 7' },
  { id: 8, title: 'Podcast 8' },
  { id: 1, title: 'Podcast 1' },
  { id: 2, title: 'Podcast 2' },
  { id: 3, title: 'Podcast 3' },
  { id: 4, title: 'Podcast 4' },
  { id: 5, title: 'Podcast 5' },
  { id: 6, title: 'Podcast 6' },
  { id: 7, title: 'Podcast 7' },
  { id: 8, title: 'Podcast 8' },
])

const router = useRouter()

// Função para redirecionar para detalhes do podcast
const goToPodcastDetail = (podcastId) => {
  router.push({ path: `/podcast/${podcastId}` })
}

// Função para redirecionar para a página de criação de podcast
const goToCreatePodcast = () => {
  router.push({ path: '/create' })
}

</script>