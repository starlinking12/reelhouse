import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Row from '../components/Row';
import DetailsModal from '../components/DetailsModal';
import Footer from '../components/Footer';
import { featuredFilms, filmsFor, getFilm, rows, type Film } from '../data/films';
import { useProgressList } from '../hooks/useProgress';

export default function HomePage() {
  const [params, setParams] = useSearchParams();
  const progressList = useProgressList();
  const selected = getFilm(params.get('film') ?? undefined);

  const progressMap = useMemo(() => new Map(progressList.map((p) => [p.id, p])), [progressList]);
  const continueFilms = useMemo(
    () => progressList.map((p) => getFilm(p.id)).filter((f): f is Film => Boolean(f)),
    [progressList],
  );

  const open = (film: Film) => setParams({ film: film.id }, { preventScrollReset: true });
  const close = () => setParams({}, { preventScrollReset: true, replace: true });

  return (
    <>
      <Header />
      <main>
        <Hero films={featuredFilms} onInfo={open} />
        <div className="relative z-10 mt-2 space-y-10 sm:-mt-20 sm:space-y-12">
          {continueFilms.length > 0 && (
            <Row id="continue" title="Continue watching" films={continueFilms} progress={progressMap} onOpen={open} />
          )}
          {rows.map((r) => (
            <Row key={r.id} id={r.id} title={r.title} films={filmsFor(r.genre)} progress={progressMap} onOpen={open} />
          ))}
        </div>
      </main>
      <Footer />
      {selected && <DetailsModal key={selected.id} film={selected} onClose={close} />}
    </>
  );
}
