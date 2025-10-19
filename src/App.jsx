import React, { useContext } from 'react'
import { Container, Typography, Box, Grid } from '@mui/material'
import SearchForm from './components/SearchForm'
import CatCard from './components/CatCard'
import { CatContext } from './contexts/CatContext'

export default function App() {
  const { state } = useContext(CatContext)
  const { breeds, loading, error } = state

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          🐱 Explorador de Gatos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Busque por raça — validação, mensagens de erro e cards com imagem.
        </Typography>
      </Box>

      <SearchForm />

      <Box mt={4}>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {loading ? (
          <Typography align="center">Carregando...</Typography>
        ) : breeds.length === 0 ? (
          <Typography align="center" color="text.secondary">
            Nenhuma raça carregada. Faça uma busca acima.
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {breeds.map((b) => (
              <Grid item xs={12} sm={6} key={b.id}>
                <CatCard breed={b} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  )
}