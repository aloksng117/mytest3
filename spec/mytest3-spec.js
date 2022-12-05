'use babel';

import Mytest3 from '../lib/mytest3';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Mytest3', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('mytest3');
  });

  describe('when the mytest3:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.mytest3')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'mytest3:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.mytest3')).toExist();

        let mytest3Element = workspaceElement.querySelector('.mytest3');
        expect(mytest3Element).toExist();

        let mytest3Panel = atom.workspace.panelForItem(mytest3Element);
        expect(mytest3Panel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'mytest3:toggle');
        expect(mytest3Panel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.mytest3')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'mytest3:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let mytest3Element = workspaceElement.querySelector('.mytest3');
        expect(mytest3Element).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'mytest3:toggle');
        expect(mytest3Element).not.toBeVisible();
      });
    });
  });
});
