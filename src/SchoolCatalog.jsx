import React, { useEffect, useState } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [sortColumn, setSortColumn] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  // Fetch data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses.json");
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses
  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  // Sorting
  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    setSortColumn(column);

    const sortedData = [...filteredCourses].sort((a, b) => {
      if (a[column] < b[column]) {
        return newSortOrder === 'asc' ? -1 : 1;
      } else if (a[column] > b[column]) {
        return newSortOrder === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });

    setFilteredCourses(sortedData);
  };

  // Pagination logic
  const startIndex = (page - 1) * PAGE_SIZE;
  const currentPage = filteredCourses.slice(startIndex, startIndex + PAGE_SIZE);
  const hasNext = filteredCourses.length > page * PAGE_SIZE;
  const hasPrev= page > 1;

  const handleNext = () => {
    if (hasNext) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (hasPrev) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <table border="1">
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Course Name</th>
            <th onClick={() => handleSort("semesterCredits")}>Semester Credits</th>
            <th onClick={() => handleSort("totalClockHours")}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
          <tr key={course.id}>
            <td>{course.trimester}</td>
            <td>{course.courseNumber}</td>
            <td>{course.courseName}</td>
            <td>{course.semesterCredits}</td>
            <td>{course.totalClockHours}</td>
            <td>
              <button>Enroll</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrev} disabled={!hasPrev}>Previous</button>
        <button onClick={handleNext} disabled={!hasNext}>Next</button>
      </div>
    </div>
  );
}