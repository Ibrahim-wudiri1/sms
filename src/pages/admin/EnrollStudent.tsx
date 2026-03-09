// src/pages/admin/EnrollStudent.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  user: {
    serviceNumber: string;
  };
}

interface Course {
  id: number;
  title: string;
  code: string;
}

interface EnrollmentForm {
  studentId: number;
  courseId: number;
  status: string;
}

const EnrollStudent = () => {
  const { register, handleSubmit } = useForm<EnrollmentForm>();
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/admin/studentss");
    console.log("Fetched students: ", res.data);
    setStudents(res.data);
  };

  const fetchCourses = async () => {
    const res = await api.get("/admin/courses");
    setCourses(res.data);
  };

  // const checkActiveEnrollment = async (studentId: number) => {
  //   try {
  //     const res = await api.get(`/admin/enrollments/active/${studentId}`);
  //     if (res.data) {
  //       setActiveCourse(res.data.course.name);
  //     } else {
  //       setActiveCourse(null);
  //     }
  //   } catch {
  //     setActiveCourse(null);
  //   }
  // };

  const onSubmit = async (data: EnrollmentForm) => {
    try {
      await api.post("/admin/enroll", data);
      alert("Enrollment successful");
      setActiveCourse(null);
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enroll Student</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        {/* Select Student */}
        <div>
          <label className="block mb-1">Select Student</label>
          <select
            {...register("studentId", { required: true })}
            className="w-full border p-2 rounded"
            // (e) => checkActiveEnrollment(Number(e.target.value))
            // onChange={}
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.user.serviceNumber} - {student.firstName}{" "}
                {student.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Show Active Course Warning */}
        {activeCourse && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            Student currently enrolled in ACTIVE course: <strong>{activeCourse}</strong>
          </div>
        )}

        {/* Select Course */}
        <div>
          <label className="block mb-1">Select Course</label>
          <select
            {...register("courseId", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Enrollment Status</label>
          <select
            {...register("status", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="COMPLETED">COMPLETED</option>
            <option value="WITHDRAWN">WITHDRAWN</option>
            <option value="RTU">RTU</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Enroll
        </button>
      </form>
    </div>
  );
};

export default EnrollStudent;