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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get("/student/profile");
      setProfile(res.data);
    } catch (err: any) {
      setError("Failed to load profile. Please try refreshing the page.");
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
        <span className="text-gray-600">Loading profile...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </div>
  );

  if (!profile) return null;

  const activeEnrollment = profile.enrollments.find(
    (e) => e.status === "ACTIVE" || e.status === "RTU"
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Personal Info */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-6">
        {profile.passportPhotoUrl && (
          <img
            src={profile.passportPhotoUrl}
            alt="Passport"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        )}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {profile.firstName} {profile.lastName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-600">
            <p><strong>Rank:</strong> {profile.rank}</p>
            <p><strong>Batch:</strong> {profile.batch}</p>
            <p><strong>Unit:</strong> {profile.unit}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Date of Birth:</strong> {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Email:</strong> {profile.email}</p>
          </div>
        </div>
      </div>

      {/* Current Enrollment */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Current Enrollment</h3>
        {activeEnrollment ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-lg">
                <strong>Course:</strong> {activeEnrollment.course.code} - {activeEnrollment.course.title}
              </p>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  activeEnrollment.status === "ACTIVE"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {activeEnrollment.status}
              </span>
            </div>
            <p className="text-gray-600">
              <strong>Duration:</strong> {activeEnrollment.course.duration} weeks
            </p>
            <p className="text-gray-600">
              <strong>Enrolled On:</strong> {new Date(activeEnrollment.createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">No active enrollment</p>
        )}
      </div>
    </div>
  );
  //           </p>
  //         </div>
  //       ) : (
  //         <p>No active enrollment</p>
  //       )}
  //     </div>

  //     {/* Past Enrollments */}
  //     <div className="bg-white shadow rounded p-6">
  //       <h3 className="text-xl font-bold mb-4">Past Enrollments</h3>
  //       {profile.enrollments.length === 0 ? (
  //         <p>No past enrollments</p>
  //       ) : (
  //         <table className="w-full border">
  //           <thead className="bg-gray-900 text-white">
  //             <tr>
  //               <th className="p-2 text-left">Course</th>
  //               <th className="p-2 text-left">Status</th>
  //               <th className="p-2 text-left">Enrolled On</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {profile.enrollments.map((enrollment) => (
  //               <tr key={enrollment.id} className="border-b hover:bg-gray-100">
  //                 <td className="p-2">
  //                   {enrollment.course.code} - {enrollment.course.title}
  //                 </td>
  //                 <td className="p-2">{enrollment.status}</td>
  //                 <td className="p-2">
  //                   {new Date(enrollment.createdAt).toLocaleDateString()}
  //                 </td>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default Profile;