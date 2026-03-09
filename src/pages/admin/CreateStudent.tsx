// src/pages/admin/CreateStudent.tsx
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (key === "passportPhoto" && data.passportPhoto[0]) {
          formData.append("passportPhoto", data.passportPhoto[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      await api.post("/admin/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Student created successfully");
      navigate("/admin/students");
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      alert(err.response?.data?.message || "Error creating student");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Create Student</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        {/* Login Info */}
        <div className="grid grid-cols-2 gap-4">
          <input
            {...register("serviceNumber", { required: true })}
            placeholder="Service Number"
            className="border p-2 rounded"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="border p-2 rounded"
          />
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
          <input {...register("firstName")} placeholder="First Name" className="border p-2 rounded" required />
          <input {...register("lastName")} placeholder="Last Name" className="border p-2 rounded" required/>
          <input {...register("gender")} placeholder="Gender" className="border p-2 rounded" required/>
          <input type="date" {...register("dateOfBirth", { required: "Date of birth is required" })} placeholder="Date of Birth" className="border p-2 rounded" />
          <input {...register("stateOfOrigin")} placeholder="State of Origin" className="border p-2 rounded" required/>
          <input {...register("lga")} placeholder="LGA" className="border p-2 rounded" required/>
          <input {...register("nationality")} placeholder="Nationality" className="border p-2 rounded" required/>
          <input {...register("maritalStatus")} placeholder="Marital Status" className="border p-2 rounded" required/>
          <input {...register("address")} placeholder="Address" className="border p-2 rounded" required/>
          <input {...register("phone")} placeholder="Phone" className="border p-2 rounded" required/>
          <input {...register("email")} placeholder="Email" className="border p-2 rounded" required/>
          <input {...register("rank")} placeholder="Rank" className="border p-2 rounded" required />
          <input {...register("unit")} placeholder="Unit" className="border p-2 rounded" required/>
          <input type="date" {...register("enlistmentDate", { required: "Enlistment date is required" })} className="border p-2 rounded" required/>
          <input {...register("batch")} placeholder="Batch" aria-placeholder="Enrollment date" className="border p-2 rounded" required/>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block mb-1">Passport Photo</label>
          <input type="file" {...register("passportPhoto")} className="border p-2 rounded w-full" />
        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Create Student
        </button>
      </form>
    </div>
  );
};

export default CreateStudent;