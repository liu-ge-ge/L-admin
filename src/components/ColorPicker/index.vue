<template>
  <input type="color" @input="changeColor" />
</template>
<script setup lang="ts">
interface Emits {
  (event: 'changeColor', color: string): void
}
const emits = defineEmits<Emits>()
const changeColor = (e: Event) => {
  console.log('出发了1')
  let val = (e.target as HTMLInputElement).value
  emits('changeColor', val)
}
</script>
