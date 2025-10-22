export interface Patient {
  name: string
}

export interface Event {
  id: number
  startDate: string
  endDate: string
  doctorName: string
  patients: Patient[]
  room: string
}

export function getEventTitle(event: Event): string {
  if (event.patients.length > 1) {
    return 'Grupne vježbe'
  }
  return event.patients[0]?.name ?? 'Bez pacijenta'
}
