<template>
  <div class="text-3xl font-black" :class="props.colorClass">
    <slot />
  </div>
</template>


<script lang="ts" setup>
interface PageTitleProps {
    colorClass?: string;
}

const props = withDefaults(defineProps<PageTitleProps>(), {
    colorClass: 'text-gray-100'
});
</script>