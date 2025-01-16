import React, { createContext, useState, useContext } from 'react';

// Create a context
const appContext = createContext();

// Create a provider component
export function AppProvider({ children }) {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Function to handle course enrollment
  const enrollCourse = (course) => {
    setEnrolledCourses((prev) => [...prev, course]);
  };

  // Function to handle dropping a course
  const dropCourse = (courseNumber) => {
    setEnrolledCourses((prev) => prev.filter(course => course.courseNumber !== courseNumber));
  };

  return (
    <appContext.Provider value={{ enrolledCourses, enrollCourse, dropCourse }}>
      {children}
    </appContext.Provider>
  );
}

// Custom hook to use the CourseContext
export const useappContext = () => useContext(appContext);