<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
    >
    <title>{{ config('app.name') }}</title>
    <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
        rel="stylesheet"
    >
    <link
        rel="shortcut icon"
        href="{{ asset('/favicon.ico') }}"
    >
    <style>
    body, html {
        margin: 0;
        padding: 0;
        font-family: 'Nunito', sans-serif;
    }

    main {
        background-color: #4c80c9;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    </style>
</head>
<body class="antialiased">
    <main>
        <img
            src="{{ asset('/images/header-logo-white.png') }}"
            alt="logo"
        >
    </main>
</body>
</html>
