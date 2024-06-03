import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import { useAuth } from '../authentication/AuthContext';
import { useTheme } from '../theme/ThemeContext';

const SettingsContext = createContext();

export const useSettings = () => {
    return useContext(SettingsContext);
}

const grades = {
    'A+': { value: 4.0, range: [97, 100] },
    'A': { value: 4.0, range: [93, 96] },
    'A-': { value: 4.0, range: [90, 92] },
    'B+': { value: 3.0, range: [87, 89] },
    'B': { value: 3.0, range: [83, 86] },
    'B-': { value: 3.0, range: [80, 82] },
    'C+': { value: 2.0, range: [77, 79] },
    'C': { value: 2.0, range: [73, 76] },
    'C-': { value: 2.0, range: [70, 72] },
    'D+': { value: 1.0, range: [67, 69] },
    'D': { value: 1.0, range: [65, 66] },
    'D-': { value: 1.0, range: [60, 64] },
    'F': { value: 0.0, range: [0, 59] },
}

export const SettingsProvider = ({ children }) => {
    const { user } = useAuth();
    const { style, mode, changeTheme } = useTheme();

    const [gpaScale, setGpaScale] = useState(4.0);
    const [gradeScale, setGradeScale] = useState(grades);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axiosInstance.get(`/register/${user.name}/settings`);
                setGpaScale(response.data.gpaSettings.scale);
                setGradeScale(response.data.gpaSettings.gradeScale);
            } catch (error) {
                console.error('Error fetching GPA settings:', error);
            }
        }
        fetchSettings();
    }, [user, changeTheme, setGpaScale, setGradeScale]);

    const changeGpaScale = async (s) => {
        const updatedSettings = { 
            gpaSettings: {
                gradeScale: gradeScale, 
                scale: s
            },
            themeSettings: {
                mode: mode,
                style: style,
            }
        };
        setGpaScale(s);
        await saveSettings(updatedSettings);
    }

    const changeGradeScale = async (s) => {
        const updatedSettings = { 
            gpaSettings: {
                scale: gpaScale, 
                gradeScale: s
            }, 
            themeSettings: {
                mode: mode,
                style: style,
            }
        };
        setGradeScale(s);
        await saveSettings(updatedSettings);
    }

    let grading = {
        'plus-minus': {
            'A+': { value: 4.0, range: [97, 100] },
            'A': { value: 4.0, range: [93, 96] },
            'A-': { value: 3.7, range: [90, 92] },
            'B+': { value: 3.3, range: [87, 89] },
            'B': { value: 3.0, range: [83, 86] },
            'B-': { value: 2.7, range: [80, 82] },
            'C+': { value: 2.3, range: [77, 79] },
            'C': { value: 2.0, range: [73, 76] },
            'C-': { value: 1.7, range: [70, 72] },
            'D+': { value: 1.3, range: [67, 69] },
            'D': { value: 1.0, range: [65, 66] },
            'D-': { value: 0.7, range: [60, 64] },
            'F': { value: 0.0, range: [0, 59] },
        },
        'letter': {
            'A': { value: 4.0, range: [90, 100] },
            'B': { value: 3.0, range: [80, 89] },
            'C': { value: 2.0, range: [70, 79] },
            'D': { value: 1.0, range: [60, 69] },
            'F': { value: 0.0, range: [0, 59] },
        }
    }

    let gradingScale = grading['plus-minus'];

    if (gradeScale === 'plus-minus') {
        gradingScale = grading['plus-minus'];
    } else if (gradeScale === 'letter') {
        gradingScale = grading['letter'];
    }

    const getGrade = (score) => {
        for (const grade in gradingScale) {
            if (score >= gradingScale[grade].range[0] && score <= gradingScale[grade].range[1]) {
                return gradingScale[grade].value;
            }
        }
    }

    const saveSettings = async (settings) => {
        try {
            await axiosInstance.post(`/register/${user.name}/settings`, settings);
            window.location.reload();
        } catch (error) {
            console.error('Error saving GPA settings:', error);
        }
    }

    return (
        <SettingsContext.Provider value={{ gpaScale, gradeScale, changeGpaScale, changeGradeScale, getGrade, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
}