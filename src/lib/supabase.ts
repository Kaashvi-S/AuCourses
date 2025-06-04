import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Major = {
  id: string;
  name: string;
  slug: string;
  created_at?: string | null;
};

export type Subfield = {
  id: string;
  major_id: string;
  name: string;
  slug: string;
  created_at?: string | null;
  major?: Major;
  courses?: Course[];
};

export type Course = {
  id: string;
  subfield_id: string;
  code: string;
  title: string;
  ects: number;
  description?: string | null;
  created_at?: string | null;
  subfield?: Subfield;
  offered_in?: string;
};

export const fetchMajors = async (): Promise<Major[]> => {
  const { data, error } = await supabase
    .from('majors')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('Error fetching majors:', error);
    return [];
  }
  
  return data || [];
};

export const fetchSubfields = async (majorSlug: string): Promise<Subfield[]> => {
  let query = supabase
    .from('subfields')
    .select('*, majors!inner(*)')
    .eq('majors.slug', majorSlug);
  
  const { data, error } = await query.order('name');
  
  if (error) {
    console.error('Error fetching subfields:', error);
    return [];
  }
  
  const subfields = data?.map(item => ({
    ...item,
    major: item.majors
  })) || [];
  
  // If no subfields found and it's a direct courses major, create a default subfield
  if (subfields.length === 0 && (majorSlug === 'academic-core' || majorSlug === 'interdisciplinary')) {
    const { data: majorData } = await supabase
      .from('majors')
      .select('*')
      .eq('slug', majorSlug)
      .single();
    
    if (majorData) {
      return [{
        id: majorData.id, // Using major ID as temporary subfield ID
        major_id: majorData.id,
        name: majorData.name,
        slug: majorData.slug,
        major: majorData
      }];
    }
  }
  
  return subfields;
};

export const fetchCourses = async (subfieldId: string): Promise<Course[]> => {
  let query = supabase
    .from('new_courses')
    .select('*, subfields!inner(*)');
  
  query = query.eq('subfield_id', subfieldId);
  
  const { data, error } = await query.order('code');
  
  if (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
  
  return data?.map(item => ({
    ...item,
    subfield: item.subfields
  })) || [];
};

export const fetchCourseById = async (id: string): Promise<Course | null> => {
  const { data, error } = await supabase
    .from('new_courses')
    .select('*, subfields!inner(*, majors!inner(*))')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching course:', error);
    return null;
  }
  
  if (!data) return null;
  
  return {
    ...data,
    subfield: {
      ...data.subfields,
      major: data.subfields.majors
    }
  };
};

export const getCatalogue = async () => {
  const { data, error } = await supabase.rpc('get_catalogue');
  
  if (error) {
    console.error('Error fetching catalogue:', error);
    return null;
  }
  
  return data;
};

export const formatSemesterCode = (code: string | null | undefined): string => {
  if (!code) return 'Not specified';
  
  const semesterMap: Record<string, string> = {
    '1': 'Semester 1',
    '1.1': 'January Intensive',
    '2': 'Semester 2',
    '2.1': 'June Intensive',
    'both sem': 'Both Semesters',
    'both intensive': 'Both Intensives'
  };
  
  return semesterMap[code] || code;
};