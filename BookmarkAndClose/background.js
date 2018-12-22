chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { schemes: ['https','http','chrome','<all_urls>']},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });