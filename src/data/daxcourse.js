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
                content: '<p>Toda medida comienza con un nombre, un igual y una función. <code>Nombre = FUNCION(Columna)</code>.</p>',
                challenge: { q: "Crea una medida 'Total' que sume la columna 'Ventas'.", hint: "Usa SUM", expected: ["Total", "=", "SUM", "(", "Ventas", ")"] }
            },
            {
                id: 'w2', title: 'Operadores Matemáticos', type: 'code',
                content: '<p>DAX usa los operadores estándar: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>.</p>',
                challenge: {
                    q: "Crea 'Margen' restando 'Costos' a 'Ventas'. Asume que son medidas ya existentes.", hint: "[Ventas] - [Costos]", expected: ["Margen", "=", "[Ventas]", "-", "[Costos]"]
                }
            },
            {
                id: 'w3', title: 'Concatenación de Texto', type: 'code',
                content: '<p>Usa el operador <code>&</code> para unir textos. Ejemplo: <code>[Nombre] & \" \" & [Apellido]</code>.</p>',
                challenge: {
                    q: "Crea una medida 'Etiqueta' que combine el texto \"Año: \" con la columna 'Año'.", hint: "\"Texto\" & [Columna]", expected: ["Etiqueta", "=", "\"Año: \"", "&", "'Año'"]
                }
            },
            {
                id: 'w4', title: 'División Segura (DIVIDE)', type: 'code',
                content: '<p>Nunca uses <code>/</code> si el denominador puede ser 0. Usa <code>DIVIDE(Numerador, Denominador, [Alternativo])</code>.</p>',
                challenge: {
                    q: "Calcula 'Ratio' dividiendo [Ventas] entre [Objetivo]. Si es error, devuelve 0.", hint: "DIVIDE(num, den, 0)", expected: ["Ratio", "=", "DIVIDE", "[Ventas]", "[Objetivo]", "0"]
                }
            },
            {
                id: 'w5', title: 'Lógica: IF simple', type: 'code',
                content: '<p><code>IF(Condición, ResultadoSiCierto, ResultadoSiFalso)</code>. Fundamental para lógica condicional.</p>',
                challenge: {
                    q: "Medida 'Status': Si [Ventas] > 100, devuelve \"Bien\", si no \"Mal\".", hint: "IF(logica, \"si\", \"no\")", expected: ["Status", "IF", "[Ventas]", ">", "100", "\"Bien\"", "\"Mal\""]
                }
            },
            {
                id: 'w6', title: 'Operadores Lógicos: AND (&&)', type: 'code',
                content: '<p>Para que se cumplan dos condiciones a la vez, usa <code>&&</code> en lugar de la función AND.</p>',
                challenge: {
                    q: "Medida 'Bonus': Si [Ventas] > 100 Y [Satisfaccion] > 9, devuelve 1, si no 0.", hint: "cond1 && cond2",
                    expected: ["Bonus", "IF", "[Ventas]", ">", "100", "&&", "[Satisfaccion]", ">", "9"]
                }
            },
            {
                id: 'w7', title: 'Operadores Lógicos: OR (||)', type: 'code',
                content: '<p>Para que se cumpla una U otra condición (o ambas), usa <code>||</code> (barra vertical).</p>',
                challenge: {
                    q: "Medida 'Alerta': Si [Stock] < 5 O [Pedidos]> 50, devuelve \"Revisar\".", hint: "cond1 || cond2",
                    expected: ["Alerta", "IF", "[Stock]", "<", "5", "||", "[Pedidos]", ">", "50"]
                }
            }, {
                id: 'w8',
                title: 'El operador IN', type: 'code',
                content: '<p>Verifica si un valor está dentro de una lista. <code>Color IN { "Rojo", "Azul" }</code>.</p>',
                challenge: {
                    q: "Medida 'EsPrimario': IF el 'Color' está IN {\" Rojo\", \"Azul\"}, devuelve TRUE().",
                    hint: "IN {\" A\", \"B\"}", expected: ["EsPrimario", "IF", "'Color'", "IN", "{", "\" Rojo\"", "\"Azul\"", "}"]
                }
            }, {
                id: 'w9', title: 'Comentarios', type: 'quiz',
                content: '<p>El código limpio salva vidas. <br><code>//</code> para una línea.<br><code>/* ... */</code> para bloques.</p>'
                , challenge: {
                    q: "¿Cuál de estos NO es un comentario válido en DAX?", options: ["// Hola", "-- Hola"
                        , "# Hola", "/* Hola */"], correctMsg: "Correcto, # se usa en Power Query, no en DAX.", correctOpt: 2
                }
            }, {
                id: 'w10', title: 'Medidas vs Columnas', type: 'quiz',
                content: '<p><strong>Medidas:</strong> Dinámicas, usan CPU, no ocupan disco.<br><strong>Columnas:</strong> Estáticas, ocupan RAM/Disco, se calculan al refrescar.</p>'
                , challenge: {
                    q: "Necesitas filtrar un gráfico por 'Rango de Edad'. ¿Qué creas?", options: ["Una Medida", "Una Columna Calculada"],
                    correctMsg: "¡Exacto! Para ejes de gráficos o filtros (Slicers), necesitas Columnas.", correctOpt: 1
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
            type: 'code', content: '<p>Suma todos los números de una columna. Ignora textos.</p>', challenge: {
                q: "Medida 'Total Kilos': Suma la columna Kilos.", expected: ["Total Kilos", "SUM", "Kilos"]
            }
        }, {
            id: 'y2'
            , title: 'AVERAGE (Promedio)', type: 'code', content: '<p>Calcula la media aritmética.</p>', challenge: {
                q: "Medida 'Precio Promedio': Promedio de la columna Precio.", expected: ["Precio Promedio", "AVERAGE"
                    , "Precio"]
            }
        }, {
            id: 'y3', title: 'MAX y MIN', type: 'code',
            content: '<p>Encuentran el valor más alto o bajo. Funcionan con fechas y texto también (alfabéticamente).</p>',
            challenge: {
                q: "Medida 'Ultima Venta': Encuentra la fecha MAX de 'FechaVenta'.", expected: ["Ultima Venta", "MAX", "'FechaVenta'"]
            }
        }, {
            id: 'y4', title: 'COUNT (Numérico)', type: 'code',
            content: '<p>Cuenta celdas que contienen <strong>números</strong>.</p>', challenge: {
                q: "Cuenta los IDs numéricos en la columna 'ID_Venta'.", expected: ["COUNT", "'ID_Venta'"]
            }
        }, {
            id: 'y5',
            title: 'COUNTA (Todo)', type: 'code',
            content: '<p>Cuenta celdas <strong>no vacías</strong> (texto, booleano, número).</p>', challenge: {
                q: "Cuenta cuántos clientes tienen email en la columna 'Email'.", expected: ["COUNTA", "'Email'"]
            }
        }, {
            id: 'y6', title: 'COUNTROWS (Filas)', type: 'code',
            content: '<p>Cuenta las filas de una tabla base. Es la más eficiente para contar transacciones.</p>',
            challenge: {
                q: "Cuenta cuántas filas tiene la tabla 'Ventas'.", hint: "COUNTROWS(Tabla)", expected:
                    ["COUNTROWS", "Ventas"]
            }
        }, {
            id: 'y7', title: 'DISTINCTCOUNT (Únicos)', type: 'code',
            content: '<p>Cuenta valores distintos. Útil para saber cuántos productos diferentes se vendieron.</p>',
            challenge: { q: "Cuenta los productos únicos vendidos (columna SKU).", expected: ["DISTINCTCOUNT", "SKU"] }
        },
        {
            id: 'y8', title: 'COUNTBLANK', type: 'code',
            content: '<p>Cuenta cuántas celdas están vacías o en blanco.</p>', challenge: {
                q: "Cuenta cuántas filas no tienen fecha de devolución (columna Devolucion).", expected:
                    ["COUNTBLANK", "Devolucion"]
            }
        }, {
            id: 'y9', title: 'SELECTEDVALUE', type: 'quiz',
            content: '<p>Devuelve el valor si solo hay uno seleccionado en el filtro. Si hay varios, devuelve BLANK (o alternativo).</p>'
            , challenge: {
                q: "Si en un slicer selecciono el año 2023 y 2024, ¿qué devuelve SELECTEDVALUE('Año')?",
                options: ["2023", "2024", "BLANK / Nada", "Error"],
                correctMsg: "Correcto, devuelve BLANK porque hay múltiples valores.", correctOpt: 2
            }
        }, {
            id: 'y10',
            title: 'Funciones "X" (Iteradores)', type: 'quiz',
            content: '<p>SUMX, AVERAGEX, etc. recorren la tabla fila por fila evaluando una expresión. Son más lentas pero más potentes.</p>'
            , challenge: {
                q: "Para calcular (Precio * Cantidad) fila a fila y luego sumar, usas:", options: ["SUM", "SUMX"
                ], correctMsg: "¡Correcto! SUMX itera fila por fila antes de sumar.", correctOpt: 1
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
