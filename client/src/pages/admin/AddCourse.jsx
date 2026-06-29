// /Users/pranavmolawade/Documents/Pranav/Reactjs/Practice/client/src/pages/admin/AddCourse.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/AdminSidebar';
import { courseAPI } from '../../services/api';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

function AddCourse() {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('level', level);
      formData.append('description', description);
      formData.append('image', image);

      console.log('=== FormData Contents ===');
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await courseAPI.create(formData);
      console.log('=== Response ===');
      console.dir(response, { depth: null });
      navigate('/admin/courses');
    } catch (err) {
      console.error('=== Full Error Object ===');
      console.dir(err, { depth: null });
      const errorMessage = err.response?.data?.message || err.message || 'Something went wrong';
      setError(errorMessage);
      console.error('Error Message:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Add New Course</h1>
            <p className="text-slate-500 mt-1">Create a new course in the system</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter course name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Level</label>
                <input
                  type="text"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="e.g., Beginner, Intermediate, Advanced"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows="4"
                  placeholder="Enter course description"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Course Image</label>
                <div
                  className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all duration-200 ${
                    imagePreview
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
                  }`}
                >
                  {imagePreview ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl mb-4 border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Change Image
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        onChange={handleImageChange}
                        className="hidden"
                        accept="image/*"
                        required
                      />
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                          <FiUpload className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">Click to upload image</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </label>
                  )}
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Creating Course...
                    </div>
                  ) : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;