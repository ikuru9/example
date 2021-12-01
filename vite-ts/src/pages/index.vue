<template>
  <HelloWorld msg="hello vite" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'Index',
  components: {
    HelloWorld: defineAsyncComponent(
      () => import('@/components/HelloWorld.vue')
    ),
  },
})
</script>
