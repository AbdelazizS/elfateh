<script setup>
import { DropdownMenuRoot, useForwardPropsEmits } from 'radix-vue'

const props = defineProps({
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  dir: { type: String, required: false },
  modal: { type: Boolean, required: false }
})
const emits = defineEmits(['update:open'])

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DropdownMenuRoot
    class="z-[1000000000000]"
    v-bind="forwarded"
    :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
  >
    <slot />
  </DropdownMenuRoot>
</template>
