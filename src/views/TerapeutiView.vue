<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Therapist } from '@/models/Therapist'
import { STATUS } from '@/models/Therapist'
import TherapistCard from '@/components/therapists/TherapistCard.vue'
import TherapistModal from '@/components/therapists/TherapistModal.vue'

// hardcoded za sad
const therapists = ref<Therapist[]>([
  { id: 1, name: 'Dr. Ana Marić', specijalnost: 'Fizikalna medicina', kontakt: '+385 91 234 5678', email: 'ana.maric@example.com', status: STATUS.AKTIVAN, napomene: 'Iskustvo sa neurološkim pacijentima', radnoVrijeme: 'Pon-Pet: 08:00-16:00', profilePicture: '/images/therapists/ana-maric.png' },
  { id: 2, name: 'Dr. Marko Babić', specijalnost: 'Sportska medicina', kontakt: '+385 98 876 5432', email: 'marko.babic@example.com', status: STATUS.AKTIVAN, napomene: 'Specijalist za sportske ozljede', radnoVrijeme: 'Pon-Pet: 09:00-17:00', profilePicture: '/images/therapists/marko-babic.png' },
  { id: 3, name: 'Dr. Stjepan Grgić', specijalnost: 'Kineziterapija', kontakt: '+385 99 222 3333', email: 'stjepan.grgic@example.com', status: STATUS.AKTIVAN, napomene: 'Stručnjak za rehabilitaciju', radnoVrijeme: 'Pon-Pet: 10:00-18:00', profilePicture: '/images/therapists/stjepan-grgic.png' }
])

const search = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const isCreating = ref(false)

const emptyTherapist: Therapist = {
  id: 0,
  name: '',
  specijalnost: '',
  kontakt: '',
  email: '',
  status: STATUS.AKTIVAN,
  napomene: ''
}

const selected = ref<Therapist>({ ...emptyTherapist })

const filteredTherapists = computed(() => {
  const q = search.value.trim().toLowerCase()
  if (!q) return therapists.value
  return therapists.value.filter(t => {
    return (
      t.name.toLowerCase().includes(q) ||
      t.specijalnost.toLowerCase().includes(q) ||
      t.kontakt.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      (t.status && t.status.toLowerCase().includes(q))
    )
  })
})

function openEdit(therapist: Therapist) {
  selected.value = { ...therapist }
  isEditing.value = true
  isCreating.value = false
  showModal.value = true
}

function openCreate() {
  selected.value = { ...emptyTherapist }
  isEditing.value = true
  isCreating.value = true
  showModal.value = true
}

function handleSave(therapist: Therapist) {
  if (isCreating.value) {
    const maxId = therapists.value.length > 0 ? Math.max(...therapists.value.map(t => t.id)) : 0
    const newTherapist = { ...therapist, id: maxId + 1 }
    therapists.value.push(newTherapist)
  } else {
    const idx = therapists.value.findIndex(t => t.id === therapist.id)
    if (idx !== -1) {
      therapists.value.splice(idx, 1, { ...therapist })
    }
  }
  showModal.value = false
}

function deleteTherapist(therapist: Therapist) {
  const ok = confirm(`Obrisati terapeuta ${therapist.name}?`)
  if (!ok) return
  therapists.value = therapists.value.filter(t => t.id !== therapist.id)
}

function updateTherapist(therapist: Therapist) {
  selected.value = therapist
}

function closeModal() {
  showModal.value = false
}

</script>

<template>
  <div class="terapeuti-container">
    <div class="header-row">
      <h1 class="page-title">Terapeuti</h1>
      <button class="btn-add-therapist" @click="openCreate">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Dodaj terapeuta
      </button>
    </div>

    <div class="search-container">
      <input
        v-model="search"
        type="search"
        placeholder="Pretraži ime, specijalnost, kontakt..."
        class="search-input"
      />
    </div>

    <div class="therapists-grid">
      <TherapistCard
        v-for="therapist in filteredTherapists"
        :key="therapist.id"
        :therapist="therapist"
        @edit="openEdit"
        @delete="deleteTherapist"
      />
      <div v-if="filteredTherapists.length === 0" class="empty-state">
        Nema rezultata
      </div>
    </div>

    <TherapistModal
      :show="showModal"
      :therapist="selected"
      :is-editing="isEditing"
      :is-creating="isCreating"
      @close="closeModal"
      @save="handleSave"
      @update:therapist="updateTherapist"
    />
  </div>
</template>

<style scoped>
.terapeuti-container {
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

.btn-add-therapist {
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

.btn-add-therapist:hover {
  background-color: #152d73;
}

.icon-plus {
  width: 1.25rem;
  height: 1.25rem;
  stroke-width: 2;
}

.search-container {
  margin-bottom: 2rem;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
  transition: all 0.2s;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #1E3D9E;
  box-shadow: 0 0 0 3px rgba(30, 61, 158, 0.1);
}

.therapists-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

.empty-state {
  grid-column: 1 / -1;
  padding: 3rem;
  text-align: center;
  color: #9ca3af;
  font-size: 1rem;
  background-color: white;
  border-radius: 8px;
  border: 2px dashed #e5e7eb;
}

@media (max-width: 768px) {
  .terapeuti-container {
    padding: 1rem;
  }

  .therapists-grid {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1400px) {
  .therapists-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}
</style>
