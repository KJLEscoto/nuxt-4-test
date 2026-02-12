<template>
  <div>
    <div class="text-5xl font-bold">hi from index</div>
    <NuxtLink to="/about">about</NuxtLink>

    <div class="flex items-center gap-4">
      <span>
        {{ counter }}
      </span>
      <button class="px-3 py-1 bg-white text-black rounded-full" @click="counter++">Click</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Nuxt 4 - Test",
});

// ref()
// const counter = ref(0);

// useState()
const counter = useState<number>('count', () => 0);

counter.value;
</script>
