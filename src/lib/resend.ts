import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

import VerificationEmail from '@/components/emails/verificationEmail';

export async function sendVerificationEmail(
  email: string,
  validationCode: string,
) {
  try {
    await resend.emails.send({
      from: 'no-reply@patelvivek.dev',
      to: email,
      subject: 'Verification Code for creating a new Account',
      react: VerificationEmail({ email, validationCode: validationCode }),
    });
    return { success: true, message: 'Verification email sent successfully.' };
  } catch (emailError) {
    console.error('Error sending verification email:', emailError);
    return { success: false, message: 'Failed to send verification email.' };
  }
}
