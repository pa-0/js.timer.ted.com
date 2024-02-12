import Logo from "../ui_icons/logo.svg"
import Help from "./Help"
import Settings from "./Settings"

export default function Header({ settings, setSettings, modal, setModal }) {
  return (
    <header>
      <img id="logo" src={Logo} alt="TED Logo" />
      <div id="header-buttons">
        <Settings
          settings={settings}
          setSettings={setSettings}
          modal={modal}
          setModal={setModal}
        />
        <Help modal={modal} setModal={setModal} />
      </div>
    </header>
  )
}
