export type ImageItem = {
  id: string;
  src: string;
  title: string;
  shortDescription?: string;
  location?: string;
  year?: number;
  category: string;
  featured?: boolean;
  width?: number;
  height?: number;
};

export const GALLERY_ITEMS: ImageItem[] = [
  { id: 'nissa-team', src: '/images/nissa_team.jpeg', title: 'NISSA Project Team', shortDescription: 'NISSA project team meeting', location: 'Leribe', year: 2025, category: 'Projects', featured: true },
  { id: 'nissa-update', src: '/images/nissa_updating.jpeg', title: 'NISSA Updating Fieldwork', shortDescription: 'Field data collection for NISSA update', location: 'Leribe', year: 2025, category: 'Projects' },
  { id: 'school-counselling', src: '/images/school_counselling_session.jpg', title: 'School Counselling Session', shortDescription: 'Counselling in schools', location: 'Mafeteng', year: 2023, category: 'School Programmes' },
  { id: 'fun-day', src: '/images/fun_day.jpg', title: 'Community Fun Day', shortDescription: 'Community outreach event', location: 'Mafeteng', year: 2022, category: 'Community Outreach' },
  { id: 'training-session', src: '/images/training_session.jpg', title: 'Higherlife Training Workshop', shortDescription: 'Higherlife teacher training workshop', location: 'Maseru', year: 2023, category: 'Training & Workshops' },
  { id: 'workshop', src: '/images/workshop.jpg', title: "Teachers' Training Workshop", shortDescription: 'Teacher training workshop', location: 'Mafeteng', year: 2023, category: 'Training & Workshops' },
  { id: 'community-meeting', src: '/images/community_meeting.jpg', title: 'Community Meeting', shortDescription: 'Community planning meeting', location: 'Mafeteng', year: 2021, category: 'Community Outreach' },
];

export const ALL_CATEGORIES = Array.from(new Set(GALLERY_ITEMS.map(i => i.category)));
export const ALL_YEARS = Array.from(new Set(GALLERY_ITEMS.map(i => i.year).filter(Boolean))).sort((a,b) => Number(b)-Number(a));
