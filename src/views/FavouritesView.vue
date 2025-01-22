<script setup>
import Navbar from "@/components/Navbar.vue";
import BottomNav from "@/components/BottomNav.vue";
import Container from "@/layouts/Container.vue";
import Footer from "@/components/Footer.vue";
import { ref, onMounted } from "vue";
import { useFavoritesStore } from "@/stores/favouritesStore.js";
import { useAuthStore } from "@/stores/authStore";
import { getFavourites, removeFavouriteItem } from "@/services/api";
import Button from "@/components/ui/button/Button.vue";
import { useToast } from "@/components/ui/toast";
import Skeleton from "@/components/ui/skeleton/Skeleton.vue";

const favourites = ref([]);
const authStore = useAuthStore();
const favouriteStore = useFavoritesStore();
const { isInFavorites, favouriteItems } = favouriteStore;
const { toast } = useToast();


onMounted(() => {
  favouriteStore.getItems(authStore.userInfo);
});

function setFav(item) {
  if (authStore.isAuthenticated) {
    removeFavouriteItem({ id: item.product_id, user: authStore.userInfo })
      .then((res) => {
        if (res.status === 200) {
          favouriteStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.removed_from_fav",
            success: true,
            duration: 3000,
          });
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          favouriteStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.removed_from_fav",
            success: true,
            duration: 3000,
          });
        }
        if (!err.response) {
          toast({
            title: "network_error",
            error: true,
            duration: 3000,
          });
        }
      });
  }
}
</script>

<template>
  <!--  -->
  <Navbar />

  <BottomNav :baseRoute="'profile'">
    <template #base>
      {{ $t("home.nav.profile") }}
    </template>
    {{ $t("home.nav.favourites") }}
  </BottomNav>

  <!--  -->
  <Container>
    <div class="py-8 mb-8">
      <div class="grid md:grid-cols-2 md:gap-4 gap-6 md:gap-y-12">
        <div
          v-if="favouriteStore.favouriteItems?.length > 0"
          v-for="item in favouriteStore.favouriteItems"
          :key="item.id"
          class="bg-card shadow-md border max-w-lg p-4 relative"
        >
          <Button
            @click="setFav(item)"
            variant="outline"
            size="icon"
            class="favIcon rounded-full absolute top-4 end-4"
          >
            <svg
              :class="`size-5 ${
                isInFavorites(item.product_id)
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

          <div class="flex items-center gap-4 md:gap-6 items-">
            <div class="w-36 h-26 md:w-40 md:h-40">
              <img
                :src="item.image"
                alt="product-image"
                class="w-full rounded-lg h-full object-contain"
              />
            </div>

            <div class="space-y-2">
              <RouterLink :to="`/product/${item.id}`">
                <h2
                  class="text-lg font-bold text-foreground transition-all duration-300 hover:underline hover:text-primary"
                >
                  {{ item.product_name }}
                </h2>
              </RouterLink>
              <div class="flex items-center text-muted-foreground">
                <p class="text-base">{{ item.product_price }} $</p>
              </div>
            </div>
          </div>
        </div>

        <!-- <Skeleton v-else v-for="i in 4" class="fade-up h-48 w-full md:w-5/6" /> -->
      </div>

      <div
        v-if="favouriteStore.favouriteItems.length === 0"
        class="heroBg mb-8 md:mb-16 flex flex-col justify-center space-y-6 text-center items-center"
      >
        <div>
          <img
            src="/src/assets/empty_fav.svg"
            alt=""
            class="h-44 md:max-h-[200px] w-full mb-16"
          />
          <h3 class="text-xl md:text-2xl font-semibold text-foreground">
            {{ $t(`no_favourites`) }}
          </h3>

          <p class="text-base md:text-lg text-muted-foreground mt-2">
            {{ $t(`empty_fav_desc`) }}
          </p>
        </div>
        <RouterLink to="/">
          <Button variant="default" class="max-w-max">{{
            $t("shopping_cart.continue_shopping")
          }}</Button>
        </RouterLink>
      </div>
    </div>
  </Container>

  <Footer />
</template>
