// Checks and rewrites the README.md for non working links
const fs = require('fs')
const axios = require('axios')

// Read the README.md file
fs.readFile('README.md', 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading README.md:', err)
    return
  }

  // Regular expression to match links in the specified format
  const linkRegex = /- \[(.*?)\]\((https?:\/\/.*?)\)(.*)/g

  let content = data
  let match
  const removedLinks = []

  while ((match = linkRegex.exec(data)) !== null) {
    const [fullMatch, linkText, linkUrl, description] = match

    try {
      // Check the link validity with a maximum of 3 retries
      await checkLinkValidity(linkUrl, 3)
    } catch (error) {
      console.error(`Removing invalid link: ${linkUrl}`)
      content = content.replace(fullMatch, '')
      removedLinks.push(linkUrl)
    }
  }

  // Remove extra newline characters
  content = content.replace(/\n{2,}/g, '\n\n')

  // Write the updated content back to README.md
  fs.writeFile('README.md', content, 'utf8', (err) => {
    if (err) {
      console.error('Error writing README.md:', err)
      return
    }
    console.log('Link validation completed. README.md updated.')

    if (removedLinks.length > 0) {
      console.log('Removed links:')
      removedLinks.forEach((link) => {
        console.log(link)
      })
    }
  })
})

async function checkLinkValidity(url, retries) {
  try {
    await axios.get(url)
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying link: ${url} (${retries} retries left)`)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await checkLinkValidity(url, retries - 1)
    } else {
      throw error
    }
  }
}
