import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const ViewTask = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const getData = localStorage.getItem("taskData1");
  const data = getData ? JSON.parse(getData) : [];

  return (
    <Container maxWidth="md">
      <Typography
        variant={isSmallScreen ? 'h5' : 'h4'}
        margin="4rem 0"
        textAlign="center"
      >
        View Tasks
      </Typography>
      <TableContainer component={Paper} sx={{ maxHeight: isSmallScreen ? 300 : 400 }}>
        <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elem: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.dateOfBirth}</TableCell>
                <TableCell>{elem.gender}</TableCell>
                <TableCell>{elem.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewTask;
