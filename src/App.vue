<template>
  <div class="bg-secondary">
    <ReloadPrompt />
    <MainScreen />
  </div>
</template>

<script setup lang="ts">
import { watch } from "vue";
import { useThemeStore } from "./stores";
import { storeToRefs } from "pinia";
import MainScreen from "./components/MainScreen.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";

const { theme } = storeToRefs(useThemeStore());

watch(theme, (themeValue) => {
  if (themeValue == "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
});
</script>
