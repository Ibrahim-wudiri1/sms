// src/pages/admin/CourseStudents.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CourseStudents = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try{
       const res = await api.get(`/admin/course/${id}/students`);
      
      setStudents(res.data);
    }catch(err: any){
      console.error("Error fetching student by course: ", err);
      alert("Failed to load students for this course");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Course Students</h1>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3">Service No</th>
            <th className="p-3">Name</th>
            <th className="p-3">Rank</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-3">{s.user.serviceNumber}</td>
              <td className="p-3">
                {s.firstName} {s.lastName}
              </td>
              <td className="p-3">{s.rank}</td>
              <td className="p-3">
                <button
                  onClick={() =>
                    navigate(`/admin/student/${s.id}/details`)
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseStudents;