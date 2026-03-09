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

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const res = await api.get("/student/academic-records");
    setRecords(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Academic Records</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-left">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-100">
                <td className="p-3">
                  {r.enrollment.course.code} - {r.enrollment.course.title}
                </td>
                <td className="p-3">{r.score}</td>
                <td className="p-3">{r.grade}</td>
                <td className="p-3">{r.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicRecords;