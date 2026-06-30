<template>
  <div class="layout">
    <Header />
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>

<style scoped lang="scss">
</style>