import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../../components/common/Button/Button';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container not-found-content">
        <span className="not-found-code text-gradient-primary">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The requested resource within the Zuccano ecosystem does not exist or has moved.
        </p>
        <Button variant="primary" size="md" href="/" icon={ArrowLeft}>
          Return to Group Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
