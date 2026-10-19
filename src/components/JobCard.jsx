import { Link } from 'react-router-dom'
export default function JobCard({ job, saved, onToggleSave }) {
  return <article className="job-card">
    <div className="job-card-top"><span className="category-pill">{job.category_name}</span>
      <button className="save-button" onClick={() => onToggleSave(job.job_id)} aria-label="บันทึกงาน">{saved ? '♥ บันทึกแล้ว' : '♡ บันทึกงาน'}</button></div>
    <h3><Link to={`/jobs/${job.job_id}`}>{job.job_title}</Link></h3>
    <p className="company">{job.company_name}</p>
    <div className="job-meta"><span>⌖ {job.location}</span><span>{job.work_mode}</span><span>{job.job_type}</span></div>
    <p className="salary">{job.salary ? `฿${Number(job.salary).toLocaleString('th-TH')} / เดือน` : 'ตามตกลง'}</p>
    <Link className="text-link" to={`/jobs/${job.job_id}`}>ดูรายละเอียด →</Link>
  </article>
}