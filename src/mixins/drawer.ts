import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const base = namespace('beBase')

@Component
export default class DrawerMixin extends Vue {
  @base.Action('setOpenDrawer') setOpenDrawer!: (data: { drawerName: string; isOpen: boolean }) => void
}
