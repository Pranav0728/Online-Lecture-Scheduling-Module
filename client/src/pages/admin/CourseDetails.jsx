import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import Loading from '../../components/Loading';
import { courseAPI, instructorAPI, lectureAPI, getImageUrl } from '../../services/api';
import { FiArrowLeft, FiPlus, FiTrash2, FiCalendar, FiUsers } from 'react-icons/fi';

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [lectureDate, setLectureDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courseRes, instructorsRes, lecturesRes] = await Promise.all([
          courseAPI.getById(id),
          instructorAPI.getAll(),
          lectureAPI.getAll(),
        ]);
        setCourse(courseRes.data);
        setInstructors(instructorsRes.data);
        setLectures(lecturesRes.data.filter(lecture => lecture.course._id === id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAddLecture = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await lectureAPI.create({
        course: id,
        instructor: selectedInstructor,
        lectureDate,
      });
      const res = await lectureAPI.getAll();
      setLectures(res.data.filter(lecture => lecture.course._id === id));
      setSelectedInstructor('');
      setLectureDate('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add lecture');
    }
  };

  const handleDeleteLecture = async (lectureId) => {
    if (window.confirm('Are you sure you want to delete this lecture?')) {
      try {
        await lectureAPI.delete(lectureId);
        const res = await lectureAPI.getAll();
        setLectures(res.data.filter(lecture => lecture.course._id === id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <button
          onClick={() => navigate('/admin/courses')}
          className="mb-8 flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-150"
        >
          <FiArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <img
                src={getImageUrl(course.image)}
                alt={course.name}
                className="w-full md:w-48 h-48 md:h-48 object-cover rounded-2xl border border-slate-200"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.level}
                  </span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">{course.name}</h1>
                <p className="text-slate-600 leading-relaxed">{course.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 mb-8">
            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FiPlus className="w-6 h-6" />
              Add New Lecture
            </h2>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}
            <form onSubmit={handleAddLecture} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  Instructor
                </label>
                <select
                  value={selectedInstructor}
                  onChange={(e) => setSelectedInstructor(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  Date
                </label>
                <input
                  type="date"
                  value={lectureDate}
                  onChange={(e) => setLectureDate(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg flex items-center gap-2 justify-center"
              >
                <FiPlus className="w-5 h-5" />
                Add Lecture
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <FiCalendar className="w-6 h-6" />
                Lectures ({lectures.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Course
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th className="px-4 md:px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 md:px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {lectures.map((lecture) => (
                    <tr
                      key={lecture._id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <div className="text-sm font-semibold text-slate-800">{lecture.course.name}</div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-xs font-semibold mr-3">
                            {lecture.instructor.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm text-slate-700 truncate">{lecture.instructor.name}</div>
                            <div className="text-sm font-semibold text-slate-800 truncate sm:hidden">{lecture.course.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">
                          {new Date(lecture.lectureDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() => handleDeleteLecture(lecture._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-150"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;