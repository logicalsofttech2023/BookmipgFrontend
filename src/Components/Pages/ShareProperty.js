import React from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';

const ShareProperty = ({ propertyId }) => {
  const shareUrl = `https://yourwebsite.com/property/${propertyId}`;
  const shareTitle = `Check out this property: ${propertyId}`;

  return (
    <div className="share-buttons">
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle}>
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>
    </div>
  );
};


export default ShareProperty;