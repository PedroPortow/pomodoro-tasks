import React, { useContext } from 'react'
import { motion } from "framer-motion";
import { useThemeContext } from '../../../context/ThemeContext'
import './Switch.scss'
import { useState } from 'react';

export const Switch = (props) => {
  const { theme, setTheme, isThemeDark } = useThemeContext()
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    props.themeSwitch && setTheme(isThemeDark ? 'light' : 'dark')
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };


  return (
    <div className={props.themeSwitch ? "switch" : "switch confirm"} data-isOn={isOn} onClick={toggleSwitch}>
      <motion.div className={props.themeSwitch ? "handle" : "handle-confirm"} layout transition={spring}>
        {props.withIcons &&
          (isOn
            ? <i class={props.offIcon} />
            : <i class={props.onIcon} />
          )
        }
      </motion.div>
    </div>
  )

}
