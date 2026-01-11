# 🔧 Email Setup - Quick Fix Guide

## ❌ **Error Fixed**
The error `nodemailer.createTransporter is not a function` has been fixed.
The correct method name is `createTransport` (not `createTransporter`).

## 🚀 **Setup Steps**

### **1. Create Your .env File**
Copy the example file:
```bash
cd backend
cp .env.example .env
```

### **2. Get Gmail App Password**
1. **Enable 2FA** on your Gmail account
2. **Go to**: https://myaccount.google.com/apppasswords
3. **Select**: "Mail" → "Other (Custom name)"
4. **Name it**: "Student Tasks"
5. **Copy** the 16-character password

### **3. Update .env File**
Edit `backend/.env`:
```env
# Replace with your actual values
EMAIL_USER=your-real-email@gmail.com
EMAIL_PASS=the-16-character-app-password
JWT_SECRET=make-this-a-long-random-string
MONGO_URI=mongodb://localhost:27017/student-task-manager
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### **4. Restart Backend Server**
```bash
cd backend
npm start
```

## ✅ **Expected Output**
You should see:
```
MongoDB connected
Email server is ready to send messages
Server running on port 5000
```

## 🧪 **Test Email Function**

### **1. Start Frontend**
```bash
cd frontend
npm run dev
```

### **2. Test Email**
1. **Login** to your account
2. **Go to Settings** → **Notifications**
3. **Click "Send Test Email"**
4. **Check your Gmail** for the test email

## 🔍 **Debugging Tips**

### **If Email Doesn't Work:**
1. **Check .env** - Make sure EMAIL_USER and EMAIL_PASS are correct
2. **Check App Password** - Use app password, NOT regular Gmail password
3. **Check 2FA** - 2FA must be enabled on Gmail account
4. **Check Console** - Look for error messages in backend console

### **Common Errors:**
- **"535 Authentication unsuccessful"** → Wrong app password
- **"Invalid login"** → Wrong email or password
- **"Email credentials not found"** → Missing .env variables

## 📧 **Email Template Preview**
You'll receive a professional email with:
- Your name and personalized greeting
- Count of pending tasks
- Detailed task list with priorities and due dates
- Button to return to dashboard

## 🎉 **Ready to Use!**
Once configured, the email system will:
- ✅ Send test emails on demand
- ✅ Use your registered email automatically
- ✅ Include real task data from database
- ✅ Provide beautiful HTML email templates

The email system is now fixed and ready to use! 📧
