import React from 'react'
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material'

export default function CatCard({ breed }) {
  return (
    <Card>
      {breed.image ? (
        <CardMedia component="img" height="200" image={breed.image} alt={breed.name} />
      ) : (
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100'
          }}
        >
          <Typography color="text.secondary">Sem imagem</Typography>
        </Box>
      )}

      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">{breed.name}</Typography>
          <Chip label={breed.origin} size="small" />
        </Box>

        <Typography variant="body2" color="text.secondary" paragraph>
          {breed.description || 'Descrição não disponível.'}
        </Typography>

        <Typography variant="caption" display="block" gutterBottom>
          Temperamento: {breed.temperament || '—'}
        </Typography>
      </CardContent>
    </Card>
  )
}