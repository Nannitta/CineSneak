import { useEffect, useState } from 'react';

interface UseInfiniteScrollProps {
  fetchMedia: (page: number) => Promise<void>;
  numberOfPages: number | null;
  resetOnKeywordChange?: boolean;
}

export const useScrollPagination = ({ fetchMedia, numberOfPages, resetOnKeywordChange }: UseInfiniteScrollProps) => {
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [moreMedia, setMoreMedia] = useState<boolean>(true);

  const loadMoreMedia = async (pageToLoad: number) => {
    if (loading || !moreMedia) return;

    setLoading(true);
    await fetchMedia(pageToLoad);
    setLoading(false);

    if (numberOfPages && pageToLoad >= numberOfPages) {
      setMoreMedia(false);
    } else {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    const loadInitialPages = async () => {
      await loadMoreMedia(1);
      await loadMoreMedia(2);
    };

    loadInitialPages();
  }, [numberOfPages, resetOnKeywordChange]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading && moreMedia) {
        loadMoreMedia(page);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, moreMedia, page, numberOfPages]);

  return { loading, moreMedia, page };
};
