export const DAX_COURSE_DATA = [
    {
        id: 'belt-white',
        title: 'Cinturón Blanco: Fundamentos',
        color: 'border-gray-200',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        description: 'Domina la sintaxis, operadores y la lógica fundamental.',
        isLocked: false,
        exam: {
            questions: [
                { q: "¿Qué función garantiza una división segura evitando el error de división por cero?", options: ["DIVIDE", "QUOTIENT", "/"], ans: 0 },
                { q: "¿Qué símbolo se usa para concatenar texto?", options: ["+", "&", "CONCAT"], ans: 1 },
                { q: "¿Una Medida consume espacio en disco/memoria?", options: ["Sí, siempre", "No, se calcula al vuelo"], ans: 1 },
                { q: "¿Cómo se escribe un comentario de una sola línea?", options: ["/* ... */", "//", "#"], ans: 1 }
            ]
        },
        lessons: [
            {
                id: 'w1', title: 'Sintaxis de Medida', type: 'code',
                content: `
                    <h2>¿Qué es una Medida en DAX?</h2>
                    <p>En el mundo de Power BI y Analysis Services, una <strong>Medida</strong> es el elemento fundamental de análisis. A diferencia de las celdas estáticas en Excel, una medida es una fórmula dinámica que se recalcula instantáneamente cada vez que el usuario interactúa con un informe (por ejemplo, al aplicar un filtro de fecha o seleccionar una categoría de producto).</p>
                    
                    <h3>La Anatomía de una Fórmula DAX</h3>
                    <p>Escribir tu primera medida puede parecer intimidante, pero siempre sigue una estructura lógica y predecible. Analicemos los componentes:</p>
                    <pre><code>Nombre de la Medida = FUNCIÓN(Tabla[Columna])</code></pre>
                    
                    <ul>
                        <li><strong>Nombre de la Medida:</strong> Es el identificador que verás en la lista de campos. Debe ser descriptivo pero conciso (ej. "Ventas Totales" en lugar de "Medida 1").</li>
                        <li><strong>Signo Igual (=):</strong> Indica al motor de DAX que lo que sigue es la definición del cálculo.</li>
                        <li><strong>Función:</strong> Es el "verbo" de la oración. Indica qué acción realizar (Sumar, Promediar, Contar, etc.). DAX tiene cientos de funciones, pero <code>SUM</code> es la más común para empezar.</li>
                        <li><strong>Argumentos:</strong> Encerrados en paréntesis, son los "sustantivos" sobre los que actúa la función. Generalmente son referencias a columnas de tus datos.</li>
                    </ul>

                    <h3>Medidas vs. Columnas: La Regla de Oro de la Referencia</h3>
                    <p>Un error común de principiante es confundir cómo referenciar objetos. En DAX, las mejores prácticas dictan:</p>
                    <ul>
                        <li><strong>Columnas:</strong> Siempre deben incluir el nombre de la tabla. <code>'Tabla'[Columna]</code>. Esto las hace inconfundibles.</li>
                        <li><strong>Medidas:</strong> Nunca deben incluir el nombre de la tabla. Simplemente <code>[Medida]</code>.</li>
                    </ul>
                    <p>Esta distinción visual te ayudará enormemente cuando leas código complejo meses después de haberlo escrito.</p>
                `,
                challenge: { q: "Crea una medida llamada 'Total' que sume todos los valores de la columna 'Ventas'.", hint: "Recuerda la estructura: Nombre = SUM(Columna)", expected: ["Total", "=", "SUM", "(", "Ventas", ")"] }
            },
            {
                id: 'w2', title: 'Operadores Matemáticos', type: 'code',
                content: `
                    <h2>Matemáticas Básicas en DAX</h2>
                    <p>DAX no es solo funciones complejas; en su núcleo, maneja la aritmética básica de manera muy similar a Excel. Los operadores matemáticos te permiten realizar cálculos directos entre escalares (valores únicos) o columna a columna (en un contexto de fila).</p>
                    
                    <h3>Los 4 Jinetes de la Aritmética</h3>
                    <ul>
                        <li><strong>Suma (+):</strong> <code>[Ventas] + [Impuestos]</code>. Suma dos valores numéricos.</li>
                        <li><strong>Resta (-):</strong> <code>[Ventas] - [Costos]</code>. Fundamental para calcular márgenes y diferencias.</li>
                        <li><strong>Multiplicación (*):</strong> <code>[Cantidad] * [Precio Unitario]</code>. Usado extensivamente en iteradores como SUMX (que veremos más adelante).</li>
                        <li><strong>División (/):</strong> <code>[Ventas] / [Objetivo]</code>. <em>¡Cuidado!</em> El operador de barra diagonal puede generar errores de "división por cero" o "infinito" si el denominador es 0 o BLANK. Veremos cómo solucionar esto con la función DIVIDE.</li>
                    </ul>

                    <h3>Prioridad de Operaciones (PEMDAS)</h3>
                    <p>DAX respeta el orden estándar de las operaciones matemáticas:</p>
                    <ol>
                        <li><strong>P</strong>aréntesis: <code>(A + B) * C</code> se calcula diferente a <code>A + B * C</code>.</li>
                        <li><strong>E</strong>xponentes: <code>^</code>.</li>
                        <li><strong>M</strong>ultiplicación y <strong>D</strong>ivisión (de izquierda a derecha).</li>
                        <li><strong>A</strong>dición y <strong>S</strong>ustracción (de izquierda a derecha).</li>
                    </ol>
                    <p><strong>Consejo Pro:</strong> Ante la duda, usa paréntesis. No solo aseguran que el cálculo sea correcto, sino que hacen que tu código sea mucho más legible para otros desarrolladores.</p>
                `,
                challenge: {
                    q: "Calcula el 'Margen' restando los '[Costos]' a las '[Ventas]'. Asume que son medidas ya creadas.", hint: "Simplemente usa el operador menos (-)", expected: ["Margen", "=", "[Ventas]", "-", "[Costos]"]
                }
            },
            {
                id: 'w3', title: 'Concatenación de Texto', type: 'code',
                content: `
                    <h2>Manipulación de Cadenas de Texto</h2>
                    <p>A menudo, los números por sí solos no cuentan toda la historia. Necesitas crear etiquetas dinámicas, títulos que cambien según la selección del usuario, o claves compuestas para relaciones. Aquí entra la concatenación.</p>
                    
                    <h3>El Operador Ampersand (&)</h3>
                    <p>Aunque existe una función llamada <code>CONCATENATE()</code>, los expertos en DAX rara vez la usan. ¿Por qué? Porque está limitada a unir solo dos cadenas de texto a la vez. Si quieres unir Nombre, Espacio y Apellido, tendrías que anidar funciones: <code>CONCATENATE(Nombre, CONCATENATE(" ", Apellido))</code>.</p>
                    <p>En su lugar, el operador <strong>&</strong> es mucho más flexible y limpio:</p>
                    <pre><code>NombreCompleto = [Nombre] & " " & [Apellido]</code></pre>
                    <p>Puedes encadenar tantos elementos como necesites. DAX convertirá automáticamente números y fechas a texto cuando uses este operador, aunque para un control preciso del formato (como monedas o fechas específicas) deberías usar la función <code>FORMAT()</code> en combinación con <code>&</code>.</p>

                    <h3>Ejemplo Práctico: Títulos Dinámicos</h3>
                    <p>Imagina un gráfico que muestra ventas. Un título estático es aburrido. Un título dinámico mejora la experiencia de usuario:</p>
                    <pre><code>TituloDinamico = "Reporte de Ventas al año: " & SELECTEDVALUE('Calendario'[Año], "Todos los años")</code></pre>
                    <p>Esto mostrará "Reporte de Ventas al año: 2023" si el usuario selecciona ese año, dando contexto inmediato.</p>
                `,
                challenge: {
                    q: "Crea una medida 'Etiqueta' que combine el texto literal \"Año: \" con el valor de la columna 'Año'.", hint: "Recuerda poner el texto literal entre comillas dobles.", expected: ["Etiqueta", "=", "\"Año: \"", "&", "'Año'"]
                }
            },
            {
                id: 'w4', title: 'División Segura (DIVIDE)', type: 'code',
                content: `
                    <h2>El Arte de Dividir sin Errores</h2>
                    <p>La división es probablemente la operación aritmética más riesgosa en informática. En matemáticas, la división por cero es indefinida. En Power BI, intentar dividir por cero (o por BLANK) usando el operador <code>/</code> puede resultar en errores, valores infinitos (Infinity) o NaN (Not a Number), lo que arruina la estética y confianza de tus reportes.</p>
                    
                    <h3>La Función DIVIDE al Rescate</h3>
                    <p>Microsoft introdujo la función <code>DIVIDE</code> específicamente para manejar estos casos de manera elegante y optimizada. Su sintaxis es:</p>
                    <pre><code>DIVIDE(Numerador, Denominador, [ResultadoAlternativo])</code></pre>
                    
                    <ul>
                        <li><strong>Numerador:</strong> Lo que quieres dividir.</li>
                        <li><strong>Denominador:</strong> Por cuánto quieres dividir.</li>
                        <li><strong>ResultadoAlternativo (Opcional):</strong> Qué valor devolver si el denominador es 0 o BLANK. Si se omite, devuelve BLANK (que es lo recomendado, ya que los visuales de Power BI suelen ocultar automáticamente los valores BLANK, limpiando el gráfico).</li>
                    </ul>

                    <h3>¿Por qué usar DIVIDE en lugar de IF?</h3>
                    <p>Podrías escribir: <code>IF([Denom] = 0, 0, [Num] / [Denom])</code>. Sin embargo, <code>DIVIDE</code> es:</p>
                    <ol>
                        <li><strong>Más Rápido:</strong> Está optimizado internamente por el motor VertiPaq.</li>
                        <li><strong>Más Limpio:</strong> Requiere menos código y es más fácil de leer.</li>
                        <li><strong>Más Seguro:</strong> Maneja tanto ceros como valores nulos (BLANK) automáticamente.</li>
                    </ol>
                `,
                challenge: {
                    q: "Calcula el 'Ratio' dividiendo [Ventas] entre [Objetivo]. Si el objetivo es 0, queremos que devuelva 0 para no romper el gráfico.", hint: "Usa el tercer argumento de DIVIDE.", expected: ["Ratio", "=", "DIVIDE", "[Ventas]", "[Objetivo]", "0"]
                }
            },
            {
                id: 'w5', title: 'Lógica: IF simple', type: 'code',
                content: `
                    <h2>Tomando Decisiones con IF</h2>
                    <p>La lógica condicional es el cerebro de tus análisis. Permite que tus medidas reaccionen de manera diferente según los datos que están evaluando, categorizando resultados o manejando excepciones.</p>
                    
                    <h3>Sintaxis de IF</h3>
                    <p>La función <code>IF</code> en DAX es idéntica a la de Excel, lo cual facilita mucho la transición:</p>
                    <pre><code>IF( prueba_lógica, resultado_si_verdadero, resultado_si_falso )</code></pre>
                    
                    <ul>
                        <li><strong>Prueba lógica:</strong> Una expresión que devuelve TRUE o FALSE (ej. <code>[Ventas] > 1000</code>).</li>
                        <li><strong>Resultado si verdadero:</strong> El valor o cálculo a devolver si se cumple la condición.</li>
                        <li><strong>Resultado si falso:</strong> (Opcional) El valor si no se cumple. Si se omite, devuelve BLANK.</li>
                    </ul>

                    <h3>Anidando IFs vs. SWITCH</h3>
                    <p>Es común querer evaluar múltiples condiciones. Podrías anidar funciones IF:</p>
                    <code>IF(x > 10, "Alto", IF(x > 5, "Medio", "Bajo"))</code>
                    <p>Sin embargo, para múltiples condiciones, la función <code>SWITCH(TRUE(), ...)</code> suele ser una alternativa mucho más legible y elegante, aunque <code>IF</code> sigue ser el rey para decisiones binarias simples.</p>
                `,
                challenge: {
                    q: "Crea una medida 'Status': Si [Ventas] son mayores a 100, devuelve el texto \"Bien\", de lo contrario devuelve \"Mal\".", hint: "Cuidado con las comillas en los textos.", expected: ["Status", "IF", "[Ventas]", ">", "100", "\"Bien\"", "\"Mal\""]
                }
            },
            {
                id: 'w6', title: 'Operadores Lógicos: AND (&&)', type: 'code',
                content: `
                    <h2>Múltiples Condiciones: AND</h2>
                    <p>A menudo, una sola condición no es suficiente. ¿Qué pasa si quieres bonificar a un vendedor solo si vendió mucho <strong>Y</strong> además tiene buena satisfacción del cliente? Necesitas que ambas condiciones sean verdaderas simultáneamente.</p>
                    
                    <h3>El Doble Ampersand (&&)</h3>
                    <p>En DAX, la forma preferida de expresar una operación "AND" lógica es con el operador <code>&&</code>. Se coloca entre dos expresiones lógicas.</p>
                    <pre><code>EsEligible = [Ventas] > 10000 && [Satisfaccion] > 4.5</code></pre>
                    <p>Esta fórmula devolverá TRUE solo si <strong>ambas</strong> partes son ciertas. Si una falla, todo es FALSE.</p>

                    <h3>&& vs. Función AND()</h3>
                    <p>DAX tiene una función <code>AND(condicion1, condicion2)</code>, pero tiene una limitación severa: solo acepta <strong>dos</strong> argumentos. Si necesitas probar 3 cosas, tendrías que anidar: <code>AND(cond1, AND(cond2, cond3))</code>.</p>
                    <p>Con el operador <code>&&</code>, puedes encadenar infinitamente: <code>cond1 && cond2 && cond3 && cond4</code>. Es mucho más legible y flexible, por lo que se considera la mejor práctica.</p>
                `,
                challenge: {
                    q: "Crea una medida 'Bonus' que devuelva 1 solo si: [Ventas] > 100 Y ADEMÁS [Satisfaccion] > 9. Si no, devuelve 0.", hint: "Usa la lógica: IF( condicion1 && condicion2, 1, 0 )",
                    expected: ["Bonus", "IF", "[Ventas]", ">", "100", "&&", "[Satisfaccion]", ">", "9"]
                }
            },
            {
                id: 'w7', title: 'Operadores Lógicos: OR (||)', type: 'code',
                content: `
                    <h2>Flexibilidad en Condiciones: OR</h2>
                    <p>A veces eres menos estricto: quieres marcar una alerta si el stock es bajo <strong>O</strong> si los pedidos son inusualmente altos. Basta con que una de las condiciones sea cierta.</p>
                    
                    <h3>La Doble Barra Vertical (||)</h3>
                    <p>El operador para "OR" en DAX es <code>||</code> (double pipe). En la mayoría de teclados se escribe con <code>Alt Gr + 1</code> o la tecla sobre Enter.</p>
                    <pre><code>AlertaRoja = [Stock] < 10 || [Devoluciones] > 5</code></pre>
                    <p>Esta expresión devolverá TRUE si falta stock, O si hay muchas devoluciones, O si pasan ambas cosas a la vez.</p>

                    <h3>|| vs. Función OR()</h3>
                    <p>Al igual que con AND, la función <code>OR(cond1, cond2)</code> está limitada a solo dos argumentos. El operador <code>||</code> es superior porque permite encadenar múltiples condiciones fácilmente: <code>cond1 || cond2 || cond3</code>.</p>
                `,
                challenge: {
                    q: "Crea 'Alerta': Si [Stock] es menor que 5 O [Pedidos] es mayor que 50, devuelve \"Revisar\".", hint: "Usa el símbolo ||",
                    expected: ["Alerta", "IF", "[Stock]", "<", "5", "||", "[Pedidos]", ">", "50"]
                }
            }, {
                id: 'w8',
                title: 'El operador IN', type: 'code',
                content: `
                    <h2>Simplificando Múltiples OR con IN</h2>
                    <p>Imagina que quieres filtrar ventas para una lista específica de colores: Rojo, Azul, o Verde. Usando el operador OR, tendrías que escribir:</p>
                    <pre><code>'Producto'[Color] = "Rojo" || 'Producto'[Color] = "Azul" || 'Producto'[Color] = "Verde"</code></pre>
                    <p>Esto se vuelve tedioso y propenso a errores si la lista crece. Aquí es donde brilla el operador <strong>IN</strong>.</p>

                    <h3>Uso de IN con Listas {}</h3>
                    <p>El operador <code>IN</code> te permite comprobar si un valor existe dentro de una lista definida por llaves <code>{}</code> constructoras de tabla.</p>
                    <pre><code>'Producto'[Color] IN { "Rojo", "Azul", "Verde" }</code></pre>
                    <p>Es semánticamente idéntico a los múltiples OR, pero es inmensamente más compacto, legible y fácil de mantener. Si necesitas agregar "Amarillo", solo lo añades a la lista.</p>
                `,
                challenge: {
                    q: "Crea una medida 'EsPrimario': Usa IF para devolver TRUE() si el 'Color' está IN la lista {\" Rojo\", \"Azul\"}.",
                    hint: "Usa las llaves {} para definir tu lista.", expected: ["EsPrimario", "IF", "'Color'", "IN", "{", "\" Rojo\"", "\"Azul\"", "}"]
                }
            }, {
                id: 'w9', title: 'Comentarios en Código', type: 'quiz',
                content: `
                    <h2>El Código es para Humanos</h2>
                    <p>Martin Fowler dijo una vez: <em>"Cualquier tonto puede escribir código que un ordenador entienda. Los buenos programadores escriben código que los humanos entiendan."</em></p>
                    <p>En modelos de DAX complejos, documentar tu lógica es vital. DAX ofrece dos estilos de comentarios:</p>
                    
                    <h3>1. Comentario de Línea Única</h3>
                    <p>Se crean con <code>//</code> o <code>--</code>. Todo lo que esté a la derecha de estos símbolos en esa línea será ignorado por Power BI.</p>
                    <pre><code>Ventas Netas = [Ventas] - [Descuentos] // Restamos descuentos para obtener neto</code></pre>

                    <h3>2. Comentario de Bloque</h3>
                    <p>Se encierran entre <code>/*</code> y <code>*/</code>. Pueden abarcar múltiples líneas o insertarse en medio de una fórmula (aunque esto último es raro).</p>
                    <pre><code>/* 
    Esta medida es compleja.
    Autor: Juan
    Fecha: 2024
*/</code></pre>
                    <p><strong>Tip:</strong> Usa comentarios para "apagar" partes de tu código mientras depuras errores sin tener que borrarlas.</p>
                `,
                challenge: {
                    q: "¿Cuál de estos NO es un comentario válido en DAX?", options: ["// Hola", "-- Hola"
                        , "# Hola", "/* Hola */"], correctMsg: "Correcto, el símbolo # se usa en Power Query (M), pero generará un error de sintaxis en DAX.", correctOpt: 2
                }
            }, {
                id: 'w10', title: 'Medidas vs Columnas Calculadas', type: 'quiz',
                content: `
                    <h2>La Gran Pregunta de Entrevista</h2>
                    <p>Entender la diferencia entre una <strong>Medida</strong> y una <strong>Columna Calculada</strong> es el Rubicón que separa a los principiantes de los usuarios intermedios. Aunque ambas usan DAX, viven en mundos diferentes.</p>

                    <h3>Columnas Calculadas</h3>
                    <ul>
                        <li><strong>Cálculo:</strong> Se calculan fila por fila <em>durante la actualización de datos</em>.</li>
                        <li><strong>Almacenamiento:</strong> Los resultados se guardan en la memoria RAM y en el disco (aumentan el tamaño del archivo).</li>
                        <li><strong>Uso:</strong> Son necesarias si quieres usar el resultado como un <strong>Eje</strong> en un gráfico, en un <strong>Slicer</strong> (filtro), o como columna de agrupación.</li>
                        <li><strong>Icono:</strong> Aparecen como una columna más en tu tabla.</li>
                    </ul>

                    <h3>Medidas</h3>
                    <ul>
                        <li><strong>Cálculo:</strong> Se calculan <em>al vuelo</em> (on demand) en tiempo de consulta, usando la CPU.</li>
                        <li><strong>Almacenamiento:</strong> No ocupan espacio en disco (solo se guarda la definición de la fórmula).</li>
                        <li><strong>Uso:</strong> Para valores numéricos, agregaciones (sumas, promedios) que van en la zona de "Valores" de los gráficos. Son sensibles al contexto de filtro del reporte.</li>
                    </ul>
                    <p><strong>Regla general:</strong> Si puedes hacerlo con una Medida, hazlo con una Medida. Usa Columnas Calculadas solo cuando sea estrictamente necesario filtrar o agrupar por ese dato.</p>
                `,
                challenge: {
                    q: "Necesitas crear un gráfico de barras donde el eje X sea un rango de edad (ej. 'Joven', 'Adulto'). ¿Qué debes crear?", options: ["Una Medida", "Una Columna Calculada"],
                    correctMsg: "¡Exacto! Dado que necesitas usar el resultado en un EJE o FILTRO, debe estar pre-calculado a nivel de fila y almacenado. Una medida no puede servir de eje.", correctOpt: 1
                }
            }]
    }, {
        id: 'belt-yellow', title: 'Cinturón Amarillo: Agregaciones', color: 'border-yellow-400',
        bgColor: 'bg-yellow-100', textColor: 'text-yellow-800',
        description: 'Domina las funciones de resumen y conteo.', isLocked: true, exam: {
            questions: [{
                q: "¿Qué función cuenta filas de una tabla, incluso si no tienen datos?", options: ["COUNT", "COUNTROWS"
                    , "DISTINCTCOUNT"], ans: 1
            }, {
                q: "¿Qué función devuelve el valor único si solo hay uno visible?", options:
                    ["VALUES", "SELECTEDVALUE", "HASONEVALUE"], ans: 1
            }, {
                q: "MAX funciona con...", options: ["Solo Números", "Números y Fechas/Texto"], ans: 1
            }, {
                q: "¿Qué función cuenta celdas NO vacías (texto o número)?",
                options: ["COUNT", "COUNTA", "COUNTBLANK"], ans: 1
            }]
        }, lessons: [{
            id: 'y1', title: 'SUM (Suma Básica)',
            type: 'code', content: `
                <h2>SUM: El Caballo de Batalla</h2>
                <p>La función <code>SUM</code> es probablemente la función DAX más utilizada. Su propósito es simple: sumar todos los números de una columna específica dentro del contexto actual.</p>
                <pre><code>Ventas Totales = SUM(Ventas[Importe])</code></pre>
                
                <h3>Comportamiento y Limitaciones</h3>
                <ul>
                    <li><strong>Solo una columna:</strong> SUM acepta solo un argumento: la referencia a una columna. No puedes escribir <code>SUM(5 + 2)</code> o <code>SUM([Precio] * [Cantidad])</code> (para eso necesitas SUMX).</li>
                    <li><strong>Tipos de datos:</strong> Solo funciona con columnas numéricas. Si intentas sumar texto o booleanos, recibirás un error.</li>
                    <li><strong>Filtrado automático:</strong> SUM respeta automáticamente los filtros aplicados en el reporte (slicers, ejes, etc.). Solo suma las filas que son visibles en el contexto actual.</li>
                </ul>
                <p>Es la agregación por defecto para la mayoría de los análisis financieros y cuantitativos.</p>
            `, challenge: {
                q: "Crea una medida 'Total Kilos' que sume todos los valores de la columna Kilos.", expected: ["Total Kilos", "SUM", "Kilos"]
            }
        }, {
            id: 'y2'
            , title: 'AVERAGE (Promedio)', type: 'code', content: `
                <h2>Buscando el Valor Medio: AVERAGE</h2>
                <p>La función <code>AVERAGE</code> calcula la media aritmética de los números en una columna.</p>
                <pre><code>Precio Promedio = AVERAGE('Producto'[PrecioUnitario])</code></pre>
                
                <h3>¿Cómo maneja ceros y vacíos?</h3>
                <p>Este es un punto crucial en el análisis de datos:</p>
                <ul>
                     <li><strong>Ceros (0):</strong> Son números. Cuentan para el promedio. Si tienes 10, 0, y 20, el promedio es 10.</li>
                     <li><strong>Vacíos (BLANK):</strong> Se ignoran completamente. Si tienes 10, BLANK, y 20, el promedio es 15 (la suma es 30, dividido por 2 valores).</li>
                </ul>
                <p>Si necesitas que los BLANKs cuenten como ceros para bajar el promedio, debes usar la función <code>AVERAGEA</code> o manipular los datos previamente.</p>
            `, challenge: {
                q: "Crea una medida 'Precio Promedio' que calcule la media aritmética de la columna Precio de la tabla Ventas.", expected: ["Precio Promedio", "AVERAGE"
                    , "Precio"]
            }
        }, {
            id: 'y3', title: 'MAX y MIN', type: 'code',
            content: `
                <h2>Extremos: MAX y MIN</h2>
                <p>Para encontrar los valores extremos (máximo y mínimo), usamos <code>MAX</code> y <code>MIN</code>.</p>
                
                <h3>Más allá de los Números</h3>
                <p>Una característica poderosa de estas funciones en DAX es que no se limitan a datos numéricos:</p>
                <ul>
                    <li><strong>Fechas:</strong> <code>MAX(Tabla[Fecha])</code> te da la fecha mas reciente (la última). <code>MIN</code> te da la más antigua.</li>
                    <li><strong>Texto:</strong> Funcionan alfabéticamente. <code>MAX(Tabla[Cliente])</code> te devolverá el último cliente en orden alfabético (ej. "Zulma").</li>
                </ul>
                <p>También existen las variantes <code>MAXA</code> y <code>MINA</code> para manejar columnas de tipo True/False, pero son de uso mucho menos frecuente.</p>
            `,
            challenge: {
                q: "Crea 'Ultima Venta' encontrando la fecha máxima en la columna 'FechaVenta'.", expected: ["Ultima Venta", "MAX", "'FechaVenta'"]
            }
        }, {
            id: 'y4', title: 'COUNT (Numérico)', type: 'code',
            content: `
                <h2>Contando Números: COUNT</h2>
                <p>La función <code>COUNT</code> es la más básica de la familia de conteo. Su regla es estricta: <strong>solo cuenta celdas que contienen números</strong>.</p>
                
                <h3>¿Qué ignora COUNT?</h3>
                <ul>
                    <li>Ignora Textos.</li>
                    <li>Ignora Valores Lógicos (True/False).</li>
                    <li>Ignora BLANKs (celdas vacías).</li>
                </ul>
                <p>También funciona con fechas, ya que internamente DAX almacena las fechas como números seriales. Sin embargo, si intentas usar COUNT en una columna de nombres de clientes (String), obtendrás un error. Para eso necesitas su hermana mayor: COUNTA.</p>
            `, challenge: {
                q: "Queremos contar cuántas transacciones tienen un ID numérico válido. Usa COUNT sobre la columna 'ID_Venta'.", expected: ["COUNT", "'ID_Venta'"]
            }
        }, {
            id: 'y5',
            title: 'COUNTA (Todo)', type: 'code',
            content: `
                <h2>Contando Todo: COUNTA</h2>
                <p>El nombre viene de "Count All" (Contar Todo). <code>COUNTA</code> es mucho más versátil que COUNT.</p>
                
                <h3>¿Qué cuenta COUNTA?</h3>
                <p>Cuenta cualquier celda que <strong>no esté vacía</strong>.</p>
                <ul>
                    <li>Cuenta Textos.</li>
                    <li>Cuenta Números.</li>
                    <li>Cuenta Fechas.</li>
                    <li>Cuenta Booleanos.</li>
                    <li>SOLO ignora los BLANKS.</li>
                </ul>
                <p>Es la función estándar cuando quieres contar, por ejemplo, cuántos clientes tienen registrado un correo electrónico en tu base de datos (ignorando los que tienen el campo vacío).</p>
            `, challenge: {
                q: "Cuenta el número de clientes que tienen una dirección de email. Usa la columna 'Email'.", expected: ["COUNTA", "'Email'"]
            }
        }, {
            id: 'y6', title: 'COUNTROWS (Filas)', type: 'code',
            content: `
                <h2>El Rey del Rendimiento: COUNTROWS</h2>
                <p>Si tu pregunta es "¿Cuántas ventas hubo?", técnicamente estás preguntando "¿Cuántas filas tiene la tabla Ventas?".</p>
                <p>Para esto, <code>COUNTROWS</code> es la mejor herramienta. A diferencia de COUNT o COUNTA, que miran columna por columna, <code>COUNTROWS</code> mira la tabla completa.</p>
                
                <h3>Ventajas de COUNTROWS</h3>
                <ul>
                    <li><strong>Eficiencia:</strong> Es extremadamente rápida porque no necesita inspeccionar los valores de ninguna celda. Solo consulta los metadatos internos del motor VertiPaq para saber cuántas filas existen.</li>
                    <li><strong>Simplicidad:</strong> No tienes que preocuparte por si una columna tiene nulos o no. Cuenta la existencia de la fila en sí misma.</li>
                </ul>
                <p>Sintaxis: <code>COUNTROWS('Tabla')</code>. Nota que el argumento es la TABLA, no una columna.</p>
            `,
            challenge: {
                q: "Cuenta el número total de transacciones (filas) en la tabla 'Ventas'.", hint: "El argumento debe ser la tabla completa.", expected:
                    ["COUNTROWS", "Ventas"]
            }
        }, {
            id: 'y7', title: 'DISTINCTCOUNT (Únicos)', type: 'code',
            content: `
                <h2>Contando Únicos: DISTINCTCOUNT</h2>
                <p>Saber el volumen total de ventas es bueno, pero saber a <em>cuántos clientes diferentes</em> les vendimos es mejor. Aquí entra <code>DISTINCTCOUNT</code>.</p>
                
                <h3>Funcionamiento</h3>
                <p>Escanea una columna, elimina los duplicados y cuenta los valores únicos restantes. </p>
                <pre><code>Clientes Activos = DISTINCTCOUNT(Ventas[ID_Cliente])</code></pre>
                
                <h3>El detalle del BLANK</h3>
                <p>Es importante notar que <code>DISTINCTCOUNT</code> incluye el valor BLANK como un valor único válido en su conteo. Si tienes 5 clientes distintos y algunas filas sin cliente (BLANK), el resultado será 6. Si quieres excluir el BLANK estrictamente, puedes usar <code>DISTINCTCOUNTNOBLANK</code>.</p>
            `,
            challenge: { q: "Calcula cuántos productos diferentes (únicos) se han vendido basándote en la columna SKU.", expected: ["DISTINCTCOUNT", "SKU"] }
        },
        {
            id: 'y8', title: 'COUNTBLANK', type: 'code',
            content: `
                <h2>Encontrando el Vacío: COUNTBLANK</h2>
                <p>La calidad de los datos es un problema real. <code>COUNTBLANK</code> es tu herramienta de auditoría. Cuenta el número de celdas vacías en una columna.</p>
                
                <h3>¿Qué es BLANK en DAX?</h3>
                <p>BLANK no es exactamente lo mismo que NULL en SQL o celdas vacías en Excel, pero se comporta de manera similar. Es la ausencia de valor.</p>
                <p>Esta función es útil para crear KPIs de calidad de datos, por ejemplo: "¿Qué porcentaje de mis clientes no tiene número de teléfono asignado?".</p>
            `, challenge: {
                q: "Auditoría: Cuenta cuántas filas no tienen fecha de devolución registrada en la columna 'Devolucion'.", expected:
                    ["COUNTBLANK", "Devolucion"]
            }
        }, {
            id: 'y9', title: 'SELECTEDVALUE', type: 'quiz',
            content: `
                <h2>El Francotirador: SELECTEDVALUE</h2>
                <p>Esta función es esencial para hacer reportes interactivos avanzados. <code>SELECTEDVALUE</code> inspecciona una columna en el contexto actual y:</p>
                <ol>
                    <li>Si hay <strong>UN solo valor</strong> visible (porque el usuario filtró un solo año, o un solo producto), devuelve ese valor.</li>
                    <li>Si hay múltiples valores (o ninguno), devuelve un resultado alternativo (o BLANK por defecto).</li>
                </ol>
                
                <h3>Uso Común</h3>
                <p>Se usa mucho en títulos dinámicos o para capturar parámetros del usuario. Antes de existir, teníamos que escribir: <code>IF(HASONEVALUE(Col), VALUES(Col), BLANK())</code>. SELECTEDVALUE es el atajo elegante para esa lógica.</p>
            `, challenge: {
                q: "En un gráfico hay un slicer de Año. El usuario ha seleccionado 2023 y 2024. ¿Qué devolverá SELECTEDVALUE('Calendario'[Año])?",
                options: ["2023", "2024", "BLANK / Nada", "Error"],
                correctMsg: "¡Correcto! Como hay más de un valor en el contexto (2023 y 2024), la función no puede devolver un único valor, así que devuelve su resultado alternativo por defecto (BLANK).", correctOpt: 2
            }
        }, {
            id: 'y10',
            title: 'Funciones "X" (Iteradores)', type: 'quiz',
            content: `
                <h2>El Poder de los Iteradores (Funciones X)</h2>
                <p>Hasta ahora hemos visto agregadores simples (SUM, AVERAGE). Estos toman una columna entera y la aplastan en un número.</p>
                <p>Pero, ¿qué pasa si necesitas multiplicar <code>Precio * Cantidad</code> <strong>fila por fila</strong> y LUEGO sumar los resultados? Si haces <code>SUM(Precio) * SUM(Cantidad)</code>, el resultado será matemáticamente incorrecto (sumarías todos los precios y multiplicarías por todas las cantidades).</p>
                
                <h3>Entra SUMX</h3>
                <p>Las funciones terminadas en X (SUMX, AVERAGEX, MAXX, MINX) son <strong>Iteradores</strong>. Siguen este proceso:</p>
                <ol>
                    <li>Toman una tabla.</li>
                    <li>Recorren esa tabla fila por fila (Contexto de Fila).</li>
                    <li>Evalúan una expresión para cada fila.</li>
                    <li>Agregan (Suman, Promedian...) los resultados finales.</li>
                </ol>
                <pre><code>Ventas = SUMX( Ventas, Ventas[Precio] * Ventas[Cantidad] )</code></pre>
                <p>Son más intensivas en CPU pero absolutamente necesarias para cálculos complejos.</p>
            `, challenge: {
                q: "Para calcular el ingreso total multiplicando (Precio * Cantidad) fila a fila y luego sumar, ¿qué función debes usar?", options: ["SUM", "SUMX"
                ], correctMsg: "¡Correcto! SUMX crea el contexto de fila necesario para multiplicar línea a línea antes de agregar.", correctOpt: 1
            }
        },]
    }, {
        id: 'belt-orange', title: 'Cinturón Naranja: Contexto', color: 'border-orange-500', bgColor: 'bg-orange-100'
        , textColor: 'text-orange-800', description: 'Entiende CALCULATE y el Contexto de Filtro (Nivel Avanzado).',
        isLocked: true, exam: { questions: [] }, lessons: [{
            id: 'o1', title: 'Intro a CALCULATE',
            type: 'code', content: '<p>Próximamente...</p>', challenge: { q: "Escribe CALCULATE", expected: ["CALCULATE"] }
        }, {
            id: 'o10',
            title: 'Final Naranja', type: 'code', content: '<p>...</p>', challenge: { q: "...", expected: ["..."] }
        }]
    }];
