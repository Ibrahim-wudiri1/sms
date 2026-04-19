import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Record {
  id: number;
  score: number;
  grade: string;
  remarks: string;
  enrollment: {
    course: { title: string; code: string };
  };
}

const AcademicRecords = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/student/academic-records");
      setRecords(res.data);
    } catch (err: any) {
      setError("Failed to load academic records. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-64">
      <div className="flex items-center space-x-2">
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-gray-600">Loading records...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
      <button
        onClick={fetchRecords}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Academic Records</h1>

      {records.length === 0 ? (
        <div className="bg-white shadow-lg rounded-lg p-8 text-center">
          <p className="text-gray-500 text-lg">No academic records found.</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4 text-left font-semibold">Course</th>
                <th className="p-4 text-left font-semibold">Score</th>
                <th className="p-4 text-left font-semibold">Grade</th>
                <th className="p-4 text-left font-semibold">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-gray-900">{r.enrollment.course.code}</div>
                      <div className="text-sm text-gray-600">{r.enrollment.course.title}</div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{r.score}%</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      r.grade.startsWith('A') ? 'bg-green-100 text-green-800' :
                      r.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' :
                      r.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {r.grade}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{r.remarks || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AcademicRecords;