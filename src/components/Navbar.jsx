import { NavLink } from "react-router-dom";

export default function ModernNavbar() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "task", path: "/task" },
  ];

  return (
    <nav className="bg-black py-6    w-full  shadow-md">
      <div className="max-w-screen-xl mx-auto flex justify-center gap-10 text-white font-semibold text-lg">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative px-2 transition duration-300 group ${
                isActive ? "text-white" : "text-gray-300"
              }`
            }
          >
            {item.label}
            <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-gradient-to-r from-red-500 via-pink-500 to-red-500 
              scale-x-0 opacity-0 invisible 
              group-hover:visible group-hover:opacity-100 group-hover:scale-x-100 
              transition-all duration-500 origin-center rounded-full shadow-md shadow-red-500
              [&.active]:scale-x-100 [&.active]:opacity-100 [&.active]:visible"
            />
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
