'use client';

import { useEffect, useState } from 'react';
import { getCurriculumInfo } from '@/lib/adminData';

export default function Curriculum() {
  const [notionUrl, setNotionUrl] = useState("https://glacier-dogsled-9b5.notion.site/Trust-Teens-Curriculum-209a6df594508026a95af038b05e4da5?source=copy_link");

  useEffect(() => {
    const info = getCurriculumInfo();
    if (info?.notion_url) {
      setNotionUrl(info.notion_url);
    }
  }, []);

  return (
    <div className="bg-white flex flex-row items-center justify-center py-40 px-4">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md transition-transform hover:scale-105 active:scale-95 shadow-md">
        <a href={notionUrl} target="_blank" rel="noopener noreferrer">Click Here</a>
      </button>
    </div>
  );
}