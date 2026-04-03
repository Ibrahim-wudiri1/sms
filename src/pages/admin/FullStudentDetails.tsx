import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

import EditStudentModal from "./modals/EditStudentModal";
// import EditStudent from "./EditStudent";

const FullStudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    const res = await api.get(`/admin/student/${id}/details`);
    console.log("Student Data: ", res.data);
    setData(res.data);
  };

  const updateStatus = async (enrollmentId: number, status: string) => {
    await api.put(`/admin/enrollments/${enrollmentId}`, { status });
    fetchDetails();
  };

  if (!data) return <div>Loading...</div>;

  const activeEnrollment = data.enrollments.find(
    (e: any) => e.status === "ACTIVE" || e.status === "RTU"
  );

  const completedCourses = data.enrollments
    .filter((e: any) => e.status === "COMPLETED")
    .map((e: any) => {
      const record = data.academicRecords.find(
        (r: any) => r.enrollmentId === e.id
      );
      return { ...e, record };
    });

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="bg-white shadow rounded p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {data.passportPhotoUrl && (
            <img
              src={data.passportPhotoUrl}
              className="w-24 h-24 rounded-full border"
            />
          )}

          <div>
            <h1 className="text-2xl font-bold">
              {data.firstName} {data.lastName}
            </h1>
            <p>Service No: {data.user.serviceNumber}</p>
            <p>Rank: {data.rank}</p>
            <p>Unit: {data.unit}</p>
            <p>Batch: {data.batch}</p>
          </div>
        </div>

        <div className="space-x-2">
          <button
            onClick={() => setShowEdit(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Edit Biodata
          </button>

          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => {
              // window.location.href = "/admin/academic-records/add"
              navigate(`/admin/academic-records/add`);
              // navigate(`/admin/student/${id}/add-record`)
            }}
          >
                Add Academic Record
          </button>
        </div>
      </div>

      {/* ================= ACTIVE COURSE ================= */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Current Course</h2>

        {activeEnrollment ? (
          <div className="border p-4 rounded flex justify-between items-center">
            <div>
              <p className="font-bold">
                {activeEnrollment.course.code} -{" "}
                {activeEnrollment.course.name}
              </p>
              <p>Status: {activeEnrollment.status}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() =>
                  updateStatus(activeEnrollment.id, "COMPLETED")
                }
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Mark Completed
              </button>

              <button
                onClick={() => updateStatus(activeEnrollment.id, "RTU")}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Mark RTU
              </button>
            </div>
          </div>
        ) : (
          <p>No active course</p>
        )}
      </div>

      {/* ================= COMPLETED COURSES ================= */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Completed Courses</h2>

        <table className="w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="p-2 text-left">Course</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Grade</th>
              <th className="p-2 text-left">Completed</th>
            </tr>
          </thead>
          <tbody>
            {completedCourses.map((c: any) => (
              <tr key={c.id} className="border-b">
                <td className="p-2">
                  {c.course.code} - {c.course.name}
                </td>
                <td className="p-2">{c.record?.score || "-"}</td>
                <td className="p-2">{c.record?.grade || "-"}</td>
                <td className="p-2">
                  {c.completedAt
                    ? new Date(c.completedAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= ACADEMIC RECORDS ================= */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-bold mb-4">Academic Records</h2>

        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-2 text-left">Course</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Grade</th>
              <th className="p-2 text-left">Remark</th>
            </tr>
          </thead>

          <tbody>
            {data.enrollments.map((r: any) => (
              <tr key={r.id} className="border-b">
                <td className="p-2">
                  {r.course.code} -{" "}
                  {r.course.name}
                </td>
                <td className="p-2">{r.academicRecords[0].score}</td>
                <td className="p-2">{r.academicRecords[0].grade}</td>
                <td className="p-2">{r.academicRecords[0].remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EDIT MODAL ================= */}
      {showEdit && (
        <EditStudentModal
          student={data}
          onClose={() => setShowEdit(false)}
          onSaved={fetchDetails}
        />
      )}
    </div>
  );
};

export default FullStudentDetails;