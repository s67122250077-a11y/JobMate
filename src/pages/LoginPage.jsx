import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, authConfigured } from '../services/firebase.js'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const isRegister = mode === 'register'

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!authConfigured || !auth) {
      setError('ยังไม่ได้เชื่อมต่อ Firebase กรุณาตั้งค่าไฟล์ .env.local และเปิด Authentication > Email/Password ใน Firebase Console ก่อน')
      return
    }
    if (password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      return
    }
    setLoading(true)
    try {
      if (isRegister) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() })
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }
      navigate('/')
    } catch (err) {
      const messages = {
        'auth/invalid-credential': 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
        'auth/user-not-found': 'ไม่พบบัญชีนี้ กรุณาสมัครสมาชิกก่อน',
        'auth/wrong-password': 'รหัสผ่านไม่ถูกต้อง',
        'auth/invalid-email': 'รูปแบบอีเมลไม่ถูกต้อง',
        'auth/too-many-requests': 'ลองหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่',
        'auth/email-already-in-use': 'อีเมลนี้มีบัญชีแล้ว กรุณาเข้าสู่ระบบแทน',
        'auth/weak-password': 'รหัสผ่านไม่ปลอดภัยพอ กรุณาใช้รหัสผ่านอย่างน้อย 6 ตัวอักษร',
        'auth/operation-not-allowed': 'ยังไม่ได้เปิด Email/Password ใน Firebase Console',
        'auth/network-request-failed': 'เชื่อมต่ออินเทอร์เน็ตไม่ได้ กรุณาตรวจสอบเครือข่าย',
      }
      setError(messages[err.code] || `ดำเนินการไม่สำเร็จ (${err.code || 'unknown'}). กรุณาตรวจสอบการตั้งค่า Firebase`)
    } finally {
      setLoading(false)
    }
  }

  function changeMode(nextMode) {
    setMode(nextMode)
    setError('')
  }

  return (
    <section className="login-page">
      <div className="login-card">
        <Link className="login-brand" to="/">JobMate<span>.</span></Link>
        <p className="eyebrow">{isRegister ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}</p>
        <h1>{isRegister ? 'สมัครสมาชิก JobMate' : 'เข้าสู่ระบบ JobMate'}</h1>
        <p className="login-subtitle">{isRegister ? 'สร้างบัญชีเพื่อเริ่มต้นค้นหาและติดตามงานที่เหมาะกับคุณ' : 'เข้าสู่ระบบเพื่อค้นหาและติดตามงานที่เหมาะกับคุณ'}</p>
        <form onSubmit={handleSubmit} className="login-form">
          {isRegister && <><label htmlFor="login-name">ชื่อที่แสดง</label><input id="login-name" type="text" autoComplete="name" placeholder="ชื่อของคุณ" value={name} onChange={(event) => setName(event.target.value)} required /></>}
          <label htmlFor="login-email">อีเมล</label>
          <input id="login-email" type="email" autoComplete="email" placeholder="example@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="login-password">รหัสผ่าน</label>
          <input id="login-password" type="password" autoComplete={isRegister ? 'new-password' : 'current-password'} placeholder={isRegister ? 'อย่างน้อย 6 ตัวอักษร' : 'กรอกรหัสผ่าน'} value={password} onChange={(event) => setPassword(event.target.value)} minLength={6} required />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button className="primary-button login-submit" type="submit" disabled={loading}>{loading ? 'กำลังดำเนินการ…' : isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</button>
        </form>
        <p className="login-back">{isRegister ? 'มีบัญชีอยู่แล้ว? ' : 'ยังไม่มีบัญชี? '}<button className="auth-mode-button" type="button" onClick={() => changeMode(isRegister ? 'login' : 'register')}>{isRegister ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}</button></p>
        <p className="login-back"><Link to="/">← กลับหน้าหลัก</Link></p>
      </div>
    </section>
  )
}
