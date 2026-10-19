import useJobs from '../hooks/useJobs.js'
import JobCard from '../components/JobCard.jsx'
export default function SavedJobsPage({ savedIds, onToggleSave }) {
 const {jobs, loading, error}=useJobs()
 const saved=jobs.filter(j=>savedIds.includes(j.job_id))
 return <section className="page"><span className="eyebrow">YOUR SHORTLIST</span><h1>งานที่บันทึกไว้</h1>
 {loading?<p className="state-message">กำลังโหลดข้อมูล...</p>:error?<p className="state-message error">{error}</p>:saved.length?<div className="job-grid">{saved.map(job=><JobCard key={job.job_id} job={job} saved={true} onToggleSave={onToggleSave}/>)}</div>:<div className="empty-state">ยังไม่มีงานที่บันทึกไว้ ไปที่หน้าค้นหางานเพื่อบันทึกตำแหน่งที่สนใจ</div>}</section>
}