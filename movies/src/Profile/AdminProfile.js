import React, { Fragment, useEffect, useState } from 'react'
import { getAdmin } from '../api-helpers/api-helpers'
import { Box, Typography, ListItem, List, ListItemText } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AdminProfile = () => {
  const [admin, setAdmin] = useState();
  useEffect(() => {

    getAdmin()
      .then((res) => setAdmin(res.Admin))
      .catch(err => console.log(err));

  }, []);

  return <Box width={"100%"} display="flex" >
    <Fragment>
      {" "}
      {admin && (
        <Box
          flexDirection={'column'}
          width={"30"}
          justifyContent="center"
          alignItems={"center"}
          padding={3}
        >
          <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: 'center', ml: 2 }} />
          <Typography
            padding={1}
            width={"auto"}
            textAlign={'center'}
            border={'1px solid #ccc'}
            borderRadius={6}
          >Email:{admin.email}
          </Typography>

        </Box>
      )}
      {admin && admin.addedMovies.length > 0 && (
        < Box width={"70%"}
          display="flex"
          flex-direction={"column"}
        >
          <Typography variant='h3' fontFamily={'verdana'} textAlign="center"
            padding={2}
          >
            Added Movies
          </Typography>
          <Box margin={'auto'}
            display="flex"
            flexDirection={'column'}
            width="80%"
          ></Box>
          <List>
            {admin.addedMovies.map((movie, index) => (
              <ListItem
                sx={{
                  bgcolor: "#000d386",
                  color: "white",
                  textAlign: "center",
                  margin: 1,
                }}
              >
                <ListItemText sx={{
                  margin: 1,
                  width: 'auto',
                  textAlign: "left"
                }}
                >
                  Movie: {movie.title}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Fragment >
  </Box >
}

export default AdminProfile