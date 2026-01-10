# Student Task Manager

A full-stack task management web application built with React, Node.js, Express, and MongoDB. This app demonstrates end-to-end development skills including CRUD operations, state management, API integration, and responsive design.

## 🚀 Features

### Core Features
- ✅ **Add Tasks** - Create tasks with title, description, priority, and due date
- ✅ **Edit Tasks** - Update task details through a modal interface
- ✅ **Complete/Uncomplete** - Toggle task completion status
- ✅ **Delete Tasks** - Remove tasks from the system
- ✅ **Filter Tasks** - View all, pending, or completed tasks
- ✅ **Sort Tasks** - Sort by creation date, due date, or priority
- ✅ **Responsive Design** - Works seamlessly on mobile and desktop
- ✅ **Persistent Storage** - Tasks stored in MongoDB database
- ✅ **Visual Indicators** - Priority badges and overdue task highlighting

### Technical Features
- 🔄 **Real-time Updates** - Immediate UI updates after CRUD operations
- 📱 **Mobile-First Design** - Responsive layout with touch-friendly controls
- 🎨 **Modern UI** - Clean, professional interface with smooth transitions
- ⚡ **Fast Performance** - Optimized React components and efficient API calls
- 🔍 **Client-side Validation** - Form validation with error messages

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework with hooks
- **Vite** - Fast build tool and development server
- **Axios** - HTTP client for API communication
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for data persistence
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **Git** - Version control

## 📁 Project Structure

```
student-task-manager/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Header.jsx
│   │   │   ├── AddTaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── EditModal.jsx
│   │   ├── App.jsx          # Main application component
│   │   ├── App.css          # Application styles
│   │   └── api.js           # API service layer
│   ├── package.json
│   └── .env                 # Environment variables
├── backend/                  # Node.js backend API
│   ├── server.js            # Express server and routes
│   ├── package.json
│   └── .env                 # Environment variables
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-task-manager
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Backend Environment**
   ```bash
   # Create .env file in backend directory
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. **Start the Backend Server**
   ```bash
   npm start
   ```
   The API will be running at `http://localhost:5000`

5. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

6. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📡 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks (supports query parameters)
- `GET /api/tasks/:id` - Get a single task by ID
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task

### Query Parameters
- `status` - Filter by status (`pending`, `completed`)
- `sortBy` - Sort tasks (`createdAt`, `dueDate`, `priority`)

### Request/Response Examples

**Create Task**
```json
POST /api/tasks
{
  "title": "Complete assignment",
  "description": "Finish the math homework for chapter 5",
  "priority": "high",
  "dueDate": "2024-01-15T00:00:00.000Z"
}
```

**Update Task**
```json
PUT /api/tasks/123
{
  "completed": true,
  "priority": "medium"
}
```

## 🎨 UI Components

### Task Card Features
- Checkbox for completion status
- Priority badges (Low/Medium/High)
- Due date with overdue highlighting
- Edit and Delete action buttons
- Strike-through text for completed tasks

### Form Features
- Real-time validation
- Error message display
- Required field indicators
- Date picker for due dates
- Priority selection dropdown

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

Mobile-specific optimizations:
- Touch-friendly button sizes
- Collapsible navigation
- Stacked layouts for forms
- Optimized modal dialogs

## 🔧 Configuration

### Backend Environment Variables
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-task-manager
```

### Frontend Environment Variables
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`

### Backend (Render/Heroku)
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables:
   - `MONGO_URI` (your MongoDB connection string)
   - `PORT` (usually 3000 or provided by platform)

## 🧪 Testing

### Manual API Testing
Use Postman or curl to test API endpoints:

```bash
# Get all tasks
curl http://localhost:5000/api/tasks

# Create a task
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Test description","priority":"medium","dueDate":"2024-12-31"}'
```

### Frontend Testing
Test the application by:
1. Opening the app in different browser sizes
2. Testing all CRUD operations
3. Validating form inputs
4. Checking filter and sort functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

### Potential Features
- 🔐 **User Authentication** - JWT-based login system
- 🔍 **Search Functionality** - Client-side task search
- 🎯 **Drag-and-Drop** - Reorder tasks manually
- 🔔 **Notifications** - Browser notifications for overdue tasks
- 📊 **Analytics** - Task completion statistics
- 🌙 **Dark Mode** - Theme toggle functionality
- 📧 **Email Reminders** - Automated task reminders

### Technical Improvements
- 🧪 **Unit Tests** - Jest and React Testing Library
- 🔄 **Real-time Updates** - WebSocket integration
- 📱 **PWA** - Progressive Web App features
- 🎨 **UI Library** - Migration to Tailwind CSS or Material-UI

## 📞 Support

If you encounter any issues or have questions, please:
1. Check the existing issues on GitHub
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

**Built with ❤️ using modern web technologies**
