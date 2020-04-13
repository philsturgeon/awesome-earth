const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

var TurndownService = require('turndown')
var turndownService = new TurndownService();

const apiHost = 'https://api.protect.earth/api';
const readmeFile = path.resolve(`./README.md`);

const getActions = async () => {  
  const grabActionsFromUrl = async (url, existingActions = []) => {
    const response = await fetch(url);
    const { data, links } = await response.json();

    existingActions.push(...data);

    if (!!links.next) {
      await grabActionsFromUrl(links.next, existingActions);
    }

    return existingActions;
  }

  return await grabActionsFromUrl(`${apiHost}/collections/actions/entries`);
}

const getCategories = async () => {
  const response = await fetch(`${apiHost}/collections/categories/entries`)
  const data = (await response.json()).data;
  
  return data.map(category => ({
    id: category.id,
    title: category.title,
    key: category.slug,
    intro: category.intro,
    actions: [],
  }));
}

const replaceBetween = (origin, startIndex, endIndex, insertion) => {
  return (
    origin.substring(0, startIndex) + insertion + origin.substring(endIndex)
  );
};

const formatAsMarkdown = (categories, actions) => {
  let outputArr = ['## Contents'];

  // Output Table of Contents
  outputArr = outputArr.concat(
    categories.map(category => {
      const { title, key } = category;
      return `- [${title}](#${key})`;
    })
  );

  // Add the actions for each category
  outputArr = outputArr.concat(
    categories.flatMap(category => {
      const { title, actions } = category;
      return (
        [`## ${title}\n`] +
        actions
          .map(action => {
            const { title, action_url, description } = action;
            return `- [${title}](${action_url}) - ${turndownService.turndown(description)}`;
          })
          .sort()
          .join('\n')
      );
    })
  );

  return outputArr.join('\n');
};

const startCursor = '<!-- actions:start -->';
const endCursor = '<!-- actions:end -->';
const str = fs.readFileSync(readmeFile, 'utf8');

const main = async () => {
  const categories = await getCategories();
  const actions = await getActions();

  // Join em up
  actions.forEach(action => {
    action.categories.forEach(actionCategory => {
      const pushIntoCategory = categories.find(c => c.id === actionCategory.id)
      pushIntoCategory.actions.push(action);
    });
  });

  const markdownLines = formatAsMarkdown(categories, actions);

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
}

Promise.resolve(main());
