// // components/DeleteUserButton.tsx
// import React from 'react';

// interface DeleteUserButtonProps {
//   userId: string;
// }

// const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ userId }) => {
//   const handleDelete = async () => {
//     const response = await fetch('/api/auth/delete-user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId }),
//     });

//     if (response.ok) {
//       alert('User deleted successfully');
//     } else {
//       alert('Error deleting user');
//     }
//   };

//   return (
//     <button onClick={handleDelete}>
//       Delete User
//     </button>
//   );
// };

// export default DeleteUserButton;
