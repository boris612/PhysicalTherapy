export interface Therapist {
  id: number
  name: string
  specijalnost: string
  kontakt: string
  email: string
  status: TherapistStatus
  napomene?: string
  profilePicture?: string
  radnoVrijeme?: string
}

export const STATUS = Object.freeze({
  AKTIVAN: 'Aktivan',
  NEAKTIVAN: 'Neaktivan'
} as const)

export type TherapistStatus = typeof STATUS[keyof typeof STATUS]
