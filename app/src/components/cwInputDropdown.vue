<template>
  <v-select class="w-80" :options="state.countries" append-to-body :calculate-position="withPopper" />
</template>

<script setup lang="ts">
import { createPopper } from '@popperjs/core'
import { reactive } from 'vue'
import VSelect from 'vue-select'

// State
const state = reactive({
  countries: ['Canada', 'United States', 'France', 'France', 'France', 'France'],
})

// Function
const withPopper = (dropdownList: any, component: any, { width }: any) => {
  /**
   * We need to explicitly define the dropdown width since
   * it is usually inherited from the parent with CSS.
   */
  // eslint-disable-next-line no-param-reassign
  dropdownList.style.width = width

  /**
   * Here we position the dropdownList relative to the $refs.toggle Element.
   *
   * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
   * the dropdownList overlap by 1 pixel.
   *
   * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
   * wrapper so that we can set some styles for when the dropdown is placed
   * above.
   */
  const popper = createPopper(component.$refs.toggle, dropdownList, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -1],
        },
      },
      {
        name: 'toggleClass',
        enabled: true,
        phase: 'write',
        fn({ state: st }) {
          component.$el.classList.toggle('drop-up', st.placement === 'top')
        },
      },
    ],
  })

  /**
   * To prevent memory leaks Popper needs to be destroyed.
   * If you return function, it will be called just before dropdown is removed from DOM.
   */
  return () => popper.destroy()
}
</script>

<style lang="scss">
.vs__dropdown-option {
  @apply text-tertiary;

  &--highlight {
    @apply bg-primary text-white;
  }
}
.vs__selected {
  @apply text-lg text-tertiary;
}

.v-select.drop-up.vs--open .vs__dropdown-toggle {
  border-radius: 0 0 4px 4px;
  border-top-color: transparent;
  border-bottom-color: rgba(60, 60, 60, 0.26);
}

[data-popper-placement='top'] {
  @apply text-lg;
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}
</style>
