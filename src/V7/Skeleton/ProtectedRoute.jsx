// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) {
    // 未登录，跳转到登录页
    return <Navigate to="/login" replace />;
  }
  // 已登录，显示子组件
  return children;
}
