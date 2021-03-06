import React from 'react';
import { AwardAuthority, GroupAward } from '../../types/awards';
import { gradeMap, iconMap } from '~components/TrophyCabinet/data';

export function getGrade(award: GroupAward, authority: AwardAuthority) {
  const authoritySlug = authority.slug;
  if (gradeMap.hasOwnProperty(authoritySlug)) {
    const authorityGrades = gradeMap[authoritySlug];

    return authorityGrades[award.grade] || authorityGrades[0];
  }

  return gradeMap['leaves'][award.grade];
}

export const Icon: React.SFC<{ name: string }> = ({ name }) => {
  if (!iconMap.hasOwnProperty(name)) {
    return null;
  }

  const I = iconMap[name];

  return React.createElement(I);
};
