<template>
  <Carousel
    v-if="offers?.length"
    class="relative w-full container lg:max-w-7xl mx-auto"
  >
    <CarouselContent>
      <CarouselItem
        class="Offer items-center my-8 md:my-16 bg-primary/20"
        v-for="(offer, index) in offers"
        :key="index"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div class="p-6 sm:p-8">
            <h1
              data-aos="zoom-out"
              class="zoom-out ca capitalize text-4xl lg:text-7xl font-bold"
            >
              {{ offer.offer_title }}
            </h1>
          </div>

          <div data-aos="zoom-in" class="h-full flex items-center">
            <img
              :src="offer.offer_image"
              alt=""
              class="zoom-in opacity-0 scale- w-[250px] md:w-[340px] mx-auto drop-shadow-[-10px_10px_12px_rgba(0,0,0,.6)] object-cover"
            />
          </div>

          <div class="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <p
              data-aos="fade-up"
              class="offer-text text-3xl sm:text-5xl font-bold "
            >
              {{ offer.offer_price }} $
            </p>
            <div data-aos="fade-up" data-aos-offset="0">
              <RouterLink :to="`/product/${86}`">
                <Button variant="outline" class="offer-text text-foreground">
                  {{ $t("home.get_it_now") }}
                </Button>
              </RouterLink>
            </div>
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<script setup>
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Button from "./ui/button/Button.vue";

const data = {
  discount: "home.offers.offer-discount",
  title: "home.offers.offer-title",
  date: "home.offers.offer-date",
  title2: "home.offers.offer-title2",
  title3: "290 $",
  title4: "home.offers.offer-title4",
};

import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getOffers } from "@/services/api";
import { nextTick } from "vue";
import { watch } from "vue";
import { RouterLink } from "vue-router";

gsap.registerPlugin(ScrollTrigger);

const offers = ref([]);

watch(offers, (newData) => {
  if (newData.length > 0) {
    nextTick((a) => {
      gsap.from(".Offer", {
        scrollTrigger: {
          trigger: ".Offer",
          start: "top 75%",
          // toggleActions: "play pause restart reset",
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
      gsap.from(".offer-text", {
        scrollTrigger: {
          trigger: ".Offer",
          start: "top 70%",
          // toggleActions: "play pause restart reset",
        },
        opacity: 0,
        y: 50,
        delay: 0.2,
        duration: 0.8,
        stagger: 0.2,
      });
      gsap.from(".zoom-out", {
        scrollTrigger: {
          trigger: ".Offer",
          start: "top 70%",
          // toggleActions: "play pause restart reset",
        },
        opacity: 0,
        scale: 1.2,
        delay: 0.4,
        duration: 1,
      });

      gsap.to(".zoom-in", {
        scrollTrigger: {
          trigger: ".Offer",
          start: "top 65%",
          // toggleActions: 'play pause restart reset'
        },
        opacity: 1,
        scale: 1.3,
        delay: 0.1,
        duration: 1,
      });
    });
  }
});

onMounted(() => {
  getOffers().then((response) => {
    offers.value = response.data.data;
    // console.log(response);
  });
});
</script>
