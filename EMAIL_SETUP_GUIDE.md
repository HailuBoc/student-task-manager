# 📧 Email Notification Setup Guide

## 🔧 **Required Configuration**

### **1. Backend Environment Variables**
Add these to your `backend/.env` file:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:5173

# Existing variables
JWT_SECRET=your-jwt-secret
MONGO_URI=mongodb://localhost:27017/student-task-manager
```

### **2. Gmail App Password Setup**
Since Gmail requires 2FA for app access:

1. **Enable 2FA on your Gmail account**
2. **Go to Google Account Settings** → Security
3. **Enable "App Passwords"**
4. **Create new app password**:
   - Select "Mail" for app
   - Select "Other (Custom name)" for device
   - Name it "Student Tasks"
   - Copy the generated password

### **3. Update Backend .env**
```env
EMAIL_USER=your-actual-gmail@gmail.com
EMAIL_PASS=the-16-character-app-password
```

## 🚀 **How Email Notifications Work**

### **Test Email Functionality**
- **Endpoint**: `POST /api/send-test-email`
- **Authentication**: Requires JWT token
- **Content**: Sends task summary to user's registered email

### **Email Content Includes**
- ✅ **Personalized greeting** with user's name
- ✅ **Task summary** with pending tasks count
- ✅ **Detailed task list** with titles, priorities, due dates
- ✅ **Professional HTML template** with branding
- ✅ **Direct link** back to dashboard
- ✅ **Success message** when no pending tasks

## 🎯 **Testing Email Functionality**

### **1. Start Backend Server**
```bash
cd backend
npm start
```

### **2. Start Frontend**
```bash
cd frontend
npm run dev
```

### **3. Test Email Sending**
1. **Login** to your account
2. **Go to Settings** → **Notifications**
3. **Click "Send Test Email"**
4. **Check your email** for the test message

### **4. Expected Email Content**
```
Subject: 📚 Student Tasks - Test Email Notification

Hello [Your Name]! 👋

This is a test email to verify that your notification system is working correctly.

📋 Your Task Summary
You have 3 pending tasks:

1. Complete math assignment (Priority: high, Due: 12/15/2023)
2. Study for chemistry quiz (Priority: medium, Due: 12/16/2023)
3. Write essay (Priority: low, Due: 12/20/2023)

[View Your Tasks Button]
```

## 🔧 **Troubleshooting**

### **Common Issues**

#### **1. "Invalid login" Error**
- **Cause**: Wrong email or app password
- **Solution**: Double-check EMAIL_USER and EMAIL_PASS in .env
- **Note**: Use app password, not regular Gmail password

#### **2. "535 Authentication unsuccessful"**
- **Cause**: 2FA not enabled or app password incorrect
- **Solution**: Enable 2FA and generate new app password

#### **3. "Connection timeout"**
- **Cause**: Network issues or firewall blocking
- **Solution**: Check internet connection and try again

#### **4. Email not received**
- **Check**: Spam/junk folder
- **Check**: Email address is correct
- **Check**: Backend console for errors

### **Debug Mode**
Add this to backend server for debugging:
```javascript
// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});
```

## 📧 **Email Template Features**

### **Professional Design**
- **Responsive layout** - Works on mobile and desktop
- **Brand colors** - Consistent with app theme
- **Clear typography** - Easy to read
- **Interactive elements** - Clickable dashboard link

### **Dynamic Content**
- **User personalization** - Uses actual user name
- **Task information** - Real task data from database
- **Task count** - Accurate pending task count
- **Due dates** - Formatted date display
- **Priority levels** - Color-coded priority indicators

### **Call-to-Action**
- **Direct dashboard link** - Easy navigation back to app
- **Professional footer** - App branding and info
- **Automated message notice** - User reassurance

## 🔄 **Future Email Features**

### **Planned Enhancements**
- ✅ **Task completion emails** - When tasks are marked complete
- ✅ **Daily/weekly summaries** - Scheduled task reports
- ✅ **Overdue task alerts** - Automatic overdue notifications
- ✅ **Custom email templates** - User preferences for email content

### **Integration Points**
- **Task creation** - Optional email when new task added
- **Task updates** - Email when task details change
- **Deadline reminders** - Email before due dates
- **Achievement emails** - Milestone celebrations

## 🎉 **Ready to Use!**

Once configured, the email system will:
1. **Send test emails** on demand from notifications page
2. **Use user's registered email** automatically
3. **Include real task data** from the database
4. **Provide professional email templates** with branding
5. **Handle errors gracefully** with user feedback

The email notification system is now fully functional! 📧
