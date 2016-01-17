<html>
<head>
    <title>Angular 2 + Laravel 5</title>

    {{ Html::script('angular2app/node_modules/angular2/bundles/angular2-polyfills.js') }}
    {{ Html::script('angular2app/node_modules/systemjs/dist/system.src.js') }}
    {{ Html::script('angular2app/node_modules/rxjs/bundles/Rx.js') }}

    <!-- 2. Configuración de SystemJS -->
    <script>
        System.config({
            packages: {
                defaultJSExtensions: true,
                'angular2app': {
                    format: 'register',
                    defaultExtension: 'js'
                }
            },
            map: {
                "angular2-jwt": "angular2app/node_modules/angular2-jwt/angular2-jwt.js"
            }
        });
    </script>
</head>
<!-- 3. Muestra la aplicación -->
<body>
    <angular2-laravel></angular2-laravel>
</body>

<!-- 1. Carga de dependencias -->
{{ Html::script('angular2app/node_modules/angular2/bundles/angular2.js') }}
    {{ Html::script('angular2app/node_modules/angular2/bundles/router.js') }}
    {{ Html::script('angular2app/node_modules/angular2/bundles/http.js') }}

    <!--[if lte IE 9]>
{{ Html::script('//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js">') }}
<![endif]-->
{{ Html::script('angular2app/node_modules/angular2-jwt/angular2-jwt.js') }}

<script>
    System.import('angular2app/app/boot')
            .then(null, console.error.bind(console));
</script>
</html>