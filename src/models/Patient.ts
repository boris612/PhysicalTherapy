export interface Patient {
  id: number
  name: string
  datumRodjenja: string
  kontakt: string
  dijagnoza: string
  status: PatientStatus
  napomene?: string
}

export const STATUS = Object.freeze({
  AKTIVNO: 'Aktivno',
  ZAVRSENO: 'Završeno'
} as const)

export type PatientStatus = typeof STATUS[keyof typeof STATUS]