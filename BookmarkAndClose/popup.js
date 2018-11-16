let startapp = document.getElementById('startapp');

startapp.onclick =  function getTabsUrl(){
  chrome.tabs.query({currentWindow: true}, function(tabs) {
        for(i = 0; i < tabs.length; i++){
          chrome.bookmarks.create({'title': tabs[i].title,
            'url': tabs[i].url});
          chrome.tabs.remove(tabs[i].id)
        };
  });
}