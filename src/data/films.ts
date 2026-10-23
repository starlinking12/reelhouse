export type Genre = 'horror' | 'noir' | 'comedy' | 'scifi' | 'silent' | 'animation' | 'short';

export interface Film {
  /** URL-safe id, also the route segment (/watch/:id) */
  id: string;
  title: string;
  year: number;
  director: string;
  genres: Genre[];
  /** Length in seconds, measured from the video file */
  runtime: number;
  synopsis: string;
  /** Direct MP4 (H.264 + AAC) on the legal host */
  video: string;
  /** 1280x720 frame grabbed from the film */
  still: string;
  /** 640x360 version of the same frame for cards */
  stillSmall: string;
  /** Where the hero preview starts, in seconds */
  previewStart: number;
  /** Page for the source item (licence and file list) */
  source: string;
  /** Plain language licence basis */
  license: string;
  licenseUrl: string;
  /** True when the source video is 720p or higher */
  hd: boolean;
  /** Shown in the rotating hero */
  featured: boolean;
}

export const films: Film[] = [
  {
      "id": "night-of-the-living-dead",
      "title": "Night of the Living Dead",
      "year": 1968,
      "director": "George A. Romero",
      "genres": [
          "horror"
      ],
      "runtime": 5732,
      "synopsis": "Strangers barricade themselves inside a Pennsylvania farmhouse as the dead rise and close in. The low budget film that invented the modern zombie.",
      "video": "https://archive.org/download/night_of_the_living_dead_dvd/Night.mp4",
      "still": "/stills/night-of-the-living-dead.jpg",
      "stillSmall": "/stills/night-of-the-living-dead-sm.jpg",
      "previewStart": 3783,
      "source": "https://archive.org/details/night_of_the_living_dead_dvd",
      "license": "Public domain. Released in 1968 without a copyright notice.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": true,
      "hd": false
  },
  {
      "id": "nosferatu",
      "title": "Nosferatu",
      "year": 1922,
      "director": "F. W. Murnau",
      "genres": [
          "horror",
          "silent"
      ],
      "runtime": 4752,
      "synopsis": "A young estate agent travels to the castle of Count Orlok, who follows him home on a ship full of rats and plague.",
      "video": "https://archive.org/download/nosferatu-1922_202504/Nosferatu%20%281922%29.mp4",
      "still": "/stills/nosferatu.jpg",
      "stillSmall": "/stills/nosferatu-sm.jpg",
      "previewStart": 2375,
      "source": "https://archive.org/details/nosferatu-1922_202504",
      "license": "Public domain in the US. Released in 1922.",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "caligari",
      "title": "The Cabinet of Dr. Caligari",
      "year": 1920,
      "director": "Robert Wiene",
      "genres": [
          "horror",
          "silent"
      ],
      "runtime": 3061,
      "synopsis": "A sinister showman and his sleepwalker are suspected of a string of murders in a town of crooked, painted streets.",
      "video": "https://archive.org/download/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari/The_Cabinet_of_Dr._Caligari_512kb.mp4",
      "still": "/stills/caligari.jpg",
      "stillSmall": "/stills/caligari-sm.jpg",
      "previewStart": 1530,
      "source": "https://archive.org/details/DasKabinettdesDoktorCaligariTheCabinetofDrCaligari",
      "license": "Public domain in the US. Released in 1920.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "carnival-of-souls",
      "title": "Carnival of Souls",
      "year": 1962,
      "director": "Herk Harvey",
      "genres": [
          "horror"
      ],
      "runtime": 4980,
      "synopsis": "After surviving a car crash, a church organist is drawn to an abandoned lakeside pavilion and the pale figures waiting there.",
      "video": "https://archive.org/download/CarnivalofSouls/CarnivalOfSouls.mp4",
      "still": "/stills/carnival-of-souls.jpg",
      "stillSmall": "/stills/carnival-of-souls-sm.jpg",
      "previewStart": 3286,
      "source": "https://archive.org/details/CarnivalofSouls",
      "license": "Public domain. Released in 1962 without a copyright notice.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "house-on-haunted-hill",
      "title": "House on Haunted Hill",
      "year": 1959,
      "director": "William Castle",
      "genres": [
          "horror"
      ],
      "runtime": 4483,
      "synopsis": "A millionaire offers five strangers ten thousand dollars each to survive one night in a mansion with a murderous past. Starring Vincent Price.",
      "video": "https://archive.org/download/The_House_On_Haunted_Hill/The_House_On_Haunted_Hill.mp4",
      "still": "/stills/house-on-haunted-hill.jpg",
      "stillSmall": "/stills/house-on-haunted-hill-sm.jpg",
      "previewStart": 806,
      "source": "https://archive.org/details/The_House_On_Haunted_Hill",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "last-man-on-earth",
      "title": "The Last Man on Earth",
      "year": 1964,
      "director": "Ubaldo Ragona, Sidney Salkow",
      "genres": [
          "horror",
          "scifi"
      ],
      "runtime": 5206,
      "synopsis": "Vincent Price is the only survivor of a plague that turned everyone else into vampires. By day he hunts. By night he hides.",
      "video": "https://archive.org/download/the-last-man-on-earth-1964_20251031/The%20Last%20Man%20on%20Earth%20-%201964/The%20Last%20Man%20on%20Earth%20-%201964.mp4",
      "still": "/stills/last-man-on-earth.jpg",
      "stillSmall": "/stills/last-man-on-earth-sm.jpg",
      "previewStart": 2602,
      "source": "https://archive.org/details/the-last-man-on-earth-1964_20251031",
      "license": "Public domain. Released in 1964 without a valid copyright notice.",
      "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
      "featured": false,
      "hd": true
  },
  {
      "id": "detour",
      "title": "Detour",
      "year": 1945,
      "director": "Edgar G. Ulmer",
      "genres": [
          "noir"
      ],
      "runtime": 4058,
      "synopsis": "A nightclub pianist hitchhikes across the country to reach the woman he loves, and one bad decision leads to the next.",
      "video": "https://archive.org/download/Detour/Detour.mp4",
      "still": "/stills/detour.jpg",
      "stillSmall": "/stills/detour-sm.jpg",
      "previewStart": 1339,
      "source": "https://archive.org/details/Detour",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "scarlet-street",
      "title": "Scarlet Street",
      "year": 1945,
      "director": "Fritz Lang",
      "genres": [
          "noir"
      ],
      "runtime": 6086,
      "synopsis": "A lonely cashier who paints on Sundays falls for a woman who, with her ruthless boyfriend, plans to take him for everything.",
      "video": "https://archive.org/download/ScarletStreet/Scarlet_Street.mp4",
      "still": "/stills/scarlet-street.jpg",
      "stillSmall": "/stills/scarlet-street-sm.jpg",
      "previewStart": 2008,
      "source": "https://archive.org/details/ScarletStreet",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "the-stranger",
      "title": "The Stranger",
      "year": 1946,
      "director": "Orson Welles",
      "genres": [
          "noir"
      ],
      "runtime": 5473,
      "synopsis": "A war crimes investigator hunts a Nazi fugitive who is hiding in plain sight as a teacher in a quiet Connecticut town.",
      "video": "https://archive.org/download/TheStranger_0/The_Stranger.mp4",
      "still": "/stills/the-stranger.jpg",
      "stillSmall": "/stills/the-stranger-sm.jpg",
      "previewStart": 2736,
      "source": "https://archive.org/details/TheStranger_0",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "doa",
      "title": "D.O.A.",
      "year": 1949,
      "director": "Rudolph Maté",
      "genres": [
          "noir"
      ],
      "runtime": 5004,
      "synopsis": "A man walks into a police station to report a murder. His own. He has been poisoned and has only days to find out who did it.",
      "video": "https://archive.org/download/d.-o.-a.-1950/D.O.A.%20%281949%29.mp4",
      "still": "/stills/doa.jpg",
      "stillSmall": "/stills/doa-sm.jpg",
      "previewStart": 900,
      "source": "https://archive.org/details/d.-o.-a.-1950",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": true
  },
  {
      "id": "charade",
      "title": "Charade",
      "year": 1963,
      "director": "Stanley Donen",
      "genres": [
          "noir",
          "comedy"
      ],
      "runtime": 6785,
      "synopsis": "After her husband is murdered, a woman in Paris is chased by men who want his stolen fortune, and helped by a charming stranger she cannot quite trust. Cary Grant and Audrey Hepburn.",
      "video": "https://archive.org/download/charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie/Charade_READY.mp4",
      "still": "/stills/charade.jpg",
      "stillSmall": "/stills/charade-sm.jpg",
      "previewStart": 4478,
      "source": "https://archive.org/details/charade-1963-cary-grant-audrey-hepburn-comedy-mystery-romance-thriller-full-movie",
      "license": "Public domain. Released in 1963 without a valid copyright notice.",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
      "featured": true,
      "hd": true
  },
  {
      "id": "his-girl-friday",
      "title": "His Girl Friday",
      "year": 1940,
      "director": "Howard Hawks",
      "genres": [
          "comedy"
      ],
      "runtime": 5505,
      "synopsis": "A fast talking newspaper editor schemes to stop his star reporter, who is also his ex wife, from remarrying by handing her the story of the year.",
      "video": "https://archive.org/download/his_girl_friday/his_girl_friday.mp4",
      "still": "/stills/his-girl-friday.jpg",
      "stillSmall": "/stills/his-girl-friday-sm.jpg",
      "previewStart": 990,
      "source": "https://archive.org/details/his_girl_friday",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "little-shop-of-horrors",
      "title": "The Little Shop of Horrors",
      "year": 1960,
      "director": "Roger Corman",
      "genres": [
          "comedy",
          "horror"
      ],
      "runtime": 4386,
      "synopsis": "A clumsy young florist grows a strange plant that talks, sings, and only eats one thing: people.",
      "video": "https://archive.org/download/The.Little.Shop.of.Horrors.60/The.Little.Shop.of.Horrors.60.mp4",
      "still": "/stills/little-shop-of-horrors.jpg",
      "stillSmall": "/stills/little-shop-of-horrors-sm.jpg",
      "previewStart": 789,
      "source": "https://archive.org/details/The.Little.Shop.of.Horrors.60",
      "license": "Public domain. Released in 1960 without a copyright notice.",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "sherlock-jr",
      "title": "Sherlock Jr.",
      "year": 1924,
      "director": "Buster Keaton",
      "genres": [
          "comedy",
          "silent"
      ],
      "runtime": 2674,
      "synopsis": "A small town projectionist who dreams of being a great detective falls asleep at work and walks right into the movie on the screen.",
      "video": "https://archive.org/download/sherlockjr1924_201909/Sherlock%20Jr.%20-%20Buster%20Keaton%20%281924%29%20HD%20%5B720p%5D.mp4",
      "still": "/stills/sherlock-jr.jpg",
      "stillSmall": "/stills/sherlock-jr-sm.jpg",
      "previewStart": 481,
      "source": "https://archive.org/details/sherlockjr1924_201909",
      "license": "Public domain in the US. Released in 1924.",
      "licenseUrl": "http://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": true
  },
  {
      "id": "the-general",
      "title": "The General",
      "year": 1926,
      "director": "Buster Keaton, Clyde Bruckman",
      "genres": [
          "comedy",
          "silent"
      ],
      "runtime": 4724,
      "synopsis": "A train engineer chases his stolen locomotive, and the woman he loves, deep behind enemy lines. This copy has no soundtrack.",
      "video": "https://archive.org/download/The_General_Buster_Keaton/The_General.mp4",
      "still": "/stills/the-general.jpg",
      "stillSmall": "/stills/the-general-sm.jpg",
      "previewStart": 850,
      "source": "https://archive.org/details/The_General_Buster_Keaton",
      "license": "Public domain in the US. Released in 1926.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "safety-last",
      "title": "Safety Last!",
      "year": 1923,
      "director": "Fred C. Newmeyer, Sam Taylor",
      "genres": [
          "comedy",
          "silent"
      ],
      "runtime": 4433,
      "synopsis": "To impress his girlfriend, a shop clerk agrees to climb the outside of a twelve storey department store. Harold Lloyd and the famous clock.",
      "video": "https://archive.org/download/safety-last-final_202506/Safety%20Last%21%20Final.mp4",
      "still": "/stills/safety-last.jpg",
      "stillSmall": "/stills/safety-last-sm.jpg",
      "previewStart": 2925,
      "source": "https://archive.org/details/safety-last-final_202506",
      "license": "Public domain in the US. Released in 1923.",
      "licenseUrl": "https://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "plan-9",
      "title": "Plan 9 from Outer Space",
      "year": 1959,
      "director": "Edward D. Wood Jr.",
      "genres": [
          "scifi"
      ],
      "runtime": 4747,
      "synopsis": "Aliens raise the dead to stop humanity from building a doomsday weapon. Often called the best worst movie ever made.",
      "video": "https://archive.org/download/plan-9-from-outer-space_202009/Plan%209%20from%20Outer%20Space.mp4",
      "still": "/stills/plan-9.jpg",
      "stillSmall": "/stills/plan-9-sm.jpg",
      "previewStart": 1566,
      "source": "https://archive.org/details/plan-9-from-outer-space_202009",
      "license": "Public domain. The copyright was not renewed.",
      "licenseUrl": "http://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": true
  },
  {
      "id": "teenagers-from-outer-space",
      "title": "Teenagers from Outer Space",
      "year": 1959,
      "director": "Tom Graeff",
      "genres": [
          "scifi"
      ],
      "runtime": 5129,
      "synopsis": "A young alien turns against his crew when they plan to use Earth as a ranch for their giant monsters.",
      "video": "https://archive.org/download/teenagers_from_outerspace/Teenagers_from_Outer_Space.mp4",
      "still": "/stills/teenagers-from-outer-space.jpg",
      "stillSmall": "/stills/teenagers-from-outer-space-sm.jpg",
      "previewStart": 1692,
      "source": "https://archive.org/details/teenagers_from_outerspace",
      "license": "Public domain. Released in 1959 without a valid copyright notice.",
      "licenseUrl": "http://creativecommons.org/licenses/publicdomain/",
      "featured": false,
      "hd": false
  },
  {
      "id": "trip-to-the-moon",
      "title": "A Trip to the Moon",
      "year": 1902,
      "director": "Georges Méliès",
      "genres": [
          "scifi",
          "silent",
          "short"
      ],
      "runtime": 932,
      "synopsis": "A group of astronomers fire a capsule into the eye of the Moon in the most famous image of early cinema.",
      "video": "https://archive.org/download/le-voyage-dans-la-lune-1902-georges-melies/Le%20Voyage%20Dans%20La%20Lune%20-%20%281902%29%20-%20Georges%20M%C3%A9li%C3%A8s.mp4",
      "still": "/stills/trip-to-the-moon.jpg",
      "stillSmall": "/stills/trip-to-the-moon-sm.jpg",
      "previewStart": 465,
      "source": "https://archive.org/details/le-voyage-dans-la-lune-1902-georges-melies",
      "license": "Public domain. Released in 1902.",
      "licenseUrl": "http://creativecommons.org/publicdomain/mark/1.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "big-buck-bunny",
      "title": "Big Buck Bunny",
      "year": 2008,
      "director": "Sacha Goedegebure",
      "genres": [
          "animation",
          "short"
      ],
      "runtime": 597,
      "synopsis": "A gentle giant of a rabbit has had enough of three bullying rodents, and plans a very creative revenge.",
      "video": "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4",
      "still": "/stills/big-buck-bunny.jpg",
      "stillSmall": "/stills/big-buck-bunny-sm.jpg",
      "previewStart": 107,
      "source": "https://archive.org/details/BigBuckBunny_124",
      "license": "CC BY 3.0. Blender Foundation, peach.blender.org",
      "licenseUrl": "http://creativecommons.org/licenses/by/3.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "sintel",
      "title": "Sintel",
      "year": 2010,
      "director": "Colin Levy",
      "genres": [
          "animation",
          "short"
      ],
      "runtime": 888,
      "synopsis": "A lone young woman crosses a harsh world in search of the baby dragon she once rescued and raised.",
      "video": "https://archive.org/download/Sintel/sintel-2048-stereo.mp4",
      "still": "/stills/sintel.jpg",
      "stillSmall": "/stills/sintel-sm.jpg",
      "previewStart": 293,
      "source": "https://archive.org/details/Sintel",
      "license": "CC BY 3.0. Blender Foundation, durian.blender.org",
      "licenseUrl": "http://creativecommons.org/licenses/by/3.0/",
      "featured": true,
      "hd": true
  },
  {
      "id": "tears-of-steel",
      "title": "Tears of Steel",
      "year": 2012,
      "director": "Ian Hubert",
      "genres": [
          "scifi",
          "short"
      ],
      "runtime": 734,
      "synopsis": "In a future Amsterdam, a group of scientists try to save the world from robots by restaging one bad breakup.",
      "video": "https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4",
      "still": "/stills/tears-of-steel.jpg",
      "stillSmall": "/stills/tears-of-steel-sm.jpg",
      "previewStart": 242,
      "source": "https://archive.org/details/Tears-of-Steel",
      "license": "CC BY 3.0. Blender Foundation, mango.blender.org",
      "licenseUrl": "http://creativecommons.org/licenses/by/3.0/",
      "featured": false,
      "hd": false
  },
  {
      "id": "elephants-dream",
      "title": "Elephants Dream",
      "year": 2006,
      "director": "Bassam Kurdali",
      "genres": [
          "animation",
          "short"
      ],
      "runtime": 654,
      "synopsis": "Two men explore a strange, endless machine that only one of them believes in. The very first Blender open movie.",
      "video": "https://archive.org/download/ElephantsDream/ed_hd.mp4",
      "still": "/stills/elephants-dream.jpg",
      "stillSmall": "/stills/elephants-dream-sm.jpg",
      "previewStart": 215,
      "source": "https://archive.org/details/ElephantsDream",
      "license": "CC BY. Blender Foundation and Netherlands Media Art Institute, orange.blender.org",
      "licenseUrl": "http://creativecommons.org/licenses/by/3.0/us/",
      "featured": false,
      "hd": false
  },
  {
      "id": "cosmos-laundromat",
      "title": "Cosmos Laundromat",
      "year": 2015,
      "director": "Mathieu Auvray",
      "genres": [
          "animation",
          "short"
      ],
      "runtime": 731,
      "synopsis": "On a desolate island, a weary sheep named Franck meets a strange salesman who offers him the gift of a lifetime.",
      "video": "https://archive.org/download/CosmosLaundromatFirstCycle/Cosmos%20Laundromat%20-%20First%20Cycle%20%281080p%29.mp4",
      "still": "/stills/cosmos-laundromat.jpg",
      "stillSmall": "/stills/cosmos-laundromat-sm.jpg",
      "previewStart": 241,
      "source": "https://archive.org/details/CosmosLaundromatFirstCycle",
      "license": "CC BY 4.0. Blender Institute, gooseberry.blender.org",
      "licenseUrl": "http://creativecommons.org/licenses/by/4.0/",
      "featured": true,
      "hd": true
  },
  {
      "id": "spring",
      "title": "Spring",
      "year": 2019,
      "director": "Andy Goralczyk",
      "genres": [
          "animation",
          "short"
      ],
      "runtime": 464,
      "synopsis": "A shepherd girl and her dog face ancient spirits to bring the cycle of life, and the spring, back to their mountain.",
      "video": "https://archive.org/download/springopenmovie/springopenmovie.mp4",
      "still": "/stills/spring.jpg",
      "stillSmall": "/stills/spring-sm.jpg",
      "previewStart": 232,
      "source": "https://archive.org/details/springopenmovie",
      "license": "CC BY 4.0. Blender Animation Studio, studio.blender.org",
      "licenseUrl": "https://creativecommons.org/licenses/by/4.0/",
      "featured": false,
      "hd": true
  },
];

export interface RowDef {
  id: string;
  title: string;
  genre: Genre;
}

export const rows: RowDef[] = [
  { id: 'horror', title: 'Horror Classics', genre: 'horror' },
  { id: 'noir', title: 'Noir and Thrillers', genre: 'noir' },
  { id: 'comedy', title: 'Comedy', genre: 'comedy' },
  { id: 'scifi', title: 'Sci-fi', genre: 'scifi' },
  { id: 'silent', title: 'The Silent Era', genre: 'silent' },
  { id: 'animation', title: 'Animated Shorts', genre: 'animation' },
];

const byId = new Map(films.map((f) => [f.id, f]));

export function getFilm(id: string | undefined): Film | undefined {
  return id ? byId.get(id) : undefined;
}

export function filmsFor(genre: Genre): Film[] {
  return films.filter((f) => f.genres.includes(genre));
}

const FEATURED_ORDER = ['charade', 'sintel', 'cosmos-laundromat', 'night-of-the-living-dead'];

/** Films for the rotating hero, in a set order (colour HD first). */
export const featuredFilms = films
  .filter((f) => f.featured)
  .sort((a, b) => FEATURED_ORDER.indexOf(a.id) - FEATURED_ORDER.indexOf(b.id));
