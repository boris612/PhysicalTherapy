<script setup lang="ts">
import type { Therapist } from '@/models/Therapist'

interface Props {
  therapist: Therapist
}

interface Emits {
  (e: 'edit', therapist: Therapist): void
  (e: 'delete', therapist: Therapist): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

function handleEdit(therapist: Therapist) {
  emit('edit', therapist)
}

function handleDelete(therapist: Therapist) {
  emit('delete', therapist)
}
</script>

<template>
  <div class="therapist-card">
    <div class="card-header">
      <button @click="handleEdit(therapist)" title="Uredi" class="icon-btn edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </button>
      <button @click="handleDelete(therapist)" title="Obriši" class="icon-btn delete-btn">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <div class="card-body">
      <div class="profile-picture-container">
        <img
          v-if="therapist.profilePicture"
          :src="therapist.profilePicture"
          :alt="therapist.name"
          class="profile-picture"
        />
        <div v-else class="profile-picture-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" class="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <div class="therapist-info">
        <h3 class="therapist-name">{{ therapist.name }}</h3>

        <div class="info-row">
          <svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="info-text">{{ therapist.specijalnost }}</span>
        </div>

        <div class="info-row">
          <svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span class="info-text">{{ therapist.kontakt }}</span>
        </div>

        <div class="info-row">
          <svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="info-text">{{ therapist.email }}</span>
        </div>

        <div v-if="therapist.radnoVrijeme" class="info-row">
          <svg xmlns="http://www.w3.org/2000/svg" class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="info-text">{{ therapist.radnoVrijeme }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.therapist-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s;
  border: 1px solid #e5e7eb;
}

.therapist-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background: white;
  border: 1px solid #d1d5db;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
}

.icon-btn:hover {
  background-color: #f3f4f6;
}

.icon {
  width: 1.125rem;
  height: 1.125rem;
  stroke-width: 2;
}

.edit-btn {
  color: #eab308;
}

.edit-btn:hover {
  border-color: #eab308;
  background-color: #fef9c3;
}

.delete-btn {
  color: #ef4444;
}

.delete-btn:hover {
  border-color: #ef4444;
  background-color: #fee2e2;
}

.card-body {
  padding: 1.5rem;
}

.profile-picture-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.25rem;
}

.profile-picture {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #e5e7eb;
}

.profile-picture-placeholder {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #f3f4f6;
  border: 3px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  color: #9ca3af;
  stroke-width: 1.5;
}

.therapist-info {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.therapist-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  text-align: center;
  margin: 0 0 0.5rem 0;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.info-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  stroke-width: 2;
  flex-shrink: 0;
}

.info-text {
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.4;
  word-break: break-word;
}
</style>
