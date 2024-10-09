export interface Skill {
    name: string;
    icon: string;
    proficiency: number;
  }
  
  export interface SkillCategoryType {
    name: string;
    skills: Skill[];
  }