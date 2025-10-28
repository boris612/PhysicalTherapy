<script setup>
import { useLayout } from "./composables/layout";
import { computed, ref, watch } from "vue";
import AppSidebar from "./AppSidebar.vue";
import AppTopbar from "./AppTopbar.vue";
import Toast from "primevue/toast";
import { useAuth0 } from "@auth0/auth0-vue";
import { useRouter } from "vue-router";

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const { logout, isAuthenticated, isLoading } = useAuth0();
const router = useRouter();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

watch(
  [isLoading, isAuthenticated],
  ([loading, authenticated]) => {
    console.log("Auth state:", { loading, authenticated });

    // Once loading is done, check if user is authenticated
    if (!loading && !authenticated) {
      // Check if we have a code/state in URL (callback scenario)
      const hasAuthParams =
        window.location.search.includes("code=") ||
        window.location.search.includes("state=");

      // If no auth params and not authenticated, redirect to login
      if (!hasAuthParams) {
        router.push("/login");
      }
    }
  },
  { immediate: true }
);

const containerClass = computed(() => {
  return {
    "layout-overlay": layoutConfig.menuMode === "overlay",
    "layout-static": layoutConfig.menuMode === "static",
    "layout-static-inactive":
      layoutState.staticMenuDesktopInactive &&
      layoutConfig.menuMode === "static",
    "layout-overlay-active": layoutState.overlayMenuActive,
    "layout-mobile-active": layoutState.staticMenuMobileActive,
  };
});

function bindOutsideClickListener() {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive = false;
        layoutState.staticMenuMobileActive = false;
        layoutState.menuHoverActive = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
}

function unbindOutsideClickListener() {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
}

function isOutsideClicked(event) {
  const sidebarEl = document.querySelector(".layout-sidebar");
  const topbarEl = document.querySelector(".layout-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
}
</script>

<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
    <app-sidebar></app-sidebar>
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout-mask animate-fadein"></div>
  </div>
  <Toast />
</template>

<style scoped></style>
