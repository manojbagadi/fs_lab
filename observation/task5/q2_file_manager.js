const fs = require('fs');
const readline = require('readline/promises');
const { stdin: input, stdout: output } = require('process');

async function main() {
  const rl = readline.createInterface({ input, output });

  try {
    // 1. Get user input
    const filename = await rl.question('Enter filename (e.g., test.txt): ');
    const content = await rl.question('Enter initial content: ');

    // 2. Write / Create file
    fs.writeFileSync(filename, content);
    console.log(`\n[SUCCESS] File "${filename}" created and written.`);

    // 3. Read file
    console.log('--- Current File Content ---');
    console.log(fs.readFileSync(filename, 'utf-8'));

    // 4. Append additional content
    const extraContent = await rl.question('\nEnter extra content to append: ');
    fs.appendFileSync(filename, '\n' + extraContent);
    console.log('[SUCCESS] Content appended.');

    // 5. Read and display final contents
    console.log('\n--- Final File Content ---');
    console.log(fs.readFileSync(filename, 'utf-8'));

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    rl.close();
  }
}

main();
