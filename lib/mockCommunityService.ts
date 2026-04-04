export interface Project {
    id: string;
    name: string;
    date: string;
    description: string;
    fullDescription: string;
    objective: string;
    objectives: string[];
    featuredImage: string;
    headerImage: string;
    impact: {
        label: string;
        value: string;
    }[];
    partners: {
        name: string;
        logo: string;
    }[];
    gallery: string[];
    color: string;
}

export const mockProjects: Project[] = [
    {
        id: '1',
        name: 'Itoku Community Service',
        date: 'Aug \'24',
        description: 'Local Project Recap, Outcome Tracking, and Partner Acknowledgement.',
        fullDescription: 'Recap of the location, date, and core mission. This project focused on improving sanitation and providing basic health supplies to the Itoku community.',
        objective: 'What we did',
        objectives: [
            'Cleared community drainage systems',
            'Distributed hygiene kits to 50+ households',
            'Conducted basic health awareness sessions'
        ],
        featuredImage: '/images/communityImage4.svg',
        headerImage: '/images/communityImage4.svg',
        impact: [
            { label: 'Volunteers Deployed', value: '15' },
            { label: 'Households Reached', value: '50+' },
            { label: 'Community Leaders Engaged', value: '5' },
            { label: 'Hours of Service', value: '120' }
        ],
        partners: [
            { name: 'Local Govt', logo: '/images/OLA logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' },
            { name: 'Local Govt', logo: '/images/OLA logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' },
            { name: 'Health First', logo: '/images/Microsoft Logo.svg' }



        ],
        gallery: [
            '/images/communityImage1.svg',
            '/images/communityImage2.svg',
            '/images/communityImage4.svg'
        ],
        color: 'from-green-500 to-green-600'
    }
];
