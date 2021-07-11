<template>
  <div>Item: {{ item }}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'

@Component({
  meta: {
    permission: {
      redirect: '/',
    },
  },
})
export default class Child extends Vue {
  protected item: any = {}

  async asyncData({ $axios, params: { id } }: Context) {
    const item = await $axios.$get(`/sample-api/v1/employees/${id}`)

    return {
      item,
    }
  }
}
</script>
