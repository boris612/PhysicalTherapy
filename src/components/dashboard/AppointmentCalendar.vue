<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";
import Divider from "primevue/divider";

const selectedDate = ref(new Date());

// Mock appointments data
const appointments = ref([
  {
    id: 1,
    patientName: "Marko Marković",
    time: "09:00 - 10:00",
    room: "Room 1",
    therapyType: "Manual therapy",
    date: new Date(2025, 9, 15), // October 15, 2025
  },
  {
    id: 2,
    patientName: "Ana Anić",
    time: "10:00 - 11:00",
    room: "Room 2",
    therapyType: "Rehabilitation exercises",
    date: new Date(2025, 9, 15), // October 15, 2025
  },
  {
    id: 3,
    patientName: "Ivan Horvat",
    time: "14:00 - 15:00",
    room: "Room 1",
    therapyType: "Electrotherapy",
    date: new Date(2025, 9, 13), // October 13, 2025
  },
]);

const dayNames = [
  "Nedjelja",
  "Ponedjeljak",
  "Utorak",
  "Srijeda",
  "Četvrtak",
  "Petak",
  "Subota",
];

const formattedDate = computed(() => {
  const day = selectedDate.value.getDate();
  const month = selectedDate.value.getMonth() + 1;
  const year = selectedDate.value.getFullYear();
  return `${day}. ${month}. ${year}.`;
});

const dayName = computed(() => {
  const name = dayNames[selectedDate.value.getDay()];
  return name ? name.toUpperCase() : "";
});

const filteredAppointments = computed(() => {
  return appointments.value.filter((apt) => {
    return (
      apt.date.getDate() === selectedDate.value.getDate() &&
      apt.date.getMonth() === selectedDate.value.getMonth() &&
      apt.date.getFullYear() === selectedDate.value.getFullYear()
    );
  });
});

const previousDay = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setDate(newDate.getDate() - 1);
  selectedDate.value = newDate;
};

const nextDay = () => {
  const newDate = new Date(selectedDate.value);
  newDate.setDate(newDate.getDate() + 1);
  selectedDate.value = newDate;
};
</script>

<template>
  <Card class="shadow-lg" style="background-color: #f3f4f6">
    <template #content>
      <!-- Date Navigation -->
      <div class="flex items-center justify-between mb-6">
        <Button
          icon="pi pi-chevron-left"
          text
          rounded
          @click="previousDay"
          size="large"
          class="text-surface-500"
        />
        <div class="text-center">
          <h2
            class="text-2xl font-bold text-surface-700 dark:text-surface-300 m-0 mb-1"
          >
            {{ dayName }}
          </h2>
          <h3
            class="text-4xl font-bold text-surface-900 dark:text-surface-0 m-0"
          >
            {{ formattedDate }}
          </h3>
        </div>
        <Button
          icon="pi pi-chevron-right"
          text
          rounded
          @click="nextDay"
          size="large"
          class="text-surface-500"
        />
      </div>

      <Divider />

      <!-- Appointments List -->
      <div class="mt-6">
        <div v-if="filteredAppointments.length === 0" class="text-center py-12">
          <p class="text-surface-400 text-lg">
            Nema zakazanih termina za ovaj dan.
          </p>
        </div>
        <div v-else>
          <div
            v-for="(appointment, index) in filteredAppointments"
            :key="appointment.id"
            class="py-6"
          >
            <div class="text-center">
              <h4
                class="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2 mx-4"
              >
                {{ appointment.patientName }}
              </h4>
              <p
                class="text-2xl font-bold text-surface-900 dark:text-surface-0 my-3"
              >
                {{ appointment.time }}
              </p>
              <p
                class="text-2xl font-bold text-surface-800 dark:text-surface-100 my-3"
              >
                {{ appointment.room }}
              </p>
              <p
                class="text-lg italic text-surface-500 dark:text-surface-400 mt-2"
              >
                {{ appointment.therapyType }}
              </p>
            </div>
            <Divider
              v-if="index < filteredAppointments.length - 1"
              class="my-6"
            />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>
