import {atom,selector} from 'recoil'
import axios from 'axios'

export const userAtom=atom({
   key:'userAtom',
   default:{
    success:false
   }
})