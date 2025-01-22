<script setup>
import Navbar from "@/components/Navbar.vue";
import BottomNav from "@/components/BottomNav.vue";
import Container from "@/layouts/Container.vue";
import Footer from "@/components/Footer.vue";
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOrderDetails } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";
import { ref } from "vue";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

gsap.registerPlugin(ScrollTrigger);

const authStore = useAuthStore();
const route = useRoute();
const id = ref(route.params.id);
const details = ref();

onMounted(() => {
  getOrderDetails({
    order_id: id.value,
    userInfo: authStore.userInfo,
  })
    .then((res) => {
      details.value =  res.data.data.orders
    })
    .catch((err) => {
    });
  gsap.from(".fade-up", {
    scrollTrigger: {
      trigger: ".Orders_details",
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

  <BottomNav :baseRoute="'profile/orders'" :rootRoute="'profile'">
    <template #root>
      {{ $t("home.nav.profile") }}
    </template>
    <template #base>
      {{ $t("orders.orders") }}
    </template>
    {{ $t("orders.order_details") }}
  </BottomNav>

  <!--  -->
  <Container>
    <div class="py-8 md:mb-16 Orders_details">
      <div class="grid md:grid-cols-2 md:gap-4 gap-6">

        
        <div v-for="order in details" v-if="details" class="fade-up bg-card shadow-md border max-w-lg p-4 relative">
          <div
            class="bg-primary w-8 h-8 md:h-10 md:w-10 flex items-center justify-center rounded-full cursor-pointer absolute top-2 ltr:right-2 rtl:left-2 rtl:md:left-4 md:top-4 ltr:md:right-4 text-white font-bold"
          >
            {{ order.quantity }}
          </div>
          <div class="flex items-center gap-4 md:gap-6 items-">
            <div class="w-36 h-26 md:w-40 md:h-40">
              <img
                :src="order.image"
                alt="product-image"
                class="w-full rounded-lg h-full object-contain"
              />
            </div>

            <div class="space-y-2">
              <h2 class="text-lg font-bold text-foreground">
                {{ order.product_name  }}
              </h2>
              <div class="flex items-center text-muted-foreground">
                <p class="text-base">
                  {{ order.product_price }} $
                </p>
              </div>
            </div>
          </div>

          
        </div>

        <Skeleton v-else v-for="i in 4" class="fade-up h-48 w-full md:w-5/6" />
      </div>
    </div>
  </Container>

  <Footer />
</template>
