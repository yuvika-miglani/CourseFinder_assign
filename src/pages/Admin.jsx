import React from 'react';
import { useData } from '../context/DataContext';
import { User, Mail, Shield, BookOpen, BarChart } from 'lucide-react';

const Admin = () => {
    const { users, courses } = useData();

    const getCourseTitle = (id) => {
        const course = courses.find(c => c.id === id.toString());
        return course ? course.title : 'Unknown Course';
    };

    const studentCount = users.filter(u => u.role === 'student').length;
    const teacherCount = users.filter(u => u.role === 'teacher').length;
    const otherCount = users.length - studentCount - teacherCount;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#14593F] text-white rounded-full text-sm font-medium">
                        {users.length} Total
                    </span>
                    <span className="px-3 py-1 bg-[#14593F] text-white rounded-full text-sm font-medium">
                        {studentCount} Students
                    </span>
                    <span className="px-3 py-1 bg-[#14593F] text-white rounded-full text-sm font-medium">
                        {teacherCount} Teachers
                    </span>
                    {otherCount > 0 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                            {otherCount} Others
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    User
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Role
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Enrollment & Progress
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                                                    {user.name.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                                    <Mail className="h-3 w-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-1 text-sm text-gray-900 capitalize">
                                            <Shield className="h-4 w-4 text-gray-400" />
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-2">
                                            {user.role === 'student' && user.enrolledCourses?.map(courseId => (
                                                <div key={courseId} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2 text-gray-700">
                                                        <BookOpen className="h-3 w-3 text-gray-400" />
                                                        <span className="truncate max-w-[150px]">{getCourseTitle(courseId)}</span>
                                                    </div>
                                                    {user.progress && user.progress[courseId] !== undefined && (
                                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                                            <BarChart className="h-3 w-3" />
                                                            {Math.round(user.progress[courseId] * 100)}%
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {user.role === 'teacher' && user.authoredCourses?.map(courseId => (
                                                <div key={courseId} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <BookOpen className="h-3 w-3 text-gray-400" />
                                                    <span className="truncate max-w-[150px]">{getCourseTitle(courseId)} (Author)</span>
                                                </div>
                                            ))}
                                            {(!user.enrolledCourses?.length && !user.authoredCourses?.length) && (
                                                <span className="text-xs text-gray-400 italic">No active courses</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <User className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
