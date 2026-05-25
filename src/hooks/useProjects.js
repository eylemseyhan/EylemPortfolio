import { useState, useEffect } from 'react'
import { projectsApi } from '../api/projects'

const FALLBACK_PROJECTS = [
  { id: 1, emoji: '★', title: 'Eventura', type: 'Event Management Platform', description: 'Event discovery by city & category, ticket purchase with QR code generation, admin panel for backend control.', technologies: ['.NET Core', 'Bootstrap', 'jQuery', 'PostgreSQL (Aiven)'], gitHubUrl: 'https://github.com/eylemseyhan/Eventura', color: 'mint', rotation: -2, isFeatured: true },
  { id: 2, emoji: '✦', title: 'Taskify', type: 'Task Management App', description: 'Task creation, editing, user assignment, real-time calendar view, subtask tracking.', technologies: ['React', 'Firebase Firestore', 'Firebase Auth'], gitHubUrl: 'https://github.com/eylemseyhan/Taskify', color: 'lavender', rotation: 1.5 },
  { id: 3, emoji: '⚡', title: 'Power Plant App', type: 'Energy Data Platform', description: 'Power plant data management with role-based access control.', technologies: ['.NET Core', 'EF Code First', 'SQL Server'], gitHubUrl: 'https://github.com/eylemseyhan/PowerPlantApp', color: 'peach', rotation: -1 },
  { id: 4, emoji: '✎', title: 'E-Registration (DSI)', type: 'Sports Club Registration', description: 'Online student registration, AJAX dynamic updates, real-time admin tracking.', technologies: ['.NET MVC', 'SQL Server', 'Bootstrap', 'AJAX'], gitHubUrl: 'https://github.com/eylemseyhan/DSI-Sports-Registration', color: 'babyblue', rotation: 2 },
  { id: 5, emoji: '✿', title: 'NutriTrack', type: 'iOS Nutrition App', description: 'Track daily meals, monitor calorie intake. iOS native with Firebase backend.', technologies: ['Swift', 'Firebase'], gitHubUrl: 'https://github.com/eylemseyhan/NutriTrack', color: 'rose', rotation: -1.5 },
]

export function useProjects() {
  const [projects, setProjects] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    projectsApi.getAll()
      .then(data => setProjects(data))
      .catch(err => {
        console.warn('API unavailable, using fallback data:', err.message)
        setProjects(FALLBACK_PROJECTS)
        setError(err)
      })
      .finally(() => setLoading(false))
  }, [])

  return { projects: projects ?? FALLBACK_PROJECTS, loading, error }
}
