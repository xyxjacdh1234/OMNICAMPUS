
export const upcomingEventsData = [
  {
    id: 1,
    title: 'FutureTech Summit 2026',
    date: '2026-11-20',
    time: '10:00 AM – 5:00 PM',
    venue: 'Main Auditorium',
    location: 'Edward College of Engineering, Parel, Mumbai'
  },
  {
    id: 2,
    title: 'Robotics Championship',
    date: '2026-12-12',
    time: '9:30 AM – 4:30 PM',
    venue: 'Robotics Arena',
    location: 'New Panvel, Navi Mumbai'
  },
  {
    id: 3,
    title: 'CodeFest 2027 — Inter-College Hackathon',
    date: '2027-01-18',
    time: '9:00 AM – 6:00 PM',
    venue: 'Innovation Centre',
    location: 'Kharghar, Navi Mumbai'
  },
  {
    id: 4,
    title: 'Annual Cultural Fest 2027',
    date: '2027-02-14',
    time: '10:00 AM – 7:00 PM',
    venue: 'College Open Ground',
    location: 'Edward College of Engineering, Parel, Mumbai'
  },
  {
    id: 5,
    title: 'AI Innovation Expo',
    date: '2027-03-10',
    time: '10:30 AM – 5:00 PM',
    venue: 'Exhibition Hall',
    location: 'CBD Belapur, Navi Mumbai'
  },
  {
    id: 6,
    title: 'Inter-College Sports Meet',
    date: '2027-04-16',
    time: '8:00 AM – 5:00 PM',
    venue: 'Sports Complex',
    location: 'Kamothe, Navi Mumbai'
  }
]

export function formatEventDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export function getUpcomingEvents() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const endDate = new Date(today)
  endDate.setMonth(endDate.getMonth() + 6)

  return upcomingEventsData
    .filter((event) => {
      const [year, month, day] = event.date.split('-').map(Number)
      const eventDate = new Date(year, month - 1, day)
      return eventDate > today && eventDate <= endDate
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}
