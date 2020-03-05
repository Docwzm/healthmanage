import store from '@/store'
import { ROLES } from '@/utils/enum'

export const getRolesInfo = () => {
    let info = {}
    console.log(store.state)
    switch (store.state.user.roles) {
        case ROLES.ORGAN_MANAGER:
            info = {
                role: 'organManager',
                homePage: '/organs'
            }
            break;
        case ROLES.TEAM_MANAGER:
            info = {
                role: 'teamManager',
                homePage: '/teams'
            }
            break;
        case ROLES.DOCTOR_MANAGER:
            info = {
                role: 'doctorManager',
                homePage: '/doctors'
            }
            break;
        case ROLES.DOCTOR:
            info = {
                role: 'doctor',
                homePage: '/patients'
            }
            break;
        default:
            break;
    }
    return info
}