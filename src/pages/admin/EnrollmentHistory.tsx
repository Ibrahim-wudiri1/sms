// src/pages/admin/EnrollmentHistory.tsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Enrollment {
  id: number;
  status: string;
  createdAt: string;
  student: {
    firstName: string;
    lastName: string;
    user: {
      serviceNumber: string;
    };
  };
  course: {
    name: string;
    code: string;
  };
}

const EnrollmentHistory = () => {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const res = await api.get("/admin/enrollments/active");
      setEnrollments(res.data);
    } catch (err) {
      alert("Failed to load enrollments");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      case "WITHDRAWN":
        return "bg-yellow-100 text-yellow-700";
      case "RTU":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Enrollment History</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">Service No</th>
              <th className="p-3 text-left">Student Name</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Enrolled Date</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map((enrollment) => (
              <tr key={enrollment.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  {enrollment.student.user.serviceNumber}
                </td>
                <td className="p-3">
                  {enrollment.student.firstName}{" "}
                  {enrollment.student.lastName}
                </td>
                <td className="p-3">
                  {enrollment.course.code} - {enrollment.course.name}
                </td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded text-sm ${getStatusColor(
                      enrollment.status
                    )}`}
                  >
                    {enrollment.status}
                  </span>
                </td>
                <td className="p-3">
                  {new Date(enrollment.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enrollments.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No enrollments recorded.
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrollmentHistory;