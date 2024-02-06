import { useState } from "react"
import { colors } from "../helpers/colors"
import SettingsIcon from "../ui_icons/settings.svg"
import CloseIcon from "../ui_icons/close.svg"

export default function Settings({
  alwaysShowSeconds,
  setAlwaysShowSeconds,
  useAccessibleColors,
  setUseAccessibleColors
}) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const SettingsModal = () => (
    <div id="modal-background" onClick={() => setShowSettingsModal(false)}>
      <div id="modal" onClick={e => e.stopPropagation()}>
        <div id="modal-header">
          <h2>Settings</h2>
          <button
            id="close-modal-button"
            onClick={() => setShowSettingsModal(false)}
          >
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <Toggle
          label="Always show seconds"
          caption="Turn this on to always display both minutes and seconds remaining.
          We'll always show remaining seconds in the final minute."
          isOn={alwaysShowSeconds}
          onClick={() => setAlwaysShowSeconds(!alwaysShowSeconds)}
        />
        <Toggle
          label="Use accessible colors"
          caption="Turn this on to replace yellow with blue, and red with orange for better accessibility."
          isOn={useAccessibleColors}
          onClick={() => setUseAccessibleColors(!useAccessibleColors)}
        />
      </div>
    </div>
  )

  const Toggle = ({ label, caption, isOn, onClick }) => (
    <div className="toggle-wrapper">
      <div
        className="toggle"
        onClick={onClick}
        style={isOn ? { background: colors.success } : null}
      >
        <div className={`toggle-handle ${isOn ? "on" : "off"}`} />
      </div>
      <div>
        <label>{label}</label>
        {caption && <p>{caption}</p>}
      </div>
    </div>
  )

  return (
    <div id="settings">
      <button id="settings-button" onClick={() => setShowSettingsModal(true)}>
        <img src={SettingsIcon} alt="Settings" />
      </button>
      {showSettingsModal ? <SettingsModal /> : null}
    </div>
  )
}
