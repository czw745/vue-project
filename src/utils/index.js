import { Message } from 'vuetify'
import router from '../router'

 export const tip = msg => {
    Message.error(msg)
 }

 export const to404Page = () => {
    router.replace({
        name: '404'
    })
}
