"use client";

import dynamic from 'next/dynamic';
import PortfolioFallback from './PortfolioFallback';

const App = dynamic(() => import('../App'), {
  ssr: false,
  loading: () => <PortfolioFallback />,
});

export default function ClientApp() {
  return <App />;
}
