// Convert the README.md file to JSON format
const fs = require('fs')

// Read the input file
fs.readFile('../README.md', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err)
    return
  }

  // Process the text data to JSON format
  const jsonOutput = processTextToJSON(data)

  // Write the JSON to links.js
  fs.writeFile(
    './app/data/links.js',
    `export const links = ${JSON.stringify(jsonOutput, null, 2)};`,
    (err) => {
      if (err) {
        console.error('Error writing file:', err)
        return
      }
      console.log('File has been saved as links.js')
    }
  )
})

function processTextToJSON(textData) {
  // Split sections and remove the first entries
  const sections = textData.split('##').slice(2)

  const result = sections
    .filter((section) => {
      const categoryName = section.trim().split('\n')[0]
      return categoryName !== 'Contributing' && categoryName !== 'License'
    })
    .map((section) => {
      const lines = section.split('\n').filter((line) => line.trim())
      const categoryName = lines[0].trim()
      const links = lines
        .slice(1)
        .map((line) => {
          const match = line.match(/- \[(.*?)\]\((.*?)\) - (.*)/)
          if (match) {
            return {
              name: match[1],
              url: match[2],
              description: match[3].replace('<!-- links:end -->', '').trim()
            }
          }
          return null
        })
        .filter((link) => link !== null)

      return {
        name: categoryName,
        links
      }
    })

  return result
}
