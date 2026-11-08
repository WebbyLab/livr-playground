'use strict';

import React, { useEffect, useRef } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, Decoration, drawSelection } from '@codemirror/view';
import { EditorState, StateEffect, StateField } from '@codemirror/state';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { bracketMatching, indentOnInput, syntaxHighlighting, HighlightStyle } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { javascript } from '@codemirror/lang-javascript';
import { tags } from '@lezer/highlight';

// Colors come from CSS variables, so the editor follows the light and dark themes
const highlightStyle = HighlightStyle.define([
  { tag: [tags.propertyName, tags.definition(tags.propertyName)], color: 'var(--code-key)' },
  { tag: [tags.string, tags.special(tags.string)], color: 'var(--code-string)' },
  { tag: [tags.number, tags.bool, tags.null, tags.atom], color: 'var(--code-number)' },
  { tag: [tags.punctuation, tags.bracket, tags.separator], color: 'var(--code-punct)' },
  { tag: tags.comment, color: 'var(--text-muted)', fontStyle: 'italic' },
  { tag: tags.invalid, color: 'var(--danger)' }
]);

// Marks the line of a syntax error
const setErrorLine = StateEffect.define();
const errorLineField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(value, transaction) {
    let decorations = value.map(transaction.changes);
    for (const effect of transaction.effects) {
      if (effect.is(setErrorLine)) {
        const lineNumber = effect.value;
        const doc = transaction.state.doc;
        decorations = lineNumber && lineNumber <= doc.lines
          ? Decoration.set([Decoration.line({ class: 'cm-error-line' }).range(doc.line(lineNumber).from)])
          : Decoration.none;
      }
    }
    return decorations;
  },
  provide: field => EditorView.decorations.from(field)
});

function CodeEditor(props) {
  const { value, onChange, readOnly, errorLine, label } = props;
  const parentRef = useRef(null);
  const viewRef = useRef(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(function() {
    const extensions = [
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ 'aria-label': label }),
      javascript(),
      syntaxHighlighting(highlightStyle),
      errorLineField
    ];

    if (readOnly) {
      extensions.push(EditorState.readOnly.of(true), EditorView.editable.of(false));
    } else {
      extensions.push(
        lineNumbers(),
        history(),
        drawSelection(),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        highlightActiveLine(),
        EditorState.tabSize.of(2),
        keymap.of([...closeBracketsKeymap, ...defaultKeymap, ...historyKeymap, indentWithTab]),
        EditorView.updateListener.of(function(update) {
          if (update.docChanged && onChangeRef.current) {
            onChangeRef.current(update.state.doc.toString());
          }
        })
      );
    }

    const view = new EditorView({
      parent: parentRef.current,
      state: EditorState.create({ doc: value, extensions })
    });
    viewRef.current = view;
    // Line heights change when the web fonts arrive
    if (document.fonts) document.fonts.ready.then(() => view.requestMeasure());

    return function() {
      view.destroy();
    };
  }, [readOnly, label]);

  // Text set from outside (an example, the result) replaces the document
  useEffect(function() {
    const view = viewRef.current;
    if (view && value !== view.state.doc.toString()) {
      view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: value } });
    }
  }, [value]);

  useEffect(function() {
    const view = viewRef.current;
    if (view) view.dispatch({ effects: setErrorLine.of(errorLine || null) });
  }, [errorLine, value]);

  return <div className="code-editor" ref={parentRef} />;
}

export default CodeEditor;
