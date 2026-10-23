import { createBrowserRouter } from 'react-router';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import NotFoundPage from './pages/NotFoundPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/watch/:id', element: <WatchPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
