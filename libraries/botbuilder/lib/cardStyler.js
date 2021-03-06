"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module botbuilder
 */
/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const botbuilder_schema_1 = require("botbuilder-schema");
/**
 * A set of utility functions designed to assist with the formatting of the various card types a
 * bot can return. All of these functions return an `Attachment` which can be added to an `Activity`
 * directly or passed as input to a `MessageStyler` function.
 *
 * **Usage Example**
 *
 * ```js
 * const card = CardStyler.heroCard(
 *      'White T-Shirt',
 *      ['https://example.com/whiteShirt.jpg'],
 *      ['buy']
 * );
 * ```
 */
class CardStyler {
    /**
     * Returns an attachment for an adaptive card. The attachment will contain the card and the
     * appropriate `contentType`.
     *
     * Adaptive Cards are a new way for bots to send interactive and immersive card content to
     * users. For channels that don't yet support Adaptive Cards natively, the Bot Framework will
     * down render the card to an image that's been styled to look good on the target channel. For
     * channels that support [hero cards](#herocards) you can continue to include Adaptive Card
     * actions and they will be sent as buttons along with the rendered version of the card.
     *
     * For more information about Adaptive Cards and to download the latest SDK, visit
     * [adaptivecards.io](http://adaptivecards.io/).
     *
     * @param card The adaptive card to return as an attachment.
     */
    static adaptiveCard(card) {
        return { contentType: CardStyler.contentTypes.adaptiveCard, content: card };
    }
    /**
     * Returns an attachment for an animation card.
     *
     * @param title The cards title.
     * @param media Media URL's for the card.
     * @param buttons (Optional) set of buttons to include on the card.
     * @param other (Optional) additional properties to include on the card.
     */
    static animationCard(title, media, buttons, other) {
        return mediaCard(CardStyler.contentTypes.animationCard, title, media, buttons, other);
    }
    /**
     * Returns an attachment for an audio card.
     *
     * @param title The cards title.
     * @param media Media URL's for the card.
     * @param buttons (Optional) set of buttons to include on the card.
     * @param other (Optional) additional properties to include on the card.
     */
    static audioCard(title, media, buttons, other) {
        return mediaCard(CardStyler.contentTypes.audioCard, title, media, buttons, other);
    }
    static heroCard(title, text, images, buttons, other) {
        const a = CardStyler.thumbnailCard(title, text, images, buttons, other);
        a.contentType = CardStyler.contentTypes.heroCard;
        return a;
    }
    /**
     * Returns an attachment for a receipt card. The attachment will contain the card and the
     * appropriate `contentType`.
     *
     * @param card The adaptive card to return as an attachment.
     */
    static receiptCard(card) {
        return { contentType: CardStyler.contentTypes.receiptCard, content: card };
    }
    /**
     * Returns an attachment for a signin card. For channels that don't natively support signin
     * cards an alternative message will be rendered.
     *
     * @param title The cards title.
     * @param url The link to the signin page the user needs to visit.
     * @param text (Optional) additional text to include on the card.
     */
    static signinCard(title, url, text) {
        const card = { buttons: [{ type: botbuilder_schema_1.ActionTypes.Signin, title: title, value: url }] };
        if (text) {
            card.text = text;
        }
        return { contentType: CardStyler.contentTypes.signinCard, content: card };
    }
    static thumbnailCard(title, text, images, buttons, other) {
        if (typeof text !== 'string') {
            other = buttons;
            buttons = images;
            images = text;
            text = undefined;
        }
        const card = Object.assign({}, other);
        if (title) {
            card.title = title;
        }
        if (text) {
            card.text = text;
        }
        if (images) {
            card.images = CardStyler.images(images);
        }
        if (buttons) {
            card.buttons = CardStyler.actions(buttons);
        }
        return { contentType: CardStyler.contentTypes.thumbnailCard, content: card };
    }
    /**
     * Returns an attachment for a video card.
     *
     * @param title The cards title.
     * @param media Media URL's for the card.
     * @param buttons (Optional) set of buttons to include on the card.
     * @param other (Optional) additional properties to include on the card.
     */
    static videoCard(title, media, buttons, other) {
        return mediaCard(CardStyler.contentTypes.videoCard, title, media, buttons, other);
    }
    /**
     * Returns a properly formatted array of actions. Supports converting strings to `messageBack`
     * actions (note: using 'imBack' for now as 'messageBack' doesn't work properly in emulator.)
     *
     * @param actions Array of card actions or strings. Strings will be converted to `messageBack` actions.
     */
    static actions(actions) {
        const list = [];
        (actions || []).forEach((a) => {
            if (typeof a === 'object') {
                list.push(a);
            }
            else {
                list.push({ type: botbuilder_schema_1.ActionTypes.ImBack, value: a.toString(), title: a.toString() });
            }
        });
        return list;
    }
    /**
     * Returns a properly formatted array of card images.
     *
     * @param images Array of card images or strings. Strings will be converted to card images.
     */
    static images(images) {
        const list = [];
        (images || []).forEach((img) => {
            if (typeof img === 'object') {
                list.push(img);
            }
            else {
                list.push({ url: img });
            }
        });
        return list;
    }
    /**
     * Returns a properly formatted array of media url objects.
     *
     * @param links Array of media url objects or strings. Strings will be converted to a media url object.
     */
    static media(links) {
        const list = [];
        (links || []).forEach((lnk) => {
            if (typeof lnk === 'object') {
                list.push(lnk);
            }
            else {
                list.push({ url: lnk });
            }
        });
        return list;
    }
}
/** List of content types for each card style. */
CardStyler.contentTypes = {
    adaptiveCard: 'application/vnd.microsoft.card.adaptive',
    animationCard: 'application/vnd.microsoft.card.animation',
    audioCard: 'application/vnd.microsoft.card.audio',
    heroCard: 'application/vnd.microsoft.card.hero',
    receiptCard: 'application/vnd.microsoft.card.receipt',
    signinCard: 'application/vnd.microsoft.card.signin',
    thumbnailCard: 'application/vnd.microsoft.card.thumbnail',
    videoCard: 'application/vnd.microsoft.card.video'
};
exports.CardStyler = CardStyler;
function mediaCard(contentType, title, media, buttons, other) {
    const card = Object.assign({}, other);
    if (title) {
        card.title = title;
    }
    if (media) {
        card.media = CardStyler.media(media);
    }
    if (buttons) {
        card.buttons = CardStyler.actions(buttons);
    }
    return { contentType: contentType, content: card };
}
//# sourceMappingURL=cardStyler.js.map