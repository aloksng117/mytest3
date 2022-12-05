'use babel';

import Mytest3View from './mytest3-view';
import { CompositeDisposable } from 'atom';

export default {

  mytest3View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.mytest3View = new Mytest3View(state.mytest3ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.mytest3View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'mytest3:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.mytest3View.destroy();
  },

  serialize() {
    return {
      mytest3ViewState: this.mytest3View.serialize()
    };
  },

  toggle() {
    console.log('Mytest3 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
