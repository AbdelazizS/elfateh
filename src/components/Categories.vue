<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import CategoryCard from './CategoryCard.vue'
import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/layouts/Container.vue'
import { ref } from 'vue'
import { gsap } from 'gsap'
import { onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { getCategories } from '@/services/api'

const items = ref([])
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  getCategories()
    .then((res) => {
      items.value = res.data.data.category
    })
    .catch((err) => {
    })

  gsap.from('.fade-up-txt-Categories', {
    scrollTrigger: {
      trigger: '.Categories',
      start: 'top 80%'
      // toggleActions: 'play pause restart reset'
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.2
  })
})
</script>

<template>
  <section id="categories" class="my-16 md:my-24 Categories">
    <!-- Title -->
    <Container>
      <div class="mb-8">
        <h2
          class="fade-up-txt-Categories text-2xl md:text-3xl text-foreground tracking-wider font-bold"
        >
          {{ $t(`home.categories`) }}
        </h2>

        <p class="fade-up-txt-Categories text-base md:text-xl text-muted-foreground mt-2">
          {{ $t(`home.categories_desc`) }}
        </p>
      </div>

      <!-- Grid List -->

      <div
        v-if="!items.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
      >
        <Skeleton class="CategoryCard h-48 w-full max-w-xs border rounded-sm shadow-md" />
        <Skeleton class="CategoryCard h-48 w-full max-w-xs border rounded-sm shadow-md" />
        <Skeleton class="CategoryCard h-48 w-full max-w-xs border rounded-sm shadow-md" />
      </div>

      <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div v-for="item in items" :key="item">
          <CategoryCard :item="item" />
        </div>
      </div>
    </Container>
  </section>
</template>
