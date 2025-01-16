import logo from "./assets/logo.png";
import { useappContext } from './appContext';

export default function Header() {
  const { enrolledCourses } = useappContext();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolledCourses.length}</div>
    </div>
  );
}
