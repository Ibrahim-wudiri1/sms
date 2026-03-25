// src/pages/admin/EditStudent.tsx
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const EditStudent = () => {
  const { id } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const res = await api.get(`/admin/students/${id}`);
      const student = res.data;
      console.log("Fetched student data: ", JSON.stringify(student, null, 2));
      reset({
        serviceNumber: student.user.serviceNumber || "",   // ← allow editing service number
        firstName: student.firstName || "",
        lastName: student.lastName || "",
        gender: student.gender || "",
        stateOfOrigin: student.stateOfOrigin || "",
        lga: student.lga || "",
        nationality: student.nationality || "",
        maritalStatus: student.maritalStatus || "",
        address: student.address || "",
        phone: student.phone || "",
        email: student.email || "",
        rank: student.rank || "",
        unit: student.unit || "",
        enlistmentDate: student.enlistmentDate ? student.enlistmentDate.split("T")[0] : "",
        batch: student.batch || "",
      });
    } catch (err) {
      alert("Failed to load student data");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      await api.put(`/admin/students/${id}`, data);
      alert("Student updated successfully");
      navigate("/admin/students");
    } catch (err: any) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <div className="text-center py-10">Loading student data...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Student</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
      >
      <div className="grid grid-cols-2 gap-4"> 
        <input {...register("serviceNumber")} placeholder="Service Number" className="border p-2 rounded w-full" />
        <input {...register("firstName")} placeholder="First Name" className="border p-2 rounded w-full" />
        <input {...register("lastName")} placeholder="Last Name" className="border p-2 rounded w-full" />
        <input {...register("rank")} placeholder="Rank" className="border p-2 rounded w-full" />
        <input {...register("unit")} placeholder="Unit" className="border p-2 rounded w-full" />

        {/* <input {...register("gender")} placeholder="Gender" className="border p-2 rounded w-full" /> */}
       {/* <input {...register("nationality")} placeholder="Nationality" className="border p-2 rounded w-full" /> */}
        <input {...register("maritalStatus")} placeholder="Services" className="border p-2 rounded w-full" />
        <input {...register("address")} placeholder="Corps" className="border p-2 rounded w-full" />
        <input {...register("phone")} placeholder="Phone" className="border p-2 rounded w-full" />
        <input {...register("email")} placeholder="Email" className="border p-2 rounded w-full" />
        {/* <input {...register("batch")} placeholder="Quarter" className="border p-2 rounded w-full" /> */}
      </div>
        <button
          type="submit"
          className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-800 w-full"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;