<script setup>
import { ref } from "vue";
import AppMenuItem from "./AppMenuItem.vue";
import { useAuth0 } from "@auth0/auth0-vue";

const { logout } = useAuth0();

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin + "/login",
    },
  });
};

const model = ref([
  {
    label: "Navigacija",
    items: [
      {
        label: "Pregled",
        icon: "pi pi-fw pi-home",
        to: "/",
      },
      {
        label: "Pacijenti",
        icon: "pi pi-fw pi-users",
        to: "/pacijenti",
      },
      {
        label: "Terapeuti",
        icon: "pi pi-fw pi-user-plus",
        to: "/terapeuti",
      },
      {
        label: "Termini",
        icon: "pi pi-fw pi-calendar",
        to: "/termini",
      },
    ],
  },
  {
    label: "Sistem",
    items: [
      {
        label: "Odjava",
        icon: "pi pi-fw pi-sign-out",
        command: handleLogout,
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
