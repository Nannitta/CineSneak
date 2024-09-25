import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface PaginationProps {
  page: number
  handleSetPage: (event: React.ChangeEvent<unknown>, value: number) => void
  maxPage: number
}

const PaginationControlled = ({ page, handleSetPage, maxPage}: PaginationProps) => {
  
  if(maxPage > 10) {
    maxPage = 10;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      }
    }
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
          boundaryCount={2}
          sx={{
            '& .Mui-selected': {
              backgroundColor: 'transparent',
              color: '#ffffff',
            },
            '& .MuiPaginationItem-root': {
              color: '#c3c3c3',
            },
            '& .MuiPaginationItem-root:hover': {
              color: '#ffffff',
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default PaginationControlled;