import { IoCameraOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdReportGmailerrorred } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

import { Button } from "./Button";

export default function TabBar() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="w-full bg-ui-secondary p-2 rounded-t-lg flex justify-around mt-auto">
      <Link to="/reports/view">
        <Button variant='none' className={`font-semibold flex flex-col items-center 
					${isActive('/reports/view') ? 'text-ui-primary' : 'text-text-secondary'}`}>
          <MdReportGmailerrorred className="text-2xl" />
          Reporte
        </Button>
      </Link>
      <Link to="/reports/create">
        <Button variant='none' className={`font-semibold flex flex-col items-center 
					${isActive('/reports/create') ? 'text-ui-primary' : 'text-text-secondary'}`}>
          <IoCameraOutline className="text-2xl" />
          Subir
        </Button>
      </Link>
      <Link to="/profile">
        <Button variant='none' className={`font-semibold flex flex-col items-center 
					${isActive('/profile') ? 'text-ui-primary' : 'text-text-secondary'}`}>
          <CgProfile className="text-2xl" />	
          Profile
        </Button>
      </Link>
    </div>
  );
}   