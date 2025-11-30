import React, { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, Circle, CheckCircle } from 'lucide-react';
import { useData } from '../context/DataContext';
import clsx from 'clsx';

const Sidebar = ({ onItemClick }) => {
    const { courses, progress } = useData();
    const [search, setSearch] = useState('');
    const [expandedCourses, setExpandedCourses] = useState({});
    const { courseId } = useParams();

    const toggleCourse = (cId, e) => {
        e.preventDefault();
        setExpandedCourses(prev => ({ ...prev, [cId]: !prev[cId] }));
    };

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.topics.some(topic => topic.title.toLowerCase().includes(search.toLowerCase()))
    );

    const calculateProgress = (items) => {
        if (!items || items.length === 0) return 0;
        const completed = items.filter(id => progress[id]).length;
        return Math.round((completed / items.length) * 100);
    };

    const difficultyConfig = {
        BEGINNER: { label: 'Easy', color: 'bg-[#fffaaf] text-yellow-900' },
        INTERMEDIATE: { label: 'Intermediate', color: 'bg-[#fffaaf] text-yellow-900' },
        ADVANCED: { label: 'Hard', color: 'bg-red-100 text-red-800' }
    };

    return (
        <div className="p-4 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
            </div>

            <nav className="space-y-1">
                {filteredCourses.map(course => {
                    const isExpanded = expandedCourses[course.id] || courseId === course.id;
                    const subtopicIds = course.topics.flatMap(t => t.subtopics.map(s => s.id));
                    const courseProgress = calculateProgress(subtopicIds);
                    const config = difficultyConfig[course.difficulty] || { label: course.difficulty, color: 'bg-gray-100 text-gray-600' };

                    return (
                        <div key={course.id} className="space-y-1">
                            <button
                                onClick={(e) => toggleCourse(course.id, e)}
                                className={clsx(
                                    "w-full flex flex-col px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                                    "hover:bg-gray-100 text-gray-700"
                                )}
                            >
                                <div className="flex items-center justify-between w-full mb-1">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        {isExpanded ? <ChevronDown className="h-4 w-4 flex-shrink-0" /> : <ChevronRight className="h-4 w-4 flex-shrink-0" />}
                                        <span className="truncate">{course.title}</span>
                                    </div>
                                    <span className={`flex-shrink-0 text-[10px] px-1.5 py-0.5 rounded-full ${config.color}`}>
                                        {config.label}
                                    </span>
                                </div>

                                {courseProgress > 0 && (
                                    <div className="w-full pl-6 pr-1 flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                                style={{ width: `${courseProgress}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] text-gray-400 w-6 text-right">{courseProgress}%</span>
                                    </div>
                                )}
                            </button>

                            {isExpanded && (
                                <div className="pl-4 space-y-1">
                                    {course.topics.map(topic => (
                                        <div key={topic.id} className="space-y-1">
                                            <div className="px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                {topic.title}
                                            </div>
                                            {topic.subtopics.map(subtopic => {
                                                const isCompleted = progress[subtopic.id];
                                                return (
                                                    <NavLink
                                                        key={subtopic.id}
                                                        to={`/course/${course.id}/topic/${topic.id}/subtopic/${subtopic.id}`}
                                                        onClick={onItemClick}
                                                        className={({ isActive }) => clsx(
                                                            "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors",
                                                            isActive
                                                                ? "bg-primary-50 text-primary-700 font-medium"
                                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                        )}
                                                    >
                                                        {isCompleted ? (
                                                            <CheckCircle className="h-3.5 w-3.5 text-green-500 flex-shrink-0" />
                                                        ) : (
                                                            <Circle className="h-3.5 w-3.5 text-gray-300 flex-shrink-0" />
                                                        )}
                                                        <span className="truncate">{subtopic.title}</span>
                                                    </NavLink>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {filteredCourses.length === 0 && (
                    <div className="px-3 py-4 text-center text-sm text-gray-500">
                        No courses found
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Sidebar;
