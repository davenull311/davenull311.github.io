import React from 'react';
import { Skill } from './types';

interface SkillItemProps {
  skill: Skill;
}

const SkillItem: React.FC<SkillItemProps> = ({ skill })