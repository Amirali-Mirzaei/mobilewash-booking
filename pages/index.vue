<template> 

    <img 
      :src="banner"
        class="banner">

</template>

<script setup>
import banner from '@/assets/images/Banner.PNG'
</script>

<style lang="scss" scoped>

.banner {
background-size: cover;
width: 100%;
height: auto;
margin-top: 6%;
}

</style>