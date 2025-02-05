import { Genre } from '@/types/types';

interface ListGenresProps {
  handleGenreClick: (id: number, name: string) => void
  listGenres: Genre[]
  selectedGenreId: number
}

const ListGenres = ({ handleGenreClick, listGenres, selectedGenreId }: ListGenresProps) => {
  return(
    <ul className="flex flex-wrap gap-4 px-4 *:flex *:items-center *:flex-none *:px-4 *:py-2 *:rounded-3xl *:border-2 *:border-white *:cursor-pointer lg:px-6 lg:flex-wrap" data-test='genresList'>
      {listGenres.map((genre) => {
        const isSelected = genre.id === selectedGenreId;
        return (
          <li
            key={genre.id}
            className={`cursor-pointer px-4 py-2 rounded-3xl border-2 border-white ${
              isSelected
                ? 'bg-white text-black'
                : 'hover:bg-white hover:text-black'
            }`}
            onClick={() => handleGenreClick(genre.id, genre.name)}
          >
            {genre.name}
          </li>
        );
      })}
    </ul>
  );
};

export default ListGenres;