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

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/admin/students/pagination", {
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
      setError(err.response?.data?.message || "Failed to load students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;

    try {
      setDeletingId(id);
      const res = await api.delete(`/admin/students/${id}`);
      console.log("Delete response:", res.data);
      setStudents(students.filter(s => s.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Students</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <input
          type="text"
          placeholder="Search by name or service number..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
          disabled={loading}
        />

        <button
          onClick={() => navigate("/admin/create-student")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Student
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-64">
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-gray-600">Loading students...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-4 text-left font-semibold text-gray-900">Service No</th>
                <th className="p-4 text-left font-semibold text-gray-900">Name</th>
                <th className="p-4 text-left font-semibold text-gray-900">Rank</th>
                <th className="p-4 text-left font-semibold text-gray-900">Batch</th>
                <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{student.user.serviceNumber}</td>
                  <td className="p-4 text-gray-900">
                    {student.firstName} {student.lastName}
                  </td>
                  <td className="p-4 text-gray-700">{student.rank}</td>
                  <td className="p-4 text-gray-700">{student.batch}</td>
                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => navigate(`/admin/view-student/${student.id}`)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                      View
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      disabled={deletingId === student.id}
                      className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center gap-1"
                    >
                      {deletingId === student.id ? (
                        <>
                          <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        "Delete"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No students found.
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <span className="text-gray-600">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
//         </span>

//         <button
//           // disabled={page === totalPages}
//           onClick={() => setPage((prev) => prev + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
};

export default StudentsList;