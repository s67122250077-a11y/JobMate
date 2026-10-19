import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useJobs from '../hooks/useJobs.js'
import JobCard from '../components/JobCard.jsx'
export default function JobListPage({ savedIds, onToggleSave }) {
  const { jobs, loading, error } = useJobs()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const [mode, setMode] = useState('ทั้งหมด')
  const filtered = useMemo(() => jobs.filter(j => {
    const q = query.toLowerCase()
    const match = [j.job_title, j.company_name, j.location, j.category_name, ...(j.requirements || [])].join(' ').toLowerCase().includes(q)
    return match && (mode === 'ทั้งหมด' || j.work_mode === mode)
  }), [jobs, query, mode])
  return <section className="page"><span className="eyebrow">EXPLORE CAREERS</span><h1>ค้นหางาน</h1><p className="muted">ค้นหาตำแหน่งงานตามทักษะ บริษัท หรือสถานที่ทำงาน</p>
    <div className="filter-bar"><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ค้นหาตำแหน่ง บริษัท หรือทักษะ..." aria-label="ค้นหางาน"/>
      <select value={mode} onChange={e=>setMode(e.target.value)} aria-label="รูปแบบการทำงาน"><option>ทั้งหมด</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select></div>
    {loading ? <p className="state-message">กำลังโหลดข้อมูล...</p> : error ? <p className="state-message error">{error}</p> :
    <><p className="result-count">พบ {filtered.length} ตำแหน่ง</p>{filtered.length ? <div className="job-grid">{filtered.map(job=><JobCard key={job.job_id} job={job} saved={savedIds.includes(job.job_id)} onToggleSave={onToggleSave}/>)}</div> : <div className="empty-state">ไม่พบงานที่ตรงกับคำค้นหา ลองเปลี่ยนคำค้นหรือเงื่อนไข</div>}</>}
  </section>
}