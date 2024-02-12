import Logo from "../ui_icons/logo.svg"
import CloseIcon from "../ui_icons/close.svg"
import HelpIcon from "../ui_icons/help.svg"

export default function Help({ modal, setModal }) {
  const HelpModal = () => (
    <div id="modal-background" onClick={() => setModal(false)}>
      <div id="modal" onClick={e => e.stopPropagation()}>
        <div id="modal-content">
          <div id="modal-header">
            <img id="logo" src={Logo} alt="TED Logo" />
            <button id="close-modal-button" onClick={() => setModal(false)}>
              <img src={CloseIcon} alt="Close" />
            </button>
          </div>
          <p>
            Thanks for using the TED Stage Timer (the same one designed for use
            at the TED Conferences) to rehearse and time your own TED Talk!
          </p>
          <h4>How it works</h4>
          <p>
            Set the duration of your talk (up to 180 minutes). Press the play
            button to begin the countdown. You'll see your remaining time (you
            can choose to show or hide the "seconds" from settings), as well as
            a progress bar indicating how much of your total time has elapsed.
          </p>
          <p>
            With one minute left, you'll see your remaining time turn yellow,
            and as you run out, the time will turn red to let you know you're
            over time. Feel free to pause at any time - you can either resume
            your current countdown, or start over.
          </p>
          <p>
            If you want to use the Timer like an app, tap on the share icon
            (iOS) or menu button (Android) and select “Add to Home Screen.” This
            will also allow you to use it without an internet connection!
          </p>
          <h4>Looking for an old version?</h4>
          <p>
            If you want to use the previous version of the TED Stage Timer, you
            can find it at{" "}
            <a
              href="https://oldtimer.ted.com"
              target="_blank"
              rel="noopeneer noreferrer"
            >
              oldtimer.ted.com
            </a>{" "}
            until June 1, 2024.
          </p>
          <h4>Need help?</h4>
          <p>
            If you spot a bug or just have questions, please email us at{" "}
            <a href="mailto:contact@ted.com">contact@ted.com</a>.
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div id="help">
      <button
        id="help-button"
        onClick={() => setModal("help")}
        data-mixpanel-component="help-button"
      >
        <img src={HelpIcon} alt="Settings" />
      </button>
      {modal === "help" ? <HelpModal /> : null}
    </div>
  )
}
