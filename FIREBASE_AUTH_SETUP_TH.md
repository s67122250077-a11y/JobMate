# ตั้งค่าเข้าสู่ระบบ JobMate ด้วย Firebase Authentication

โค้ดรองรับการสมัครสมาชิกด้วยอีเมล/รหัสผ่าน, เข้าสู่ระบบ และออกจากระบบ แต่ต้องเชื่อมกับ Firebase Project ของเจ้าของโปรเจกต์ก่อน จึงจะใช้งานจริงได้

## 1. เปิด Email/Password ใน Firebase
1. เข้า https://console.firebase.google.com/ แล้วเลือก Firebase Project ของ JobMate
2. ไปที่ **Build → Authentication → Get started**
3. เปิดแท็บ **Sign-in method**
4. เลือก **Email/Password** แล้วกด Enable และ Save

## 2. คัดลอกค่าการตั้งค่าเว็บแอป
1. Firebase Console → Project settings (ไอคอนเฟือง) → General
2. ในส่วน Your apps ให้เลือกหรือสร้าง Web app (ไอคอน `</>`)
3. คัดลอกค่า config ของเว็บแอป
4. ในโฟลเดอร์เดียวกับ `package.json` คัดลอก `.env.example` เป็น `.env.local`
5. ใส่ค่าจริงลงใน `.env.local` ตามชื่อด้านล่าง ห้ามใส่เครื่องหมายอัญประกาศ และอย่าแชร์ไฟล์นี้สาธารณะ

```env
VITE_FIREBASE_API_KEY=ค่าจากFirebase
VITE_FIREBASE_AUTH_DOMAIN=ชื่อโปรเจกต์.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://ค่าจากFirebase
VITE_FIREBASE_PROJECT_ID=รหัสโปรเจกต์
VITE_FIREBASE_STORAGE_BUCKET=ค่าจากFirebase
VITE_FIREBASE_MESSAGING_SENDER_ID=ค่าจากFirebase
VITE_FIREBASE_APP_ID=ค่าจากFirebase
```

ใช้ค่าที่ Firebase แสดงให้จริงทุกช่อง อย่าคาดเดา `DATABASE_URL` หรือค่าช่องอื่น หากยังไม่ได้สร้าง Realtime Database ให้สร้างจาก Build → Realtime Database แล้วคัดลอก URL ที่แสดง

## 3. รันโปรเจกต์
เปิด Terminal ที่โฟลเดอร์โปรเจกต์ แล้วรัน:

```bash
npm install
npm run dev
```

ถ้าแก้ `.env.local` ขณะที่ Vite ทำงานอยู่ ให้หยุดด้วย `Ctrl+C` แล้วรัน `npm run dev` ใหม่ จากนั้นเปิด `/login` เพื่อสมัครสมาชิกหรือเข้าสู่ระบบ

## หมายเหตุความปลอดภัย
- สมัครสมาชิกด้วยรหัสผ่านอย่างน้อย 6 ตัวอักษร
- ห้ามอัปโหลด `.env.local` หรือ Firebase service-account private key ไป GitHub
- Firebase Web API config ใช้ในเว็บไคลเอนต์ได้ แต่ต้องตั้งค่า Security Rules ให้เหมาะสม ห้ามเปิดฐานข้อมูลให้อ่าน/เขียนได้ทุกคน
- การเข้าสู่ระบบนี้ยืนยันตัวตนด้วย Firebase Auth; ยังไม่ถือว่าหน้าอื่น ๆ ถูกป้องกันด้วยสิทธิ์ผู้ใช้จนกว่าจะเพิ่ม route guards และผูกข้อมูลแต่ละรายการกับ UID
