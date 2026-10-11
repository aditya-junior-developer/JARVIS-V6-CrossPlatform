export type MemoryCategory = 'identity'|'preference'|'goal'|'project'|'relationship'|'emotional'|'behavior'|string;
export interface Memory { id:string; category:MemoryCategory; text:string; createdAt?:string; updatedAt?:string; confidence?:number; source?:string; }
export interface MemoryTransaction { action:'ADD'|'UPDATE'|'REMOVE'; id?:string; category:MemoryCategory; text:string; reason?:string; }
