<template>
  <div class="layout">
    <Header />
     <main class="main">
       <slot />
     </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';
</script>
