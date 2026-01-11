# 🔧 Email Setup - Step by Step Guide

## ❌ **Current Issue**
The email sending is failing because the Gmail credentials are not configured in the `.env` file.

## 🚀 **Quick Setup Steps**

### **Step 1: Create Your .env File**
```bash
cd backend
copy .env.example .env
```

### **Step 2: Get Gmail App Password**
1. **Enable 2FA** on your Gmail account
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" for the app
   - Select "Other (Custom name)" for device
   - Name it: "Student Tasks"
   - Click "Generate"
   - Copy the 16-character password

### **Step 3: Update .env File**
Edit `backend/.env` and replace with your actual values:

```env
# Replace with your actual Gmail
EMAIL_USER=your-real-email@gmail.com
EMAIL_PASS=the-16-character-app-password

# Keep these as-is or change if needed
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MONGO_URI=mongodb://localhost:27017/student-task-manager
FRONTEND_URL=http://localhost:5173
PORT=5000
```

### **Step 4: Restart Backend Server**
```bash
# Stop current server (Ctrl+C)
# Then restart:
npm start
```

## ✅ **Expected Success Output**
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

## 🔍 **Debugging**

### **Check Backend Console**
When you click "Send Test Email", you should see:
```
Email request received: { email: 'your-email@gmail.com', userName: 'Your Name', taskCount: 3 }
Attempting to send email...
Email sent successfully to: your-email@gmail.com
```

### **Common Errors & Solutions**

#### **"Email credentials not found"**
- **Cause**: .env file missing or wrong
- **Fix**: Copy .env.example to .env and fill in values

#### **"Invalid Gmail credentials"**
- **Cause**: Wrong email or app password
- **Fix**: Double-check EMAIL_USER and EMAIL_PASS

#### **"Authentication failed"**
- **Cause**: 2FA not enabled or wrong app password
- **Fix**: Enable 2FA and generate new app password

#### **"Network error"**
- **Cause**: Internet connection issues
- **Fix**: Check internet connection

## 📧 **What Email You'll Receive**

```
Subject: 📚 Student Tasks - Test Email Notification

Hello [Your Name]! 👋

This is a test email to verify that your notification system is working correctly.

📋 Your Task Summary
You have 3 pending tasks:

1. Complete math assignment (Priority: high, Due: Dec 15)
2. Study for chemistry quiz (Priority: medium, Due: Dec 16)
3. Write essay (Priority: low, Due: Dec 20)

[View Your Tasks Button]
```

## 🎯 **Next Steps**

Once email is working:
1. ✅ Test emails will work
2. ✅ Task completion emails will be sent
3. ✅ Users can enable/disable email notifications
4. ✅ Professional email templates with real task data

## 🚀 **Ready to Test!**

After setting up the .env file correctly, the email system will work perfectly and send professional emails to your registered Gmail address!
