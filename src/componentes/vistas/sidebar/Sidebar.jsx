import { motion } from "framer-motion";
import {Link} from 'react-router-dom'

import {
    AssignmentTurnedInRounded,
    AttachMoneyRounded,
    BarChartRounded,
    ColorLensRounded,
    DashboardRounded,
    SettingsRemoteRounded,
    TocRounded,
} from "@material-ui/icons";
import Item from "./Item"
import { useState } from "react";


function Sidebar() {
  const [open, setOpen] = useState(true);

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      transition: {
        delay: 0.3,
      },
      width: "15rem",
    },
    false: {
      transition: {
        delay: 0.3,
      },
      width: "6.5rem",

    },
  };

  const sidebarVariants = {
    true: {

    },
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };
  return (
    <div >
      <motion.div
        data-open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              cursor: "pointer",
            }}
          >
            {/* <img
              src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/302133445_5415659251820732_7999769232671499380_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEnzU5Ua6UerCYUtGCzrQDYEFvPc_2brYoQW89z_ZutipoYIZNUAmvfAOZoQYiDgn6JlrZ0eajo5rqxmGq6GYIK&_nc_ohc=I1zwK4DC4iMAX9ttH7N&_nc_ht=scontent-lim1-1.xx&oh=00_AT9Ep0XyxVujEvAkRKadGBCQaStPR2wGz9nWzHmOOwO1Jg&oe=631E8976"
              alt="profile_img"
            /> */}

            <img
              src={process.env.PUBLIC_URL+'/imagenes/money.png'}
              alt="profile_img"
            /> 
            

          </motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h3
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              >
                GRAFICOS
              </motion.h3>
              <Link to="/portal/grafico_ingresos"><Item icon={<DashboardRounded />} name="ingresos" /></Link>
              <Link to="/portal/grafico_engresos"><Item icon={<BarChartRounded />} name="egresos" /></Link>
            </div>
          </div>
          {/* group 2 */}
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              REPORTES
            </motion.h3>
            <Link to="/portal/reporte_ingresos"> <Item icon={<AttachMoneyRounded />} name="ingresos" /></Link>
            <Link to="/portal/reporte_egresos"><Item icon={<AssignmentTurnedInRounded />} name="egresos" /></Link>
          </div>
          {/* group 3 */}
          <div className="group">
            <motion.h3
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              PERFIL
            </motion.h3>
            <Link to="/portal/perfil"> <Item icon={<SettingsRemoteRounded />} name="perfil" /></Link> 
            <Link to="/portal/logout"><Item icon={<ColorLensRounded />} name="cerrar sesion" /></Link> 
          </div>
        </motion.div>
      </motion.div>

    </div>
  );
}

export default Sidebar;
