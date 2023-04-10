<template>
  <div
    class="container !max-w-screen-2xl lg:px-6 mx-auto pt-$header-height grid-leyout"
  >
    <div class="content prose min-w-0">
      <div class="space-y-2 mb-12 md:mb-14">
        <h1 class="text-3xl leading-10 font-semibold sm:text-5xl sm:leading-16">
          Hello
        </h1>
        <button
          class="px-3 py-2 bg-white border border-gray-300 rounded-md shadow"
          @click="count++"
        >
          count is: {{ count }}
        </button>
        <p>
          Edit <code>components/HelloWorld.vue</code> to test hot module
          replacement.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>
