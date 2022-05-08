chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const { engine, purpose, query } = request
        if (purpose === 'searchEngine') {
            if (engine === 'baidu') {
                const url = `https://www.baidu.com/s?wd=${query}`
                chrome.tabs.create({
                    url: url
                })
            } else if (engine === 'bing') {
                const url = `https://cn.bing.com/search?q=${query}`
                chrome.tabs.create({
                    url: url
                })
            } else if (engine === 'google') {
                const url = `https://www.google.com/search?q=${query}`
                chrome.tabs.create({
                    url: url
                })
            } else if (engine === 'github') {
                const url = `https://github.com/search?q=${query}`
                chrome.tabs.create({
                    url: url
                })
            }

        }
    }
);