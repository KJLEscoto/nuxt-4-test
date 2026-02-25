<template>
  <nav
    class="flex items-center justify-between p-5 bg-neutral-900"
    :key="refreshKey"
  >
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
const refreshKey = useState<number>("navbarRefreshKey", () => 0);
const user = ref<JWTUserInfo | null>(null);

function handleLogout() {
  // clear cookie
  const token = useCookie<string | null>("jwt-token");
  token.value = null;

  // clear user state immediately (UI updates instantly)
  user.value = null;

  // trigger re-verify watchers (optional)
  refreshKey.value++;
}

onMounted(async () => {
  await verifyAuthentication();
});

async function verifyAuthentication() {
  const token = useCookie<string | null>("jwt-token");
  if (!token.value) {
    user.value = null;
    return;
  }

  try {
    const result = await $fetch("/api/auth/verifyToken", {
      method: "POST",
      body: { token: token.value },
    });

    user.value = result?.success ? result.user : null;
  } catch {
    user.value = null;
  }
}

watch(refreshKey, verifyAuthentication);
</script>
