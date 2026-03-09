import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  user: { serviceNumber: string };
}

interface Enrollment {
  id: number;
  course: { name: string; code: string };
}

interface FormData {
  studentId: number;
  enrollmentId: number;
  score: number;
  grade: string;
  remarks: string;
}

const AddAcademicRecord = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const [students, setStudents] = useState<Student[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await api.get("/admin/students", {
      params: { page: 1, limit: 100 },
    });
    setStudents(res.data.data);
  };

  const fetchEnrollments = async (studentId: number) => {
    try {
        const res = await api.get(`/admin/enrollments/student/${studentId}`);
        setEnrollments(res.data);
    } catch (err: any) {
      console.error("Error fetching enrollments:", err);
      alert(err.response?.data?.message || "Failed to load enrollments");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      await api.post("/admin/academic-records", data);
      alert("Academic record added successfully");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to add record");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Academic Record</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        {/* Student */}
        <div>
          <label>Select Student</label>
          <select
            {...register("studentId", { required: true })}
            className="w-full border p-2 rounded"
            onChange={(e) => fetchEnrollments(Number(e.target.value))}
          >
            <option value="">Select student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.user.serviceNumber} - {s.firstName} {s.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Enrollment */}
        <div>
          <label>Select Course Enrollment</label>
          <select
            {...register("enrollmentId", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select course</option>
            {enrollments.map((e) => (
              <option key={e.id} value={e.id}>
                {e.course.code} - {e.course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Score */}
        <input
          type="number"
          {...register("score", { required: true })}
          placeholder="Score"
          className="w-full border p-2 rounded"
        />

        {/* Grade */}
        <input
          {...register("grade", { required: true })}
          placeholder="Grade (A, B, C...)"
          className="w-full border p-2 rounded"
        />

        {/* Remarks */}
        <textarea
          {...register("remarks")}
          placeholder="Remarks"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Save Record
        </button>
      </form>
    </div>
  );
};

export default AddAcademicRecord;