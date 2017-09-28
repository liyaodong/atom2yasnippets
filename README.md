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

# Example Atom Snippet URL

- example raw snippet url https://raw.githubusercontent.com/bryceosterhaus/atom-jest-snippets/master/snippets/mock.cson
- example snippet repo https://github.com/bryceosterhaus/atom-jest-snippets
- example snippet repo https://github.com/webbushka/atom-react-snippets
- search more snippet: https://atom.io/packages/search?q=snippet

# Language support
- js-mode/js2-mode/react-mode
- other launage? will add later, contribute welcome
