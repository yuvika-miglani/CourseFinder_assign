import React, { createContext, useContext, useState, useEffect } from 'react';
import { courses as rawCourses } from '../data/courses.json';
import { users as rawUsers } from '../data/users.json';

const DataContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [courses, setCourses] = useState(() => {
        const saved = localStorage.getItem('courses');
        if (saved) {
            return JSON.parse(saved);
        }
        return rawCourses.map((course, index) => ({
            ...course,
            id: (index + 1).toString(),
            topics: course.topics.map((topic, tIndex) => ({
                ...topic,
                id: topic.id || `t${index}-${tIndex}`,
                subtopics: topic.subtopics.map((sub, sIndex) => ({
                    ...sub,
                    id: sub.id || `s${index}-${tIndex}-${sIndex}`
                }))
            }))
        }));
    });

    const [users] = useState(rawUsers);

    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem('progress');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('courses', JSON.stringify(courses));
    }, [courses]);

    useEffect(() => {
        localStorage.setItem('progress', JSON.stringify(progress));
    }, [progress]);

    const toggleCompletion = (subtopicId) => {
        setProgress(prev => ({
            ...prev,
            [subtopicId]: !prev[subtopicId]
        }));
    };

    const addCourse = (newCourse) => {
        setCourses(prev => [...prev, { ...newCourse, id: Date.now().toString() }]);
    };

    const updateCourse = (updatedCourse) => {
        setCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
    }

    const resetData = () => {
        const initialCourses = rawCourses.map((course, index) => ({
            ...course,
            id: (index + 1).toString(),
            topics: course.topics.map((topic, tIndex) => ({
                ...topic,
                id: topic.id || `t${index}-${tIndex}`,
                subtopics: topic.subtopics.map((sub, sIndex) => ({
                    ...sub,
                    id: sub.id || `s${index}-${tIndex}-${sIndex}`
                }))
            }))
        }));
        setCourses(initialCourses);
        setProgress({});
        localStorage.removeItem('courses');
        localStorage.removeItem('progress');
    };

    return (
        <DataContext.Provider value={{
            courses,
            users,
            progress,
            toggleCompletion,
            addCourse,
            updateCourse,
            resetData
        }}>
            {children}
        </DataContext.Provider>
    );
};
