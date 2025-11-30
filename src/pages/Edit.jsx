import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Save, RotateCcw, Plus, Trash2, Download, Upload } from 'lucide-react';

const Edit = () => {
    const { courses, addCourse, resetData, updateCourse } = useData();
    const fileInputRef = useRef(null);
    const [course, setCourse] = useState({
        title: '',
        description: '',
        topics: []
    });

    const handleAddTopic = () => {
        setCourse(prev => ({
            ...prev,
            topics: [...prev.topics, {
                id: Date.now().toString(),
                title: 'New Topic',
                subtopics: []
            }]
        }));
    };

    const handleAddSubtopic = (topicIndex) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].subtopics.push({
            id: Date.now().toString(),
            title: 'New Subtopic',
            content: '# New Content\n\nStart writing here...'
        });
        setCourse(prev => ({ ...prev, topics: newTopics }));
    };

    const updateTopic = (index, field, value) => {
        const newTopics = [...course.topics];
        newTopics[index][field] = value;
        setCourse(prev => ({ ...prev, topics: newTopics }));
    };

    const updateSubtopic = (topicIndex, subtopicIndex, field, value) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].subtopics[subtopicIndex][field] = value;
        setCourse(prev => ({ ...prev, topics: newTopics }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!course.title) return;
        addCourse(course);
        setCourse({ title: '', description: '', topics: [] });
        alert('Course created successfully!');
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Course Editor</h1>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            const dataStr = JSON.stringify(courses, null, 2);
                            const blob = new Blob([dataStr], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'courses.json';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </button>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Upload className="h-4 w-4" />
                        Import
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".json"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                try {
                                    const importedCourses = JSON.parse(event.target.result);
                                    if (Array.isArray(importedCourses)) {
                                        importedCourses.forEach(c => {
                                            const exists = courses.find(existing => existing.id === c.id);
                                            if (exists) {
                                                updateCourse(c);
                                            } else {
                                                addCourse(c);
                                            }
                                        });
                                        alert('Courses imported successfully!');
                                    } else {
                                        alert('Invalid JSON format: Expected an array of courses.');
                                    }
                                } catch {
                                    alert('Error parsing JSON file');
                                }
                            };
                            reader.readAsText(file);
                            e.target.value = '';
                        }
                        }
                    />
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to reset all data to defaults? This cannot be undone.')) {
                                resetData();
                            }
                        }}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">Course Details</h2>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Course Title</label>
                        <input
                            type="text"
                            value={course.title}
                            onChange={e => setCourse(prev => ({ ...prev, title: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            placeholder="e.g., Advanced React Patterns"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={course.description}
                            onChange={e => setCourse(prev => ({ ...prev, description: e.target.value }))}
                            rows={3}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            placeholder="Brief description of the course..."
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">Topics & Content</h2>
                        <button
                            type="button"
                            onClick={handleAddTopic}
                            className="flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                        >
                            <Plus className="h-4 w-4" />
                            Add Topic
                        </button>
                    </div>

                    {course.topics.map((topic, tIndex) => (
                        <div key={topic.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-4">
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={topic.title}
                                        onChange={e => updateTopic(tIndex, 'title', e.target.value)}
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 font-medium"
                                        placeholder="Topic Title"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newTopics = course.topics.filter((_, i) => i !== tIndex);
                                        setCourse(prev => ({ ...prev, topics: newTopics }));
                                    }}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <Trash2 className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="pl-6 space-y-4 border-l-2 border-gray-100">
                                {topic.subtopics.map((subtopic, sIndex) => (
                                    <div key={subtopic.id} className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                value={subtopic.title}
                                                onChange={e => updateSubtopic(tIndex, sIndex, 'title', e.target.value)}
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                                placeholder="Subtopic Title"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newTopics = [...course.topics];
                                                    newTopics[tIndex].subtopics = newTopics[tIndex].subtopics.filter((_, i) => i !== sIndex);
                                                    setCourse(prev => ({ ...prev, topics: newTopics }));
                                                }}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                        <textarea
                                            value={subtopic.content}
                                            onChange={e => updateSubtopic(tIndex, sIndex, 'content', e.target.value)}
                                            rows={5}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2 font-mono text-xs"
                                            placeholder="# Markdown Content"
                                        />
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => handleAddSubtopic(tIndex)}
                                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600"
                                >
                                    <Plus className="h-3 w-3" />
                                    Add Subtopic
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors shadow-sm"
                    >
                        <Save className="h-5 w-5" />
                        Create Course
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Edit;
