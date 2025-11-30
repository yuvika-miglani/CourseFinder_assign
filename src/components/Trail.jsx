import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Trail = ({ items }) => {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link to="/" className="text-gray-400 hover:text-gray-500">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <ChevronRight className="h-4 w-4 text-gray-300 flex-shrink-0" />
                            {item.href ? (
                                <Link
                                    to={item.href}
                                    className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="ml-2 text-sm font-medium text-gray-900" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Trail;
