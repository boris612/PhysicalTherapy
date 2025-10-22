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
  events: exampleEvents.map((event) => {
    const content = `
      <div class="event-content">
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
  }),
})
</script>
 
<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<style>
:root {
  --sx-color-primary: #1E3D9E;
  --sx-color-surface-dim: #e8effc;
}

.sx-vue-calendar-wrapper {
  width: 100%;
  height: 100vh;
  padding: 2rem 20rem;
  box-sizing: border-box;
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