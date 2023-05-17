import { RaRecord } from "ra-core";

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
  'APPLIED',
  'REJECTED',
  'FINISHED',
  'NONE'
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