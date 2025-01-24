import axios from "axios";
const host = import.meta.env.VITE_BASE_API_URL;
const baseURL = `${host}`;

export const instance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const search = (searchQuery) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("search", {
        product_name: searchQuery,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addOrder = ({
  user,
  totalAmount,
  street,
  shipping,
  state_id,
  locality_id,
  locality,
}) => {
  return new Promise((resolve, reject) => {
    instance
      .post("add_order", {
        platform: "1",
        app_id: 1000,
        client_id: user.id,
        state_id: state_id,
        locality_id: locality_id,
        location: locality,
        prominent_place: street,
        transportation_cost: shipping,
        total_price: totalAmount,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addFavouriteItem = ({ id, user }) => {
  return new Promise((resolve, reject) => {
    instance
      .post("add_favorite", {
        app_id: 1000,
        client_id: user.id,
        product_id: id,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeFavouriteItem = ({ id, user }) => {
  return new Promise((resolve, reject) => {
    instance
      .post("delete_favorite", {
        app_id: 1000,
        client_id: user.id,
        product_id: id,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const addCartItem = ({ id, user }) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("add_cart", {
        client_id: user.id,
        app_id: "1000",
        product_id: id,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setCartItem = ({ id, user, quantity }) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("quantity", {
        client_id: user.id,
        app_id: "1000",
        product_id: id,
        quantity,
        action: "set",
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const removeCartItem = ({ id, user }) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("delete_cart", {
        client_id: user.id,
        app_id: "1000",
        product_id: id,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// GPS

export const getStates = () => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_states", { app_id: 1000 })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getLocalities = (state_id) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_localities", { app_id: 1000, state_id: state_id })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getUnits = (locality_id) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_administrative_unit", {
        app_id: 1000,
        locality_id: locality_id,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOrders = (id) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_orders", {
        client_id: id,
        app_id: 1000,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getOrderDetails = ({ order_id, userInfo }) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_order_details", {
        client_id: userInfo.id,
        order_id: order_id,
        app_id: 1000,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getNotifications = (id) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_notifications", {
        client_id: 274,
        app_id: 1000,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_categories", {
        app_id: "1000",
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getProductDetails = async (id) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("product_details", {
        product_id: id,
        app_id: "1000",
        // client_id: user.id,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getRelatedProducts = ({ product_id, user, category_id }) => {
  return new Promise((resolve, reject) => {
    instance

      // product_category
      .post("related_products", {
        product_id,
        client_id: user.id,
        category_id,
        app_id: "1000",
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getUser = (userInfo) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("client_info", {
        client_id: userInfo.id,
        app_id: userInfo.app_id,
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const getFavourites = (userInfo) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_favorites", {
        client_id: userInfo.id,
        app_id: "1000",
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCartItems = (userInfo) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("get_cart", {
        client_id: userInfo.id,
        app_id: "1000",
      })

      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getFeaturedProducts = () => {
  return new Promise((resolve, reject) => {
    instance
      // features_product
      .post("features_product", {
        // app_id: '1000',
        // client_id: '316'
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const ProductRate = ({ id, user, rate }) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("product_rate", {
        app_id: "1000",
        client_id: user.id,
        product_id: id,
        rate: rate,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getProductCategory = (id) => {
  return new Promise((resolve, reject) => {
    instance
      // product_category
      .post("product_category", {
        app_id: "1000",
        client_id: "316",
        category_id: id,
      })
      .then((resp) => {
        resolve(resp);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const Login = (payload) => {
  return new Promise((resolve, reject) => {
    instance
      .post("login", payload)
      .then((resp) => {
        resolve(resp);
        if (resp.status === true) {
          const token = resp.data.client.api_token;
          instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const register = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post("register", payload)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

export const verify = (url, payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post(url, payload)
        .then((resp) => {
          resolve(resp.data);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
};
export const ForgotPassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post("forget_password", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
};

export const ResetPassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post("password/reset", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {}
  });
};

export const UpdatePassword = (payload) => {
  return new Promise((resolve, reject) => {
    try {
      instance
        .post("updatePassword", payload)
        .then((resp) => {
          resolve(resp);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (err) {
      reject(new Error(err));
    }
  });
};
// return new Promise((resolve, reject) => {
//   try {
//     instance
//       .post('login', {
//         email: payload.email,
//         password: payload.password,
//         token_firebase: import.meta.env.VITE_FIREBASE_TOKEN,
//         app_id: '1999'
//       })
//       .then((resp) => {
//         if (resp.data.status === true) {
//           const userInfo = resp.data.client
//           token.value = userInfo.api_token
//           userInfo.value = JSON.stringify(userInfo)
//           localStorage.setItem('userInfo', JSON.stringify(userInfo))
//           localStorage.setItem('access_token', userInfo.api_token)
//           instance.defaults.headers.common['Authorization'] = userInfo.api_token
//         }
//         resolve(resp.data)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   } catch (err) {
//     reject(new Error(err))
//   }
// })
