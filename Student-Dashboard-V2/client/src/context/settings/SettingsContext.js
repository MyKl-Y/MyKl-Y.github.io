import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

export const SettingsProvider = ({ children }) => {
    const [gpaSettings, setGpaSettings] = useState({
        scale: 4.0,
        gradeScale: {
            'A+': {
                value: 4.0,
                range: [97, 100]
            },
            'A': {
                value: 4.0,
                range: [93, 96]
            },
            'A-': {
                //value: 3.7,
                value: 4.0,
                range: [90, 92]
            },
            'B+': {
                //value: 3.3,
                value: 3.0,
                range: [87, 89]
            },
            'B': {
                value: 3.0,
                range: [83, 86]
            },
            'B-': {
                //value: 2.7,
                value: 3.0,
                range: [80, 82]
            },
            'C+': {
                //value: 2.3,
                value: 2.0,
                range: [77, 79]
            },
            'C': {
                value: 2.0,
                range: [73, 76]
            },
            'C-': {
                //value: 1.7,
                value: 2.0,
                range: [70, 72]
            },
            'D+': {
                //value: 1.3,
                value: 1.0,
                range: [67, 69]
            },
            'D': {
                value: 1.0,
                range: [65, 66]
            },
            'D-': {
                // value: 0.7,
                value: 1.0,
                range: [60, 64]
            },
            'F': {
                value: 0.0,
                range: [0, 59]
            },
        }
    });

    const changeGpaScale = (scale) => {
        setGpaSettings({ ...gpaSettings, scale });
    }

    const changeGradeScale = (gradeScale) => {
        setGpaSettings({ ...gpaSettings, gradeScale });
    }

    const getGrade = (score) => {
        for (const grade in gpaSettings.gradeScale) {
            if (score >= gpaSettings.gradeScale[grade].range[0] && score <= gpaSettings.gradeScale[grade].range[1]) {
                return gpaSettings.gradeScale[grade].value;
            }
        }
    }

    return (
        <SettingsContext.Provider value={{ gpaSettings, changeGpaScale, changeGradeScale, getGrade }}>
            {children}
        </SettingsContext.Provider>
    );
}