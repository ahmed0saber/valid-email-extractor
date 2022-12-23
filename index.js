const express = require("express")
const app = express()
var cors = require('cors')
const https = require('https')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.use(require('body-parser').urlencoded({ extended: false }))

app.listen(8080, () =>
    console.log(`Example app listening on port ${8080}!`),
)

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/extract', async (req, res) => {
    const data = await extractEmailsFromUrl(req.query.url)
    const currentResponse = {
        results: JSON.stringify(data)
    }

    return res.send(currentResponse)
})

async function extractEmailsFromUrl(url) {
    const EMAIL_REGEX_PATTERN = /[a-z]\w{2,}@\w{2,}\.\w{2,}/ig
    const htmlContent = await getHtmlContentOfUrl(url)
    const data = htmlContent.match(EMAIL_REGEX_PATTERN)

    return data ?? ["No emails have been found, please try again later."]
}

async function getHtmlContentOfUrl(url) {
    let requestPromise = new Promise(function (myResolve, myReject) {
        https.get(url, function (res) {
            res.setEncoding('utf8')
            res.on('data', function (data) {
                myResolve(data)
            })
        }).on('error', function (err) {
            myReject(err)
        })
    })

    try {
        return await requestPromise
    } catch (err) {
        return ""
    }
}