<script setup>
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'
import Products from '@/components/Products.vue'
import Categories from '@/components/Categories.vue'
import Footer from '@/components/Footer.vue'
import Cta from '@/components/Cta.vue'
import Promotion from '@/components/Promotion.vue'
import Offer from '@/components/Offer.vue'
import Services from '@/components/Services.vue'

import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getFeaturedProducts, getCategories, getProductCategory } from '@/services/api'
import { useAuthStore } from '@/stores/authStore'
import { useFavoritesStore } from '@/stores/favouritesStore'
import { useCartStore } from '@/stores/cart'


const authStore = useAuthStore();
const CartStore = useCartStore();
const favoritesStore = useFavoritesStore();

gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.set('.whatsIcon', { scale: 0.8, y: 60, opacity: 0 })
  gsap.to('.whatsIcon', {
    scrollTrigger: {
      trigger: 'section'
    },
    scale: 1,
    y: 0,
    opacity: 1,
    delay: 1.7,
    duration: 1,
    ease: 'power1.inOut'
  })
})
</script>

<template>
  <section class="heroBg">
    <Navbar id="header" class="navbar" />
    <Hero />
  </section>
  <Services />
  <Categories />
  <Promotion />
  <Products />
  <Offer />
  <Cta />

  <!-- <section
    data-aos="zoom-in"
    data-aos-delay="50"
    data-aos-duration="500"
    class="relative w-full bg-[#D8EEFE] py-12 rounded-xl shadow-[0_6px_30px_rgba(9,64,103,0.13)] mb-24 overflow-hidden"
  >
    <div class="relative z-10 flex flex-col items-center px-4 sm:px-8">
      <h3
        class="text text-2xl sm:text-3xl lg:text-4xl text-[#094067] text-center font-bold leading-tight px-0 lg:px-24 xl:px-48 mb-9"
      >
        Pengen Dapet Info Seputar Destinasi Wisata? Yuk Berlangganan Di Newsletter Kami
      </h3>
      <div
        class="w-full flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4"
      >
        <div
          class="px-6 py-4 w-full md:w-[550px] bg-white shadow-md rounded-md flex space-x-2 focus-within:ring-2 focus-within:ring-[#3DA9FC] ring-offset-2 transition duration-300"
        >
          <input
            class="w-full border-none outline-none focus:outline-none"
            type="text"
            placeholder="Tulis alamat email kamu disini"
          />
        </div>
        <button
          class="w-full sm:w-fit bg-[#EF4565] px-6 py-4 text-white font-bold shadow-md shadow-[rgba(239,69,101,0.25)] rounded-md hover:bg-[#d03753] transition-colors duration-300"
        >
          Subscribe
        </button>
      </div>
    </div>
    <div
      class="absolute top-[-140%] left-[-27%] w-[500px] h-[680px] border-8 border-[rgba(255,255,255,0.75)] rounded-full"
    ></div>
    <div
      class="absolute bottom-[-190%] left-[-25%] w-[500px] h-[680px] rotate-45 border-8 border-[rgba(255,255,255,0.75)] rounded-full"
    ></div>
    <div
      class="absolute top-[-140%] right-[-27%] w-[500px] h-[680px] border-8 border-[rgba(255,255,255,0.75)] rounded-full"
    ></div>
    <div
      class="absolute bottom-[-190%] right-[-16%] w-[500px] h-[680px] rotate-45 border-8 border-[rgba(255,255,255,0.75)] rounded-full"
    ></div>
  </section> -->
  <Footer />

  <a
    href="https://wa.me/+24911345959"
    class="whatsIcon cursor-pointer z-[100000000] btn-whatsapp-pulse btn-whatsapp-pulse-border"
  >
    <svg fill="#fff" class="w-8 h-8" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M54 9.90039C48.2 4.10039 40.3 0.900391 32.2 0.900391C15.2 0.900391 1.3 14.7004 1.3 31.7004C1.3 37.2004 2.7 42.4004 5.4 47.2004L1 63.1004L17.5 58.9004C22 61.3004 27.1 62.7004 32.3 62.7004C49.2 62.6004 63 48.8004 63 31.7004C63 23.5004 59.8 15.8004 54 9.90039ZM32.1 57.4004C27.6 57.4004 22.9 56.1004 19 53.7004L18 53.1004L8.3 55.6004L11 46.2004L10.4 45.2004C7.9 41.1004 6.5 36.3004 6.5 31.5004C6.5 17.4004 17.9 6.00039 32.1 6.00039C38.9 6.00039 45.3 8.70039 50.1 13.5004C54.9 18.3004 57.6 24.8004 57.6 31.7004C57.8 46.0004 46.2 57.4004 32.1 57.4004ZM46.2 38.2004C45.4 37.8004 41.7 35.9004 40.8 35.8004C40.1 35.5004 39.5 35.4004 39.1 36.2004C38.7 37.0004 37.1 38.6004 36.7 39.2004C36.3 39.6004 35.9 39.8004 35 39.3004C34.2 38.9004 31.8 38.2004 28.8 35.4004C26.5 33.4004 24.9 30.9004 24.6 30.0004C24.2 29.2004 24.5 28.9004 25 28.4004C25.4 28.0004 25.8 27.6004 26.1 27.0004C26.5 26.6004 26.5 26.2004 26.9 25.7004C27.3 25.3004 27 24.7004 26.8 24.3004C26.5 23.9004 25.1 20.1004 24.4 18.5004C23.8 16.9004 23.1 17.2004 22.7 17.2004C22.3 17.2004 21.7 17.2004 21.3 17.2004C20.9 17.2004 19.9 17.3004 19.3 18.2004C18.6 19.0004 16.6 20.9004 16.6 24.7004C16.6 28.5004 19.3 32.0004 19.8 32.7004C20.2 33.1004 25.3 41.0004 32.9 44.4004C34.7 45.2004 36.1 45.7004 37.3 46.1004C39.1 46.7004 40.8 46.5004 42.1 46.4004C43.6 46.3004 46.6 44.6004 47.3 42.7004C47.9 41.0004 47.9 39.3004 47.7 39.0004C47.5 38.8004 46.9 38.5004 46.2 38.2004Z"
      />
    </svg>
  </a>
</template>

<style>
.heroBg {
  background: url('/src/assets/squares-bg.jpg') no-repeat center;
  background-size: cover;
  background-size: cover;
  background-blend-mode: overlay;
}
.dark .heroBg {
  background: transparent;
}

.btn-whatsapp-pulse {
  background: #25d366;
  color: white;
  position: fixed;
  bottom: 1rem;

  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 0;
  height: 0; */
  padding: 16px;
  text-decoration: none;
  border-radius: 50%;
  animation-name: pulse;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5);
  }
  80% {
    box-shadow: 0 0 0 14px rgba(37, 211, 102, 0);
  }
}

.btn-whatsapp-pulse-border {
  bottom: 2rem;
  right: 2rem;
  animation-play-state: paused;
}

/* html[dir='rtl'].btn-whatsapp-pulse-border */

.btn-whatsapp-pulse-border::before {
  content: '';
  position: absolute;
  border-radius: 50%;
  padding: 25px;
  border: 5px solid #25d366;
  opacity: 0.75;
  animation-name: pulse-border;
  animation-duration: 1.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes pulse-border {
  0% {
    padding: 25px;
    opacity: 0.75;
  }
  75% {
    padding: 50px;
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
