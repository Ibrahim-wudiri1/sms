import { useEffect, useState } from "react";
import api from "../../../api/axios";
import ExamOfficerModal from "./AddEditModal";
// import AddExamOfficer from "./AddExamOfficer";

const ExamOfficers = () => {
  const [officers, setOfficers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    fetchOfficers();
  }, []);

  const fetchOfficers = async () => {
    const res = await api.get("/admin/exam-officers");
    setOfficers(res.data);
  };

  const handleEdit = (officer: any) => {
    setSelected(officer);
    setShowModal(true);
  };

  const handleCreate = () => {
    setSelected(null);
    setShowModal(true);
  };

  const deactivate = async (id: number, data: any ) => {
    const officer = officers.find((o) => o.id === id);
    try{
      if (!confirm(`${officer?.isActive === true ? "Deactivate ": "Activate "} this officer?`)) return;

      await api.patch(`/admin/exam-officer/${id}`, data);

      fetchOfficers();
    } catch(err: any){
      console.log("Error Deactivate User: ", err.message);
      alert("Fail to deactivate User");
    }
    
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Exam Officers</h1>

      <button
        onClick={handleCreate}
        className="bg-gray-900 text-white px-4 py-2 rounded mb-4"
      >
        + Add Exam Officer
      </button>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="p-3">Service No</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {officers.map((o) => (
            <tr key={o.id} className="border-b">
              <td className="p-4">{o.serviceNumber}</td>
              <td className="p-4">
                &nbsp;{o.isActive ? "ACTIVE" : "INACTIVE"}
              </td>
              <td className="p-4 space-x-2">
                <button
                  onClick={() => handleEdit(o)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                     setIsActive(!isActive);
                     deactivate(o.id, {isActive})}
                  }
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  {o.isActive === true? "Deactivate": "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <ExamOfficerModal
          officer={selected}
          onClose={() => setShowModal(false)}
          onSaved={fetchOfficers}
        />
      )}
    </div>
  );
};

export default ExamOfficers;