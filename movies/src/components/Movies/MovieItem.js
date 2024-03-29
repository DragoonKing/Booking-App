import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const MovieItem = ({title, releaseDate, posterUrl,description , id}) => {
  return (
      <Card sx={{
          margin:5,
          width: 250,
          height: 400,
          borderRadius: 5, ":hover": {
        boxShadow: '10px 10px 20px #ccc'
    } }}>
          <img
              height={'50%'}
              width="100%"
              src={posterUrl} alt={title} />
   
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
          { new Date(releaseDate).toDateString()} ,
          {/* {description} */}
      </Typography>
    </CardContent>
    <CardActions>
    <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:'auto'}} size="small">BOOK</Button>
    </CardActions>
  </Card>
  )
}

export default MovieItem