import React, { createContext, useState, useEffect } from 'react';
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

export const UserContext = createContext();

const HandleUser = ({children}) => {
    const [Id, setId] = useState();
    const [InhalerType, setInhalerType] = useState(0);
    const [GradeCard, setGradeCard]=useState([]);
    const [score, setScore]=useState();
    return (
        <UserContext.Provider
            value={{
                Id, setId, InhalerType, setInhalerType, GradeCard, setGradeCard, score, setScore
            }}>
                {children}
        </UserContext.Provider>
    )
};
export default HandleUser;  