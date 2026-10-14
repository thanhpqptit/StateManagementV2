import { NavLink, Outlet } from 'react-router-dom';
import { courses } from '../data';

function Courses() {
  return (
    <div>
      <h2>Khoá học</h2>
      <div className="courses">
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id}>
              <NavLink to={`/courses/${course.id}`}>{course.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="course-detail">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Courses;
