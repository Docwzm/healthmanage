import store from '@/store'
import { ROLES } from '@/utils/enum'

export const getRolesInfo = () => {
    let info = {}
    switch (store.state.user.roles) {
        case ROLES.ORGAN_MANAGER:
            info = {
                role: 'organManager',
                homePage: '/organs',
                title:'机构'
            }
            break;
        case ROLES.TEAM_MANAGER:
            info = {
                role: 'teamManager',
                homePage: '/teams',
                title:'团队'
            }
            break;
        case ROLES.DOCTOR_MANAGER:
            info = {
                role: 'doctorManager',
                homePage: '/doctors',
                title:'医生'
            }
            break;
        case ROLES.DOCTOR:
            info = {
                role: 'doctor',
                homePage: '/patients',
                title:'患者'
            }
            break;
        default:
            break;
    }
    return info
}