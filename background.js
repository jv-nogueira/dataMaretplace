chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("mercadolivre.com.br")) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["scraper.js"]
      });
    }
  });
  