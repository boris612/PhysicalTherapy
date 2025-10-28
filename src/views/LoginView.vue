<template>
  <div class="login-container">
    <!-- Left Panel - Blue Background -->
    <div class="left-panel">
      <div class="logo-section">
        <!-- Heartbeat Icon -->
        <div class="heartbeat-icon">
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            stroke-width="4"
          >
            <polyline
              points="10,50 25,50 35,30 45,70 55,40 65,60 75,50 90,50"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <!-- Logo Text -->
        <h1 class="logo-text">FizioKlinika</h1>
      </div>
    </div>

    <!-- Right Panel - Login Form -->
    <div class="right-panel">
      <div class="form-container">
        <h1 class="welcome-title">Dobrodošli u<br />FizioKliniku</h1>

        <div class="login-actions">
          <Button label="Prijava" @click="handleLogin" class="submit-button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";
import Button from "primevue/button";

export default {
  name: "LoginPage",
  components: {
    Button,
  },
  setup() {
    const { loginWithRedirect, isLoading: auth0Loading } = useAuth0();
    const isLoading = ref(false);

    const handleLogin = async () => {
      isLoading.value = true;
      try {
        await loginWithRedirect();
      } catch (error) {
        console.error("Login error:", error);
        isLoading.value = false;
      }
    };

    return {
      handleLogin,
      isLoading: isLoading || auth0Loading,
    };
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
}

/* Left Panel */
.left-panel {
  width: 50%;
  background-color: #2947a9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-family: Arial, Helvetica, sans-serif;
}

.logo-section {
  text-align: center;
}

.heartbeat-icon {
  margin-bottom: 2rem;
}

.heartbeat-icon svg {
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  stroke: white;
}

.logo-text {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin: 0;
}

/* Right Panel */
.right-panel {
  width: 50%;
  background-color: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  font-family: Arial, Helvetica, sans-serif;
}

.form-container {
  width: 100%;
  max-width: 28rem;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #111827;
  text-align: center;
  line-height: 1.3;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: 0rem;
}

.login-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.submit-button {
  width: 100%;
  border: none;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  justify-content: center;
  background-color: #2947a9 !important;
  color: white !important;
  border: none;
}

.submit-button:hover {
  background-color: #1e3a8a !important;
  color: white !important;
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-panel,
  .right-panel {
    width: 100%;
  }

  .left-panel {
    min-height: 30vh;
  }
}
</style>
