import { Link, useParams } from 'react-router-dom'
import useJobs from '../hooks/useJobs.js'
export default function JobDetailPage({ savedIds, onToggleSave }) {
  const { id } = useParams()
  const { jobs, loading, error } = useJobs()
  const job = jobs.find(j => j.job_id === id)
  if (loading) return <p className="state-message">กำลังโหลดรายละเอียดงาน...</p>
  if (error) return <p className="state-message error">{error}</p>
  if (!job) return <section className="page empty-state">ไม่พบประกาศงานนี้ <Link to="/jobs">กลับไปหน้าค้นหางาน</Link></section>
  return <section className="page detail-page"><Link className="text-link" to="/jobs">← กลับไปค้นหางาน</Link><div className="detail-panel"><span className="category-pill">{job.category_name}</span><h1>{job.job_title}</h1><h3>{job.company_name}</h3><div className="job-meta"><span>⌖ {job.location}</span><span>{job.work_mode}</span><span>{job.job_type}</span></div><p className="salary large">{job.salary ? `฿${Number(job.salary).toLocaleString('th-TH')} / เดือน` : 'เงินเดือนตามตกลง'}</p><hr/><h2>รายละเอียดงาน</h2><p>{job.description}</p><h2>ทักษะที่เกี่ยวข้อง</h2><div className="skills">{(job.requirements||[]).map(s=><span key={s}>{s}</span>)}</div><div className="detail-actions"><button className="primary-button" onClick={()=>alert('ตัวอย่างหน้าสาธิต: เชื่อมต่อระบบสมัครงานและ Firebase Authentication ก่อนใช้งานจริง')}>สมัครงาน (ตัวอย่าง)</button><button className="secondary-button" onClick={()=>onToggleSave(job.job_id)}>{savedIds.includes(job.job_id)?'♥ บันทึกแล้ว':'♡ บันทึกงานนี้'}</button></div></div></section>
}