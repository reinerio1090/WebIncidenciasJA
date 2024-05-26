import React from 'react';
import { useEffect, useState } from "react";
import Navbar from '../../Components/global_components/nabvar/Navbar';
import ListarIncidencias from '../ListarIncidencias/ListarIncidencias';


const Home = () => {
    const [menuOption, setMenuOption]=useState(0);
    const menus=[
        <ListarIncidencias></ListarIncidencias>

    ];
    
    return (
        <div className='flex'>
            <Navbar changeMenu={setMenuOption} activo={menuOption}></Navbar>
            {menus[menuOption]}
        </div>
    );
};
export default Home;