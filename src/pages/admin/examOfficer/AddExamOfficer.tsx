// src/pages/admin/EnrollStudent.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../api/axios";

interface AdminRegister {
  serviceNumber: string;
  password: string;
  role: string;
}

interface AdminData {
  serviceNumber: string;
  password: string;
  role: string;
  isActive: boolean;
}

const AddExamOfficer = () => {
  const { register, handleSubmit } = useForm<AdminRegister>();

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    const res = await api.get("/admin/create-admin");
    console.log("Fetched Admin: ", res.data);
  };



  const onSubmit = async (data: AdminRegister) => {
    try {
      // console.log("Enrollment Data: ", data);
      await api.post("/admin/create-admin", data);
      alert("Admin/Exam officer added successful");
    } catch (err: any) {
      console.log("Error: ", err.response?.data?.message);
      alert(err.response?.data?.message || "Enrollment failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Exam Officer</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
        <div>
          <label className="block mb-1">Service Number</label>
          <input
            type="text"
            {...register("serviceNumber", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>       
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1">Role</label>
          <select
            {...register("role", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select role</option>
            <option value="EXAM_OFFICER">Exam Officer</option>
            <option value="ADMIN">Admin</option>
          </select>

        </div>

        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800"
        >
          Add Exam Officer
        </button>
      </form>
    </div>
  );
};

export default AddExamOfficer;