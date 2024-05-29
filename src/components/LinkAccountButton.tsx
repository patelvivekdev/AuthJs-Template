// // components/LinkAccountButton.tsx
// import React from 'react';

// interface LinkAccountButtonProps {
//   userId: string;
//   accountData: AdapterAccount;
// }

// const LinkAccountButton: React.FC<LinkAccountButtonProps> = ({ userId, accountData }) => {
//   const handleLink = async () => {
//     const response = await fetch('/api/auth/link-account', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId, accountData }),
//     });

//     if (response.ok) {
//       alert('Account linked successfully');
//     } else {
//       alert('Error linking account');
//     }
//   };

//   return (
//     <button onClick={handleLink}>
//       Link Account
//     </button>
//   );
// };

// export default LinkAccountButton;
