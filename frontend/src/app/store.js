import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import teacherReducer from "../features/teacher/teacherSlice"
import studentReducer from "../features/student/studentSlice"
import adminReducer from "../features/admin/adminSlice"
import assignmentReducer from "../features/assignment/assignmentSlice"
import gameWordReducer from "../features/gameWord/gameWordSlice"
import submissionReducer from "../features/submission/submissionSlice"
import leaderboardReducer from "../features/leaderboard/leaderboardSlice"
import gameLogsReducer from "../features/gameLogs/gameLogsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    teacher: teacherReducer,
    student: studentReducer,
    admin: adminReducer,
    assignment: assignmentReducer,
    gameWord: gameWordReducer,
    submission: submissionReducer,
    leaderboard:leaderboardReducer,
    gameLogs: gameLogsReducer
  }
})