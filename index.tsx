import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

const BootstrappedApp = () => {
  React.useEffect(() => {
    const firstFrame = window.requestAnimationFrame(() => {
      document.documentElement.classList.add('app-ready');

      window.setTimeout(() => {
        document.getElementById('app-boot')?.remove();
      }, 450);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
    };
  }, []);

  return <App />;
};

root.render(
  <React.StrictMode>
    <BootstrappedApp />
  </React.StrictMode>
);
