// /Users/pranavmolawade/Documents/Pranav/Reactjs/Practice/client/src/pages/admin/InstructorList.jsx
import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { instructorAPI } from '../../services/api';
import { FiUsers } from 'react-icons/fi';

function InstructorList() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const res = await instructorAPI.getAll();
        setInstructors(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Instructor List</h1>
          <p className="text-slate-500 mt-1">Manage all instructors in the system</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiUsers className="w-4 h-4" />
                      Instructor
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                    Email
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {instructors.map((instructor) => (
                  <tr
                    key={instructor._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                          {instructor.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-slate-800 truncate">{instructor.name}</div>
                          <div className="text-sm text-slate-600 truncate sm:hidden">{instructor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                      <div className="text-sm text-slate-600">{instructor.email}</div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorList;