import { useEffect, useState } from 'react';
import InstructorSidebar from '../../components/InstructorSidebar';
import { useAuth } from '../../context/AuthContext';
import { lectureAPI } from '../../services/api';
import { FiCalendar, FiBookOpen } from 'react-icons/fi';

function InstructorDashboard() {
  const { user } = useAuth();
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await lectureAPI.getByInstructor(user.id);
        const sorted = res.data.sort((a, b) => new Date(a.lectureDate) - new Date(b.lectureDate));
        setLectures(sorted);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.id) {
      fetchLectures();
    }
  }, [user]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <InstructorSidebar />
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800">My Upcoming Lectures</h1>
          <p className="text-slate-500 mt-1">View your scheduled lectures</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lectures.map((lecture) => (
            <div
              key={lecture._id}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <FiCalendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {new Date(lecture.lectureDate).toLocaleDateString('en-US', {
                        weekday: 'short',
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 mt-1">
                      <FiBookOpen className="w-4 h-4" />
                      {lecture.course.name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {lectures.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCalendar className="w-8 h-10 md:w-10 md:h-10 text-slate-400" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-slate-800 mb-2">No Lectures Scheduled</h3>
              <p className="text-slate-500">You don't have any upcoming lectures.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InstructorDashboard;