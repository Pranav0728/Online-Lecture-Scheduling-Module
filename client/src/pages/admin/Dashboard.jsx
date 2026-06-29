import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import { courseAPI, instructorAPI, lectureAPI } from '../../services/api';
import { FiBookOpen, FiUsers, FiCalendar } from 'react-icons/fi';

function AdminDashboard() {
  const [stats, setStats] = useState({ courses: 0, instructors: 0, lectures: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [coursesRes, instructorsRes, lecturesRes] = await Promise.all([
          courseAPI.getAll(),
          instructorAPI.getAll(),
          lectureAPI.getAll(),
        ]);
        setStats({
          courses: coursesRes.data.length,
          instructors: instructorsRes.data.length,
          lectures: lecturesRes.data.length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const statCards = [
    {
      title: 'Total Courses',
      value: stats.courses,
      icon: FiBookOpen,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Total Instructors',
      value: stats.instructors,
      icon: FiUsers,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Total Lectures',
      value: stats.lectures,
      icon: FiCalendar,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your course management system</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{card.title}</p>
                  <p className="text-3xl md:text-4xl font-bold text-slate-800">{card.value}</p>
                </div>
                <div className={`${card.bg} p-4 rounded-2xl`}>
                  <card.icon className={`w-8 h-8 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;