<html lang="pt-br">
<head>
    <title>{{ $title }}</title>
    @include('report.layout.style')
    @if($printing)
        <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function () {
          window.print()
        })
        </script>
    @endif
</head>
<body class="{{ $layout }}">
    <div class="wrapper">
        <main>
            <img
                src="{{ url('/report/logo.png') }}"
                alt="logo"
            >
            <header>
                <h4>{{ $title }}</h4>
            </header>

            @yield('content')

            <footer class="uppercase">
                <small>{{ $user }}</small>
                <small>{{ date('d/m/Y H:i') }}</small>
            </footer>
        </main>
    </div>
</body>
</html>
