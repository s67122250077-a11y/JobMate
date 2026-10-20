import { useState } from 'react'
import { Link } from 'react-router-dom'

const groups = [
  { title: 'ด้านที่ 1 ความสะดวกในการใช้งาน', questions: [
    'เว็บไซต์มีรูปแบบหน้าจอและเมนูเข้าใจง่าย',
    'การจัดวางข้อมูลและองค์ประกอบต่าง ๆ เป็นระเบียบ',
    'สามารถค้นหาและเข้าถึงหน้าที่ต้องการได้สะดวก',
    'เว็บไซต์สามารถใช้งานได้สะดวกบนอุปกรณ์ที่ทดลองใช้',
  ]},
  { title: 'ด้านที่ 2 การค้นหาและข้อมูลตำแหน่งงาน', questions: [
    'การค้นหาตำแหน่งงานทำได้ง่าย',
    'ข้อมูลตำแหน่งงานมีความชัดเจนและเข้าใจง่าย',
    'รายละเอียดงาน เช่น ทักษะที่ต้องการ ลักษณะงาน และสถานที่ทำงาน มีประโยชน์',
    'ข้อมูลตำแหน่งงานช่วยให้เปรียบเทียบงานที่สนใจได้',
  ]},
  { title: 'ด้านที่ 3 ความเหมาะสมต่อผู้หางานสายโปรแกรมมิ่ง', questions: [
    'เว็บไซต์มีแนวทางหรือหมวดหมู่ที่สอดคล้องกับงานด้านโปรแกรมมิ่ง',
    'ข้อมูลทักษะที่ระบุในประกาศงานช่วยให้พิจารณาความเหมาะสมของตนเองได้',
    'เว็บไซต์ช่วยให้เข้าถึงข้อมูลโอกาสในการทำงานได้สะดวกขึ้น',
    'เว็บไซต์มีประโยชน์ต่อการวางแผนค้นหางานที่เหมาะสมกับตนเอง',
  ]},
  { title: 'ด้านที่ 4 ความพึงพอใจโดยรวม', questions: [
    'โดยรวมแล้วท่านพึงพอใจต่อเว็บไซต์ JobMate',
    'เว็บไซต์ตรงกับความต้องการในการค้นหาข้อมูลตำแหน่งงาน',
    'ท่านมีความตั้งใจที่จะกลับมาใช้เว็บไซต์นี้อีก หากมีโอกาส',
    'ท่านจะแนะนำเว็บไซต์ JobMate ให้ผู้อื่นที่สนใจค้นหางาน',
  ]},
]
const scale = [5, 4, 3, 2, 1]
export default function SurveyPage() {
  const [status, setStatus] = useState('')
  const [profile, setProfile] = useState({ role: '', experience: '', device: '' })
  const [answers, setAnswers] = useState({})
  const [comments, setComments] = useState({ liked: '', problems: '', suggestions: '' })
  const totalQuestions = groups.reduce((n, group) => n + group.questions.length, 0)
  function submitSurvey(e) {
    e.preventDefault()
    if (!profile.role || !profile.experience || !profile.device) {
      setStatus('กรุณาตอบข้อมูลทั่วไปให้ครบทุกข้อ')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    if (Object.keys(answers).length !== totalQuestions) {
      setStatus('กรุณาให้คะแนนความพึงพอใจครบทั้ง 16 ข้อ')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const response = { submittedAt: new Date().toISOString(), profile, answers, comments }
    const oldResponses = JSON.parse(localStorage.getItem('jobmate_survey_responses') || '[]')
    localStorage.setItem('jobmate_survey_responses', JSON.stringify([...oldResponses, response]))
    setStatus('ขอบคุณสำหรับการประเมิน บันทึกคำตอบไว้ในเบราว์เซอร์เครื่องนี้แล้ว')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <section className="page survey-page">
    <Link to="/" className="text-link">← กลับหน้าหลัก</Link>
    <p className="eyebrow">JOBMATE FEEDBACK</p>
    <h1>แบบประเมินความพึงพอใจต่อเว็บไซต์ JobMate</h1>
    <div className="survey-intro">
      <h2>คำชี้แจง</h2>
      <p>แบบประเมินฉบับนี้จัดทำขึ้นเพื่อศึกษาความพึงพอใจของผู้ใช้งานเว็บไซต์ JobMate ซึ่งเป็นเว็บไซต์สำหรับค้นหาและสมัครงานด้านโปรแกรมมิ่ง ข้อมูลจะนำไปใช้เพื่อประเมินและปรับปรุงเว็บไซต์ในภาพรวม โปรดตอบตามประสบการณ์ใช้งานจริง โดยไม่จำเป็นต้องระบุชื่อ</p>
      <p><strong>เกณฑ์การประเมิน:</strong> 5 = พึงพอใจมากที่สุด · 4 = พึงพอใจมาก · 3 = ปานกลาง · 2 = พึงพอใจน้อย · 1 = พึงพอใจน้อยที่สุด</p>
    </div>
    {status && <div className={status.startsWith('ขอบคุณ') ? 'survey-message success' : 'survey-message'} role="status">{status}</div>}
    <form onSubmit={submitSurvey}>
      <div className="survey-card">
        <h2>ส่วนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบประเมิน</h2>
        <fieldset><legend>1. สถานะของผู้ตอบ <span>*</span></legend>{['นักศึกษา','ผู้หางาน','โปรแกรมเมอร์/นักพัฒนา','ผู้ประกอบการ/ผู้ว่าจ้าง','อื่น ๆ'].map(x=><label className="survey-option" key={x}><input required={false} type="radio" name="role" checked={profile.role===x} onChange={()=>setProfile({...profile,role:x})}/>{x}</label>)}</fieldset>
        <fieldset><legend>2. ประสบการณ์ใช้งานเว็บไซต์หางาน <span>*</span></legend>{['ไม่เคยใช้','เคยใช้บ้าง','ใช้เป็นประจำ'].map(x=><label className="survey-option" key={x}><input type="radio" name="experience" checked={profile.experience===x} onChange={()=>setProfile({...profile,experience:x})}/>{x}</label>)}</fieldset>
        <fieldset><legend>3. อุปกรณ์ที่ใช้ทดลองเว็บไซต์ JobMate <span>*</span></legend>{['คอมพิวเตอร์/โน้ตบุ๊ก','โทรศัพท์มือถือ','แท็บเล็ต'].map(x=><label className="survey-option" key={x}><input type="radio" name="device" checked={profile.device===x} onChange={()=>setProfile({...profile,device:x})}/>{x}</label>)}</fieldset>
      </div>
      <div className="survey-card">
        <h2>ส่วนที่ 2 ความพึงพอใจต่อเว็บไซต์ JobMate</h2>
        <p className="muted">โปรดเลือกคะแนนเพียง 1 ระดับในแต่ละข้อ</p>
        {groups.map((group, gi)=><div className="survey-group" key={group.title}>
          <h3>{group.title}</h3>
          {group.questions.map((question, qi)=>{
            const id = `q${gi}_${qi}`
            return <fieldset className="rating-question" key={id}><legend>{gi*4+qi+1}. {question} <span>*</span></legend><div className="rating-options">{scale.map(score=><label key={score} className={answers[id]===score?'rating-selected':''}><input type="radio" name={id} checked={answers[id]===score} onChange={()=>setAnswers({...answers,[id]:score})}/><span>{score}</span></label>)}</div><div className="rating-labels"><span>มากที่สุด</span><span>น้อยที่สุด</span></div></fieldset>
          })}
        </div>)}
      </div>
      <div className="survey-card">
        <h2>ส่วนที่ 3 ความคิดเห็นและข้อเสนอแนะ</h2>
        <label className="survey-text-label">1. สิ่งที่ท่านชอบหรือเห็นว่าเป็นจุดเด่นของเว็บไซต์ JobMate<textarea rows="3" value={comments.liked} onChange={e=>setComments({...comments,liked:e.target.value})} /></label>
        <label className="survey-text-label">2. ปัญหาหรืออุปสรรคที่พบขณะใช้งาน<textarea rows="3" value={comments.problems} onChange={e=>setComments({...comments,problems:e.target.value})} /></label>
        <label className="survey-text-label">3. ข้อเสนอแนะเพื่อปรับปรุงเว็บไซต์ JobMate<textarea rows="3" value={comments.suggestions} onChange={e=>setComments({...comments,suggestions:e.target.value})} /></label>
      </div>
      <p className="survey-storage-note">หมายเหตุ: เวอร์ชันนี้บันทึกคำตอบไว้ในเบราว์เซอร์เครื่องที่ส่งแบบประเมินเท่านั้น ยังไม่ได้ส่งข้อมูลไปยังฐานข้อมูลกลาง</p>
      <button className="primary-button survey-submit" type="submit">ส่งแบบประเมิน</button>
    </form>
  </section>
}
