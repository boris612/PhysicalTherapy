<script setup>
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
 
const calendarApp = createCalendar({
  selectedDate: Temporal.PlainDate.from('2025-10-15'),
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
        main: '#3b82f6',
        container: '#dbeafe',
        onContainer: '#1e3a8a',
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
  events: exampleEvents.map((event) => {
    const userIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'
    const doctorIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2v20"/><path d="M15 10v4"/><path d="M19 10v4"/><path d="M3 10v4"/><path d="M7 10v4"/></svg>'
    const roomIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M9 8h1"/><path d="M9 12h1"/><path d="M9 16h1"/><path d="M14 8h1"/><path d="M14 12h1"/><path d="M14 16h1"/><path d="M6 3v18"/><path d="M18 3v18"/><path d="M6 3h12"/></svg>'

    const content = `
      <div class="event-content">
        <div class="event-line">
          <span class="event-icon">${userIcon}</span>
          <span>${getEventTitle(event)}</span>
        </div>
        <div class="event-line">
          <span class="event-icon">${doctorIcon}</span>
          <span>${event.doctorName}</span>
        </div>
        <div class="event-line">
          <span class="event-icon">${roomIcon}</span>
          <span>${event.room}</span>
        </div>
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
  }),
})
</script>
 
<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style>
.sx-vue-calendar-wrapper {
  width: 100%;
  height: 100vh;
  padding: 2rem 20rem;
  box-sizing: border-box;
}

:deep(.event-content) {
  display: flex;
  flex-direction: column;
}

:deep(.event-line) {
  display: flex;
  align-items: center;
}

:deep(.event-icon) {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
}

:deep(.event-icon svg) {
  display: block;
}
</style>