import React from 'react';

const SocialLinks = props => {
  const text = encodeURIComponent(props.text);
  const twitterText = encodeURIComponent(props.text + ' via @_ProtectEarth');
  const url = props.url;
  const size = props.size || 24;
  const showAll = props.all;

  // All icons are from https://simpleicons.org.
  const socialLinksMap = {
    twitter: {
      title: 'Tweet this',
      href: `https://twitter.com/intent/tweet?text=${twitterText}&url=${url}`,
      icon: (
        <svg
          width={size}
          height={size}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#1DA1F2"
        >
          <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
        </svg>
      ),
    },
    facebook: {
      title: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?t=${text}&u=${url}`,
      icon: (
        <svg
          width={size}
          height={size}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#1877F2"
        >
          <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
        </svg>
      ),
    },
    email: {
      title: 'Share in an E-Mail',
      href: `mailto:?subject=${text}&body=${url}`,
      icon: (
        <svg
          width={size}
          height={size}
          role="img"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#D14836"
        >
          <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
        </svg>
      ),
    },
    // whatsapp: {
    //   title: 'Share via WhatsApp',
    //   href: `whatsapp://send?text=${text} ${url}`,
    //   icon: <svg width={size} height={size} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" /></svg>
    // }
  };

  return (
    <div className={`d-flex align-items-center ${props.className || ''}`}>
      {Object.keys(socialLinksMap)
        .filter(key => props[key] === true || showAll)
        .map(key => (
          <div key={key} className="mr-2">
            <a
              title={socialLinksMap[key].title}
              target="_blank"
              rel="noopener noreferrer"
              href={socialLinksMap[key].href}
            >
              {socialLinksMap[key].icon}
            </a>
          </div>
        ))}
    </div>
  );
};

export default SocialLinks;
