import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const base = namespace('beBase')

@Component
export default class PopupMixin extends Vue {
  @base.Action('setOpenPopup') setOpenPopup!: (data: { popupName: string; isOpen: boolean }) => void
}
