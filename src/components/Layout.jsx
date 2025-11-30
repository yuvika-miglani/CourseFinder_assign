import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Settings, User } from 'lucide-react';
import Sidebar from './Sidebar';
import clsx from 'clsx';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex h-screen bg-gray-50">
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <aside className={clsx(
                "fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
                        <BookOpen className="h-6 w-6" />
                        <span>CourseFinder</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)]">
                    <div className="flex-1 overflow-y-auto">
                        <Sidebar onItemClick={() => setIsSidebarOpen(false)} />
                    </div>

                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <Link
                            to="/admin"
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === '/admin'
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            <User className="h-5 w-5" />
                            Admin
                        </Link>
                        <Link
                            to="/editor"
                            className={clsx(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                location.pathname === '/editor'
                                    ? "bg-primary-50 text-primary-700"
                                    : "text-gray-700 hover:bg-gray-100"
                            )}
                        >
                            <Settings className="h-5 w-5" />
                            Course Editor
                        </Link>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="flex items-center h-16 px-4 border-b border-gray-200 bg-white lg:hidden">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <span className="ml-4 font-semibold text-gray-900">Menu</span>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-4xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Layout;
