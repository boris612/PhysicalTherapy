<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Patient } from '@/models/Patient'
import { STATUS } from '@/models/Patient'
import PatientsTable from '@/components/patients/PatientsTable.vue'
import PatientModal from '@/components/patients/PatientModal.vue'

// hardcoded za sad
const patients = ref<Patient[]>([
  { id: 1, name: 'Ivan Horvat', datumRodjenja: '1980-05-12', kontakt: '+385 91 123 4567', dijagnoza: 'Lumbalna bol', status: STATUS.AKTIVNO, napomene: 'Redovito vježbanje' },
  { id: 2, name: 'Marija Kovač', datumRodjenja: '1992-11-03', kontakt: '+385 98 765 4321', dijagnoza: 'Kifoza', status: STATUS.ZAVRSENO, napomene: 'Preporučena fizio-terapija' },
  { id: 3, name: 'Petar Novak', datumRodjenja: '1975-02-22', kontakt: '+385 99 111 2222', dijagnoza: 'Artroza koljena', status: STATUS.AKTIVNO, napomene: 'Operacija 2019' }
])

const search = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const isCreating = ref(false)

const emptyPatient: Patient = { 
  id: 0, 
  name: '', 
  datumRodjenja: '', 
  kontakt: '', 
  dijagnoza: '', 
  status: STATUS.AKTIVNO, 
  napomene: '' 
}

const selected = ref<Patient>({ ...emptyPatient })

const filteredPatients = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return patients.value
  return patients.value.filter(p => {
    return (
      p.name.toLowerCase().includes(q) ||
      p.kontakt.toLowerCase().includes(q) ||
      p.dijagnoza.toLowerCase().includes(q) ||
      (p.status && p.status.toLowerCase().includes(q))
    )
  })
})

function openView(patient: Patient) {
  selected.value = { ...patient }
  isEditing.value = false
  isCreating.value = false
  showModal.value = true
}

function openEdit(patient: Patient) {
  selected.value = { ...patient }
  isEditing.value = true
  isCreating.value = false
  showModal.value = true
}

function openCreate() {
  selected.value = { ...emptyPatient }
  isEditing.value = true
  isCreating.value = true
  showModal.value = true
}

function handleSave(patient: Patient) {
  if (isCreating.value) {
    const maxId = patients.value.length > 0 ? Math.max(...patients.value.map(p => p.id)) : 0
    const newPatient = { ...patient, id: maxId + 1 }
    patients.value.push(newPatient)
  } else {
    const idx = patients.value.findIndex(p => p.id === patient.id)
    if (idx !== -1) {
      patients.value.splice(idx, 1, { ...patient })
    }
  }
  showModal.value = false
}

function deletePatient(patient: Patient) {
  const ok = confirm(`Obrisati pacijenta ${patient.name}?`)
  if (!ok) return
  patients.value = patients.value.filter(p => p.id !== patient.id)
}

function updatePatient(patient: Patient) {
  selected.value = patient
}

function closeModal() {
  showModal.value = false
}

</script>

<template>
  <div class="pacijenti-container">
    <div class="header-row">
      <h1 class="page-title">Pacijenti</h1>
      <button class="btn-add-patient" @click="openCreate">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Dodaj pacijenta
      </button>
    </div>

    <div class="patients-card">
      <div class="search-container">
        <input
          v-model="search"
          type="search"
          placeholder="Pretraži ime, kontakt, dijagnoza..."
          class="search-input"
        />
      </div>

      <PatientsTable 
        :patients="filteredPatients"
        @view="openView"
        @edit="openEdit"
        @delete="deletePatient"
      />
    </div>

    <PatientModal
      :show="showModal"
      :patient="selected"
      :is-editing="isEditing"
      :is-creating="isCreating"
      @close="closeModal"
      @save="handleSave"
      @update:patient="updatePatient"
    />
  </div>
</template>

<style scoped>
.pacijenti-container {
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 600;
  margin-bottom: 0;
  color: #1f2937;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.btn-add-patient {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #1E3D9E;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-patient:hover {
  background-color: #152d73;
}

.icon-plus {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.patients-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.search-container {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #1E3D9E;
  box-shadow: 0 0 0 3px rgba(30, 61, 158, 0.1);
}

@media (max-width: 768px) {
  .pacijenti-container {
    padding: 1rem;
  }
}
</style>