import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface PaginationProps {
  page: number
  handleSetPage: (event: React.ChangeEvent<unknown>, value: number) => void
}

export default function PaginationControlled({ page, handleSetPage}: PaginationProps) {
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
          count={10} 
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