import { useParams } from 'react-router';
import { getFilm } from '../data/films';
import Player from '../components/Player';
import NotFoundPage from './NotFoundPage';

export default function WatchPage() {
  const { id } = useParams();
  const film = getFilm(id);
  if (!film) return <NotFoundPage />;
  return <Player key={film.id} film={film} />;
}
