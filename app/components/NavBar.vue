<template>
  <nav class="flex items-center justify-between p-5 bg-neutral-900">
    <div>Nuxt 4 - Test</div>

    <ul class="flex gap-10 items-center">
      <li>
        <NuxtLink to="/">Home</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>
      <li>
        <div class="flex gap-2" v-if="!user">
          <NuxtLink to="/register" class="px-3 py-2 bg-white text-black rounded"
            >Register</NuxtLink
          >
          <NuxtLink
            to="/login"
            class="px-3 py-2 bg-neutral-800 text-white rounded"
            >Login</NuxtLink
          >
        </div>
        <div v-else>
          <button
            @click="handleLogout"
            type="button"
            class="px-3 py-2 bg-white text-black cursor-pointer rounded"
          >
            {{ user.username }}
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts" setup>
interface User {
  id: number;
  username: string;
}

const user = ref<User | null>(null);

function handleLogout() {
  useCookie("jwt-token").value = null;
}

onMounted(async () => {
  const token = useCookie<string | null>("jwt-token");

  if (!token.value) return;

  try {
    const result = await $fetch("/api/auth/verifyToken", {
      method: "POST",
      body: { token: token.value },
    });

    if (result.success) {
      user.value = result.user as User;
    }
  } catch {
    user.value = null;
  }
});
</script>
