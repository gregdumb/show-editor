var helpData = [
    {
        title: "Navigation",
        content: "Scroll the mouse wheel to zoom, click & drag the wheel to pan, and click on the timeline to move the time."
    }, {
        title: "Selecting Keyframes",
        content: "Use LMB to select; drag to box-select; hold shift to preserve selection."
    }, {
        title: "Adding/Deleting Keyframes",
        content: "Use RMB to add a new keyframe."
    }, {
        title: "Manipulating Keyframes",
        content: "Hold G to grab & drag keyframes, use I to invert values, use A to align accross channels"
    }
];

function createHelpCard(t, c) {

    let newCard = $("<div/>", {
        class: "card blue-grey darken-1"
    });

    let newCardContent = $("<div/>", {
        class: "card-content white-text"
    });

    let newCardTitle = $("<span/>", {
        class: "card-title"
    }).html(t);

    let newCardParagraph = $("<p/>").html(c);

    newCardContent.append(newCardTitle);
    newCardContent.append(newCardParagraph);
    newCard.append(newCardContent);

    return newCard;
}

for (let i = 0; i < helpData.length; i++) {

    let title = helpData[i].title;
    let content = helpData[i].content;

    let newCard = createHelpCard(title, content);

    $("#help-container").append(newCard);
}