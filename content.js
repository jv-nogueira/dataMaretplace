chrome.storage.local.get(["running"], (result) => {
    if (result.running) {
      let script = document.createElement("script");
      script.src = chrome.runtime.getURL("scraper.js");
      script.onload = function () {
        this.remove();
      };
      (document.head || document.documentElement).appendChild(script);
    }
  });
  