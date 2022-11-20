import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import RequireAuth from "./components/RequireAuth"
import "react-toastify/dist/ReactToastify.css";

// Public Pages
import Landing from './pages/Landing/Landing';
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Forbidden from "./pages/Forbidden/Forbidden"

// Authenticated Pages
import Unauthorized from "./pages/Unauthorized/Unauthorized";
import Dashboard from "./pages/Dashboard/Dashboard"
import ASLTranslator from './pages/ASLTranslator/ASLTranslator';
import Play from "./pages/Play/Play";
import Practice from "./pages/Practice/Practice";
import GuessHandSign from "./pages/GuessHandSign/GuessHandSign";
import FingerSpell from "./pages/FingerSpell/FingerSpell";
import SpellHandSign from "./pages/SpellHandSign/SpellHandSign";
import FourPicOneWord from "./pages/FourPicOneWord/FourPicOneWord";
import Learn from "./pages/Learn/Learn";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile"
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ChooseHand from "./pages/ChooseHand/ChooseHand";
import Lesson1 from "./pages/Lessons/Lesson1/Lesson1";
import Lesson2 from "./pages/Lessons/Lesson2/Lesson2";
import Lesson3 from "./pages/Lessons/Lesson3/Lesson3";
import Lesson4 from "./pages/Lessons/Lesson4/Lesson4";
import Lesson5 from "./pages/Lessons/Lesson5/Lesson5";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard/TeacherDashboard";
import EnrolledStudent from "./pages/Teacher/EnrolledStudent/EnrolledStudent";
import WaitingApproval from "./pages/WaitingApproval/WaitingApproval";
import Assignments from "./pages/Teacher/Assignments/Assignments";
import StudentAssignments from "./pages/Student/StudentAssignments/StudentAssignments";
import Classwork from "./pages/Student/StudentAssignments/Classwork/Classwork";
import AdminSignUp from "./pages/Admin/SignUp/SignUp"
import AdminLogin from "./pages/Admin/Login/Login"
import AccountActivation from "./pages/Admin/AccountActivation/AccountActivation";
import ManageGames from "./pages/Admin/ManageGames/ManageGames";
import ManageFingerspell from "./pages/Admin/ManageGames/Fingerspell/ManageFingerspell";
import ManageSpellHandSign from  "./pages/Admin/ManageGames/SpellHandSign/ManageSpellHandSign";
import FourPic from  "./pages/Admin/ManageGames/FourPic/FourPic";
import TextToASL from "./pages/TextToASL/TextToASL";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Unprotected Routes */}
          <Route path="" element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="admin/signup" element={<AdminSignUp />} />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="waiting-approval" element={<WaitingApproval />} />
          <Route path="unsupported-device" element={<Forbidden />} />

          {/* Student and General User Routes */}
          <Route element={<RequireAuth allowedRoles={["student", "generaluser"]}/>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="asl-translator" element={<ASLTranslator />} />
            <Route path="practice" element={<Practice />} />
            <Route path="learn" element={<Learn />} />
            <Route path="lesson-1" element={<Lesson1 />} />
            <Route path="lesson-2" element={<Lesson2 />} />
            <Route path="lesson-3" element={<Lesson3 />} />
            <Route path="lesson-4" element={<Lesson4 />} />
            <Route path="lesson-5" element={<Lesson5 />} />
          </Route>

          {/* Authenticated Routes */}
          <Route element={<RequireAuth allowedRoles={["teacher", "student", "generaluser", "admin"]} />}>
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="choose-hand" element={<ChooseHand />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="play-game" element={<Play />} />
            <Route path="guess-hand-sign" element={<GuessHandSign />} />
            <Route path="finger-spell" element={<FingerSpell />} />
            <Route path="spell-hand-sign" element={<SpellHandSign />} />
            <Route path="4-pics-1-word" element={<FourPicOneWord />} />
            <Route path="text-to-asl" element={<TextToASL />} />
          </Route>
    
          {/* Teacher Routes */}
          <Route element={<RequireAuth allowedRoles={["teacher"]} />}>
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="enrolled-students" element={<EnrolledStudent />} />
            <Route path="teacher/assignments" element={<Assignments />} />

          </Route>

          {/* Student Routes */}
          <Route element={<RequireAuth allowedRoles={["student"]} />}>
            <Route path="student-assignments" element={<StudentAssignments />} />
            <Route path="student-classwork" element={<Classwork />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="account-activation" element={<AccountActivation />} />
            <Route path="manage-games" element={<ManageGames />} />
            <Route path="manage-fingerspell" element={<ManageFingerspell />} />
            <Route path="manage-spellhandsign" element={<ManageSpellHandSign />} />
            <Route path="manage-4-pic-1-word" element={<FourPic />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;