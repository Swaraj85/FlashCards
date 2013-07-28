﻿define(['durandal/app', 'services/selectedDeck'], function (app, deck) {

    var deckName = ko.observable(deck.deckName()),
        card = ko.observable(deck.currentCard()),
        activate = function () {
            updateCard();
        },        
        flip = function () {
            $('.card').toggleClass('flip');
        },
        updateCard = function () {
            deckName(deck.deckName());
            if ($('.card').hasClass('flip')) {
                setTimeout(function () {
                    card(deck.currentCard());
                }, 400);
            } else {
                card(deck.currentCard());
            }
            $('.card').removeClass('flip');
        },
        cardCount = ko.computed(function () {
            var current = deck.currentCardId() + 1;
            return current + " of " + deck.cardCount();
        }, this);

    app.on('updateCard').then(function () {
        updateCard();
    });

    return {
        activate: activate,
        deckName: deckName,
        card: card,
        flip: flip,
        cardCount: cardCount
    };
});