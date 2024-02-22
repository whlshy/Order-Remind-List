import React from "react"
import ReactDOM from 'react-dom/client'
import App from "./components/App"
import './styles/main.styl'
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from "react-router-dom"
import useSnackbarStore from "./store/snackbar"

const Index = () => {
  const { setSnackMsg } = useSnackbarStore(state => state)

  const onError = (error, variables, context) => {
    console.log('onError', error, variables)
    // setSnackMsg({ message: "API發生未知錯誤" })
  }

  const onSuccess = (data) => {
  }

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onSuccess,
      onError
    }),
    mutationCache: new MutationCache({
      onSuccess,
      onError
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
        select: (data) => {
          return data?.body || data
        }
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(<Index />)
