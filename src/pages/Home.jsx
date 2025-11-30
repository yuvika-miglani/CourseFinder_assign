import React from 'react';
import { useData } from '../context/DataContext';
import CourseCard from '../components/CourseCard';
import { Sparkles } from 'lucide-react';

const Home = () => {
    const { courses } = useData();

    return (
        <div className="space-y-8 pb-12">
            <div className="relative bg-gray-900 rounded-3xl overflow-hidden p-8 lg:p-12 text-white">
                <div className="absolute inset-0 bg-[url('/hero.avif')] bg-cover bg-center opacity-20" />
                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 text-sm font-medium mb-6 border border-primary-500/30">
                        <Sparkles className="h-4 w-4" />
                        <span>New Courses Available</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
                        Expand Your Knowledge with Expert-Led Courses
                    </h1>
                    <p className="text-lg text-gray-300 mb-8 max-w-xl">
                        Master new skills in programming, data science, and more. Track your progress and earn certificates.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Featured Courses</h2>
                    <span className="text-sm text-gray-500">{courses.length} courses available</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            </div>

            {courses.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">No courses available yet.</p>
                </div>
            )}
        </div>
    );
};

export default Home;
