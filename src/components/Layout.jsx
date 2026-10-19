import { Link, NavLink, Outlet } from 'react-router-dom'
export default function Layout() {
  return <div className="app-shell">
    <header className="topbar"><Link className="brand" to="/">JobMate<span>.</span></Link>
      <nav><NavLink to="/">หน้าหลัก</NavLink><NavLink to="/jobs">ค้นหางาน</NavLink><NavLink to="/saved-jobs">งานที่บันทึก</NavLink><NavLink to="/applications">สถานะสมัครงาน</NavLink></nav>
    </header>
    <main><Outlet /></main>
    <footer>JobMate · แพลตฟอร์มหางานสายโปรแกรมเมอร์ <span>โครงงานเพื่อการศึกษา</span></footer>
  </div>
}