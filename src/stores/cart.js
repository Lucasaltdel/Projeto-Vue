// src/stores/cart.js
import { reactive } from 'vue';

export const cart = reactive({
  items: {},

  history: [],

  addToCart(product) {
    const existing = cart.items[product.id];
    if (existing) {
      existing.quantity++;
    } else {
      cart.items[product.id] = { ...product, quantity: 1 };
    }

    cart.history.push({
      action: 'add',
      product: { ...product },
      time: new Date().toLocaleString()
    });
  },

  removeFromCart(productId) {
    if (cart.items[productId]) {
      cart.history.push({
        action: 'remove',
        product: { ...cart.items[productId] },
        time: new Date().toLocaleString()
      });
      delete cart.items[productId];
    }
  },

  updateQuantity(productId, quantity) {
    if (cart.items[productId]) {
      const before = cart.items[productId].quantity;
      cart.items[productId].quantity = quantity;
      cart.history.push({
        action: 'update',
        product: { ...cart.items[productId] },
        oldQuantity: before,
        newQuantity: quantity,
        time: new Date().toLocaleString()
      });

      if (quantity <= 0) {
        delete cart.items[productId];
      }
    }
  },

  clearCart() {
    cart.history.push({
      action: 'clear',
      time: new Date().toLocaleString()
    });
    cart.items = {};
  },

  getQuantity(productId) {
    return cart.items[productId]?.quantity || 0;
  },

  get total() {
    return Object.values(cart.items).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  get itemList() {
    return Object.values(cart.items);
  }
});
