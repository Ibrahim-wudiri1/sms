// src/pages/admin/CreateStudent.tsx
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

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
  const { register, handleSubmit } = useForm<StudentFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: StudentFormData) => {
    console.log("Raw form data:", data); // debug: see all fields

    const formData = new FormData();

    // Explicitly append all text/date fields (even empty ones)
    formData.append("serviceNumber", data.serviceNumber || "");
    formData.append("password", data.password || "");
    formData.append("firstName", data.firstName || "");
    formData.append("lastName", data.lastName || "");
    formData.append("gender", data.gender || "");
    formData.append("dateOfBirth", data.dateOfBirth || "");
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
      const response = await api.post("/admin/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Success response:", response.data);
      alert("Student created successfully");
      navigate("/admin/students");
    } catch (err: any) {
      console.error("Creation error:", err.response?.data || err);
      alert(err.response?.data?.message || "Error creating student");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Student</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow space-y-4">
        {/* Login Info */}
        <div className="grid grid-cols-2 gap-4">
         </div>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
          <input {...register("rank", { required: true })} placeholder="Rank" className="border p-2 rounded" />
          <input {...register("firstName", { required: true })} placeholder="First Name" className="border p-2 rounded" />
          <input {...register("lastName", { required: true })} placeholder="Last Name" className="border p-2 rounded" />
          
          <input {...register("serviceNumber", { required: true })} placeholder="Service Number" className="border p-2 rounded" />
          <input type="password" {...register("password", { required: true })} placeholder="Password" className="border p-2 rounded" />
          <input {...register("unit", { required: true })} placeholder="Unit" className="border p-2 rounded" />
          <input {...register("address", { required: true })} placeholder="Core" className="border p-2 rounded" />
          <input {...register("maritalStatus", { required: true })} placeholder="Service e.g Army, Navy..." className="border p-2 rounded" />
          <input {...register("phone", { required: true })} placeholder="Phone" className="border p-2 rounded" />
          <input {...register("email", { required: true })} placeholder="Email" className="border p-2 rounded" />
          <input {...register("batch", { required: true })} placeholder="Quarter" className="border p-2 rounded" />
          <input {...register("nationality", { required: true })} placeholder="Nationality" className="border p-2 rounded" />
          <input type="date" {...register("enlistmentDate", { required: true })} className="border p-2 rounded" />
      
          <select {...register("gender", { required: true })} className="border p-2 rounded">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {/* <input {...register("gender", { required: true })} placeholder="Gender" className="border p-2 rounded" /> */}
          <input type="date" {...register("dateOfBirth", { required: true })} className="border p-2 rounded" />
          <input {...register("stateOfOrigin", { required: true })} placeholder="State of Origin" className="border p-2 rounded" />
          <input {...register("lga", { required: true })} placeholder="LGA" className="border p-2 rounded" />
            </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1">Passport Photo</label>
          <input type="file" {...register("passportPhoto")} className="border p-2 rounded w-full" />
        </div>

        <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800">
          Create Student
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