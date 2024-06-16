// 'use client';

// import { useState, useMemo, JSX, SVGProps, SetStateAction } from 'react';
// import Link from 'next/link';
// import { Input } from '@/components/ui/input';
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from '@/components/ui/table';

// export default function Admin() {
//   const [search, setSearch] = useState('');
//   const handleSearch = (e: { target: { value: SetStateAction<string> } }) =>
//     setSearch(e.target.value);
//   const [sort, setSort] = useState({ key: 'name', order: 'asc' });
//   const handleSort = (key: string) => {
//     if (sort.key === key) {
//       setSort({ key, order: sort.order === 'asc' ? 'desc' : 'asc' });
//     } else {
//       setSort({ key, order: 'asc' });
//     }
//   };
//   const users = useMemo(
//     () =>
//       [
//         {
//           id: 1,
//           name: 'John Doe',
//           email: 'john@example.com',
//           role: 'Admin',
//           status: 'Active',
//         },
//         {
//           id: 2,
//           name: 'Jane Smith',
//           email: 'jane@example.com',
//           role: 'Manager',
//           status: 'Pending',
//         },
//         {
//           id: 3,
//           name: 'Bob Johnson',
//           email: 'bob@example.com',
//           role: 'User',
//           status: 'Active',
//         },
//         {
//           id: 4,
//           name: 'Sarah Lee',
//           email: 'sarah@example.com',
//           role: 'Admin',
//           status: 'Suspended',
//         },
//         {
//           id: 5,
//           name: 'Tom Wilson',
//           email: 'tom@example.com',
//           role: 'Manager',
//           status: 'Active',
//         },
//       ]
//         .filter((user) => {
//           const searchValue = search.toLowerCase();
//           return (
//             user.name.toLowerCase().includes(searchValue) ||
//             user.email.toLowerCase().includes(searchValue) ||
//             user.role.toLowerCase().includes(searchValue) ||
//             user.status.toLowerCase().includes(searchValue)
//           );
//         })
//         .sort((a, b) => {
//           if (sort.order === 'asc') {
//             return a[sort.key] > b[sort.key] ? 1 : -1;
//           } else {
//             return a[sort.key] < b[sort.key] ? 1 : -1;
//           }
//         }),
//     [search, sort],
//   );
//   return (
//     <div className='grid min-h-screen w-full grid-cols-[280px_1fr] overflow-hidden'>
//       <div className='hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block'>
//         <div className='flex flex-col gap-2'>
//           <div className='flex h-[60px] items-center px-6'>
//             <Link
//               href='#'
//               className='flex items-center gap-2 font-semibold'
//               prefetch={false}
//             >
//               <UsersIcon className='h-6 w-6' />
//               <span className=''>User Management</span>
//             </Link>
//           </div>
//           <div className='flex-1'>
//             <nav className='grid items-start px-4 text-sm font-medium'>
//               <Link
//                 href='#'
//                 className='flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50'
//                 prefetch={false}
//               >
//                 <UsersIcon className='h-4 w-4' />
//                 Manage Users
//               </Link>
//               <Link
//                 href='#'
//                 className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
//                 prefetch={false}
//               >
//                 <MailIcon className='h-4 w-4' />
//                 Add Admin
//               </Link>
//               <Link
//                 href='#'
//                 className='flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50'
//                 prefetch={false}
//               >
//                 <LinkIcon className='h-4 w-4' />
//                 Add Manager
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className='flex flex-col'>
//         <header className='flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px]'>
//           <div className='flex-1'>
//             <h1 className='text-lg font-semibold'>User Management</h1>
//           </div>
//           <div className='flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
//             <form className='ml-auto flex-1 sm:flex-initial'>
//               <div className='relative'>
//                 <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
//                 <Input
//                   type='search'
//                   placeholder='Search users...'
//                   className='bg-white pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
//                   value={search}
//                   onChange={handleSearch}
//                 />
//               </div>
//             </form>
//           </div>
//         </header>
//         <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6'>
//           <div className='rounded-lg border p-2 shadow-sm'>
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead
//                     className='w-[100px]'
//                     onClick={() => handleSort('name')}
//                   >
//                     Name
//                     {sort.key === 'name' && (
//                       <span className='ml-1'>
//                         {sort.order === 'asc' ? '\u2191' : '\u2193'}
//                       </span>
//                     )}
//                   </TableHead>
//                   <TableHead onClick={() => handleSort('email')}>
//                     Email
//                     {sort.key === 'email' && (
//                       <span className='ml-1'>
//                         {sort.order === 'asc' ? '\u2191' : '\u2193'}
//                       </span>
//                     )}
//                   </TableHead>
//                   <TableHead onClick={() => handleSort('role')}>
//                     Role
//                     {sort.key === 'role' && (
//                       <span className='ml-1'>
//                         {sort.order === 'asc' ? '\u2191' : '\u2193'}
//                       </span>
//                     )}
//                   </TableHead>
//                   <TableHead onClick={() => handleSort('status')}>
//                     Status
//                     {sort.key === 'status' && (
//                       <span className='ml-1'>
//                         {sort.order === 'asc' ? '\u2191' : '\u2193'}
//                       </span>
//                     )}
//                   </TableHead>
//                   <TableHead className='text-right'>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {users.map((user) => (
//                   <TableRow key={user.id}>
//                     <TableCell>{user.name}</TableCell>
//                     <TableCell>{user.email}</TableCell>
//                     <TableCell>{user.role}</TableCell>
//                     <TableCell>{user.status}</TableCell>
//                     <TableCell className='text-right'>
//                       <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                           <Button variant='ghost' size='icon'>
//                             <MoveHorizontalIcon className='h-4 w-4' />
//                             <span className='sr-only'>Actions</span>
//                           </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align='end'>
//                           <DropdownMenuItem>View user</DropdownMenuItem>
//                           <DropdownMenuItem>Edit user</DropdownMenuItem>
//                           <DropdownMenuItem>Delete user</DropdownMenuItem>
//                         </DropdownMenuContent>
//                       </DropdownMenu>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// function LinkIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
//       <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
//     </svg>
//   );
// }

// function MailIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <rect width='20' height='16' x='2' y='4' rx='2' />
//       <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
//     </svg>
//   );
// }

// function MoveHorizontalIcon(
//   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
// ) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <polyline points='18 8 22 12 18 16' />
//       <polyline points='6 8 2 12 6 16' />
//       <line x1='2' x2='22' y1='12' y2='12' />
//     </svg>
//   );
// }

// function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <circle cx='11' cy='11' r='8' />
//       <path d='m21 21-4.3-4.3' />
//     </svg>
//   );
// }

// function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns='http://www.w3.org/2000/svg'
//       width='24'
//       height='24'
//       viewBox='0 0 24 24'
//       fill='none'
//       stroke='currentColor'
//       strokeWidth='2'
//       strokeLinecap='round'
//       strokeLinejoin='round'
//     >
//       <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
//       <circle cx='9' cy='7' r='4' />
//       <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
//       <path d='M16 3.13a4 4 0 0 1 0 7.75' />
//     </svg>
//   );
// }

export default function Admin() {
  return <h1>This is where Tables will be</h1>;
}
