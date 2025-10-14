import React from 'react';

// A helper function to create SVG icon components
const createIcon = (path: React.ReactNode): React.FC<{ className?: string }> => 
  ({ className = 'w-6 h-6' }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className={className}
    >
      {path}
    </svg>
);

export const HomeIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a.75.75 0 011.06 0l8.955 8.955M3 10.5v9.75a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V10.5M9 21V12h6v9" />
);

export const ChartBarIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
);

export const PlusIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
);

export const FlagIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
);

export const UserIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
);

export const BriefcaseIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.098a2.25 2.25 0 01-2.25 2.25h-13.5a2.25 2.25 0 01-2.25-2.25V14.15M18.75 18.75v-6.042a2.25 2.25 0 00-2.25-2.25h-9a2.25 2.25 0 00-2.25 2.25v6.042M15 12.75V5.25a2.25 2.25 0 00-2.25-2.25h-3a2.25 2.25 0 00-2.25 2.25v7.5" />
);

export const ShoppingCartIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.828l2.91-7.022c.133-.32.023-.699-.247-.923a.818.818 0 00-.913-.197L4.35 6.09m1.23 8.16h12.75" />
);

export const BuildingStorefrontIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.14m-11.14 0H2.36m11.14 0H18m0 0h2.14m0 0V12.75a2.25 2.25 0 00-2.25-2.25h-13.5A2.25 2.25 0 002.25 12.75V21m18 0v-2.14m-2.14 0V12.75a2.25 2.25 0 00-2.25-2.25h-13.5A2.25 2.25 0 002.25 12.75V21m18 0v-2.14" />
);

export const GiftIcon = createIcon(
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.375V18.75m0 0H3.375m9.375 0H20.625M12.75 18.75c0 1.657 1.343 3 3 3s3-1.343 3-3V3.375M12.75 3.375c0-1.657-1.343-3-3-3s-3 1.343-3 3v15.375" />
);

export const ChevronLeftIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
);

export const ChevronRightIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
);

export const ChevronDownIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
);

export const ArrowDownTrayIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
);

export const ArrowUpTrayIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
);

export const WalletIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
);

export const XMarkIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
);

export const CurrencyDollarIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.09-.659-1.172-.879-1.172-2.303 0-3.182.72-.538 1.63-.655 2.45-.252M12 12c.535 0 .954.462.9.995l-.35 3.507c-.035.346-.32.622-.65.622s-.615-.276-.65-.622l-.35-3.507c-.054-.533.365-.995.9-.995z" />
);

export const PencilIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
);

export const TrashIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.548 0c-.01.051-.02.101-.03.152m3.894 0A48.093 48.093 0 0112 5.25c.75 0 1.493.04 2.228.118m-4.456 0c.131.023.264.043.398.061m10.324 0c.133-.018.267-.035.4-.052m-4.456 0c.265.024.527.052.793.083m-9.525 0c.265.024.527.052.793.083" />
);

export const ExclamationTriangleIcon = createIcon(
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
);