import { Link } from 'react-router-dom'
import useJobs from '../hooks/useJobs.js'
import JobCard from '../components/JobCard.jsx'
export default function HomePage({ savedIds, onToggleSave }) {
  const { jobs, loading, error } = useJobs()
  return <><section className="hero"><div className="hero-copy"><span className="eyebrow">YOUR NEXT CAREER STARTS HERE</span><h1>งานสายเทคโนโลยี<br/><em>ที่ใช่สำหรับคุณ</em></h1><p>ค้นหาโอกาสใหม่ ๆ ในสายโปรแกรมมิ่ง จากข้อมูลประกาศงานใน JobMate</p><Link className="primary-button" to="/jobs">ค้นหางานทั้งหมด ↗</Link></div><div className="hero-art"><div className="art-window"><div className="window-dots">● ● ●</div><code>{'{'}<br/>&nbsp; role: <b>"developer"</b>,<br/>&nbsp; passion: <b>"build"</b>,<br/>&nbsp; future: <b>"yours"</b><br/>{'}'}</code><div className="art-chip">✦ Find your fit</div></div></div></section>
  <section className="section-heading"><div><span className="eyebrow">OPPORTUNITIES</span><h2>งานแนะนำ</h2></div><Link to="/jobs" className="text-link">ดูทั้งหมด →</Link></section>
  {loading ? <p className="state-message">กำลังโหลดข้อมูล...</p> : error ? <p className="state-message error">{error}</p> :
    <div className="job-grid">{jobs.slice(0,6).map(job => <JobCard key={job.job_id} job={job} saved={savedIds.includes(job.job_id)} onToggleSave={onToggleSave}/>)}</div>}
  </>}
