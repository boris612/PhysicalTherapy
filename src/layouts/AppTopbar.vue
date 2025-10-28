<script setup>
import { computed } from "vue";
import { useLayout } from "./composables/layout";
import { useAuth0 } from "@auth0/auth0-vue";

const { user, isAuthenticated } = useAuth0();

const { toggleMenu } = useLayout();
</script>

<template>
  <div class="layout-topbar">
    <div class="layout-topbar-logo-container">
      <button
        class="layout-menu-button layout-topbar-action"
        @click="toggleMenu"
      >
        <i class="pi pi-bars"></i>
      </button>
      <router-link to="/" class="layout-topbar-logo">
        <i class="pi pi-heart-fill"></i>
        <span>FizioKlinika</span>
      </router-link>
    </div>

    <div class="layout-topbar-actions">
      <div class="layout-topbar-menu">
        <button type="button" class="layout-topbar-action">
          <i class="pi pi-bell"></i>
        </button>
        <div class="layout-topbar-profile" v-if="isAuthenticated && user">
          <button type="button" class="layout-topbar-action">
            <img
              :src="
                user.picture ||
                `https://ui-avatars.com/api/?name=${user.value?.name?.replace(
                  ' ',
                  '+'
                )}&background=4F46E5&color=fff`
              "
              :alt="user.name"
            />
          </button>
          <div class="layout-topbar-profile-info">
            <span class="layout-topbar-profile-name">{{ user.name }}</span>
            <span class="layout-topbar-profile-role">Fizikalna medicina</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
