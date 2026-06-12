import { redirect } from 'next/navigation';

export default function RootPage() {
  // Yeh backend se hi user ko jump karwa dega
  redirect('/creators');
  
  // Next.js ke component rule ko satisfy karne ke liye fallback return
  return null;
}