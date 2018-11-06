/**********************************************************************************
* 
*    Copyright (C) 2017 MuK IT GmbH
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Affero General Public License as
*    published by the Free Software Foundation, either version 3 of the
*    License, or (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU Affero General Public License for more details.
*
*    You should have received a copy of the GNU Affero General Public License
*    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*
**********************************************************************************/

odoo.define('muk_web_utils.dropzone', function (require) {
"use strict";

var core = require('web.core');

var _t = core._t;
var QWeb = core.qweb;

var DropzoneMixin = {
	dropzoneClasses: 'mk_dropzone',
	dropzoneEvents: {
		'dragenter .o_form_sheet': '_dragenterDropzone',
		'dragover .o_form_sheet': '_dragoverDropzone',
		'dragleave .o_form_sheet': '_dragleaveDropzone',
		'drop .o_form_sheet': '_dropDropzone',
    },
	_checkDropzoneEvent: function(event) {
		return true;
	},
	_renderDropzone: function($dropzone) {
		this.$dropzone = $dropzone;
		this.$dropzone.dndHover().on({
            'dndHoverStart': this._hoverDropzoneEnter.bind(this),
            'dndHoverEnd': this._hoverDropzoneLeave.bind(this),
        });

	},
	_toggleDropzone: function(state) {
		this.$dropzone.toggleClass(this.dropzoneClasses, state);
	},
	_hoverDropzoneEnter: function(event) {
		if(this._checkDropzoneEvent(event)) {
	    	this._toggleDropzone(true);
	    	event.preventDefault();
			return false;
    	}
	},
	_hoverDropzoneLeave: function(event) {
    	this._toggleDropzone(false);
    	event.stopPropagation();
    	event.preventDefault();
        return false;
	},
	_handleDrag: function(event) {
	},
	_handleDrop: function(event) {
	},
	_dragenterDropzone: function(event) {
    	if(this._checkDropzoneEvent(event)) {
	    	event.preventDefault();
    	}
    },
    _dragoverDropzone: function(event) {
    	if(this._checkDropzoneEvent(event)) {
        	event.preventDefault();
    		this._handleDrag(event);
    	}
    },
    _dragleaveDropzone: function(event) {
    	if(this._checkDropzoneEvent(event)) {
	    	event.preventDefault();
    	}
    },
    _dropDropzone: function(event) {
    	if(this._checkDropzoneEvent(event)) {
        	event.preventDefault();
    		event.stopPropagation();
    		this._handleDrop(event);
    	}
    }
};

var FileDropzoneMixin = _.extend({}, DropzoneMixin, {
	dropzoneClasses: DropzoneMixin.dropzoneClasses + ' mk_dropzone_file',
	_checkDropzoneEvent: function(event) {
		return window.File && window.FileReader && window.FileList && window.Blob;
	},
	_handleDrag: function(event) {
		event.originalEvent.dataTransfer.dropEffect = 'copy';
	},
});

return {
	DropzoneMixin: DropzoneMixin,
	FileDropzoneMixin: FileDropzoneMixin,
};

});