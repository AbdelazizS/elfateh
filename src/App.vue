<template>
  <Toaster />
  <Preloader />
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { onBeforeMount, watch } from 'vue'
import i18n from '@/plugins/i18n'
import Preloader from './components/Preloader.vue'


import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favouritesStore'
import { useCartStore } from '@/stores/cart'
import { onMounted } from 'vue'


const authStore = useAuthStore();
const CartStore = useCartStore();
const favoritesStore = useFavoritesStore();




onMounted(() => {
  if(authStore.isAuthenticated){
    favoritesStore.getItems(authStore.userInfo)
    CartStore.getItems(authStore.userInfo)
  }

  
})



watch(i18n.global.locale , ()=>{
  if (i18n.global.locale.value === 'en') {
    document.documentElement.dir = 'ltr'
    document.documentElement.setAttribute('dir', 'ltr')
  } else {
    document.documentElement.dir = 'rtl'
    document.documentElement.setAttribute('dir', 'rtl')
  }
})

onBeforeMount(() => {
  if (i18n.global.locale.value === 'en') {
    document.documentElement.dir = 'ltr'
    document.documentElement.setAttribute('dir', 'ltr')
  } else {
    document.documentElement.dir = 'rtl'
    document.documentElement.setAttribute('dir', 'rtl')
  }
})
</script>
