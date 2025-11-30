import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, BarChart, Clock, ChevronRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const CourseCard = ({ course }) => {
    const { progress } = useData();

    const subtopicIds = course.topics.flatMap(t => t.subtopics.map(s => s.id));
    const totalSubtopics = subtopicIds.length;
    const completedSubtopics = subtopicIds.filter(id => progress[id]).length;
    const progressPercentage = totalSubtopics === 0 ? 0 : Math.round((completedSubtopics / totalSubtopics) * 100);

    const difficultyConfig = {
        BEGINNER: { label: 'Easy', color: 'bg-[#fffaaf] text-yellow-900' },
        INTERMEDIATE: { label: 'Intermediate', color: 'bg-[#fffaaf] text-yellow-900' },
        ADVANCED: { label: 'Hard', color: 'bg-red-100 text-red-800' }
    };

    const config = difficultyConfig[course.difficulty] || { label: course.difficulty, color: 'bg-gray-100 text-gray-800' };

    return (
        <div className="group flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={course.coverImageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
                        {config.label}
                    </span>
                </div>
            </div>

            <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {course.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-1">
                    {course.subtitle || course.description}
                </p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="h-4 w-4" />
                            <span>{course.topics.length} Modules</span>
                        </div>
                        {progressPercentage > 0 && (
                            <div className="flex items-center gap-1.5 font-medium text-primary-600">
                                <BarChart className="h-4 w-4" />
                                <span>{progressPercentage}% Complete</span>
                            </div>
                        )}
                    </div>

                    {progressPercentage > 0 && (
                        <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="bg-primary-500 h-1.5 rounded-full transition-all duration-500"
                                style={{ width: `${progressPercentage}%` }}
                            />
                        </div>
                    )}

                    <Link
                        to={`/course/${course.id}/topic/${course.topics[0]?.id}/subtopic/${course.topics[0]?.subtopics[0]?.id}`}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-primary-600 transition-colors group-hover:shadow-lg group-hover:shadow-primary-500/20"
                    >
                        {progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
