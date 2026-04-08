import { useForm } from "react-hook-form";
import api from "../../../api/axios";

const ExamOfficerModal = ({ officer, onClose, onSaved }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: officer || {},
  });

  const onSubmit = async (data: any) => {
    try{
      if (officer) {
        await api.put(`/admin/exam-officer/${officer.id}`, data);
      } else {
       const examofficer = await api.post("/admin/create-admin", data);
       console.log("Created Exam Officer: ", examofficer.data);
      }
      onSaved();
      onClose();
    }catch(err: any){
      console.error("Error saving officer: ", err.response?.data?.message || err.message);
      alert(err.response?.data?.message || "Failed to save officer");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">
          {officer ? "Edit" : "Add"} Exam Officer
        </h2>

        <input
          {...register("serviceNumber")}
          placeholder="Service Number"
          className="w-full border p-2 mb-3"
        />

        <select
          {...register("role")}
          className="w-full border p-2 mb-3"
        >
          <option value="EXAM_OFFICER">Exam Officer</option>
          <option value="SUPER_ADMIN">Super Admin</option>
        </select>

        {!officer && (
          <input
            {...register("password")}
            placeholder="Password"
            type="password"
            className="w-full border p-2 mb-3"
          />
        )}

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExamOfficerModal;