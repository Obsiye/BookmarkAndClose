let stash = document.getElementById('stash');
let fetch = document.getElementById('fetch');

stash.onclick =  function stashTabs(){
  chrome.tabs.query({currentWindow: true}, function(tabs) {

		// add to bookmarks bar or first bookmarks folder
		chrome.bookmarks.get('1', function(results){

			// create folder in the bookmarks bar called stashandfetch
			chrome.bookmarks.create({'parentId': results[0].id,
					'title': 'stashandfetch'
			},function(folder){
				// add all the window tabs links into the folder and remove tabs from window
				for(i = 0; i < tabs.length; i++){
					chrome.bookmarks.create({'parentId': folder.id,
						'title': tabs[i].title,
						'url': tabs[i].url
					});
					chrome.tabs.remove(tabs[i].id)
				};
			});

		});

  });
}

fetch.onclick =  function fetchTabs(){
	// search for stashandfetch folder
	// get most recent stash folder and open the links in new tabs
	// remove this stashandfetch folder
	chrome.bookmarks.search('stashandfetch', function(results){
		if (results.length != 0)	{
			let recentStash = results.pop();
			chrome.bookmarks.getChildren(recentStash.id, function (links){
				for(i = 0; i < links.length; i++){
					chrome.tabs.create({ url: links[i].url });
        }
			});
		 chrome.bookmarks.removeTree(recentStash.id);
		}
	});
}