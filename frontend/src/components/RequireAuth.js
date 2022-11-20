import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import {useEffect, useState} from 'react';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  return (
    // windowSize.innerWidth < 1100 ? <Navigate to="/unsupported-device" state={{ from: location }} replace /> :
    user?.role === "teacher" && user?.userInfo?.status === false
      ? <Navigate to="/waiting-approval" state={{ from: location }} replace />
        : allowedRoles?.includes(user?.role)
          ? <Outlet />
            : user?.role
              ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default RequireAuth;