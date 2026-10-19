import { useEffect, useState } from 'react'
import { getJobs } from '../services/jobService.js'
export default function useJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useEffect(() => {
    getJobs().then(setJobs).catch(() => setError('ไม่สามารถโหลดข้อมูลงานได้'))
      .finally(() => setLoading(false))
  }, [])
  return { jobs, loading, error }
}