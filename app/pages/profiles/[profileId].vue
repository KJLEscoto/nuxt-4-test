<template>
  <div>
    {{ profileId }}
  </div>
</template>

<script lang="ts" setup>
const profileId = useRoute().params.profileId;
</script>
