import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import JobListPage from './pages/JobListPage.jsx'
import JobDetailPage from './pages/JobDetailPage.jsx'
import SavedJobsPage from './pages/SavedJobsPage.jsx'
import ApplicationsPage from './pages/ApplicationsPage.jsx'
function NotFound(){return <section className="page empty-state"><h1>ไม่พบหน้าที่ต้องการ</h1><a href="/">กลับหน้าหลัก</a></section>}
export default function App(){
 const [savedIds,setSavedIds]=useState(()=>JSON.parse(localStorage.getItem('jobmate_saved_ids')||'[]'))
 function onToggleSave(id){setSavedIds(current=>{const next=current.includes(id)?current.filter(x=>x!==id):[...current,id];localStorage.setItem('jobmate_saved_ids',JSON.stringify(next));return next})}
 return <Routes><Route element={<Layout/>}>
  <Route path="/" element={<HomePage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
  <Route path="/jobs" element={<JobListPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
  <Route path="/jobs/:id" element={<JobDetailPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
  <Route path="/search" element={<JobListPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
  <Route path="/saved-jobs" element={<SavedJobsPage savedIds={savedIds} onToggleSave={onToggleSave}/>}/>
  <Route path="/applications" element={<ApplicationsPage/>}/>
  <Route path="*" element={<NotFound/>}/>
 </Route></Routes>
}