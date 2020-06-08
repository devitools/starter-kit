<?php

/** @noinspection PhpUndefinedClassInspection */
/**
 * @param Throwable $error
 */
return function (Throwable $error) {
    ?>
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        >
        <meta
          http-equiv="X-UA-Compatible"
          content="ie=edge"
        >
        <title>Error</title>

        <style type="text/css">
        body {
            background-color: #101010;
            color: #f2f2f2;
            padding: 0;
            margin: 0;
        }

        main, pre {
            width: 100%;
            overflow: auto;
        }
        </style>
    </head>
    <body>
        <main>
            <div style=" padding: 20px;">
                Houston, we have a problem!
                <pre><?php $this->eco("Error in {$error->getFile()} on {$error->getLine()}") ?></pre>
                <hr>
                <pre><?php $this->eco($error->getMessage()) ?></pre>
                <pre><?php $this->eco($error->getTraceAsString()) ?></pre>
            </div>
        </main>
    </body>
    </html>
    <?php
};
