<script setup>
// import { Button } from '../components/ui/button'
import Navbar from "@/components/Navbar.vue";
import BottomNav from "@/components/BottomNav.vue";
import Container from "@/layouts/Container.vue";
import Footer from "../components/Footer.vue";
// import { Badge } from '@/components/ui/badge'
import OrderCard from "@/components/OrderCard.vue";

import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOrders } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { ref } from "vue";
import { Skeleton } from "@/components/ui/skeleton";

gsap.registerPlugin(ScrollTrigger);

const orders = ref();
const authStore = useAuthStore();
onMounted(() => {
  getOrders(authStore.userInfo.id)
    .then((res) => {
      orders.value = res.data.data.orders;
    })
    .catch((err) => {});
  gsap.from(".fade-up", {
    scrollTrigger: {
      trigger: ".Orders",
      start: "top 60%",
      // toggleActions: 'play pause restart reset'
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
  });
});
</script>

<template>
  <!--  -->
  <Navbar />

  <BottomNav :baseRoute="'profile'">
    <template #base>
      {{ $t("home.nav.profile") }}
    </template>
    {{ $t("orders.orders") }}
  </BottomNav>

  <!--  -->

  <!--  -->
  <Container>
    <div class="Orders py-8 mb-16">
      <div class="grid md:grid-cols-2 md:gap-4 gap-6">
        <OrderCard
          v-if="orders"
          :order="order"
          v-for="order in orders"
          class="fade-up"
        />
        <Skeleton v-else v-for="i in 4" class="fade-up h-48 w-full md:w-5/6" />
      </div>

      <div
        v-if="orders?.length === 0"
        class="heroBg mb-8 md:mb-16 flex flex-col justify-center space-y-6 text-center items-center"
      >
        <div>
          <img
            src="/src/assets/empty_order.svg"
            alt=""
            class="h-44 md:max-h-[250px] w-full mb-16"
          />
          <h3 class="text-xl md:text-2xl font-semibold text-foreground">
            {{ $t(`orders.empty_orderes`) }}
          </h3>
        </div>
      </div>
    </div>
  </Container>

  <Footer />
</template>
