// src/pages/admin/StudentDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

const StudentDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
       const res = await api.get(`/admin/student/${id}/details`);
       console.log("Student Details: ", res.data);
       setData(res.data);
    } catch (error) {
      console.error("Error fetching student details: ", error);
      alert("Failed to load student details");
    }
   
  };

  const updateStatus = async (enrollmentId: number, status: string) => {
    await api.put(`/enrollments/${enrollmentId}`, { status });
    fetchDetails();
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {data.firstName} {data.lastName}
      </h1>

      {/* Current Enrollment */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-2">Enrollments</h3>

        {data.enrollments.map((e: any) => (
          <div key={e.id} className="border p-3 mb-2 rounded">
            <p>
              {e.course.code} - {e.course.name}
            </p>
            <p>Status: {e.status}</p>

            <div className="space-x-2 mt-2">
              <button
                onClick={() => updateStatus(e.id, "COMPLETED")}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Completed
              </button>
              <button
                onClick={() => updateStatus(e.id, "RTU")}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                RTU
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Records */}
      <div className="bg-white p-4 shadow rounded">
        <h3 className="font-bold mb-2">Academic Records</h3>
        {data.enrollments.map((r: any) => (
          <div key={r.id}>
            {r.course.code} - ({r.academicRecords.score} - {r.academicRecords.grade})
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;