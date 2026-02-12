<template>
  <div class="p-5">
    <PageTitle>About</PageTitle>

    <span>
      {{ counter }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const counter = useState<number>("count", () => 0);

counter.value;
</script>
