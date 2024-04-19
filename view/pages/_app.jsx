import { Roboto } from '@next/font/google'
import { store } from '../provider/store'
import { Provider } from 'react-redux'

import '../styles/globals.css'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
})

export default function App({ Component, pageProps }) {
  
  return (
    <main className={roboto.className}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </main>
  )
}
