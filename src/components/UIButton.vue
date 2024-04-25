<template>
  <button
    class="w-[50px] h-[50px] flex items-center justify-center font-bold active:opacity-60"
    :class="[
      variant == 'square' ? 'rounded-[10px]' : 'rounded-full',
      buttonStyle,
    ]"
  >
    <span :class="['pb-1', fontSize]">{{ value }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { IButton } from "@/types";

const props = withDefaults(defineProps<IButton>(), {
  variant: "square",
  color: "default",
  fontSize: "text-xl",
});

const buttonStyle = computed(() => {
  if (props.color == "default")
    return "bg-bgColor-light-extraDark text-textColor-extraDark dark:bg-bgColor-dark-extraLight dark:text-textColor-extraLight";
  else if (props.color == "primary")
    return "bg-primary text-textColor-extraLight";
  else
    return "bg-bgColor-light-extraDark text-secondary dark:bg-bgColor-dark-extraLight";
});
</script>
