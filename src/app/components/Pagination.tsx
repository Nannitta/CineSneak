import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface PaginationProps {
  page: number
  handleSetPage: (event: React.ChangeEvent<unknown>, value: number) => void
  maxPage: number
}

export default function PaginationControlled({ page, handleSetPage, maxPage}: PaginationProps) {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#C3C3C3',
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Pagination 
          count={maxPage} 
          page={page} 
          onChange={handleSetPage} 
          defaultPage={1}
          color='primary'
          size='small'
          variant='outlined'
          boundaryCount={2}/>
      </Stack>
    </ThemeProvider>
  );
}