/**
 * Listens for the app launching, then creates the window.
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
chrome.app.runtime.onLaunched.addListener(function (launchData) {
    chrome.app.window.create(
        'screens/projector.html',
        {
            id: 'projectorWindow',
            bounds: {width: 900, height: 800}
        }
    );
    chrome.app.window.create(
        'screens/dashboard.html',
        {
            id: 'dashboardWindow',
            bounds: {width: 800, height: 600}
        }
    );
});
