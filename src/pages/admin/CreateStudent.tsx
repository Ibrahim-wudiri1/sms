// src/pages/admin/CreateStudent.tsx
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface StudentFormData {
  serviceNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  nationality: string;
  maritalStatus: string;
  address: string;
  phone: string;
  email: string;
  rank: string;
  unit: string;
  enlistmentDate: string;
  batch: string;
  passportPhoto?: FileList;
}

const CreateStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<StudentFormData>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const onSubmit = async (data: StudentFormData) => {
    console.log("Raw form data:", data); // debug: see all fields

    const formData = new FormData();

    // Explicitly append all text/date fields (even empty ones)
    formData.append("serviceNumber", data.serviceNumber || "");
    formData.append("password", data.password || "");
    formData.append("firstName", data.firstName || "");
    formData.append("lastName", data.lastName || "");
    formData.append("gender", data.gender || "");
    formData.append("stateOfOrigin", data.stateOfOrigin || "");
    formData.append("lga", data.lga || "");
    formData.append("nationality", data.nationality || "");
    formData.append("maritalStatus", data.maritalStatus || "");
    formData.append("address", data.address || "");
    formData.append("phone", data.phone || "");
    formData.append("email", data.email || "");
    formData.append("rank", data.rank || "");
    formData.append("unit", data.unit || "");
    formData.append("enlistmentDate", data.enlistmentDate || "");
    formData.append("batch", data.batch || "");

    // File
    if (data.passportPhoto?.[0]) {
      formData.append("passportPhoto", data.passportPhoto[0]);
    }

    // Debug: show what is actually being sent
    console.log("FormData contents:");
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setLoading(true);
      setFeedback(null);
      const response = await api.post("/admin/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success response:", response.data);
      setFeedback({ type: "success", message: "Student created successfully!" });
      setTimeout(() => navigate("/admin/students"), 1500);
    } catch (err: any) {
      console.error("Creation error:", err.response?.data || err);
      setFeedback({ type: "error", message: err.response?.data?.message || "Failed to create student. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Student</h1>

      {feedback && (
        <div
          className={`p-4 rounded mb-6 border-l-4 ${
            feedback.type === "success"
              ? "bg-green-50 border-green-500 text-green-800"
              : "bg-red-50 border-red-500 text-red-800"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Login Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Number *</label>
            <input
              {...register("serviceNumber", { required: "Service number is required" })}
              placeholder="Service Number"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.serviceNumber ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.serviceNumber && (
              <p className="text-red-600 text-xs mt-1">{errors.serviceNumber.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password.message as string}</p>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank *</label>
            <input
              {...register("rank", { required: "Rank is required" })}
              placeholder="Rank"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.rank ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.rank && (
              <p className="text-red-600 text-xs mt-1">{errors.rank.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="First Name"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">{errors.firstName.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Surname *</label>
            <input
              {...register("lastName", { required: " Surname is required" })}
              placeholder="Surname"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">{errors.lastName.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
            <input
              {...register("unit", { required: "Unit is required" })}
              placeholder="Unit"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.unit ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.unit && (
              <p className="text-red-600 text-xs mt-1">{errors.unit.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Corps *</label>
            <input
              {...register("address", { required: "Corps is required" })}
              placeholder="Corps"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.address ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.address && (
              <p className="text-red-600 text-xs mt-1">{errors.address.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services *</label>
            <input
              {...register("maritalStatus", { required: "Services is required" })}
              placeholder="Services e.g Army, Navy..."
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.maritalStatus ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.maritalStatus && (
              <p className="text-red-600 text-xs mt-1">{errors.maritalStatus.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              {...register("phone", { required: "Phone is required" })}
              placeholder="Phone"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Email"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quarter *</label>
            <input
              {...register("batch", { required: "Quarter is required" })}
              placeholder="Quarter"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.batch ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.batch && (
              <p className="text-red-600 text-xs mt-1">{errors.batch.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nationality *</label>
            <input
              {...register("nationality", { required: "Nationality is required" })}
              placeholder="Nationality"
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.nationality ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.nationality && (
              <p className="text-red-600 text-xs mt-1">{errors.nationality.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Enlistment Date *</label>
            <input
              type="date"
              {...register("enlistmentDate", { required: "Enlistment date is required" })}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.enlistmentDate ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.enlistmentDate && (
              <p className="text-red-600 text-xs mt-1">{errors.enlistmentDate.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className={`w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 ${
                errors.gender ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">{errors.gender.message as string}</p>
            )}
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passport Photo</label>
          <input
            type="file"
            {...register("passportPhoto")}
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Student...
            </>
          ) : (
            "Add Student"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;




// // src/pages/admin/CreateStudent.tsx
// import { useForm } from "react-hook-form";
// import api from "../../api/axios";
// import { useNavigate } from "react-router-dom";

// interface StudentFormData {
//   serviceNumber: string;
//   password: string;
//   firstName: string;
//   lastName: string;
//   gender: string;
//   dateOfBirth: string;
//   stateOfOrigin: string;
//   lga: string;
//   nationality: string;
//   maritalStatus: string;
//   address: string;
//   phone: string;
//   email: string;
//   rank: string;
//   unit: string;
//   enlistmentDate: string;
//   batch: string;
//   passportPhoto?: FileList;
// }

// const CreateStudent = () => {

//   const { register, handleSubmit } = useForm<StudentFormData>();
//   const navigate = useNavigate();

//   const onSubmit = async (data: StudentFormData) => {
//     console.log("Raw form data:", data); // debug: see all fields

//     const formData = new FormData();

//     // Explicitly append all text/date fields (even empty ones)
//     formData.append("serviceNumber", data.serviceNumber || "");
//     formData.append("password", data.password || "");
//     formData.append("firstName", data.firstName || "");
//     formData.append("lastName", data.lastName || "");
//     formData.append("gender", data.gender || "");
//     formData.append("dateOfBirth", data.dateOfBirth || "");
//     formData.append("stateOfOrigin", data.stateOfOrigin || "");
//     formData.append("lga", data.lga || "");
//     formData.append("nationality", data.nationality || "");
//     formData.append("maritalStatus", data.maritalStatus || "");
//     formData.append("address", data.address || "");
//     formData.append("phone", data.phone || "");
//     formData.append("email", data.email || "");
//     formData.append("rank", data.rank || "");
//     formData.append("unit", data.unit || "");
//     formData.append("enlistmentDate", data.enlistmentDate || "");
//     formData.append("batch", data.batch || "");

//     // File
//     if (data.passportPhoto?.[0]) {
//       formData.append("passportPhoto", data.passportPhoto[0]);
//     }

//     // Debug: show what is actually being sent
//     console.log("FormData contents:");
//     for (const [key, value] of formData.entries()) {
//       console.log(key, value);
//     }

//     try {
//       const response = await api.post("/admin/students", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("Success response:", response.data);
//       alert("Student created successfully");
//       navigate("/admin/students");
//     } catch (err: any) {
//       console.error("Creation error:", err.response?.data || err);
//       alert(err.response?.data?.message || "Error creating student");
//     }
//   };
  
//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Create Student</h1>

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="bg-white p-6 rounded shadow space-y-4"
//       >
//         {/* Login Info */}
//         <div className="grid grid-cols-2 gap-4">
//           <input
//             {...register("serviceNumber", { required: true })}
//             placeholder="Service Number"
//             className="border p-2 rounded"
//           />
//           <input
//             type="password"
//             {...register("password", { required: true })}
//             placeholder="Password"
//             className="border p-2 rounded"
//           />
//         </div>

//         {/* Personal Info */}
//         <div className="grid grid-cols-2 gap-4">
//           <input {...register("firstName")} placeholder="First Name" className="border p-2 rounded" required />
//           <input {...register("lastName")} placeholder="Last Name" className="border p-2 rounded" required/>
//           <input {...register("gender")} placeholder="Gender" className="border p-2 rounded" required/>
//           <input type="date" {...register("dateOfBirth", { required: "Date of birth is required" })} placeholder="Date of Birth" className="border p-2 rounded" />
//           <input {...register("stateOfOrigin")} placeholder="State of Origin" className="border p-2 rounded" required/>
//           <input {...register("lga")} placeholder="LGA" className="border p-2 rounded" required/>
//           <input {...register("nationality")} placeholder="Nationality" className="border p-2 rounded" required/>
//           <input {...register("maritalStatus")} placeholder="Marital Status" className="border p-2 rounded" required/>
//           <input {...register("address")} placeholder="Address" className="border p-2 rounded" required/>
//           <input {...register("phone")} placeholder="Phone" className="border p-2 rounded" required/>
//           <input {...register("email")} placeholder="Email" className="border p-2 rounded" required/>
//           <input {...register("rank")} placeholder="Rank" className="border p-2 rounded" required />
//           <input {...register("unit")} placeholder="Unit" className="border p-2 rounded" required/>
//           <input type="date" {...register("enlistmentDate", { required: "Enlistment date is required" })} className="border p-2 rounded" required/>
//           <input {...register("batch")} placeholder="Batch" aria-placeholder="Enrollment date" className="border p-2 rounded" required/>
//         </div>

//         {/* Photo Upload */}
//         <div>
//           <label className="block mb-1">Passport Photo</label>
//           <input type="file" {...register("passportPhoto")} className="border p-2 rounded w-full" />
//         </div>

//         <button
//           type="submit"
//           className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
//         >
//           Create Student
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateStudent;