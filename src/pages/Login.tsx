// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginForm {
  serviceNumber: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await api.post("/auth/login", data);

      localStorage.setItem("user", JSON.stringify(res.data));
      login(res.data.accessToken, res.data.role);

      if (res.data.role === "ADMIN" || res.data.role === "EXAM_OFFICER") {
        navigate("/admin/students");
      } else {
        navigate("/student/profile");
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          NIGERIAN ARMY SCHOOL OF MILITARY POLICE
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Service Number</label>
            <input
              {...register("serviceNumber", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter service number"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;