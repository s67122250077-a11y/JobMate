import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, authConfigured } from '../services/firebase.js'

export default function Layout() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    if (!authConfigured || !auth) return undefined
    return onAuthStateChanged(auth, setUser)
  }, [])

  async function handleSignOut() {
    if (auth) await signOut(auth)
  }

  return <div className="app-shell">
    <header className="topbar"><Link className="brand" to="/" aria-label="JobMate หน้าหลัก"><img className="brand-logo" src="/assets/images/jobmate_logo.png" alt="" /> <span className="brand-word">JobMate<span className="brand-dot">.</span></span></Link>
      <nav><NavLink to="/">หน้าหลัก</NavLink><NavLink to="/jobs">ค้นหางาน</NavLink><NavLink to="/saved-jobs">งานที่บันทึก</NavLink><NavLink to="/applications">สถานะสมัครงาน</NavLink><NavLink to="/survey">แบบประเมิน</NavLink>{user ? <><span className="nav-user">{user.displayName || user.email}</span><button className="login-nav-button" type="button" onClick={handleSignOut}>ออกจากระบบ</button></> : <NavLink className="login-nav-button" to="/login">เข้าสู่ระบบ</NavLink>}</nav>
    </header>
    <main><Outlet /></main>
    <footer>JobMate · แพลตฟอร์มหางานสายโปรแกรมเมอร์ <span>โครงงานเพื่อการศึกษา</span></footer>
  </div>
}
