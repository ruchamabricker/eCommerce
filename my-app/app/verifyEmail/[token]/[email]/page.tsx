"use client";

import axios from "axios";

export default async function VerifyEmail({
  params,
}: {
  params: { token: string; email: string };
}) {
  // Decode the email address to a readable format
  const email = decodeURIComponent(params.email);
  const token = params.token;

  // Function to verify email
  const verifyEmail = async () => {
    if (email && token) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/verifyEmail/${token}/${email}`
        );
        if (res.status === 200) {
          return (
            <div>
              Email verified successfully! You can now log in. 
            </div>
          );
        } else {
          return <div>Verification failed or the token has expired. Try again.</div>;
        }
      } catch {
        return <div>Verification failed or the token has expired. Try again.</div>;
      }
    }
  };

  // Call the verification function
  const verificationMessage = await verifyEmail();

  // Return only the message with styles to hide other content
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'white', // Set background to white
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start', // Align items to the top
      fontSize: '1.8rem',
      textAlign: 'center',
      paddingTop: '60px', // Add padding to create space from the top
      zIndex: 1000,
      color: 'black' // Ensures it appears above other content
    }}>
      {verificationMessage}
    </div>
  );
}
