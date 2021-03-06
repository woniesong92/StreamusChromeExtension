﻿define(function (require) {
    'use strict';

    var PlaylistAction = require('foreground/model/playlistAction');
    var ListItemButtonView = require('foreground/view/listItemButton/listItemButtonView');
    var DeleteListItemButtonTemplate = require('text!template/listItemButton/deleteListItemButton.html');
    var DeleteIconTemplate = require('text!template/icon/deleteIcon_18.svg');

    var DeletePlaylistButtonView = ListItemButtonView.extend({
        template: _.template(DeleteListItemButtonTemplate),
        templateHelpers: {
            deleteIcon: _.template(DeleteIconTemplate)()
        },
        
        attributes: {
            title: chrome.i18n.getMessage('delete')
        },

        initialize: function () {
            this._setState();
            
            ListItemButtonView.prototype.initialize.apply(this, arguments);
            
            //  Ensure that the user isn't able to destroy the model more than once.
            this.doOnClickAction = _.once(this.doOnClickAction);
        },
        
        doOnClickAction: function () {
            var playlistAction = new PlaylistAction({
                playlist: this.model
            });

            playlistAction.deletePlaylist();
        },
        
        _setState: function () {
            var canDelete = this.model.get('canDelete');

            var title;
            if (canDelete) {
                title = chrome.i18n.getMessage('delete');
            } else {
                title = chrome.i18n.getMessage('cantDeleteLastPlaylist');
            }

            this.$el.toggleClass('is-disabled', !canDelete).attr('title', title);
        }
    });

    return DeletePlaylistButtonView;
});