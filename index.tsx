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
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        document.documentElement.classList.add('app-ready');

        window.setTimeout(() => {
          document.getElementById('app-boot')?.remove();
        }, 650);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  return <App />;
};

root.render(
  <React.StrictMode>
    <BootstrappedApp />
  </React.StrictMode>
);
