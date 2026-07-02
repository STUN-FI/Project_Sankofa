import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically bypass the default boilerplate and push users to login
  redirect('/login');
}