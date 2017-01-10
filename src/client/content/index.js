export default (config) => `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>${config.APP.TITLE}</title>
        <meta name="description" content="${config.APP.DESCRIPTION}">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1">
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="/css/styles.css">
        <link rel="shortcut icon" href="">
    </head>
    <body>
        <div id="app"></div>
        <script>
            window.config = ${JSON.stringify(config)}
        </script>
        <script src="/scripts/vendor.js"></script>
        <script src="/scripts/bundle.js"></script>
    </body>
    </html>`;
