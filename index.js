// popup blocked
let openedWindow = null;

// window.onload = () => {
if (window.opener && window.opener !== window) {
  const code = this.getCodeFromWindowURL(window.location.href);
  window.opener.postMessage({ type: "code", code: code }, "*");
  window.close();
}
window.addEventListener("message", this.handlePostMessage);
// };

const handlePostMessage = (event) => {
  if (event.data.type === "code") {
    const { code } = event.data;
    this.getUserCredentials(code);
  }
};

const showPopup = () => {
  const clientId = "78t4lx27o45a60";
  const redirectUrl = "https://www.foundit.in/";
  const oauthUrl =
    "https://www.linkedin.com/oauth/v2/authorization?response_type=code";
  const scope = "r_liteprofile%20r_emailaddress";
  const state = "monsterLinkedIn";
  // const { clientId; redirectUrl, oauthUrl, scope, state } = LinkedInApi;
  const url = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;
  const width = 450,
    height = 730,
    left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2;
  openedWindow = window.open(
    url,
    "Linkedin",
    "menubar=no,resizable=no,scrollbars=no,status=no, width=" +
      width +
      ", height=" +
      height +
      ", top=" +
      top +
      ", left=" +
      left
  );
  trackOpener();
};

const trackOpener = () => {
  debugger;
  console.log("openedWindow", openedWindow);
  if (openedWindow) {
    const code = this.getCodeFromWindowURL(openedWindow.location.href);
    if (!code) {
      setTimeout(trackOpener, 2000);
    } else {
      openedWindow.opener.postMessage({ type: "code", code: code }, "*");
      openedWindow.close();
    }
  } else {
    setTimeout(trackOpener, 2000);
  }
};

const getUserCredentials = (data) => {
  console.log(data);
};

const getCodeFromWindowURL = (url) => {
    const popupWindowURL = new URL(url);
    return popupWindowURL.searchParams.get("code");
  };
