export interface Skill {
    name: string;
    proficiency: number;
}

export interface Skills {
    hard_skills: {
        languages: Skill[];
        database: Skill[];
        cloud: Skill[];
        frameworks: Skill[];
        tools: Skill[];
        libraries: Skill[];
        operating_systems: Skill[];
        software: Skill[];
    };
    soft_skills: string[];
}

export interface Major {
    type: string;
    name: string;
    concentration: string[];
}

export interface Education {
    school: string;
    major: Major[];
    gpa: number;
    courses: string[];
    awards: string[];
    expected_grad_date: string;
    location: string;
    minors: string[];
}

export interface Project {
    name: string;
    type: string;
    description: string[];
    date: string;
    link: string;
}

export interface Experience {
    company: string;
    role: string;
    location: string;
    type: string;
    start: string;
    end: string;
    ongoing: boolean;
    description: string[];
}

export interface Resume {
    id: number;
    name: string;
    email: string;
    phone: string;
    summary: string;
    skills: Skills;
    experience: Experience[];
    education: Education;
    projects: Project[];
}