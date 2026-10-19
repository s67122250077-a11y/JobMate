import { get, ref } from 'firebase/database'
import { db, firebaseConfigured } from './firebase.js'
import seed from '../../JobMate_data.json'

export async function getJobs() {
  if (firebaseConfigured && db) {
    try {
      const snap = await get(ref(db, 'jobs'))
      if (snap.exists()) {
        const jobs = snap.val()
        const companies = (await get(ref(db, 'companies'))).val() || {}
        const categories = (await get(ref(db, 'categories'))).val() || {}
        return Object.values(jobs).map(job => ({
          ...job,
          company_name: companies[job.company_id]?.company_name || 'ไม่ระบุบริษัท',
          category_name: categories[job.category_id]?.name || 'อื่น ๆ'
        }))
      }
    } catch (error) {
      console.error('Firebase read failed; showing demo dataset:', error)
    }
  }
  const companies = seed.companies || {}
  const categories = seed.categories || {}
  return Object.values(seed.jobs || {}).map(job => ({
    ...job,
    company_name: companies[job.company_id]?.company_name || 'ไม่ระบุบริษัท',
    category_name: categories[job.category_id]?.name || 'อื่น ๆ'
  }))
}
export async function getJobById(id) {
  const jobs = await getJobs()
  return jobs.find(job => job.job_id === id) || null
}