import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div className="flex">
      <div className="w-[250px] bg-black text-white min-h-screen">
        Sidebar
      </div>

      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  )
}