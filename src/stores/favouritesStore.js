import { defineStore } from "pinia";
import { ref, computed } from "vue";

import { useProductStore } from "./productStore";
import { getFavourites } from "@/services/api";

function updateLocalStorage(items) {
  localStorage.setItem("favourite_products", JSON.stringify(items));
}

export const useFavoritesStore = defineStore("favorites", () => {
  // state
  const favouriteItems = ref(
    localStorage.getItem("favourite_products")
      ? JSON.parse(localStorage.getItem("favourite_products"))
      : []
  );

  // getters
  // const isInFavorites = computed((e) => favouriteItems.value.some((product) => product.id === id))

  // ;

  // actions

  const getItems = (id) => {
    getFavourites(id)
      .then((res) => {
        favouriteItems.value = res.data.data.products_favorite;
        localStorage.setItem(
          "favourite_products",
          JSON.stringify(favouriteItems.value)
        );
      })
      .catch((err) => {
        if (err.status === 404) {
          favouriteItems.value = [];
          localStorage.setItem("favourite_products", JSON.stringify([]));
        }
      });
  };

  function isInFavorites(id) {
    return favouriteItems.value.some((product) => product.product_id === id);
  }

  function addToFavorites(item) {

    const existingItem = favouriteItems.value.find(
      (x) => x.product_id === item.id
    );
    // const productStore = useProductStore()
    if (!existingItem) {
      // const addedFavorite = productStore.products.find((product) => product.id === id)
      // favouriteItems.value.push({ ...item , product_id:item.id });
      updateLocalStorage(favouriteItems.value);
    } else {
      // favouriteItems.value = favouriteItems.value.filter(
      //   (x) => x.product_id !== item.id
      // );
      updateLocalStorage(favouriteItems.value);
    }
  }

  return { addToFavorites, isInFavorites, favouriteItems, getItems };
});
