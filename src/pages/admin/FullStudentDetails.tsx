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
  const [loading, setLoading] = useState(false);
  const [loadingEnrollment, setLoadingEnrollment] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  // Auto-dismiss feedback after 5 seconds
  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/admin/student/${id}/details`);
      console.log("Student Data: ", res.data);
      setData(res.data);
    } catch (error: any) {
      console.error("Error fetching student details:", error);
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Failed to load student details",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (enrollmentId: number, status: string) => {
    try {
      setLoadingEnrollment(enrollmentId);

      // Check if there's an academic record for this enrollment if marking as COMPLETED
      if (status === "COMPLETED") {
        const enrollment = data.enrollments.find((e: any) => e.id === enrollmentId);
        if (!enrollment || !enrollment.academicRecords || enrollment.academicRecords.length === 0) {
          setFeedback({
            type: "error",
            message: "Cannot mark course as completed. No academic record found for this course. Please add an academic record first.",
          });
          setLoadingEnrollment(null);
          return;
        }
      }

      // Use PATCH instead of PUT
      const response = await api.patch(`/admin/enrollments/${enrollmentId}`, { status });
      console.log("Status updated:", response.data);

      setFeedback({
        type: "success",
        message: `Course marked as ${status} successfully`,
      });

      // Refresh the data
      await fetchDetails();
    } catch (error: any) {
      console.error("Error updating enrollment status:", error);
      setFeedback({
        type: "error",
        message: error.response?.data?.message || "Failed to update course status",
      });
    } finally {
      setLoadingEnrollment(null);
    }
  };

  if (loading) return <div className="text-center py-10 text-xl">Loading student details...</div>;
  if (!data) return <div className="text-center py-10 text-red-600">Failed to load student data</div>;

  const activeEnrollment = data.enrollments.find(
    (e: any) => e.status === "ACTIVE"
  );

  const completedCourses = data.enrollments
    .filter((e: any) => e.status === "COMPLETED" || e.status === "RTU")
    .map((e: any) => {
      const record = data.enrollments.find((enr: any) => enr.id === e.id)?.academicRecords.find(
        (r: any) => r.enrollmentId === e.id
      );
      return { ...e, record };
    });

  return (
    <div className="space-y-6 p-4">
      {/* ================= FEEDBACK ALERT ================= */}
      {feedback && (
        <div
          className={`p-4 rounded border-l-4 ${
            feedback.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : feedback.type === "error"
              ? "bg-red-50 border-red-500 text-red-800"
              : "bg-blue-50 border-blue-500 text-blue-800"
          }`}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {feedback.type === "success" && "✓ Success"}
              {feedback.type === "error" && "✗ Error"}
              {feedback.type === "info" && "ℹ Info"}
            </span>
            <button
              onClick={() => setFeedback(null)}
              className="text-lg font-bold opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
          <p className="mt-1">{feedback.message}</p>
        </div>
      )}

      {/* ================= HEADER ================= */}
      <div className="bg-white shadow rounded-lg p-6 flex items-center justify-between border-l-4 border-blue-500">
        <div className="flex items-center gap-4">
          {data.passportPhotoUrl && (
            <img
              src={data.passportPhotoUrl}
              alt="Student"
              className="w-24 h-24 rounded-full border-2 border-blue-300 object-cover"
            />
          )}

          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {data.firstName} {data.lastName}
            </h1>
            <div className="grid grid-cols-2 gap-3 mt-2 text-sm text-gray-600">
              <p><span className="font-semibold">Service No:</span> {data.user.serviceNumber}</p>
              <p><span className="font-semibold">Rank:</span> {data.rank}</p>
              <p><span className="font-semibold">Unit:</span> {data.unit}</p>
              <p><span className="font-semibold">Batch:</span> {data.batch}</p>
            </div>
          </div>
        </div>

        <div className="space-x-2 flex">
          <button
            onClick={() => setShowEdit(true)}
            className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
          >
            ✎ Edit Biodata
          </button>

          <button
            className="bg-green-600 hover:bg-green-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
            onClick={() => {
              navigate(`/admin/academic-records/add`);
            }}
          >
            + Add Record
          </button>
        </div>
      </div>

      {/* ================= ACTIVE COURSE ================= */}
      <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Current Course</h2>

        {activeEnrollment ? (
          <div className="border-2 border-purple-200 bg-purple-50 p-5 rounded-lg flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-gray-800">
                {activeEnrollment.course.code} - {activeEnrollment.course.name}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Status: <span className="font-semibold text-purple-600">{activeEnrollment.status}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Started: {new Date(activeEnrollment.startedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => updateStatus(activeEnrollment.id, "COMPLETED")}
                disabled={loadingEnrollment === activeEnrollment.id}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                {loadingEnrollment === activeEnrollment.id ? "Processing..." : "✓ Mark Completed"}
              </button>

              <button
                onClick={() => updateStatus(activeEnrollment.id, "RTU")}
                disabled={loadingEnrollment === activeEnrollment.id}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 transition text-white px-4 py-2 rounded-lg font-semibold shadow-md"
              >
                {loadingEnrollment === activeEnrollment.id ? "Processing..." : "↶ Mark RTU"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center py-6 text-gray-500 text-lg">No active course</p>
        )}
      </div>

      {/* ================= COMPLETED COURSES ================= */}
      <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Completed Courses</h2>

        {completedCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-green-900 text-white">
                <tr>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Grade</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Completed Date</th>
                </tr>
              </thead>
              <tbody>
                {completedCourses.map((c: any) => (
                  <tr key={c.id} className="border-b hover:bg-green-50">
                    <td className="p-3 font-medium">{c.course.code} - {c.course.name}</td>
                    <td className="p-3">{c.record?.score || "-"}</td>
                    <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{c.record?.grade || "-"}</span></td>
                    <td className="p-3">{c.status || "-"}</td>
                    <td className="p-3">
                      {c.completedAt ? new Date(c.completedAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-6 text-gray-500">No completed courses</p>
        )}
      </div>

      {/* ================= ACADEMIC RECORDS ================= */}
      <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Academic Records</h2>

        {data.enrollments.some((e: any) => e.academicRecords && e.academicRecords.length > 0) ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-900 text-white">
                <tr>
                  <th className="p-3 text-left">Course</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Grade</th>
                  <th className="p-3 text-left">Remark</th>
                </tr>
              </thead>

              <tbody>
                {data.enrollments
                  .filter((r: any) => r.academicRecords && r.academicRecords.length > 0)
                  .map((r: any) => (
                    <tr key={r.id} className="border-b hover:bg-orange-50">
                      <td className="p-3 font-medium">
                        {r.course.code} - {r.course.name}
                      </td>
                      <td className="p-3">{r.academicRecords[0].score}</td>
                      <td className="p-3"><span className="bg-green-100 text-green-800 px-2 py-1 rounded">{r.academicRecords[0].grade}</span></td>
                      <td className="p-3 text-sm text-gray-600">{r.academicRecords[0].remark || "-"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center py-6 text-gray-500">No academic records available</p>
        )}
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