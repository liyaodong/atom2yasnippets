#! /usr/bin/env node

const args = require('args');
const path = require('path');
const cson = require('cson');
const fs = require('fs-extra');
const fetch = require('isomorphic-fetch');

args
    .option('url', 'the cson project file you want to convert')
    .option('output', 'output dir for your yasnippet files');

const flags = args.parse(process.argv);

const OUTPUT = flags.output || path.resolve('./dist');

const fetchCSONFile = url => {
    return fetch(url).then(res => {
        if (res.ok) {
            return res.text();
        } else {
            return new Promise.reject(res.statusText);
        }
    });
};

const parseCSON = text => {
    const result = cson.parse(text);

    if(result instanceof Error) {
        console.log('erron when parse ', flags.url, ' as CSON file');
        throw Error(result);
    } else {
        return result;
    }
}

const fileTypeToMode = type => ({
    js: 'js-mode',
})[type]

const snippetRulesConvert = (name, content) => {
    const key = content.prefix.replace(/^_/, '');
    const result = `
# -*- mode: snippet; require-final-newline: nil -*-
# name: ${name}
# key: ${key}
# --
${content.body}
    `;

    return { name: key, content: result };
};

const generateYasnippet = data => {
    const typeName = Object.keys(data)[0];
    const supportFileTypes = typeName.split(',');
    const mode = supportFileTypes.reduce((modeName, fileType) => {
        const fileTypeSplited = fileType.split('.');
        const extensionName = fileTypeSplited[fileTypeSplited.length - 1];
        const currentMode = fileTypeToMode(extensionName);
        return typeof currentMode === 'string' ? currentMode : modeName;
    }, '');

    const rules = data[typeName]
    const files = Object.keys(rules).map(name => snippetRulesConvert(name, rules[name]));

    return {
        dir: path.join(OUTPUT, mode),
        files
    };
};

const saveToDist = ({ dir, files }) => {
    const writeFiles = files.map(({ name, content }) => {
        return fs.outputFile(path.join(dir, name), content);
    });

    Promise.all(writeFiles).then(() => console.log(`writed ${files.length} files to ${dir}`));
};

const main = () => {
    if (flags.url) {
        fetchCSONFile(flags.url)
            .then(parseCSON)
            .then(generateYasnippet)
            .then(saveToDist);
    }
};

main();
