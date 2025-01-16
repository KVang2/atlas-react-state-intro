import React from 'react';
import { useappContext } from './appContext';

export default function ClassSchedule() {
  const { enrolledCourses, dropCourse } = useappContext();

  const handleDrop = (courseNumber) => {
    dropCourse(courseNumber);
  };

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled yet.</p>
      ) : (
      <table border="1">
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
          {enrolledCourses.map((course) => (
            <tr key={course.id}>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>
                <button onClick={() => handleDrop(course.courseNumber)}>Drop</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
    </div>
  );
}
