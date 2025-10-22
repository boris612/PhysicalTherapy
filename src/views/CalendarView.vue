<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewDay,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import 'temporal-polyfill/global'
import { exampleEvents } from '@/data/exampleEvents'
import { getEventTitle } from '@/models/Event'
import { ref, computed, watch } from 'vue'
import Select from 'primevue/select'
import Button from 'primevue/button'
import { translations, mergeLocales } from '@schedule-x/translations'

const selectedDoctor = ref<string | null>(null)
const selectedPatient = ref<string | null>(null)
const selectedRoom = ref<string | null>(null)
const selectedExercise = ref<string | null>(null)

function clearAllFilters() {
  selectedDoctor.value = null
  selectedPatient.value = null
  selectedRoom.value = null
  selectedExercise.value = null
}

const doctors = computed(() => {
  const uniqueDoctors = [...new Set(exampleEvents.map(e => e.doctorName))]
  return uniqueDoctors.sort()
})

const patients = computed(() => {
  const uniquePatients = new Set<string>()
  exampleEvents.forEach(e => {
    e.patients.forEach(p => uniquePatients.add(p.name))
  })
  return [...uniquePatients].sort()
})

const rooms = computed(() => {
  const uniqueRooms = [...new Set(exampleEvents.map(e => e.room))]
  return uniqueRooms.sort()
})

const exercises = computed(() => {
  const uniqueExercises = [...new Set(exampleEvents.map(e => e.exercise))]
  return uniqueExercises.sort()
})

const filteredEvents = computed(() => {
  return exampleEvents.filter(event => {
    if (selectedDoctor.value && event.doctorName !== selectedDoctor.value) {
      return false
    }
    if (selectedPatient.value && !event.patients.some(p => p.name === selectedPatient.value)) {
      return false
    }
    if (selectedRoom.value && event.room !== selectedRoom.value) {
      return false
    }
    if (selectedExercise.value && event.exercise !== selectedExercise.value) {
      return false
    }
    return true
  })
})

function mapEventToCalendarFormat(event: any) {
  const content = `
    <div class="event-content">
      <div class="event-line">${event.exercise}</div>
      <div class="event-line">${event.doctorName}</div>
      <div class="event-line">${getEventTitle(event)}</div>
      <div class="event-line">${event.room}</div>
    </div>
  `
  return {
    id: event.id,
    title: getEventTitle(event),
    start: Temporal.ZonedDateTime.from(event.startDate + '[Europe/Zagreb]'),
    end: Temporal.ZonedDateTime.from(event.endDate + '[Europe/Zagreb]'),
    calendarId: event.patients.length > 1 ? 'group' : 'individual',
    _customContent: {
      timeGrid: content,
      dateGrid: content,
      monthGrid: content,
      monthAgenda: content,
    },
  }
}

const calendarApp = createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-10-15'),
  locale: 'hr-HR',
  translations: mergeLocales(translations, {
    hrHR: {
      'Today': 'Danas',
      'Month': 'Mjesec',
      'Week': 'Tjedan',
      'Day': 'Dan',
      'Date': 'Datum',
      'Views': 'Prikazi',
      'Select date': 'Odaberi datum',
      'Select time': 'Odaberi vrijeme'
    }
  }),
  views: [
    createViewDay(),
    createViewWeek(),
    createViewMonthGrid(),
  ],
  dayBoundaries: {
    start: '06:00',
    end: '17:00',
  },
  calendars: {
    individual: {
      colorName: 'individual',
      lightColors: {
        main: '#1E3D9E',
        container: '#dbeafe',
        onContainer: '#0f1f4f',
      },
    },
    group: {
      colorName: 'group',
      lightColors: {
        main: '#10b981',
        container: '#d1fae5',
        onContainer: '#064e3b',
      },
    },
  },
  events: exampleEvents.map(mapEventToCalendarFormat),
})

watch(filteredEvents, (newEvents) => {
  calendarApp.events.set(newEvents.map(mapEventToCalendarFormat))
}, { immediate: true })
</script>

<template>
  <div class="calendar-container">
    <div class="filters">
      <div class="filter-group">
        <label for="doctor">Doktor</label>
        <Select
          v-model="selectedDoctor"
          :options="doctors"
          placeholder="Svi doktori"
          :showClear="true"
          filter
          class="filter-select"
        />
      </div>

      <div class="filter-group">
        <label for="patient">Pacijent</label>
        <Select
          v-model="selectedPatient"
          :options="patients"
          placeholder="Svi pacijenti"
          :showClear="true"
          filter
          class="filter-select"
        />
      </div>

      <div class="filter-group">
        <label for="room">Soba</label>
        <Select
          v-model="selectedRoom"
          :options="rooms"
          placeholder="Sve sobe"
          :showClear="true"
          filter
          class="filter-select"
        />
      </div>

      <div class="filter-group">
        <label for="exercise">Vježba</label>
        <Select
          v-model="selectedExercise"
          :options="exercises"
          placeholder="Sve vježbe"
          :showClear="true"
          filter
          class="filter-select"
        />
      </div>

      <div class="filter-group">
        <label>&nbsp;</label>
        <Button
          label="Obriši sve filtere"
          icon="pi pi-times"
          @click="clearAllFilters"
          severity="secondary"
          outlined
        />
      </div>
    </div>

    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style>
:root {
  --sx-color-primary: #1E3D9E;
  --sx-color-surface-dim: #e8effc;
}

.calendar-container {
  width: 100%;
  height: 100vh;
  padding: 2rem 20rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filters {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.filter-group label {
  font-weight: 600;
  font-size: 0.875rem;
}

.filter-select {
  width: 100%;
}

.sx-vue-calendar-wrapper {
  width: 100%;
  flex: 1;
}

:deep(.event-content) {
  display: flex;
  flex-direction: column;
  font-weight: bold;
}

:deep(.event-line) {
  display: flex;
  align-items: center;
}
</style>
