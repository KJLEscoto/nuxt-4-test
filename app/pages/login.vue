<template>
  <div class="h-screen w-full flex items-center justify-center">
    <form class="w-1/2 space-y-5" @submit.prevent="submitForm">
      <PageTitle>Welcome Back!</PageTitle>

      <!-- Username -->
      <section class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input v-model="form.username" type="text" id="username" />
        <p v-if="errors.username" class="text-red-400 text-sm">
          {{ errors.username }}
        </p>
      </section>

      <!-- Password -->
      <section class="flex flex-col gap-2">
        <label for="password">Password</label>
        <input v-model="form.password" type="password" id="password" />
        <p v-if="errors.password" class="text-red-400 text-sm">
          {{ errors.password }}
        </p>
      </section>

      <!-- General message -->
      <p
        v-if="message"
        :class="messageType === 'success' ? 'text-green-400' : 'text-red-400'"
        class="text-sm"
      >
        {{ message }}
      </p>

      <button
        type="submit"
        class="px-3 py-2 bg-white text-black cursor-pointer rounded"
      >
        Register
      </button>
    </form>

    <!-- <div v-if="useCookie('jwt-token').value != null">
      <button
        @click="clearToken"
        type="button"
        class="px-3 py-2 bg-white text-black cursor-pointer rounded"
      >
        Clear Token
      </button>
    </div> -->
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  username: "",
  password: "",
});

const errors = reactive({
  username: "" as string,
  password: "" as string,
});

const navbarRefreshKey = useState<number>("navbarRefreshKey", () => 0);

const message = ref("");
const messageType = ref<"success" | "error">("success");

function clearErrors() {
  errors.username = "";
  errors.password = "";
}

// function clearToken() {
//   useCookie("jwt-token").value = null;
// }

async function submitForm() {
  clearErrors();
  message.value = "";

  // Field validation
  if (!form.username.trim()) errors.username = "Username is required.";
  if (!form.password) errors.password = "Password is required.";

  if (errors.username || errors.password) return;

  try {
    const result = await $fetch.raw("/api/auth/login", {
      method: "POST",
      body: {
        username: form.username.trim(),
        password: form.password,
      },
      async onResponseError({ response }) {
        if (response.status === 401) {
          messageType.value = "error";
          message.value = response._data.message;
          return;
        }
      },
    });

    messageType.value = "success";
    message.value = "Sucessfuly Logged In!";
    // message.value = JSON.stringify(result._data?.token);

    if (!(result._data && result._data?.token)) {
      messageType.value = "error";
      message.value = "Error occured on token.";
      return;
    }

    useCookie("jwt-token").value = result._data?.token;

    // optional reset
    form.username = "";
    form.password = "";

    navbarRefreshKey.value++;

    await navigateTo("/");
  } catch (err: any) {
    messageType.value = "error";
    message.value =
      err?.data?.statusMessage || err?.data?.message || "Something went wrong.";
  }
}
</script>

<style scoped>
@import "tailwindcss";
input {
  @apply border border-neutral-800 w-full p-2 rounded;
}
</style>
