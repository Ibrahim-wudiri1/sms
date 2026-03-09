// src/pages/admin/StudentsList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  batch: string;
  rank: string;
  user: {
    serviceNumber: string;
  };
}

interface ApiResponse {
  data: Student[];
  total: number;
  page: number;
  totalPages: number;
}

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const fetchStudents = async () => {
    try {
      const res = await api.get<ApiResponse>("/admin/students", {
        params: {
          page,
          limit: 10,
          search,
        },
      });

      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err: any) {
      console.error("Failed to fetch students:", err);
      alert(err.response?.data?.message || "Failed to load students");
    }
  };

  const deleteStudent = async (id: number) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await api.delete(`/admin/students/${id}`);
      fetchStudents();
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or service number..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded w-80"
        />

        <button
          onClick={() => navigate("/admin/create-student")}
          className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          + Add Student
        </button>
      </div>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">Service No</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Rank</th>
              <th className="p-3 text-left">Batch</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{student.user.serviceNumber}</td>
                <td className="p-3">
                  {student.firstName} {student.lastName}
                </td>
                <td className="p-3">{student.rank}</td>
                <td className="p-3">{student.batch}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() =>
                      navigate(`/admin/edit-student/${student.id}`)
                    }
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(student.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {students.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No students found.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StudentsList;