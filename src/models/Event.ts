import { Patient } from "../models/Patient"


export interface Event {
  id: number
  startDate: string
  endDate: string
  doctorName: string
  patients: Patient[]
  room: string
  exercise: string
}

export function getEventTitle(event: Event): string {
  if (event.patients.length > 1) {
    return ''
  }
  return event.patients[0]?.name ?? 'Bez pacijenta'
}
