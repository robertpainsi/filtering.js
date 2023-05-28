for (const startElement of document.querySelectorAll('.tabs-start')) {
    const tabs = [];
    let currentElement = startElement.nextElementSibling;

    const MODE = {
        NONE: Symbol('none'),
        HEADER: Symbol('header'),
        CONTENT: Symbol('content'),
    }

    let mode = MODE.NONE;
    let currentTab = null;
    while (currentElement && !currentElement.classList.contains('tabs-end')) {
        if (currentElement.classList.contains('tab-title')) {
            if (mode !== MODE.NONE) {
                tabs.push(currentTab);
            }
            mode = MODE.HEADER;
            currentTab = {
                header: [],
                content: [],
            }
        } else if (currentElement.classList.contains('tab-content')) {
            mode = MODE.CONTENT;
        } else {
            switch (mode) {
                case MODE.HEADER:
                    currentTab.header.push(currentElement);
                    break;
                case MODE.CONTENT:
                    currentTab.content.push(currentElement);
                    break;
            }
        }

        const tmpCurrentElement = currentElement;
        currentElement = currentElement.nextElementSibling;
        tmpCurrentElement.remove();
    }
    if (currentTab) {
        tabs.push(currentTab);
    }

    const id = `tabs-${Math.floor(Math.random() * 1000000)}`;
    startElement.id = id;
    startElement.classList.remove('tabs-start');
    startElement.classList.add('js-tabs');
    if (currentElement && currentElement.classList.contains('tabs-end')) {
        currentElement.remove();
    }

    const tabsHeaderElement = document.createElement('ul');
    tabsHeaderElement.classList.add('js-tabs__header');
    for (const tab of tabs) {
        const tabsTitleElement = document.createElement('li');
        tabsTitleElement.classList.add('js-tabs__title');
        for (const element of tab.header) {
            tabsTitleElement.appendChild(element);
        }

        tabsTitleElement.addEventListener('click', function () {
            vanillaTabs.open(this.dataset.index);
        });

        tabsHeaderElement.appendChild(tabsTitleElement);
    }
    startElement.appendChild(tabsHeaderElement);

    for (const tab of tabs) {
        const tabsContentElement = document.createElement('div');
        tabsContentElement.classList.add('js-tabs__content');
        for (const element of tab.content) {
            tabsContentElement.appendChild(element);
        }
        startElement.appendChild(tabsContentElement);
    }

    const vanillaTabs = new Tabs({elem: id});
}
