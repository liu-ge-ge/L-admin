<template>
  <v-md-editor v-model="text" height="100%"></v-md-editor>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let text = ref('')
</script>
