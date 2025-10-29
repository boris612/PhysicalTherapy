<script setup lang="ts">
import type { Patient } from '@/models/Patient'
import { STATUS } from '@/models/Patient'

interface Props {
  patients: Patient[]
}

interface Emits {
  (e: 'view', patient: Patient): void
  (e: 'edit', patient: Patient): void
  (e: 'delete', patient: Patient): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

function handleView(patient: Patient) {
  emit('view', patient)
}

function handleEdit(patient: Patient) {
  emit('edit', patient)
}

function handleDelete(patient: Patient) {
  emit('delete', patient)
}
</script>

<template>
  <div class="table-container">
    <table class="patients-table">
      <thead>
        <tr>
          <th>Ime i prezime</th>
          <th>Datum rođenja</th>
          <th>Kontakt</th>
          <th>Dijagnoza</th>
          <th>Status</th>
          <th class="text-right">Akcije</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in patients" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ p.datumRodjenja }}</td>
          <td>{{ p.kontakt }}</td>
          <td>{{ p.dijagnoza }}</td>
          <td>
            <span
              :class="{
                'status-badge status-active': p.status === STATUS.AKTIVNO,
                'status-badge status-done': p.status !== STATUS.AKTIVNO
              }"
            >
              {{ p.status }}
            </span>
          </td>
          <td class="actions-cell">
            <button @click="handleView(p)" title="Pogledaj" class="action-btn view-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button @click="handleEdit(p)" title="Uredi" class="action-btn edit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button @click="handleDelete(p)" title="Obriši" class="action-btn delete-btn">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </td>
        </tr>
        <tr v-if="patients.length === 0">
          <td colspan="6" class="empty-state">Nema rezultata</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

.patients-table {
  width: 100%;
  border-collapse: collapse;
}

.patients-table thead {
  background-color: #f9fafb;
}

.patients-table th {
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
}

.patients-table th.text-right {
  text-align: right;
}

.patients-table td {
  padding: 1rem;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: middle;
}

.patients-table tbody tr:hover {
  background-color: #f9fafb;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status-active {
  color: #047857;
  background-color: #d1fae5;
}

.status-done {
  color: #4b5563;
  background-color: #e5e7eb;
}

.actions-cell {
  text-align: right;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin-left: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #f3f4f6;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.view-btn {
  color: #3b82f6;
}

.view-btn:hover {
  color: #1d4ed8;
}

.edit-btn {
  color: #eab308;
}

.edit-btn:hover {
  color: #ca8a04;
}

.delete-btn {
  color: #ef4444;
}

.delete-btn:hover {
  color: #b91c1c;
}

.empty-state {
  padding: 3rem 1rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.875rem;
}
</style>
