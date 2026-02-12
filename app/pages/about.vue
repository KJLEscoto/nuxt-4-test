<template>
  <div>hi from about</div>

  <div>
    <span>
      {{ counter }}
    </span>
  </div>
</template>

<script lang="ts" setup>
const counter = useState<number>("count", () => 0);

counter.value;
</script>
