import { getCartItems } from "@/services/api";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

function updateLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export const useCartStore = defineStore("cart", () => {
  // state
  const loading = ref(false);

  const cartItems = ref(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  // getters
  const countCartItems = computed(() => cartItems.value.length);

  const totalAmount = computed(() =>
    cartItems.value.reduce((total, p) => {
      return total + p.product_price * p.quantity;
    }, 0)
  );

  const getItems = (userInfo) => {
    getCartItems(userInfo)
      .then((res) => {
        console.log(res.data.data.carts);
        cartItems.value = res.data.data.carts;
        // console.log((cartItems.value = res.data.data.carts));
        localStorage.setItem(
          "cart",
          JSON.stringify(cartItems.value)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //actions

  const itemLoading = (value) => {
    loading.value = value;
  };

  const addItem = (item) => {
    //Find the object whose id is similar to the item
    const existingItem = cartItems.value.find((x) => x.id === item.id);
    console.log(existingItem);

    if (!existingItem) {
      cartItems.value.push({ ...item, quantity: 1 });
    } else {
      existingItem.quantity++;
    }

    updateLocalStorage(cartItems.value);
  };

  // const addToFavorite = (product) => {
  //   product.favorite = !product.favorite
  // }

  const removeItem = (id) => {
    cartItems.value = cartItems.value.filter((x) => x.id !== id);
    updateLocalStorage(cartItems.value);
  };

  const clearItems = () => {
    cartItems.value = [];
    updateLocalStorage(cartItems.value);
  };

  const incrementQty = (item) => {
    const existingItem = cartItems.value.find((x) => x.id === item.id);
    existingItem.quantity += 1;
    updateLocalStorage(cartItems.value);
  };

  const decrementQty = (item) => {
    const existingItem = cartItems.value.find((x) => x.id === item.id);
    existingItem.quantity -= 1;
    if (existingItem.quantity === 0) {
      cartItems.value = cartItems.value.filter((x) => x.id !== item.id);
    }
    updateLocalStorage(cartItems.value);
  };

  // ${{ data.cartItems.reduce((acc,item) => acc += item.price * item.quantity,0) }}
  return {
    cartItems,
    addItem,
    removeItem,
    clearItems,
    totalAmount,
    countCartItems,
    incrementQty,
    itemLoading,
    loading,
    getItems,
    decrementQty,
  };
});

// getProductImg(image) {
//   return new URL(image, import.meta.url).href
// }
// }
// getProducts: (state) => {
//   return state.products
// },
// getFavoritesProducts: (state) => {
//   return state.products.filter((product) => product.favorite === true)
// }
