import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { AppProvider } from './appContext';

export default function App() {
  return (
    <AppProvider>
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </AppProvider>
  );
}
