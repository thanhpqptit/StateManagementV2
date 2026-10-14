import { useNavigate, useParams } from 'react-router-dom';
import { courses } from '../data';

function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((c) => c.id === Number(courseId));

  return (
    <div>
      {course ? (
        <p>
          {course.name} – {course.lessons} bài học
        </p>
      ) : (
        <p>Không tìm thấy khoá học</p>
      )}
      <button onClick={() => navigate(-1)}>Quay lại</button>
    </div>
  );
}

export default CourseDetail;
