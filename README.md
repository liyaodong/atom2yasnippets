atom2yasnippets
-----------

# Install
`npm i -g atom2yasnippets`

# Usage
1. find a folder to save your snippet, eg: `~/code/privateSnippet`
2. run command `atom2yas -url rawCSONAtomSnippetURL`, the command will convert the CSON snippet to yasnippet and save to `./dist` folder.
3. add `~/code/privateSnippet/dist` to your private snippet folder and restart your Emacs.

eg for spacemacs user: 

```
  "Set yasnippet folder to include customize snippet"
  (setq auto-completion-private-snippets-directory '(
                                                    "/Users/ydli/code/github/atom2yasnippets/dist"
                                                    ))
```

# Support language
- js-mode/js2-mode/react-mode
- other launage? will add later 
