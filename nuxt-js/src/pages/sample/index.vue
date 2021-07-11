<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <ul>
        <NuxtLink
          v-for="item in sample"
          :key="item.id"
          tag="li"
          :to="`/sample/${item.id}`"
        >
          {{ item }}
        </NuxtLink>
      </ul>
      <hr />
      <NuxtChild></NuxtChild>
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
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
export default class Sample extends Vue {
  async asyncData({ $axios }: Context) {
    const { data } = await $axios.$get<any>('/sample-api/v1/employees')

    return {
      sample: data,
    }
  }
}
</script>
