import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Record {
  id: number;
  score: number;
  grade: string;
  remarks: string;
  student: {
    firstName: string;
    lastName: string;
    user: { serviceNumber: string };
  };
  enrollment: {
    course: { title: string; code: string };
  };
}

const AcademicRecordsList = () => {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const res = await api.get("/admin/academic-records");
    console.log("Academic Records: ", res.data);
    setRecords(res.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Academic Records</h1>

      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-3 text-left">Service No</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Score</th>
              <th className="p-3 text-left">Grade</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{r.student.user.serviceNumber}</td>
                <td className="p-3">
                  {r.student.firstName} {r.student.lastName}
                </td>
                <td className="p-3">
                  {r.enrollment.course.code} - {r.enrollment.course.title}
                </td>
                <td className="p-3">{r.score}</td>
                <td className="p-3">{r.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AcademicRecordsList;