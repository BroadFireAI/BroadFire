import { LucideIcon } from 'lucide-react';

export interface ResearchDomain {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
}