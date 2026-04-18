import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "../../../api/axios";

const EditStudentModal = ({ student, onClose, onSaved }: any) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: student,
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      setFeedback(null);

      // Validate required fields
      if (!data.firstName?.trim()) {
        setFeedback({ type: "error", message: "First name is required" });
        return;
      }
      if (!data.lastName?.trim()) {
        setFeedback({ type: "error", message: "Last name is required" });
        return;
      }
      if (!data.email?.trim()) {
        setFeedback({ type: "error", message: "Email is required" });
        return;
      }
      if (!data.phone?.trim()) {
        setFeedback({ type: "error", message: "Phone number is required" });
        return;
      }

      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        setFeedback({ type: "error", message: "Please enter a valid email address" });
        return;
      }

      // Simple phone validation (at least 10 digits)
      const phoneRegex = /\d{10,}/;
      if (!phoneRegex.test(data.phone.replace(/\D/g, ""))) {
        setFeedback({ type: "error", message: "Please enter a valid phone number (at least 10 digits)" });
        return;
      }

      const response = await api.put(`/admin/students/${student.id}`, data);
      console.log("Student updated:", response.data);

      setFeedback({ type: "success", message: "Student biodata updated successfully!" });
      
      // Wait 1.5 seconds before closing to show success message
      setTimeout(() => {
        onSaved();
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error updating student:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to update student";
      setFeedback({ type: "error", message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Student Biodata</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl font-bold text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {/* Feedback Message */}
        {feedback && (
          <div
            className={`p-4 rounded mb-6 border-l-4 ${
              feedback.type === "success"
                ? "bg-green-50 border-green-500 text-green-800"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold">
                  {feedback.type === "success" ? "✓ Success" : "✗ Error"}
                </p>
                <p className="mt-1">{feedback.message}</p>
              </div>
              <button
                type="button"
                onClick={() => setFeedback(null)}
                className="text-lg font-bold opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Service Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Number
            </label>
            <input
              {...register("serviceNumber", {
                required: "Service number is required",
              })}
              placeholder="Enter service number"
              className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                errors.serviceNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.serviceNumber && (
              <p className="text-red-600 text-xs mt-1">{errors.serviceNumber.message as string}</p>
            )}
          </div>

          {/* First Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              placeholder="Enter first name"
              className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">{errors.firstName.message as string}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Enter last name"
              className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">{errors.lastName.message as string}</p>
            )}
          </div>

          {/* Rank */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rank
            </label>
            <input
              {...register("rank")}
              placeholder="Enter rank"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Unit
            </label>
            <input
              {...register("unit")}
              placeholder="Enter unit"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Services / Marital Status
            </label>
            <input
              {...register("maritalStatus")}
              placeholder="Enter services"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address / Corps
            </label>
            <input
              {...register("address")}
              placeholder="Enter address"
              className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", {
                required: "Phone is required",
              })}
              placeholder="Enter phone number"
              type="tel"
              className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.phone && (
              <p className="text-red-600 text-xs mt-1">{errors.phone.message as string}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              placeholder="Enter email"
              type="email"
              className={`border rounded-lg p-3 w-full focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email.message as string}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition text-white font-semibold rounded-lg shadow-md"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditStudentModal;