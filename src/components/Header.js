import { useState } from "react"
import Logo from "../ui_icons/logo.svg"
import CloseIcon from "../ui_icons/close.svg"
import HelpIcon from "../ui_icons/help.svg"

export default function Header() {
  const [showHelpModal, setShowHelpModal] = useState(false)

  const HelpModal = () => (
    <div id="modal-background" onClick={() => setShowHelpModal(false)}>
      <div id="modal" onClick={e => e.stopPropagation()}>
        <div id="modal-header">
          <img id="logo" src={Logo} alt="TED Logo" />
          <button
            id="close-modal-button"
            onClick={() => setShowHelpModal(false)}
          >
            <img src={CloseIcon} alt="Close" />
          </button>
        </div>
        <p>
          Thanks for using the TED Stage Timer — the same one designed for use
          at the TED Conference — to rehearse and time your own TED Talk!
        </p>
        <h4>Get it</h4>
        <p>
          The TED Countdown Timer is free to use, and can be accessed through
          any Web browser. Using Chrome’s Presentation Mode allows you to focus
          only on the timer. If you want to use the Timer like an app on your
          mobile device, tap on the share icon (iOS) or menu button (Android)
          and select “Add to Home Screen.”
        </p>
        <h4>Use it</h4>
        <p>
          To start the Timer, select the duration of your talk (choose any
          length up to 180 minutes). Next, press the play button to begin the
          countdown. You'll see your remaining time, as well as a progress bar
          indicating how much of your total time has elapsed. With one minute
          left, you'll see your remaining time turn yellow, and as you run out,
          the time will turn red. Feel free to pause the timer - you can either
          resume your current countdown, or return to set a new one at any time.
        </p>
        <h4>Need help?</h4>
        <p>
          If you spot a bug or just have questions, please email us at{" "}
          <a href="mailto:contact@ted.com">contact@ted.com</a>.
        </p>
      </div>
    </div>
  )

  return (
    <header>
      <img id="logo" src={Logo} alt="TED Logo" />
      <button id="help-button" onClick={() => setShowHelpModal(true)}>
        <img src={HelpIcon} alt="Help" />
      </button>
      {showHelpModal ? <HelpModal /> : null}
    </header>
  )
}
