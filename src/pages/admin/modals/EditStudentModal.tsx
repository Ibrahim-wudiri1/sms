import { useForm } from "react-hook-form";
import api from "../../../api/axios";

const EditStudentModal = ({ student, onClose, onSaved }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: student,
  });

  const onSubmit = async (data: any) => {
    await api.put(`/admin/students/${student.id}`, data);
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>

        <input {...register("firstName")} className="input" placeholder="First Name" />
        <input {...register("lastName")} className="input" placeholder="Last Name" />
        <input {...register("rank")} className="input" placeholder="Rank" />
        <input {...register("unit")} className="input" placeholder="Unit" />

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 text-white px-4 py-1 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentModal;