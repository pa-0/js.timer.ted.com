import { useState } from "react"
import SettingsIcon from "../ui_icons/settings.svg"
import CloseIcon from "../ui_icons/close.svg"

export default function Settings({ settings, setSettings }) {
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  const SettingsModal = () => (
    <div id="modal-background" onClick={() => setShowSettingsModal(false)}>
      <div id="modal" onClick={e => e.stopPropagation()}>
        <div id="modal-content">
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
            isOn={settings.alwaysShowSeconds}
            onClick={() =>
              setSettings({
                ...settings,
                alwaysShowSeconds: !settings.alwaysShowSeconds
              })
            }
          />
          <Toggle
            label="Use accessible colors"
            caption="Turn this on to use alternate shades of red, yellow and green for better accessibility."
            isOn={settings.useAccessibleColors}
            onClick={() =>
              setSettings({
                ...settings,
                useAccessibleColors: !settings.useAccessibleColors
              })
            }
          />
        </div>
      </div>
    </div>
  )

  const Toggle = ({ label, caption, isOn, onClick }) => (
    <div className="toggle-wrapper">
      <div className={`toggle ${isOn ? "on" : "off"}`} onClick={onClick}>
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
