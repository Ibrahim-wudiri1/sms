// src/layouts/AdminLayout.tsx
import { Outlet} from "react-router-dom";
// import { Users, BookOpen, UserPlus } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

import SideBar from "../components/SideBar";

const AdminLayout = () => {
  // const { logout } = useAuth();

  return (
    <div className="flex h-screen">
    <SideBar/>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;