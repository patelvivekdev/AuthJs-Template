import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface TwoFactorEmailProps {
  userFirstName?: string;
  OTP?: string;
  time?: number;
}

const baseUrl = process.env.BASE_URL
  ? `${process.env.BASE_URL}`
  : 'http://localhost:3000';

export const TwoFactorEmail = ({
  userFirstName,
  OTP,
  time,
}: TwoFactorEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify 2FA</Preview>
      <Body style={main}>
        <Container style={container}>
          <Row>
            <Heading as='h2'>Hello {userFirstName},</Heading>
          </Row>
          <Section>
            <Text style={text}>
              You have requested OTP for verify your account.
            </Text>
            <Section style={verificationSection}>
              <Text style={verifyText}>Verification code</Text>

              <Text style={codeText}>{OTP}</Text>
              <Text style={validityText}>
                (This code is valid for {time} minutes)
              </Text>
            </Section>

            <Text style={text}>
              If you don&apos;t want to change your password or didn&apos;t
              request this, just ignore and delete this message.
            </Text>
            <Hr style={hr} />
            <Link href={baseUrl} style={reportLink}>
              AuthJs Template
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default TwoFactorEmail;

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
};

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const reportLink = {
  fontSize: '14px',
  color: '#b4becc',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0',
  textAlign: 'center' as const,
};

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
};

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
