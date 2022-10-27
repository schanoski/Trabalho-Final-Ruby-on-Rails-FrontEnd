import DrawerAppBar from '../src/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <DrawerAppBar>
    { <Component {...pageProps} /> }
    </DrawerAppBar>
}

export default MyApp
