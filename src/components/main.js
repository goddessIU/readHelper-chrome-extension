var iframe = document.createElement('iframe');
iframe.setAttribute('id', 'readerHelperIframe')
iframe.src = chrome.runtime.getURL("iframe.html");
iframe.style.position = 'fixed'
iframe.style.left = '10vw'
iframe.style.top = '10vw'
document.body.appendChild(iframe);