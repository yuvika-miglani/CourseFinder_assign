import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import Markdownx from '../components/Markdownx';
import Trail from '../components/Trail';
import { CheckCircle, Circle, BookOpen, Target } from 'lucide-react';

const View = () => {
    const { courseId, topicId, subtopicId } = useParams();
    const { courses, progress, toggleCompletion } = useData();

    if (!courseId) return <Navigate to="/" />;

    const course = courses.find(c => c.id === courseId);
    if (!course) return <Navigate to="/" />;

    const topic = course.topics.find(t => t.id === topicId);
    if (!topic) return <Navigate to="/" />;

    const subtopic = topic.subtopics.find(s => s.id === subtopicId);
    if (!subtopic) return <Navigate to="/" />;

    const isCompleted = progress[subtopic.id];

    return (
        <div className="space-y-6">
            <Trail items={[
                { label: course.title, href: '#' },
                { label: topic.title, href: '#' },
                { label: subtopic.title }
            ]} />

            <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4 border-b border-gray-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{subtopic.title}</h1>
                        <p className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Topic: {topic.title}
                        </p>
                    </div>
                    <button
                        onClick={() => toggleCompletion(subtopic.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isCompleted
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {isCompleted ? (
                            <>
                                <CheckCircle className="h-5 w-5" />
                                Completed
                            </>
                        ) : (
                            <>
                                <Circle className="h-5 w-5" />
                                Mark as Complete
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-10">
                    <Markdownx content={subtopic.content} />
                </div>

                {topicId === course.topics[0].id && subtopicId === course.topics[0].subtopics[0].id && (
                    <div className="bg-primary-50 rounded-xl p-6 border border-primary-100">
                        <h3 className="text-lg font-semibold text-primary-900 mb-3 flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Learning Objectives
                        </h3>
                        <ul className="list-disc list-inside space-y-1 text-primary-800">
                            {course.learningObjectives?.map((obj, i) => (
                                <li key={i}>{obj}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default View;
