import { FC, MouseEvent } from 'react';
import axios from 'axios';

interface LogoProps {
  src: string;
  alt: string;
}

const Logo: FC<LogoProps> = ({ src, alt }) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    void (async () => {
      try {
        const res = await axios.post('http://localhost:3001/info');
        const newWindow = window.open();
        if (newWindow && typeof res.data === 'string') {
          newWindow.document.write(res.data);
        } else {
          // Handle the situation when the data is not a string, you can either ignore or log a warning message
          console.warn("Received data is not a string and cannot be written to the document.");
        }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <img
      onClick={handleClick}
      style={{ cursor:'pointer', width: '30%', height: '100%', borderRadius: '100%' }}
      src={src}
      alt={alt}
    />
  );
};

export default Logo;