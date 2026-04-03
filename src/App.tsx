// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./api/routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import StudentLayout from "./layouts/StudentLayout";
import StudentsList from "./pages/admin/StudentList";
import CreateStudent from "./pages/admin/CreateStudent";
import CreateCourse from "./pages/admin/CreateCourse";
import CoursesList from "./pages/admin/CoursesList";
import EnrollStudent from "./pages/admin/EnrollStudent";
import EnrollmentHistory from "./pages/admin/EnrollmentHistory";
import Profile from "./pages/student/Profile";
import EditStudent from "./pages/admin/EditStudent";
import AddAcademicRecord from "./pages/admin/AddAcademicRecord";
import AcademicRecordsList from "./pages/admin/AcademicRecordsList";
import AcademicRecords from "./pages/student/AcademicRecords";
import CourseStudents from "./pages/admin/CourseStudents";
import StudentDetails from "./pages/admin/StudentDetails";
import FullStudentDetails from "./pages/admin/FullStudentDetails";

import Login from "./pages/Login";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} /> */}
          

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRole="ADMIN">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="create-student" element={<CreateStudent />} />
            <Route path="create-course" element={<CreateCourse />} />
            <Route path="courses" element={<CoursesList />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="enroll" element={<EnrollStudent />} />
            <Route path="enrollments" element={<EnrollmentHistory />} />
            <Route path="edit-student/:id" element={<EditStudent />} />
            <Route path="academic-records/add" element={<AddAcademicRecord />} />
            <Route path="academic-records" element={<AcademicRecordsList />} />
            <Route path="course/:id/students" element={<CourseStudents />} />
            <Route path="student/:id/details" element={<StudentDetails />} />
            <Route path="view-student/:id" element={<FullStudentDetails />} />
            
          </Route>

          <Route
            path="/student/*"
            element={
              <ProtectedRoute allowedRole="STUDENT">
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profile" element={<Profile />} />
            <Route path="academic-records" element={<AcademicRecords />} />
          </Route>

          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;