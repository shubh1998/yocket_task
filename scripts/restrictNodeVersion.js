const result = process.versions
const requiredNodeVersion = "14.16.0"

if (result && result.node) {
  if (result.node !== requiredNodeVersion) {
    console.log('\x1b[31m%s\x1b[0m', `Package installation(npm install) or Project startup command(npm start) failed due to Node Version, Please install and use Node Version ${requiredNodeVersion}`)
    console.log('\x1b[33m%s\x1b[0m', 'Your current Node Version is: ' + result.node)
    process.exit(1)
  }
} else {
  console.log('\x1b[47m\x1b[31m%s\x1b[0m', '-------******* Something went wrong while checking Node version *******-------')
  process.exit(1)
}
