import mixpanel from "mixpanel-browser"

const MIXPANEL_PROJECT_TOKEN =
  window.location.hostname === "timer.ted.com"
    ? "cefc84a7a812fb3bb40d6efadb6b3163"
    : "c9f0430453f71212612cf6c9809ccab1"
const MIXPANEL_PROXY_DOMAIN =
  window.location.hostname === "timer.ted.com"
    ? "https://mixpanel-proxy.ted.com"
    : "https://mixpanel-proxy.staging.ted.com"

export function initMixpanel() {
  mixpanel.init(MIXPANEL_PROJECT_TOKEN, {
    debug: false,
    api_host: MIXPANEL_PROXY_DOMAIN
  })

  mixpanel.register({
    product: "timer.ted.com",
    system_language: navigator.language || navigator.userLanguage
  })

  // Automatically track component_click events for all elements with a "mixpanel_component" data attribute
  try {
    mixpanel.track("screen_view", {
      page: window.location.pathname
    })

    window.setTimeout(function () {
      document.querySelectorAll("[data-mixpanel-component]").forEach(element =>
        element.addEventListener("click", () => {
          // "component" describes the name and function of the element, and should be as specific as possible
          // ex. home-hero-learn-more-button
          // when possible, identify the page, section, and function of the specific element
          const component = element.getAttribute("data-mixpanel-component")
          // component_id should only be used when multiple instances of a "component" exist on a page,
          // ex. a page listing multiple conferences, each which has a "learn more" button
          // in which case, the component_id should identify each instance uniquely
          const component_id =
            element.getAttribute("data-mixpanel-component-id") || undefined
          // the page is simply the pathname
          const page = window.location.pathname
          const options = {
            page: page,
            component: component,
            component_id: component_id
          }
          mixpanel.track("component_click", options)
        })
      )

      // add a function to the window object to list all tracked components,
      // with all relevant tracking info. SUPER helpful for QA.
      window.listMixpanelComponents = function () {
        console.log(
          Array.from(
            document.querySelectorAll("[data-mixpanel-component]")
          ).map(element => {
            return {
              element,
              component: element.getAttribute("data-mixpanel-component"),
              component_id: element.getAttribute("data-mixpanel-component-id")
            }
          })
        )
      }
    }, 1000) // use a 1 second timeout for page to initialize
  } catch (error) {
    console.error("Error while attaching mixpanel events to elements:", error)
  }
}
