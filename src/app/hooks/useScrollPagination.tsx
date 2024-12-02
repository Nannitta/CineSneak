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
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);

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

  const checkIfNeedMoreMedia = () => {
    const totalHeight = document.body.offsetHeight;
    const windowHeight = window.innerHeight;

    if (totalHeight <= windowHeight && moreMedia && !loading) {
      loadMoreMedia(page);
    }
  };

  useEffect(() => {
    const loadInitialPages = async () => {
      await loadMoreMedia(1);
      await loadMoreMedia(2);

      checkIfNeedMoreMedia();
    };

    loadInitialPages();
  }, [numberOfPages, resetOnKeywordChange]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const totalHeight = document.body.offsetHeight;

      const scrolledPercentage = scrollPosition / (totalHeight - windowHeight);

      if (scrollPosition > prevScrollPos && scrolledPercentage >= 0.01 && !loading && moreMedia) {
        loadMoreMedia(page);
      }

      setPrevScrollPos(scrollPosition);
    };

    window.addEventListener('scroll', handleScroll);

    checkIfNeedMoreMedia();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, moreMedia, page, numberOfPages, prevScrollPos]);

  return { loading, moreMedia, page };
};