export type Role = 'MANAGER' | 'STAFF' | 'PARENT';
export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  email: string;
  phone?: string;
}

export interface MedicalInfo {
  allergies: string[];
  medications: string[];
  bloodType: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  dob: string;
  class: string;
  parentName: string;
  parentId: string;
  photo: string;
  status: 'active' | 'inactive';
  attendanceToday?: 'present' | 'absent' | 'late';
  balance: number;
  gender: 'male' | 'female';
  address: string;
  medical?: MedicalInfo;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  checkInTime?: string;
  checkOutTime?: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface DashboardStats {
  totalStudents: number;
  staffPresent: number;
  attendanceRate: number;
  revenueThisMonth: number;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'academic' | 'fun' | 'holiday';
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  date: string;
  class: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar: string;
  status: 'active' | 'leave';
}