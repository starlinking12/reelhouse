export default function Footer() {
  return (
    <footer className="mx-auto mt-20 max-w-[1600px] border-t border-white/5 px-5 py-10 text-sm text-white/45 sm:px-10">
      <p className="font-display text-2xl text-white/80">Reelhouse</p>
      <p className="mt-2 max-w-2xl leading-relaxed">
        All films are in the public domain or under open licences. Sources in the README. Classic features stream from
        the Internet Archive. Open movies by the Blender Foundation, shared under Creative Commons Attribution.
      </p>
      <p className="mt-4">
        <a
          href="https://github.com/starlinking12/reelhouse#film-sources-and-licences"
          target="_blank"
          rel="noreferrer"
          className="text-white/70 underline-offset-4 hover:text-white hover:underline"
        >
          Film sources and licences
        </a>
      </p>
    </footer>
  );
}
