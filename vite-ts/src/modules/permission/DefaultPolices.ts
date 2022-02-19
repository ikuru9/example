import { Policies } from './types'

export default {
  sample: {
    rolePolicy: {
      GUEST: {
        actions: [],
      },
      OWNER: {
        actions: [],
      },
    },
    children: {
      id: {
        rolePolicy: {
          GUEST: {
            actions: [],
          },
        },
      },
    },
  },
} as Policies
