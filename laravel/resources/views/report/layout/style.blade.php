<style type="text/css">
@media screen {
    body {
        background-color: #DADCE0;
        margin: 0;
        padding: 0;
        font-family: Roboto,-apple-system,Helvetica Neue,Helvetica,Arial,sans-serif;
    }

    .wrapper {
        margin: 0 auto;
        background-color: #DADCE0;
        padding: 20px;
        width: calc(21cm + 40px);
    }

    .wrapper > main {
        margin: 0 auto;
        width: 21cm;
        background: #fff;
        padding: 14px;
        box-shadow: 2px 2px 6px 2px rgba(58, 58, 58, 0.7);
        border-radius: 2px;
    }

    .landscape > .wrapper {
        padding: 20px;
        width: calc(29.7cm + 40px);
    }

    .landscape > .wrapper > main {
        width: 29.7cm;
    }
}

img {
    height: 50px;
}

header {
    margin: 15px 0 0 0;
    border-width: 1px 0 0 0;
    border-style: solid;
    border-color: #c0c0c0;
}

nav {
    font-size: 0.7rem;
    padding: 10px 0;
}

nav > span {
    display: inline-block;
}

nav > span > label {
    font-weight: bold;
}

nav > i {
    margin: 0 5px;
    display: inline-block;
}

nav i:last-child {
    display: none;
}

table {
    font-size: 0.7rem;
    width: 100%;
}

table, th, td {
    border-style: solid;
    border-color: #c0c0c0;
    border-collapse: collapse;
}

table {
    border-width: 1px 0;
}

table > thead > tr:nth-child(1) > th {
    height: 40px !important;
    background: linear-gradient(180deg, #f7f7f7 0, #f1f1f1 20px, #ecebeb 39px, #c1c1c1 40px) !important;
}

table > tbody > tr:nth-child(even) {
    background-color: #f0f0f0;
}

th, td {
    border-width: 1px 1px 1px 0;
    padding: 4px 8px;
}

th {
    text-align: left;
}

th:last-child, td:last-child {
    border-width: 1px 0;
}

footer {
    display: flex;
    justify-content: space-between;
    padding: 5px 0 15px 0;
    /*border-top: 1px solid rgb(51, 51, 51);*/
    font-size: 0.8rem;
}

.center {
    text-align: center;
}

.right {
    text-align: right;
}

.left {
    text-align: left;
}

.uppercase {
    text-transform: uppercase;
}

.counter {
    width: 30px;
    color: #515151;
    font-style: italic;
}
</style>
