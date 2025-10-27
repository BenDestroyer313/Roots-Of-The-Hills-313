
import React from 'react';
import { MOCK_COURSES } from '../constants';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

const RootsAcademy: React.FC = () => {
    return (
        <div className="bg-rh-off-white/50 min-h-screen">
             <header className="p-6 pt-10 text-center">
                <BookOpen className="w-16 h-16 mx-auto text-rh-blue" />
                <h1 className="text-4xl font-bold text-rh-green mt-4">Roots Academy</h1>
                <p className="text-gray-600 mt-2">Learn. Empower. Grow.</p>
            </header>

            <div className="p-4 space-y-4">
                {MOCK_COURSES.map(course => (
                    <div key={course.id} className="bg-white rounded-xl shadow-md p-4 border-l-4 border-rh-blue">
                        <div className="flex justify-between items-start">
                             <div>
                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                    {course.difficulty}
                                </span>
                                <h3 className="text-xl font-bold mt-2 text-rh-dark">{course.title}</h3>
                             </div>
                             {course.completed && <CheckCircle className="w-8 h-8 text-green-500" />}
                        </div>
                        <p className="text-gray-600 mt-2">{course.description}</p>
                        <div className="flex items-center justify-between mt-4 pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4"/>
                                <span>{course.duration}</span>
                            </div>
                            <button className={`px-4 py-2 rounded-lg font-semibold text-white ${course.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-rh-terracotta hover:bg-rh-terracotta/90'}`}>
                                {course.completed ? 'Completed' : 'Start Course'}
                            </button>
                        </div>
                        {course.completed ? (
                             <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div className="bg-green-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
                            </div>
                        ) : (
                             <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div className="bg-rh-blue h-1.5 rounded-full" style={{width: '25%'}}></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RootsAcademy;
