<template>
  <h2 class="!mt-0">Hello</h2>
  <button
    class="px-3 py-2 bg-white border border-gray-300 rounded-md shadow"
    @click="count++"
  >
    count is: {{ count }}
  </button>
  <p>
    Edit <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>
