// // src/pages/student/Profile.tsx
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import api from "../../../api/axios";

// interface AdminRegister {
//   serviceNumber: string;
//   password: string;
//   role: string;
// }

// interface AdminData {
//   serviceNumber: string;
//   password: string;
//   role: string;
//   isActive: boolean;
// }


// const Profile = () => {
//  const { register, handleSubmit } = useForm<AdminRegister>();
//   const [admin, setAdmin] = useState<AdminData[]>([]);

//   useEffect(() => {
//     fetchAdmin();
//   }, []);

//   const fetchAdmin = async () => {
//     const res = await api.get("/admin/create-admin");
//     console.log("Fetched Admin: ", res.data);
//     setAdmin(res.data);
//   };



//   const onSubmit = async (data: AdminRegister) => {
//     try {
//       // console.log("Enrollment Data: ", data);
//       await api.post("/admin/create-admin", data);
//       alert("Admin/Exam officer added successful");
//     } catch (err: any) {
//       console.log("Error: ", err.response?.data?.message);
//       alert(err.response?.data?.message || "Enrollment failed");
//     }
//   };

//   if (!admin) return <div>Loading...</div>;


//   return (
//     <div className="space-y-6">
//       {/* Personal Info */}
//       <div className="bg-white shadow rounded p-6 flex items-center gap-6">
//         <div>
//           <h2 className="text-2xl font-bold">
//             {admin.serviceNumber} {admin.role}
//           </h2>
         
//         </div>
//       </div>

//       {/* Current Enrollment */}
//       <div className="bg-white shadow rounded p-6">
//         <h3 className="text-xl font-bold mb-4">Current Enrollment</h3>
//         {activeEnrollment ? (
//           <div className="space-y-2">
//             <p>
//               <strong>Course:</strong> {activeEnrollment.course.code} -{" "}
//               {activeEnrollment.course.title}
//             </p>
//             <p>
//               <strong>Status:</strong>{" "}
//               <span
//                 className={`px-2 py-1 rounded text-sm ${
//                   activeEnrollment.status === "ACTIVE"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {activeEnrollment.status}
//               </span>
//             </p>
//             <p>
//               <strong>Enrolled On:</strong>{" "}
//               {new Date(activeEnrollment.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//         ) : (
//           <p>No active enrollment</p>
//         )}
//       </div>

//       {/* Past Enrollments */}
//       <div className="bg-white shadow rounded p-6">
//         <h3 className="text-xl font-bold mb-4">Past Enrollments</h3>
//         {profile.enrollments.length === 0 ? (
//           <p>No past enrollments</p>
//         ) : (
//           <table className="w-full border">
//             <thead className="bg-gray-900 text-white">
//               <tr>
//                 <th className="p-2 text-left">Course</th>
//                 <th className="p-2 text-left">Status</th>
//                 <th className="p-2 text-left">Enrolled On</th>
//               </tr>
//             </thead>
//             <tbody>
//               {profile.enrollments.map((enrollment) => (
//                 <tr key={enrollment.id} className="border-b hover:bg-gray-100">
//                   <td className="p-2">
//                     {enrollment.course.code} - {enrollment.course.title}
//                   </td>
//                   <td className="p-2">{enrollment.status}</td>
//                   <td className="p-2">
//                     {new Date(enrollment.createdAt).toLocaleDateString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;