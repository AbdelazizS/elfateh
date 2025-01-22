<script setup>
// import { Button } from '../components/ui/button'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import BottomNav from '@/components/BottomNav.vue'
import Container from '@/layouts/Container.vue'
import ProductCard from '@/components/ProductCard.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const newItems = ref([])

import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProductCategory } from '@/services/api'
import { Skeleton } from '@/components/ui/skeleton'

gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  getProductCategory(id)
    .then((res) => {
      newItems.value = res.data.data.products
    })
    .catch((err) => {
    })
  gsap.from('.fade-up', {
    scrollTrigger: {
      trigger: '.Categories',
      start: 'top 60%'
      // toggleActions: 'play pause restart reset'
    },
    y: 50,
    opacity: 0,
    delay: 0.4,
    duration: 0.7,
    stagger: 0.1
  })
})

const route = useRoute()
const id = Number(route.params.id)
</script>

<template>
  <!--  -->
  <Navbar />

  <BottomNav>
    {{ $t('category.category_products') }}
  </BottomNav>

  <section id="categories" class="Categories py-8 mb-8">
    <!-- Title -->

    <Container>
      <div class="mb-8">
        <h2 class="fade-up text-2xl md:text-3xl text-foreground text mb-8 tracking-wider font-bold">
          {{ $t('category.products') }}
        </h2>
        <div
          v-if="newItems?.length"
          class="justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6"
        >
          <ProductCard class="fade-up" v-for="item in newItems" :key="item.id" :item="item" />
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          <div v-for="item in 4" :key="item">
            <div
              class="p-card flex flex-col relative shadow-md overflow-hidden border rounded-lg w-full max-w-xs bg-card max-h-fit"
            >
              <Skeleton class="h-48 w-full rounded-none" />
              <div class="space-y-2 px-2 my-4">
                <Skeleton class="h-4 w-[250px]" />
                <Skeleton class="h-4 w-[200px]" />
              </div>
              <div class="px-2 mb-2">
                <Skeleton class="h-9 w-[150px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>

  <Footer />
</template>
