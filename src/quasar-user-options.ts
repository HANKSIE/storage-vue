
import './styles/quasar.scss'
import lang from 'quasar/lang/zh-TW.js'
import '@quasar/extras/material-icons/material-icons.css'
import { Dialog, Notify } from 'quasar';

// To be used on app.use(Quasar, { ... })
export default {
  config: { 
    dark: true,
  },
  plugins: { Dialog, Notify },
  lang: lang
}