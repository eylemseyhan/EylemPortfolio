import { useState, useEffect } from 'react'
import { skillsApi } from '../api/skills'

const FALLBACK_SKILLS = [
  { label: 'Backend', marker: '✎', color: 'mint', bg: '#C8F0DC', border: '#8fd4aa', skills: ['C#', '.NET Core', '.NET MVC', 'RabbitMQ', 'Entity Framework', 'REST API'] },
  { label: 'Frontend', marker: '✿', color: 'lavender', bg: '#E0D4F7', border: '#b8a8e0', skills: ['React', 'HTML', 'CSS', 'Bootstrap'] },
  { label: 'Databases', marker: '◈', color: 'peach', bg: '#FFD9C0', border: '#f0b898', skills: ['PostgreSQL', 'SQL Server', 'Firebase Firestore'] },
  { label: 'AI / ML', marker: '✦', color: 'babyblue', bg: '#C5E8F7', border: '#90c8e8', skills: ['LangChain'] },
  { label: 'Tools & Infra', marker: '◎', color: 'butter', bg: '#FFF3B0', border: '#e8d878', skills: ['Git', 'Postman', 'ElasticSearch', 'Docker', 'Aiven', 'GitHub'] },
  { label: 'Languages', marker: '♡', color: 'rose', bg: '#FFD6E0', border: '#f0a8c0', skills: ['Turkish — native', 'English — B2', 'German — A2'] },
]

export function useSkills() {
  const [skillCategories, setSkillCategories] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    skillsApi.getGrouped()
      .then(data => setSkillCategories(data))
      .catch(() => setSkillCategories(FALLBACK_SKILLS))
      .finally(() => setLoading(false))
  }, [])

  return { skillCategories: skillCategories ?? FALLBACK_SKILLS, loading }
}
