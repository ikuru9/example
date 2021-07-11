import { Context } from '@nuxt/types/app'
import { StoreOptions, ActionContext } from 'vuex'

export interface RootState {}

const store: StoreOptions<RootState> = {
  state: () => ({}),
  actions: {
    nuxtServerInit(
      actionContext: ActionContext<RootState, RootState>,
      ctx: Context
    ) {
      // console.log('actionContext', actionContext)
      // console.log('ctx', ctx)
    },
  },
}

export default store
