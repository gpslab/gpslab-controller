var FormToken = function() {
    this._token = ''; // private
    this._url = ''; // private
    this._wait = false; // private
};

FormToken.prototype.getToken = function() {
    return this._token;
};

FormToken.prototype.setUrl = function(url) {
    this._url = url;
    if (url && !this._token) {
        this.refreshToken();
    }
};

FormToken.prototype.refreshToken = function(callback) {
    if (!this._wait && this._url) {
        this._wait = true;
        var that = this;
        $.ajax({
            url: this._url,
            type: 'POST',
            dataType: 'text',
            processData: false,
            contentType: false,
            success: function (response) {
                that._token = response;
                that._wait = false;
                (callback || function () {})();
            },
            complete: function() {
                that._wait = false;
            }
        });
    }
};
