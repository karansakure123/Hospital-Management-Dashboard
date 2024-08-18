import { useEffect, useRef, useState } from "react";

export const useSidebarHandlers = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDoctorDropdownOpen, setDoctorDropdownOpen] = useState(false);
  const [isDepartmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);
  const [isAboutDropdown, setIsAboutDropdown] = useState(false);
  const [isDirectorDropdown, setIsDirectorDropdown] = useState(false);

  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    sidebar.classList.toggle("expand");
    setIsExpanded((prev) => !prev);
  };

  const expandSidebar = () => {
    const sidebar = document.querySelector("#sidebar");
    if (!sidebar.classList.contains("expand")) {
      sidebar.classList.add("expand");
      setIsExpanded(true);
    }
  };

  const handleClickOutside = (event) => {
    if (window.innerWidth <= 768) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const sidebar = document.querySelector("#sidebar");
        sidebar.classList.remove("expand");
        setIsExpanded(false);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector("#sidebar");
      if (window.innerWidth < 768) {
        sidebar.classList.remove("expand");
        setIsExpanded(false);
      } else {
        sidebar.classList.add("expand");
        setIsExpanded(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    // Initial check to set the correct state based on the current window size
    handleResize();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleDoctorDropdown = () => {
    setDoctorDropdownOpen((prev) => !prev);
  };

  const toggleAbout = () => {
    setIsAboutDropdown((prev) => !prev);
    setIsDirectorDropdown(false); // Close director dropdown when opening about
  };

  const toggleDepartmentDropdown = () => {
    setDepartmentDropdownOpen((prev) => !prev);
  };

  const toggleDirector = () => {
    setIsDirectorDropdown((prev) => !prev);
  };

  return {
    isExpanded,
    toggleSidebar,
    expandSidebar,
    sidebarRef,
    isDoctorDropdownOpen,
    toggleDoctorDropdown,
    isDepartmentDropdownOpen,
    toggleDepartmentDropdown,
    isAboutDropdown,
    toggleAbout,
    isDirectorDropdown,
    toggleDirector,
  };
};
