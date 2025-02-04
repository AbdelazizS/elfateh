<template>
  <Navbar />
  <!-- <BottomNav>{{ product.product_name }}</BottomNav> -->

  <Container v-if="product">
    <div class="P-Details py-8 md:py-16">
      <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Image -->
        <div class="space-y-4 text-center lg:sticky top-4 mx-auto lg:m-0">
          <Carousel
            class="relative w-full sm:max-w-xl"
            @init-api="(val) => (emblaMainApi = val)"
          >
            <CarouselContent>
              <CarouselItem v-for="(_, index) in 3" :key="index">
                <div class="p-1">
                  <Card
                    class="fade-left bg-prima sm:h-[450px] flex items-center justify-center"
                  >
                    <CardContent class="">
                      <img
                        :src="product.image"
                        alt="Product"
                        class="w-full max-h-full h-full object-cover object-center"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
            <!-- <CarouselPrevious /> -->
            <!-- <CarouselNext /> -->
          </Carousel>

          <Carousel
            class="relative w-full max-w-lg lg:max-w-xl"
            @init-api="(val) => (emblaThumbnailApi = val)"
          >
            <CarouselContent class="flex gap-1 ms-0 dir-rtl">
              <CarouselItem
                v-for="(_, index) in 3"
                :key="index"
                class="ps-0 basis-1/3 md:basis-1/4 cursor-pointer"
                @click="onThumbClick(index)"
              >
                <div
                  class="p-1"
                  :class="index === selectedIndex ? '' : 'opacity-50'"
                >
                  <Card>
                    <CardContent
                      class="flex aspect-square items-center justify-center p-2"
                    >
                      <img
                        :src="product.image"
                        alt="Product"
                        class="w-full max-h-full object-contain object-top"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>

        <!-- Details -->

        <div class="max-w-xl py-1 mx-auto lg:m-0">
          <!-- Title -->
          <div>
            <h2 class="fade-up text-2xl font-bold text-foreground">
              {{ product.product_name }}
            </h2>
            <p class="fade-up text-sm text-muted-foreground mt-2">
              {{ product.category.category_name }}
            </p>
          </div>

          <!-- Reviews -->
          <div class="flex items-center gap-4 mt-2 fade-up">
            <div class="flex items-center gap-1">
              <div class="flex items-center gap-.5">
                <svg
                  v-for="i in Math.round(product.rate_avg_rate)"
                  :key="i"
                  class="w-4 h-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
                <svg
                  v-if="stars !== 5"
                  v-for="i in 5 - Math.round(product.rate_avg_rate)"
                  :key="i"
                  class="w-4 h-4 text-border"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                  />
                </svg>
              </div>
              <p class="text-sm font-medium leading-none text-muted-foreground">
                {{ `${Math.round(product.rate_avg_rate)}` }}
              </p>
            </div>

            <a
              href="#"
              class="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"
            >
              <!-- ${{ product.rate_avg_rate }} -->
              {{ $t("product_details.reviews", { count: product.rate_count }) }}
            </a>
          </div>

          <!-- price -->
          <div class="mt-4 fade-up">
            <!-- <h3 class="text-foreground text-3xl font-bold">$30</h3> -->
            <div class="flex items-center gap-2">
              <p class="text-xl sm:text-2xl font-bold text-foreground">
                ${{ product.product_price }}
              </p>
              <p
                class="text-base font-medium h-6 line-through text-muted-foreground/50"
              >
                ${{ product.product_price_old }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-4 fade-up max-w-lg">
            <p class="text-muted-foreground">
              {{ product.product_description }}

              <!-- {{ $t("auth.strong_password") }} -->
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex flex-wrap gap-4 fade-up flex-col">
            <div class="flex flex-wrap gap-4 mt-8">
              <!-- <button
            Buy now
          </button> -->

              <Button
                class="gap-2 relative w-40 max-w-sm"
                @click="addToCart(product)"
              >
                <span :class="loading ? 'hidden' : ''">{{
                  $t(`home.add_to_cart`)
                }}</span>
                <ShoppingBag class="size-5" :class="loading ? 'hidden' : ''" />
                <Spinner v-if="loading" />
              </Button>

              <Button
                @click="setFav()"
                variant="outline"
                size="icon"
                class="favIcon rounded-full"
              >
                <svg
                  :class="`size-5 ${
                    isInFavorites(Number(route.params.id))
                      ? 'fill-red-500 text-red-600 '
                      : ''
                  }`"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                  />
                </svg>

                <!-- Add to Favorites -->
              </Button>
            </div>

            <!-- More Details -->
            <div class="mt-10 md:mt-12">
              <Tabs default-value="addreview" class="dir-rtl">
                <TabsList class="grid w-full grid-cols-2 pb-2 dir-rtl">
                  <TabsTrigger value="addreview">
                    {{ $t("product_details.addreview") }}
                  </TabsTrigger>
                  <TabsTrigger value="reviews">
                    {{ $t("product_details.reviews_") }}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="reviews">
                  <div class="mt-8 max-w-lg">
                    <h3 class="text-lg font-bold text-foreground">
                      {{ $t("product_details.customers_reviews") }}
                    </h3>

                    <div class="text-center my-4">
                      <h3 class="text-foreground font-bold text-5xl">
                        {{ `${Math.round(product.rate_avg_rate)}` }}
                      </h3>
                      <div class="flex justify-center space-x-1 mt-4">
                        <svg
                          v-for="i in Math.round(product.rate_avg_rate)"
                          :key="i"
                          class="w-4 h-4 text-yellow-300"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                          />
                        </svg>
                        <svg
                          v-if="stars !== 5"
                          v-for="i in 5 - Math.round(product.rate_avg_rate)"
                          :key="i"
                          class="w-4 h-4 text-border"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                          />
                        </svg>
                      </div>
                      <p
                        class="text-base text-muted-foreground font-semibold mt-2"
                      >
                        {{
                          $t("product_details.reviews", {
                            count: product.rate_count,
                          })
                        }}
                      </p>
                    </div>
                    <!-- <Button variant="outline" class="w-full">
                      {{ $t("product_details.read_all") }}
                    </Button> -->
                  </div>
                </TabsContent>
                <TabsContent value="addreview">
                  <Rating :id="route.params.id" />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <!-- Customer Review -->
        </div>
      </div>
    </div>
  </Container>

  <Container v-else>
    <Loader />
    <div class="P-Details py-8 md:py-16">
      <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-4">
        <div class="relative w-full">
          <div class="p-1 fade-up">
            <Skeleton
              class="CategoryCard h-[280px] sm:h-[450px] max-w-lg sm:w-full border rounded-sm shadow-sm"
            />
          </div>
        </div>

        <div class="p-1 lg:m-0">
          <!-- Title -->
          <div>
            <h2 class="fade-up text-2xl font-bold text-foreground">
              <Skeleton
                class="CategoryCard border rounded-sm shadow-sm h-8 w-48 md:h-12 md:w-64"
              />
            </h2>
            <p class="fade-up text-sm text-muted-foreground mt-4">
              <Skeleton
                class="CategoryCard border rounded-sm shadow-sm h-6 w-28 md:h-10 md:w-48"
              />
            </p>
          </div>

          <div class="mt-6 md:mt-8 fade-up">
            <div class="flex items-center gap-2">
              <Skeleton
                class="CategoryCard border rounded-sm shadow-sm h-5 w-36 md:h-8 md:w-48"
              />
              <Skeleton
                class="CategoryCard border rounded-sm shadow-sm h-5 w-36 md:h-8 md:w-48"
              />
            </div>
          </div>

          <p class="fade-up text-sm text-muted-foreground mt-6">
            <Skeleton
              class="CategoryCard border rounded-sm shadow-sm h-8 w-36 md:h-10 md:w-32"
            />
          </p>

          <!-- Description -->
          <div class="mt-6 md:mt-8 fade-up">
            <p class="text-muted-foreground">
              <Skeleton
                class="CategoryCard border rounded-sm shadow-sm h-28 w-80 md:h-36"
              />
            </p>
          </div>

          <!-- Customer Review -->
        </div>
      </div>
    </div>
  </Container>

  <!-- Related Products -->

  <Container>
    <div class="py-8 md:py-16 Related">
      <div class="py-8 md:py-16">
        <h2
          class="border-b pb-4 text-2xl md:text-3xl text-foreground font-semibold mb-6 md:mb-8 leading-tight"
        >
          {{ $t("product_details.related_products") }}
        </h2>

        <div
          class="justify-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-xl:gap-4 gap-6"
        >
          <div v-if="!product" v-for="item in 8" :key="item">
            <div
              class="p-card fade-up-card flex flex-col relative shadow-md overflow-hidden border rounded-lg w-full max-w-xs bg-card max-h-fit"
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

          <ProductCard
            v-else
            class="fade-up-card"
            v-for="item in newItems"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>
  </Container>

  <Footer />
</template>

<script setup>
import Loader from "@/components/Loader.vue";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar.vue";
import Container from "@/layouts/Container.vue";
import Footer from "@/components/Footer.vue";
import Rating from "@/components/Rating.vue";
import BottomNav from "@/components/BottomNav.vue";
import Spinner from "@/components/Spinner.vue";
import { Heart, ShoppingBag } from "lucide-vue-next";
import ProductCard from "@/components/ProductCard.vue";
import { ref, onMounted, watch } from "vue";
import { watchOnce } from "@vueuse/core";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRoute } from "vue-router";

import { useCartStore } from "@/stores/cart.js";
import { useFavoritesStore } from "@/stores/favouritesStore";
import { useAuthStore } from "@/stores/authStore";
import { useToast } from "@/components/ui/toast/use-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getProductDetails, getRelatedProducts } from "@/services/api";
import axios from "axios";
import { removeFavouriteItem } from "@/services/api";
import { addFavouriteItem } from "@/services/api";
import { addCartItem } from "@/services/api";

gsap.registerPlugin(ScrollTrigger);

const emblaMainApi = ref();
const emblaThumbnailApi = ref();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) return;
  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) return;

  onSelect();
  emblaMainApi.on("select", onSelect);
  emblaMainApi.on("reInit", onSelect);
});

const product = ref();
const stars = ref(2);
// const product = ref({})
const loading = ref(false);
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const authStore = useAuthStore();
const { addItem } = cartStore;
const { addToFavorites, isInFavorites } = favoritesStore;

const route = useRoute();
const { toast } = useToast();

watch(route, () => {
  getProductDetails(`${route.params.id}`)
    .then((res) => {
      product.value = res.data.data.products;
      getRelatedProducts({
        category_id: product.value.category_id,
        product_id: product.value.id,
        user: authStore.userInfo,
      })
        .then((res) => {
          newItems.value = res.data.data.products;
        })
        .catch((err) => {});
    })
    .catch((err) => {});
});

onMounted(() => {
  getProductDetails(`${route.params.id}`)
    .then((res) => {
      product.value = res.data.data.products;
      getRelatedProducts({
        category_id: product.value.category_id,
        product_id: product.value.id,
        user: authStore.userInfo,
      })
        .then((res) => {
          newItems.value = res.data.data.products;

          console.log(res ,'res');
          
        })
        .catch((err) => {
          console.log(err);
          
        });
    })
    .catch((err) => {});

  gsap.from(".fade-left", {
    scrollTrigger: {
      trigger: ".P-Details",
      start: "top 60%",
      // toggleActions: 'play pause restart reset'
    },
    x: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
  });
  gsap.from(".fade-up", {
    scrollTrigger: {
      trigger: ".P-Details",
      start: "top 60%",
      // toggleActions: 'play pause restart reset'
    },
    y: 50,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
  });
  gsap.from(".fade-up-card", {
    scrollTrigger: {
      trigger: ".Related",
      start: "top center",
      toggleActions: "play pause restart reset",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.2,
  });
});

const addToCart = (item) => {
  loading.value = true;

  if (authStore.isAuthenticated) {
    addCartItem({ id: item.id, user: authStore.userInfo })
      .then((res) => {

        loading.value = false;
        if (res.data.success === true) {
          // addItem(item);
          cartStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.added_success",
            success: true,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        loading.value = false;
        if (error.response.status = 400) {
          toast({
            title: "shopping_cart.item_exists",
            error: true,
            duration: 3000,
          });
        }
        if (!error.response) {
          toast({
            title: "network_error",
            error: true,
            duration: 3000,
          });
        }
      });
  } else {
    addItem(item);
    setTimeout(() => {
      loading.value = false;
      toast({
        title: "shopping_cart.added_success",
        success: true,
        duration: 3000,
      });
    }, 1800);
  }
};

function setFav() {
  if (authStore.isAuthenticated) {
    if (!favoritesStore.isInFavorites(Number(route.params.id))) {
      addFavouriteItem({ id: route.params.id, user: authStore.userInfo })
        .then((res) => {
          if (res.data.success === true) {
            favoritesStore.getItems(authStore.userInfo);
            toast({
              title: "shopping_cart.added_to_fav",
              success: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          if (!err.response) {
            toast({
              title: "network_error",
              error: true,
              duration: 3000,
            });
          }
        });
    } else {
      removeFavouriteItem({ id: route.params.id, user: authStore.userInfo })
        .then((res) => {
          if (res.data.success === true) {
            favoritesStore.getItems(authStore.userInfo);
            toast({
              title: "shopping_cart.removed_from_fav",
              success: true,
              duration: 3000,
            });
          }
        })
        .catch((err) => {
          if (!err.response) {
            toast({
              title: "network_error",
              error: true,
              duration: 3000,
            });
          }
        });
    }
  } else {
    toast({
      title: "shopping_cart.requireAuth",
      error: true,
      duration: 3000,
    });
  }
}

// const fetchProduct = () => {
//   const item = products.find((x) => x.id === id)
//   product.value = item
// }
// onMounted(() => {
//   fetchProduct()
// })

const newItems = ref([
  // {
  //   title: "Mega LCD TV For Sports",
  //   id: 1,
  //   price: 440,
  //   pre_price: 500,
  //   img: "../assets/pc.png",
  //   category: "Computers",
  //   stars: 4,
  // },
  // {
  //   title: "Apple Watch",
  //   id: 2,
  //   img: "../assets/watch.png",
  //   category: "Accessories",
  //   price: 240,
  //   pre_price: 400.0,
  //   stars: 2,
  // },
  // {
  //   title: "Iphone X",
  //   id: 3,
  //   img: "../assets/squares-bg.png",
  //   category: "Phones",
  //   price: 840,
  //   pre_price: 900.0,
  //   stars: 3,
  // },
]);
</script>
