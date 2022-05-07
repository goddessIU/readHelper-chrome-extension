var iframe = document.createElement('iframe');
iframe.setAttribute('id', 'readerHelperIframe')
iframe.src = chrome.runtime.getURL("components/iframe.html");
// iframe.src = chrome.runtime.getURL("https://www.google.com/");
// iframe.src = 'iframe.html'
iframe.style.position = 'fixed'
iframe.style.left = '10vw'
iframe.style.top = '10vw'
document.body.appendChild(iframe);