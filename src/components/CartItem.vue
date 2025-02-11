<!-- eslint-disable vue/no-dupe-keys -->
<script setup>
// import { Heart } from 'lucide-vue-next'
import { Button } from "./ui/button";
import { useCartStore } from "@/stores/cart.js";
import { useToast } from "@/components/ui/toast/use-toast";

import { useAuthStore } from "@/stores/authStore.js";
import { useFavoritesStore } from "@/stores/favouritesStore.js";
import Skeleton from "./ui/skeleton/Skeleton.vue";
import { ref } from "vue";
import {
  addCartItem,
  addFavouriteItem,
  removeCartItem,
  removeFavouriteItem,
  setCartItem,
} from "@/services/api";
const authStore = useAuthStore();
const CartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const { toast } = useToast();
const { removeItem, decrementQty, incrementQty, itemLoading } = CartStore;
const { addToFavorites, isInFavorites } = favoritesStore;
// import {storeToRefs} from 'pinia'
// const { cartItems } = storeToRefs(store)
// const { totalAmount, cartItems } = CartStore

function setFav() {
  if (authStore.isAuthenticated) {
    if (!isInFavorites(product_id)) {
      addFavouriteItem({ id: product_id, user: authStore.userInfo })
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
      removeFavouriteItem({ id: product_id, user: authStore.userInfo })
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

const loading = ref(false);

const handleDecrement = (item) => {
  itemLoading(true);
  loading.value = true;
  // decrementQty(item);

  if (authStore.isAuthenticated) {
    setCartItem({
      id: product_id,
      user: authStore.userInfo,
      quantity: props.item.quantity - 1,
    })
      .then((res) => {
        itemLoading(false);
        loading.value = false;
        if (res.data.success === true) {
          CartStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.removed_success",
            success: true,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        itemLoading(false);
        loading.value = false;
        if (!error.response) {
          toast({
            title: "network_error",
            error: true,
            duration: 3000,
          });
        }
      });
  } else {
    decrementQty(item);
    setTimeout(() => {
      toast({
        title: "shopping_cart.removed_success",
        success: true,
        duration: 3000,
      });
      itemLoading(false);
      loading.value = false;
    }, 2000);
  }
};

const handleIncrement = (item) => {
  itemLoading(true);
  if (authStore.isAuthenticated) {
    setCartItem({
      id: product_id,
      user: authStore.userInfo,
      quantity: props.item.quantity + 1,
    })
      .then((res) => {
        itemLoading(false);
        loading.value = false;
        if (res.data.success === true) {
          CartStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.added_success",
            success: true,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        itemLoading(false);
        loading.value = false;
        if (!error.response) {
          toast({
            title: "network_error",
            error: true,
            duration: 3000,
          });
        }
      });
  } else {
    incrementQty(item);
    setTimeout(() => {
      toast({
        title: "shopping_cart.added_success",
        success: true,
        duration: 3000,
      });
      itemLoading(false);
      loading.value = false;
    }, 2000);
  }
};
const removeFromCart = (item) => {
  if (authStore.isAuthenticated) {
    removeCartItem({ id: item.product_id, user: authStore.userInfo })
      .then((res) => {
        loading.value = false;
        if (res.data.success === true) {
          CartStore.getItems(authStore.userInfo);
          toast({
            title: "shopping_cart.removed_success",
            success: true,
            duration: 3000,
          });
        }
      })
      .catch((error) => {
        loading.value = false;
        if (!error.response) {
          toast({
            title: "network_error",
            error: true,
            duration: 3000,
          });
        }
      });
  } else {
    removeItem(item.id);
    setTimeout(() => {
      toast({
        title: "shopping_cart.removed_success",
        success: true,
        duration: 3000,
      });
    });
  }
};

const props = defineProps({
  item: Object,
  loading: Object,
});

const {
  item: { product_name, product_id, image },
} = props;
</script>
<template>
  <div class="rounded-lg border bg-card p-4 shadow-sm md:p-6">
    <div
      class="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0"
    >
      <a href="#" class="shrink-0 md:order-1">
        <img class="h-24 w-24 :hidden" :src="image" alt="imac image" />
        <img
          class="hidden h-20 w-20 :block"
          src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-.svg"
          alt="imac image"
        />
      </a>
      <div class="flex items-center justify-between md:order-3 md:justify-end">
        <div class="flex items-center">
          <Button
            variant="outline"
            class="h-6 p-2"
            @click="handleDecrement(item)"
            ><svg
              class="h-2.5 w-2.5 text-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h16"
              />
            </svg>
          </Button>

          <input
            type="text"
            id="counter-input"
            data-input-counter
            class="w-10 shrink-0 border-0 bg-transparent text text-sm font-medium text- focus:outline-none focus:ring-0 text-center"
            placeholder=""
            :value="props.item.quantity"
            required
          />
          <Button
            variant="outline"
            class="h-6 p-2"
            @click="handleIncrement(item)"
          >
            <svg
              class="h-2.5 w-2.5 text-foreground"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </Button>
        </div>
        <div class="Item text-end md:order-4 md:w-32">
          <p class="text-base font-bold text-foreground">
            <span v-if="!loading">
              ${{ props.item.product_price * props.item.quantity }}
            </span>
            <span v-else>
              <Skeleton class="ms-auto h-6 rounded-md w-[90px]" />
            </span>
          </p>
          <!-- <span class="text-sm">{{ price }}*{{ quantity }}</span> -->
        </div>
      </div>

      <div class="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
        <a
          href="#"
          class="text-lg md:text-xl font-semibold text-foreground hover:underline"
        >
          {{ product_name }}
        </a>

        <div class="flex items-center gap-4 abs">
          <Button
            @click="setFav(product_id)"
            variant="outline"
            size="icon"
            class="favIcon rounded-full"
          >
            <svg
              :class="`size-5 ${
                isInFavorites(product_id) ? 'fill-red-500 text-red-600 ' : ''
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
          </Button>
          <Button
            @click="
              removeFromCart(item)
            "
            variant="outline"
            size="icon"
            class="group rounded-full fill-bg-50 bg-red-50 dark:bg-red-300 transition-all duration-500 hover:bg-red-400 dark:hover:bg-red-500"
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle class="" cx="17" cy="17" r="17" fill="" />
              <path
                class="stroke-red-600 transition-all duration-500 group-hover:stroke-white"
                d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                stroke="#EF4444"
                stroke-width="1.6"
                stroke-linecap="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
