<template>
  <div class="max-w-4xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Carrinho de Compras</h1>

    <div v-if="cart.itemList.length">
      <div
        v-for="item in cart.itemList"
        :key="item.id"
        class="flex justify-between items-center mb-4 border-b pb-2"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-sm text-gray-600">Preço: ${{ item.price }}</p>
          <p class="text-sm">Subtotal: ${{ (item.price * item.quantity).toFixed(2) }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="decrease(item.id)"
            class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >-</button>

          <input
            type="number"
            v-model.number="item.quantity"
            @change="cart.updateQuantity(item.id, item.quantity)"
            min="1"
            class="w-16 border rounded px-2 py-1 text-center"
          />

          <button
            @click="increase(item.id)"
            class="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
          >+</button>

          <button
            @click="cart.removeFromCart(item.id)"
            class="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remover
          </button>
        </div>
      </div>

      <div class="mt-6 text-xl font-bold">
        Total: ${{ cart.total.toFixed(2) }}
      </div>
    </div>
    <p v-else class="text-gray-600">Seu carrinho está vazio.</p>

    <div v-if="cart.history.length" class="mt-10">
      <h2 class="text-2xl font-bold mb-4">Histórico de Ações</h2>
      <ul class="text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto border rounded p-4">
        <li v-for="(entry, index) in cart.history.slice().reverse()" :key="index">
          <span class="font-semibold">{{ entry.time }}</span> — 
          <span>
            {{ entry.action === 'add' && `Adicionado: ${entry.product.title}` }}
            {{ entry.action === 'remove' && `Removido: ${entry.product.title}` }}
            {{ entry.action === 'update' && `Atualizado: ${entry.product.title} de ${entry.oldQuantity} para ${entry.newQuantity}` }}
            {{ entry.action === 'clear' && 'Carrinho limpo' }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { cart } from '@/stores/cart.js';

export default {
  setup() {
    const increase = (id) => {
      const current = cart.getQuantity(id);
      cart.updateQuantity(id, current + 1);
    };

    const decrease = (id) => {
      const current = cart.getQuantity(id);
      if (current > 1) {
        cart.updateQuantity(id, current - 1);
      }
    };

    return { cart, increase, decrease };
  }
};
</script>
