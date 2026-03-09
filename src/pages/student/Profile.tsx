// src/pages/student/Profile.tsx
import { useEffect, useState } from "react";
import api from "../../api/axios";

interface Enrollment {
  id: number;
  status: string;
  course: {
    title: string;
    code: string;
    duration: number;
  };
  createdAt: string;
}

interface StudentProfile {
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  rank: string;
  batch: string;
  unit: string;
  phone: string;
  email: string;
  passportPhotoUrl?: string;
  enrollments: Enrollment[];
}

const Profile = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/student/profile");
      setProfile(res.data);
    } catch {
      alert("Failed to load profile");
    }
  };

  if (!profile) return <div>Loading...</div>;

  const activeEnrollment = profile.enrollments.find(
    (e) => e.status === "ACTIVE" || e.status === "RTU"
  );

  return (
    <div className="space-y-6">
      {/* Personal Info */}
      <div className="bg-white shadow rounded p-6 flex items-center gap-6">
        {profile.passportPhotoUrl && (
          <img
            src={profile.passportPhotoUrl}
            alt="Passport"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
        <div>
          <h2 className="text-2xl font-bold">
            {profile.firstName} {profile.lastName}
          </h2>
          <p>Rank: {profile.rank}</p>
          <p>Batch: {profile.batch}</p>
          <p>Unit: {profile.unit}</p>
          <p>Gender: {profile.gender}</p>
          <p>DOB: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
          <p>Phone: {profile.phone}</p>
          <p>Email: {profile.email}</p>
        </div>
      </div>

      {/* Current Enrollment */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-bold mb-4">Current Enrollment</h3>
        {activeEnrollment ? (
          <div className="space-y-2">
            <p>
              <strong>Course:</strong> {activeEnrollment.course.code} -{" "}
              {activeEnrollment.course.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-1 rounded text-sm ${
                  activeEnrollment.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {activeEnrollment.status}
              </span>
            </p>
            <p>
              <strong>Enrolled On:</strong>{" "}
              {new Date(activeEnrollment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>No active enrollment</p>
        )}
      </div>

      {/* Past Enrollments */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-xl font-bold mb-4">Past Enrollments</h3>
        {profile.enrollments.length === 0 ? (
          <p>No past enrollments</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Enrolled On</th>
              </tr>
            </thead>
            <tbody>
              {profile.enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b hover:bg-gray-100">
                  <td className="p-2">
                    {enrollment.course.code} - {enrollment.course.name}
                  </td>
                  <td className="p-2">{enrollment.status}</td>
                  <td className="p-2">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Profile;