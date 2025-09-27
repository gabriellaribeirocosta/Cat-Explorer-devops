import React, { useState, useContext } from 'react'
import { Box, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { CatContext } from '../contexts/CatContext'

export default function SearchForm() {
  const [q, setQ] = useState('')
  const { search, state } = useContext(CatContext)
  const { loading } = state

  function handleSubmit(e) {
    e.preventDefault()
    if (!q || !q.trim()) {
      alert('Preencha o campo de busca antes de enviar.')
      return
    }
    search(q)
  }

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" gap={2} alignItems="center">
      <TextField
        label="Buscar raça (ex: Siamese, Bengal)"
        variant="outlined"
        fullWidth
        value={q}
        onChange={(e) => setQ(e.target.value)}
        disabled={loading}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </Button>
    </Box>
  )
}