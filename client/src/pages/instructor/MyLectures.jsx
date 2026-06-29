import { useEffect, useState } from 'react';
import InstructorSidebar from '../../components/InstructorSidebar';
import Loading from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { lectureAPI } from '../../services/api';
import { FiCalendar, FiBookOpen } from 'react-icons/fi';

function MyLectures() {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        setLoading(true);
        const res = await lectureAPI.getByInstructor(user.id);
        const sorted = res.data.sort((a, b) => new Date(a.lectureDate) - new Date(b.lectureDate));
        setLectures(sorted);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) {
      fetchLectures();
    }
  }, [user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <InstructorSidebar />
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">My Lectures</h1>
          <p className="text-slate-500 mt-1">All your scheduled lectures</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                  <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <FiBookOpen className="w-4 h-4" />
                      Course Name
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {lectures.map((lecture) => (
                  <tr
                    key={lecture._id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-slate-800">
                        {new Date(lecture.lectureDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          weekday: 'short',
                        })}
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-700">{lecture.course.name}</div>
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

export default MyLectures;