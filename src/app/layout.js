import PropTypes from 'prop-types';
import './globals.css';

export const metadata = {
  title: 'InstaCV - AI Resume Builder',
  description: 'Generate a professional PDF resume from raw text using AI.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

