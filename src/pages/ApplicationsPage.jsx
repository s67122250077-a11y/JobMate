import seed from '../../jobmate_data.json'
const labels={Pending:'รอตรวจสอบ',Reviewing:'กำลังพิจารณา',Accepted:'ผ่านการคัดเลือก',Rejected:'ไม่ผ่านการคัดเลือก'}
export default function ApplicationsPage(){
 const apps=Object.values(seed.applications||{}).slice(0,12)
 const jobs=seed.jobs||{}
 const companies=seed.companies||{}
 return <section className="page"><span className="eyebrow">APPLICATION TRACKER</span><h1>สถานะการสมัครงาน</h1><p className="muted">ข้อมูลตัวอย่างสำหรับสาธิตการแสดงสถานะ ยังไม่ได้ผูกกับบัญชีผู้ใช้จริง</p><div className="application-list">{apps.map(a=>{const j=jobs[a.job_id]||{};return <article className="application-row" key={a.application_id}><div><h3>{j.job_title||'ไม่ระบุตำแหน่ง'}</h3><p>{companies[j.company_id]?.company_name||'ไม่ระบุบริษัท'} · {a.applied_at}</p></div><span className={`status status-${a.status.toLowerCase()}`}>{labels[a.status]||a.status}</span></article>})}</div></section>
}