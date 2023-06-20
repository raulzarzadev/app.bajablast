import { ParkActivity } from '@/types/activities'

export const activities: ParkActivity[] = [
  {
    id: '1',
    name: 'Challenge + tirolesa',
    description: 'Challenge + tirolesa',
    schedule: {
      Monday: null,
      Tuesday: '12:00-22:00',
      Wednesday: '12:00-22:00',
      Thursday: '12:00-22:00',
      Friday: '12:00-22:00',
      Saturday: '12:00-22:00',
      Sunday: '12:00-22:00'
    },
    shortName: 'tirolesa',
    price: 250
  },
  {
    id: '2',
    name: 'Crays Jump',
    description: 'Crays Jump',
    schedule: {
      Monday: null,
      Tuesday: '12:00-22:00',
      Wednesday: '12:00-22:00',
      Thursday: '12:00-22:00',
      Friday: '12:00-22:00',
      Saturday: '12:00-22:00',
      Sunday: '12:00-22:00'
    },
    shortName: 'jump',
    price: 250
  },
  {
    id: '3',
    name: 'Just Challenge',
    description: 'Just Challenge',
    schedule: {
      Monday: null,
      Tuesday: '12:00-22:00',
      Wednesday: '12:00-22:00',
      Thursday: '12:00-22:00',
      Friday: '12:00-22:00',
      Saturday: '12:00-22:00',
      Sunday: '12:00-22:00'
    },
    shortName: 'challenge',
    price: 150
  },
  {
    id: '4',
    name: 'Todo incluido',
    description: 'Todo incluido',
    schedule: {
      Monday: null,
      Tuesday: '12:00-22:00',
      Wednesday: '12:00-22:00',
      Thursday: '12:00-22:00',
      Friday: '12:00-22:00',
      Saturday: '12:00-22:00',
      Sunday: '12:00-22:00'
    },
    shortName: 'full',
    price: 450
  }
]
