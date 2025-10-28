<script setup lang="ts">
import { useAuth0 } from "@auth0/auth0-vue";
import { RouterView } from "vue-router";

const { isLoading } = useAuth0();
</script>

<template>
  <div v-if="isLoading" class="loading-container">
    <p>Loading...</p>
  </div>
  <RouterView v-else />
</template>

<style scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
}
</style>
