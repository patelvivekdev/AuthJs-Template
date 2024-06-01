// // components/UnlinkAccountButton.tsx
// import React from 'react';

import { Button } from '@/components/ui/button';

export default function UnlinkAccountButton() {
  return (
    <Button size='sm' variant='destructive'>
      Disconnect
    </Button>
  );
}

// interface UnlinkAccountButtonProps {
//   userId: string;
//   provider: string;
//   providerAccountId: string;
// }

// const UnlinkAccountButton: React.FC<UnlinkAccountButtonProps> = ({ userId, provider, providerAccountId }) => {
//   const handleUnlink = async () => {
//     const response = await fetch('/api/auth/unlink-account', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ userId, provider, providerAccountId }),
//     });

//     if (response.ok) {
//       alert('Account unlinked successfully');
//     } else {
//       alert('Error unlinking account');
//     }
//   };

//   return (
//     <button onClick={handleUnlink}>
//       Unlink {provider} Account
//     </button>
//   );
// };

// export default UnlinkAccountButton;
