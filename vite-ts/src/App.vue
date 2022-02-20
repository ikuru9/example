<script setup lang="ts">
import { AppProvider } from '/@/components/Application'
</script>

<template>
  <app-provider>
    <router-view v-slot="{ Component, route }">
      <transition name="slide">
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
  </app-provider>
</template>
