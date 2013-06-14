app.views.modalView = Backbone.View.extend({

  tagName: 'div',
  className: 'modal_view',
  template: JST['templates/modal'],

  render: function() {

    this.$el.html(this.template({
      id : this.id
    }));

    return this;
  }

});