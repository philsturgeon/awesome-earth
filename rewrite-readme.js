const fs = require('fs');
const titleCase = require('title-case');
const flag = require('country-code-emoji');
const path = require('path');
const yaml = require('js-yaml');

const linkFile = path.resolve(`./src/data/links.yaml`);
const readmeFile = path.resolve(`./README.md`);

const replaceBetween = (origin, startIndex, endIndex, insertion) => {
  return (
    origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
  );
};

const formatAsMarkdown = links => {
  const categorizedData = {};

  links.forEach(link => {
    link.categories.forEach(catKey => {
      if (categorizedData[catKey] === undefined) {
        categorizedData[catKey] = {
          title: titleCase(catKey),
          key: catKey,
          links: [],
        };
      }
      categorizedData[catKey].links.push(link);
    });
  });

  const sortedKeys = Object.keys(categorizedData).sort();

  let outputArr = ['## Contents'];

  // Output Table of Contents
  outputArr = outputArr.concat(
    sortedKeys.map(category => {
      const { title, key } = categorizedData[category];
      return `- [${title}](#${key})`;
    })
  );

  // Add the links for each category
  outputArr = outputArr.concat(
    sortedKeys.flatMap(category => {
      const { title, key, links } = categorizedData[category];
      return (
        [`## ${title}\n`] +
        links
          .map(link => {
            const { title, url, description } = link;
            return `- [${title}](${url}) - ${description}`;
          })
          .sort()
          .join('\n')
      );
    })
  );

  return outputArr.join('\n');
};

const startCursor = '<!-- links:start -->';
const endCursor = '<!-- links:end -->';
const str = fs.readFileSync(readmeFile, 'utf8');

const linksData = yaml.load(fs.readFileSync(linkFile, 'utf8'));
const markdownLines = formatAsMarkdown(linksData);

fs.writeFileSync(
  readmeFile,
  replaceBetween(
    str,
    str.indexOf(startCursor) + startCursor.length + 1,
    str.indexOf(endCursor),
    markdownLines
  ),
  'utf8'
);
