# Course Management System

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Authentication: JWT
- Image Upload: Cloudinary

## Project Setup

### Installation

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

### Environment Variables
Create a `.env` file in the server directory:
```env
DB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
PORT=8080
```

### Running the Application

#### Seed Dummy Instructors
First, seed the dummy instructors by visiting:
`https://online-lecture-scheduling-module-theta.vercel.app/api/instructors/seed`

#### Backend
```bash
cd server
npm run dev
```

#### Frontend
```bash
cd client
npm run dev
```

## Admin Login
- Email: admin@gmail.com
- Password: 123456

## Instructor Login
Use any of the dummy instructors:
- rahul@gmail.com / 123456
- priya@gmail.com / 123456
- amit@gmail.com / 123456
- neha@gmail.com / 123456
- raj@gmail.com / 123456

## API Routes

### Auth
- POST `/api/auth/login` - Login user

### Instructors
- GET `/api/instructors` - Get all instructors
- GET `/api/instructors/seed` - Seed dummy instructors
- GET `/api/instructors/:id` - Get instructor by ID

### Courses
- POST `/api/courses` - Create course (with image upload)
- GET `/api/courses` - Get all courses
- GET `/api/courses/:id` - Get course by ID
- PUT `/api/courses/:id` - Update course
- DELETE `/api/courses/:id` - Delete course

### Lectures
- POST `/api/lectures` - Create lecture
- GET `/api/lectures` - Get all lectures
- GET `/api/lectures/instructor/:id` - Get lectures by instructor
- DELETE `/api/lectures/:id` - Delete lecture

## Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: MongoDB Atlas