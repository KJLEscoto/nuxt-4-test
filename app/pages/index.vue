<template>
  <div class="p-5">
    <PageTitle>Welcome</PageTitle>
    <div class="flex items-center gap-4">
      <span>
        {{ counter }}
      </span>
      <button
        class="px-3 py-1 bg-white text-black rounded-full"
        @click="counter++"
      >
        Click
      </button>
    </div>

    <p v-if="pending">loading..</p>

    <p v-if="error">ERROR OCCURED. {{ error.data?.message }}</p>

    <ul v-else class="list-disc list-inside p-4">
      <li v-for="fruit in data?.fruits" :key="fruit.id">
        {{ fruit.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Nuxt 4 - Test",
});

// ref()
// const counter = ref(0);
// counter.value;

// useState()
const counter = useState<number>("count", () => 0);

const { data, pending, error } = useFetch("/api/hello", { server: false });
</script>
