import React, { createContext, useReducer } from 'react'

export const CatContext = createContext()

const initialState = {
  breeds: [],
  loading: false,
  error: null,
  lastQuery: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_START':
      return { ...state, loading: true, error: null, breeds: [] }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        loading: false,
        breeds: action.payload,
        lastQuery: action.query
      }
    case 'SEARCH_FAIL':
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}

export function CatProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  async function search(query) {
    if (!query || !query.trim()) {
      dispatch({ type: 'SEARCH_FAIL', error: 'O campo de busca é obrigatório.' })
      return
    }

    dispatch({ type: 'SEARCH_START' })
    try {
      const res = await fetch('https://api.thecatapi.com/v1/breeds')
      if (!res.ok) throw new Error('Erro ao buscar raças (API).')
      const allBreeds = await res.json()

      const filtered = allBreeds.filter((b) =>
        (b.name + ' ' + (b.temperament || '') + ' ' + (b.description || ''))
          .toLowerCase()
          .includes(query.toLowerCase())
      )

      const withImages = await Promise.all(
        filtered.slice(0, 12).map(async (breed) => {
          try {
            const r = await fetch(
              `https://api.thecatapi.com/v1/images/search?breed_id=${breed.id}&limit=1`
            )
            if (!r.ok) return { ...breed }
            const imgs = await r.json()
            return { ...breed, image: imgs[0]?.url || null }
          } catch {
            return { ...breed }
          }
        })
      )

      if (!withImages || withImages.length === 0) {
        dispatch({
          type: 'SEARCH_FAIL',
          error: 'Nenhuma raça encontrada para a busca.'
        })
      } else {
        dispatch({ type: 'SEARCH_SUCCESS', payload: withImages, query })
      }
      } catch (err) {
      console.error('Erro no fetch:', err)
      dispatch({
        type: 'SEARCH_FAIL',
        error: err.message || 'Erro desconhecido.'
      })
    }

  }

  return (
    <CatContext.Provider value={{ state, search }}>
      {children}
    </CatContext.Provider>
  )
}