<script setup lang="ts">
import type { Patient } from '@/models/Patient'
import { STATUS } from '@/models/Patient'

interface Props {
  show: boolean
  patient: Patient
  isEditing: boolean
  isCreating: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', patient: Patient): void
  (e: 'update:patient', patient: Patient): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function updateField(field: keyof Patient, value: any) {
  emit('update:patient', { ...props.patient, [field]: value })
}

function handleSave() {
  emit('save', props.patient)
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-card">
      <div class="modal-header">
        <h2 class="modal-title">
          {{ isCreating ? 'Dodaj pacijenta' : (isEditing ? 'Uredi pacijenta' : 'Pregled pacijenta') }}
        </h2>
        <button @click="handleClose" class="modal-close">✕</button>
      </div>

      <div class="modal-content">
        <div class="form-field">
          <label>Ime i prezime</label>
          <input 
            :value="patient.name" 
            @input="updateField('name', ($event.target as HTMLInputElement).value)"
            :disabled="!isEditing" 
            class="form-input" 
          />
        </div>
        <div class="form-field">
          <label>Datum rođenja</label>
          <input 
            :value="patient.datumRodjenja" 
            @input="updateField('datumRodjenja', ($event.target as HTMLInputElement).value)"
            type="date" 
            :disabled="!isEditing" 
            class="form-input" 
          />
        </div>
        <div class="form-field">
          <label>Kontakt</label>
          <input 
            :value="patient.kontakt" 
            @input="updateField('kontakt', ($event.target as HTMLInputElement).value)"
            :disabled="!isEditing" 
            class="form-input" 
          />
        </div>
        <div class="form-field">
          <label>Status</label>
          <select 
            :value="patient.status" 
            @change="updateField('status', ($event.target as HTMLSelectElement).value)"
            :disabled="!isEditing" 
            class="form-input"
          >
            <option :value="STATUS.AKTIVNO">{{ STATUS.AKTIVNO }}</option>
            <option :value="STATUS.ZAVRSENO">{{ STATUS.ZAVRSENO }}</option>
          </select>
        </div>
        <div class="form-field full-width">
          <label>Dijagnoza</label>
          <input 
            :value="patient.dijagnoza" 
            @input="updateField('dijagnoza', ($event.target as HTMLInputElement).value)"
            :disabled="!isEditing" 
            class="form-input" 
          />
        </div>
        <div class="form-field full-width">
          <label>Napomene</label>
          <textarea 
            :value="patient.napomene" 
            @input="updateField('napomene', ($event.target as HTMLTextAreaElement).value)"
            :disabled="!isEditing" 
            rows="4" 
            class="form-input"
          ></textarea>
        </div>
      </div>

      <div class="modal-footer">
        <button v-if="isEditing" @click="handleSave" class="btn btn-primary">Spremi</button>
        <button @click="handleClose" class="btn btn-secondary">Zatvori</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-card {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 900px;
  padding: 2rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
}

.modal-close:hover {
  color: #1f2937;
}

.modal-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-field.full-width {
  grid-column: span 2;
}

.form-field label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.form-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #1E3D9E;
  box-shadow: 0 0 0 3px rgba(30, 61, 158, 0.1);
}

.form-input:disabled {
  background-color: #f9fafb;
  color: #6b7280;
  cursor: not-allowed;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  padding: 0.625rem 1.25rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background-color: #1E3D9E;
  color: white;
}

.btn-primary:hover {
  background-color: #152d73;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #374151;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

@media (max-width: 768px) {
  .modal-content {
    grid-template-columns: 1fr;
  }

  .form-field.full-width {
    grid-column: span 1;
  }
}
</style>
