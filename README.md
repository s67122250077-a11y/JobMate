# JobMate — Assignment 7

เว็บแอปพลิเคชันตัวอย่างสำหรับค้นหางานสายโปรแกรมเมอร์ พัฒนาด้วย React + Vite และเตรียมการเชื่อมต่อ Firebase Realtime Database

## ฟังก์ชันที่มีใน source code นี้
- หน้าแรกและรายการงาน
- ค้นหาตามชื่อตำแหน่ง บริษัท สถานที่ และทักษะ
- กรองตามรูปแบบการทำงาน (Remote / Hybrid / On-site)
- ดูรายละเอียดงาน
- บันทึก/ยกเลิกงานที่สนใจ (เก็บใน localStorage ของ browser)
- หน้ารายการงานที่บันทึก
- หน้าสาธิตสถานะใบสมัครจากชุดข้อมูลตัวอย่าง
- สถานะ Loading, Error และ Empty
- Responsive layout สำหรับหน้าจอเล็กและใหญ่
- อ่านข้อมูลจาก Realtime Database หากตั้งค่า Firebase แล้ว; ถ้ายังไม่ตั้งค่าจะใช้ jobmate_data.json เพื่อสาธิต

## ต้องติดตั้งก่อนรัน
- Node.js รุ่น LTS
- npm
- Firebase project และ Realtime Database (สำหรับทดสอบการเชื่อมต่อจริง)

## วิธีรันบน Windows
1. แตกไฟล์ ZIP
2. เปิดโฟลเดอร์ `JobMate_Assignment7_Package` ด้วย VS Code
3. เปิด Terminal แล้วรัน `npm install`
4. คัดลอก `.env.example` เป็น `.env.local`
5. ใส่ค่า Firebase Web App config จาก Firebase Console ใน `.env.local`
6. Import `jobmate_data.json` ใน Firebase Realtime Database โดยนำเข้าที่ root
7. รัน `npm run dev`
8. เปิด URL ที่ Vite แสดงใน Terminal

## Build
`npm run build`
`npm run preview`

## Routes
- `/` Home
- `/jobs` Job list and search/filter
- `/jobs/:id` Job detail
- `/search?q=...` Search result (ใช้หน้ารายการงานร่วมกัน)
- `/saved-jobs` Saved jobs
- `/applications` Application status demo

## Firebase schema
`users`, `companies`, `categories`, `skills`, `jobs`, `applications`, `saved_jobs`, `data_sources`, `job_sources`, `metadata`

## ข้อจำกัดที่ต้องทำต่อก่อนส่งงาน
- ต้องใส่ Firebase config ของโปรเจกต์จริงและทดสอบการอ่านข้อมูลจริง
- สมัครงานในหน้ารายละเอียดเป็นปุ่มตัวอย่าง ยังไม่บันทึกใบสมัครจริง
- หน้า Application Status แสดงข้อมูลตัวอย่าง ไม่ได้กรองตามผู้ใช้ที่เข้าสู่ระบบ
- ยังไม่ได้เพิ่ม Firebase Authentication; ต้องทำเพิ่มหากโครงงานต้องมีระบบสมาชิก
- ต้องสร้าง GitHub repository และ Deploy ด้วยบัญชีของผู้ใช้เอง
- ต้องทดสอบจริงและบันทึกผลก่อนรายงานว่า Build/Deploy ผ่าน
- dataset เป็นข้อมูลจำลอง ไม่ใช่ประกาศงานจริง; ต้องเปลี่ยนหรืออ้างอิงแหล่งข้อมูลตามข้อกำหนดของอาจารย์
- ข้อมูล `password` ใน JSON เป็น placeholder สำหรับการเรียน ห้ามใช้เป็นรหัสผ่านจริง และควรนำ field นี้ออกจากฐานข้อมูลเมื่อใช้ Firebase Authentication

## Database Rules
อย่าเปิด read/write ให้ทุกคนในระบบจริงโดยไม่จำกัดสิทธิ์ สำหรับช่วงพัฒนา ให้ใช้ Rules ที่เหมาะกับการทดสอบและเปลี่ยนเป็น rules ที่ตรวจสอบ `auth` และสิทธิ์เจ้าของข้อมูลก่อน deploy สาธารณะ
