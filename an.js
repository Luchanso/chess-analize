const data = require('./BeepBeepImAJeep.json');

data.forEach((page) => {
    JSON.parse(page).currentPageResults.forEach(function(element) {
        if (element.opening && element.opening.eco === 'A00') console.log(element.opening, element.id)
    }, this);
})