// import { AdminProvider } from '@/contexts/AdminContext';
import AdminNav from '@/components/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
 {/* <AdminProvider> */}
      <AdminNav />
      {children}
   {/* </AdminProvider> */}
    </>
   
  );
}
