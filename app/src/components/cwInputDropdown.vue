<template>
  <div class="cw-input-dropdown">
    <v-select
      v-model="state.selected"
      class="w-80"
      append-to-body
      :options="paginated"
      :calculate-position="withPopper"
      :filterable="false"
      label="name"
      @open="onOpen"
      @close="onClose"
      @search="(query) => (state.search = query)"
    >
      <template #list-footer>
        <li v-show="hasNextPage" ref="load" class="loader">{{ props.msgLoadingItem }}</li>
      </template>
    </v-select>
    <cw-button class="mt-4" @click="onItemClick">Add</cw-button>
  </div>
</template>

<script setup lang="ts">
import { createPopper } from '@popperjs/core'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import VSelect from 'vue-select'
import CwButton from '@/components/cwButton.vue'

interface Props {
  defaultSelected?: { id: number; name: string }
  items: { id: number; name: string }[]
  msgLoadingItem: string
}

// State
const state = reactive({
  limit: 6,
  search: '',
  selected: <{ id: number; name: string }>{},
})

const load: any = ref<Element>()

// Props
const props = defineProps<Props>()

// Emit
const emit = defineEmits<{
  // eslint-disable-next-line no-unused-vars
  (e: 'select', item: { id: number; name: string }): void
}>()

// Computed
const filtered = computed(() => {
  return props.items.filter((item) => item.name.includes(state.search))
})

const paginated = computed(() => {
  return filtered.value.slice(0, state.limit)
})

const hasNextPage = computed(() => {
  return paginated.value.length < filtered.value.length
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

const infiniteScroll = async ([{ isIntersecting, target }]: any) => {
  setTimeout(async () => {
    if (isIntersecting) {
      const ul = target.offsetParent
      const { scrollTop } = target.offsetParent
      state.limit += 3
      await nextTick()
      ul.scrollTop = scrollTop
    }
  }, 2000)
}

const observer = new IntersectionObserver(infiniteScroll)

const onOpen = async () => {
  if (hasNextPage.value) {
    await nextTick()
    observer.observe(load.value)
  }
}

const onClose = () => {
  observer.disconnect()
}

const onItemClick = () => emit('select', state.selected)

onMounted(() => {
  if (props.defaultSelected) {
    state.selected = props.defaultSelected
  }
})
</script>

<style lang="scss">
.cw-input-dropdown {
  @apply flex flex-col items-center justify-center;
}

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
  @apply max-h-44 text-lg;
  border-radius: 4px 4px 0 0;
  border-top-style: solid;
  box-shadow: 0 -3px 6px rgba(0, 0, 0, 0.15);
}

.loader {
  text-align: center;
  color: #bbbbbb;
}
</style>
