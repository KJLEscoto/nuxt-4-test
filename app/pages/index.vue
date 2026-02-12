<template>
  <div>
    <div class="text-5xl font-bold">hi from index</div>
    <NuxtLink to="/about">about</NuxtLink>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Nuxt 4 - Test",
});
</script>
