<template>
  <div class="h-screen w-full flex items-center justify-center">
    <form class="w-1/2 space-y-5" @submit.prevent="submitForm">
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

      <!-- Confirm Password -->
      <section class="flex flex-col gap-2">
        <label for="confirmPassword">Confirm Password</label>
        <input
          v-model="form.confirmPassword"
          type="password"
          id="confirmPassword"
        />
        <p v-if="errors.confirmPassword" class="text-red-400 text-sm">
          {{ errors.confirmPassword }}
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
  </div>
</template>

<script lang="ts" setup>
const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const errors = reactive({
  username: "" as string,
  password: "" as string,
  confirmPassword: "" as string,
});

const message = ref("");
const messageType = ref<"success" | "error">("success");

function clearErrors() {
  errors.username = "";
  errors.password = "";
  errors.confirmPassword = "";
}

async function submitForm() {
  clearErrors();
  message.value = "";

  // Field validation
  if (!form.username.trim()) errors.username = "Username is required.";
  if (!form.password) errors.password = "Password is required.";
  if (!form.confirmPassword)
    errors.confirmPassword = "Confirm password is required.";
  if (
    form.password &&
    form.confirmPassword &&
    form.password !== form.confirmPassword
  ) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (errors.username || errors.password || errors.confirmPassword) return;

  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        username: form.username.trim(),
        password: form.password,
      },
    });

    messageType.value = "success";
    message.value = "User created successfully!";

    // optional reset
    form.username = "";
    form.password = "";
    form.confirmPassword = "";
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
