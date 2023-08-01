import { RaRecord } from "ra-core";
import { Identifier } from "react-admin";

export enum MemberLevel {
    INTERN = 'Intern',
    FORMER_MEMBER = 'Former Member',
    CURRENT_MEMBER = 'Member',
    TECH = 'Tech',
    PI = 'Principal Investigator',
  }
export interface Member extends RaRecord{
    avatar: string
}
export const MemberChoices = [
  {id: 'PI', name: MemberLevel.PI},
  {id: 'INTERN', name: MemberLevel.INTERN},
  {id: 'CURRENT_MEMBER', name: MemberLevel.CURRENT_MEMBER},
  {id: 'FORMER_MEMBER', name: MemberLevel.FORMER_MEMBER},
]
export enum ReviewStatus {
  'APPLIED' = 'APPLIED',
  'REJECTED' = 'REJECTED',
  'FINISHED' = 'FINISHED',
  'NONE' = 'NONE'
}

export const actionChoices = [
    {id:'CREATE', name: 'Create'},
    {id:'EDIT', name: 'Edit'},
    {id:'READ', name: 'Read'},
    {id:'REMOVE', name: 'Remove'},
    {id:'REVIEW_REQUEST', name: 'Request Review'},
    {id:'REVIEW_PASS', name: 'Pass Review'},
    {id:'REVIEW_REJECT', name: 'Reject Review'},
    {id:'REVIEW_READ', name: 'Read Review'},
    {id:'ENABLE', name:'Enable'},
    {id:'PUBLIC', name:'Public'},
]

export enum ReviewAction  {
  'REQUEST' = 'REQUEST',
  'PASS' = 'PASS',
  'REJECT' = 'REJECT',
}
export enum ReviewType{
  'ACTIVITY'= 'ACTIVITY',
  'COURSE' = 'COURSE',
  'RESEARCH'= 'RESEARCH',
  'METHODOLOGY'= 'METHODOLOGY', 
  'SYLLABUS' = 'SYLLABUS',
  'SECTION' = 'SECTION',
  'CHAPTER' = 'CHAPTER',
}

export interface ReviewDTO{
  refId: string;
  refType: ReviewType;
  status: ReviewStatus;
  id: string;
  gmtCreated: Date;
  gmtModified: Date;
}

export interface Syllabus {
  id:Identifier;
  title: string;
  // show: boolean;
  // checked: boolean;
  type: ReviewType;
  children: Syllabus[];
  review: ReviewStatus;
  isRemoveAfterReview: boolean;
  isModified: boolean;

}

export interface ChapterView{
  id: string;
  title: string;
  description: string;
}
export interface ChapterView{
  id: string;
  title: string;
  html: string;
  videoLink: string;
}

export interface ReviewItem{
  id:Identifier;
  type:ReviewType;
}
export enum TreeType{
  PREVIEW,
  REVIEW
}