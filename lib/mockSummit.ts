
export interface Summit {
    id: string;
    name: string;
    date: string;
    description: string;
    fullDescription: string;
    objective: string;
    objectiveDetails?: string;
    objectives: string[];
    featuredImage: string;
    headerImage: string;
    aboutImage?:string;
    impact: {
      label: string;
      value: number;
    }[];
    partners: {
      name: string;
      logo: string;
    }[];
    gallery: string[];
    color: string;
  }
  
  export const mockSummit: Summit[] = [
    {
      id: '1',
      name: 'Planted in Purpose Summit',
      date: 'Sept 24',
      description: 'Awareness about the significance of hygiene practices and provision of essential hygiene products and knowledge to teenagers.',
      fullDescription: 'Awareness about the significance of hygiene practices and provision of essential hygiene products and knowledge to teenagers',
      objective: 'What we did',
      objectiveDetails: 'On September 26, 2024, Trust Teens launched its first program in Oyo State with the Hygiene Awareness Exhibition held at Mokola, the event themed Rise and Shine helped raise awareness about the significance of hygiene practices and provided over 200 teenagers with essential hygiene products and knowledge to support their well-being.',
      objectives: [
        'Raise awareness about the importance of personal hygiene among teenagers',
        'To provide teenagers with essential hygiene products and knowledge to support their well-being',
        'Foster a sense of empowerment and responsibility among teenagers towards their own health and well-being'
      ],
      featuredImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765756818/Rectangle_17_ihmhki.png?auto=compress&cs=tinysrgb&w=400',
      headerImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765756818/Rectangle_17_ihmhki.png?auto=compress&cs=tinysrgb&w=800',
      aboutImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765950567/Image_1_1_jubx9i.png',
      impact: [
        { label: 'Teenagers Reached', value: 210 },
        { label: 'Communities Engaged', value: 4 },
        { label: 'Volunteer Mobilised', value: 15 },
        { label: 'Advocacy Stations', value: 6 }
      ],
      partners: [
        { name: 'Airbnb', logo: '/Airbnb Logo.svg' },
        { name: 'Amazon', logo: '/Amazon Logo.svg' },
        { name: 'FedEx', logo: '/FedEx Logo.svg' },
        { name: 'Microsoft', logo: '/Microsoft Logo.svg' },
        { name: 'Google', logo: '/Google Logo.svg' },
        { name: 'OLA', logo: '/OLA logo.svg' },
        { name: 'Walmart', logo: '/Walmart Logo.svg' },
        { name: 'OYO', logo: '/OYO Logo.svg' }
      ],
      gallery: [
        'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1765756818/Rectangle_17_ihmhki.png?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807518/pexels-photo-3807518.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807519/pexels-photo-3807519.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807520/pexels-photo-3807520.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807521/pexels-photo-3807521.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807522/pexels-photo-3807522.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807523/pexels-photo-3807523.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807524/pexels-photo-3807524.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3807525/pexels-photo-3807525.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: '2',
      name: 'Love Journey',
      date: 'Feb 24',
      description: 'Empowerment campaign focused on self-love, mental health awareness, and building confidence among teenagers.',
      fullDescription: 'Love Journey is an empowerment campaign dedicated to fostering self-love, promoting mental health awareness, and building confidence among teenagers. Through interactive sessions and workshops, participants learned to embrace their unique identities and support one another.',
      objective: 'What we did',
      objectives: [
        'Promote self-love and acceptance among teenagers',
        'Raise awareness about mental health and emotional well-being',
        'Build confidence and foster positive peer relationships'
      ],
      featuredImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510689/Group_516_bplvj3.png?auto=compress&cs=tinysrgb&w=400',
      headerImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510689/Group_516_bplvj3.png?auto=compress&cs=tinysrgb&w=800',
      impact: [
        { label: 'Teenagers Reached', value: 180 },
        { label: 'Communities Engaged', value: 3 },
        { label: 'Volunteer Mobilised', value: 12 },
        { label: 'Advocacy Stations', value: 5 }
      ],
      partners: [
        { name: 'Google', logo: '🔍' },
        { name: 'Microsoft', logo: '💻' },
        { name: 'Amazon', logo: '📦' }
      ],
      gallery: [
        'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510689/Group_516_bplvj3.png?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808060/pexels-photo-3808060.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808061/pexels-photo-3808061.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808062/pexels-photo-3808062.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808063/pexels-photo-3808063.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808064/pexels-photo-3808064.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808065/pexels-photo-3808065.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808066/pexels-photo-3808066.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808067/pexels-photo-3808067.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: '3',
      name: 'Skill Builder',
      date: 'Jul 24',
      description: 'Skills development program focused on vocational training and entrepreneurship opportunities for teenagers.',
      fullDescription: 'Skill Builder is a comprehensive skills development program designed to provide vocational training and entrepreneurship opportunities for teenagers. The program equips young individuals with practical skills needed for personal and professional growth.',
      objective: 'What we did',
      objectives: [
        'Provide vocational training to teenagers',
        'Foster entrepreneurship mindset and skills',
        'Create job-ready opportunities for youth'
      ],
      featuredImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510219/Group_582_g80ue8.png?auto=compress&cs=tinysrgb&w=400',
      headerImage: 'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510219/Group_582_g80ue8.png?auto=compress&cs=tinysrgb&w=800',
      impact: [
        { label: 'Teenagers Reached', value: 250 },
        { label: 'Communities Engaged', value: 5 },
        { label: 'Volunteer Mobilised', value: 18 },
        { label: 'Advocacy Stations', value: 7 }
      ],
      partners: [
        { name: 'Airbnb', logo: '🏠' },
        { name: 'Google', logo: '🔍' },
        { name: 'OYO', logo: '🏨' }
      ],
      gallery: [
        'https://res.cloudinary.com/dd6pd8dsc/image/upload/v1764510219/Group_582_g80ue8.png?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808101/pexels-photo-3808101.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808102/pexels-photo-3808102.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808103/pexels-photo-3808103.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808104/pexels-photo-3808104.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808105/pexels-photo-3808105.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808106/pexels-photo-3808106.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808107/pexels-photo-3808107.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/3808108/pexels-photo-3808108.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      color: 'from-orange-500 to-orange-600'
    }
  ];
  