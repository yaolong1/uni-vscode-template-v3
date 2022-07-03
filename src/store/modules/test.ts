

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore(
  {
    id: 'test',
    state: () => ({
      counter: 1
    }),
    getters: {
      getCounter(): number {
        return this.counter
      }
    },
    actions: {
      setCounter() {
        this.counter++
      }
    }
  }
)