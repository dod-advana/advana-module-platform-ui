import Config from '../config/config';

export const renderDynamicFavicon = () => {
    if (Config.FAVICON_URL) {
        let faviconLink = document.querySelector("link[rel~='icon']");
        if (!faviconLink) {
            faviconLink = document.createElement('link');
            faviconLink.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(faviconLink);
        }
        faviconLink.href = Config.FAVICON_URL;
    }
}
