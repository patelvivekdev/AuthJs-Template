import React from 'react';
export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=''>
      <nav>
        <h1>Links for admin</h1>
      </nav>

      {children}
      <h2>Pagination</h2>
    </div>
  );
}
