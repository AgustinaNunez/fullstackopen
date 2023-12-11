export enum CourseKind {
  basic = 'basic',
  group = 'group',
  background = 'background',
  special = 'special',
}
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: CourseKind.basic;
}
interface CourseGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: CourseKind.group;
}
interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: CourseKind.background;
}
interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: CourseKind.special;
}
export type CoursePart = CoursePartBasic 
  | CourseGroup
  | CoursePartBackground
  | CoursePartSpecial