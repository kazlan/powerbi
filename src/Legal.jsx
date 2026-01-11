import React from 'react';

export const LegalNotice = () => (
    <div className="space-y-6 animate-in fade-in duration-500 text-slate-300">
        <h1 className="text-3xl font-black text-white mb-6">Aviso Legal</h1>
        <div className="prose prose-invert max-w-none">
            <p><strong>1. DATOS IDENTIFICATIVOS</strong></p>
            <p>En cumplimiento con el deber de información recogido en artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, a continuación se reflejan los siguientes datos:</p>
            <p>El titular de dominio web es <strong>PL-300 Encyclopedia</strong> (en adelante "El Sitio").<br />
                Correo electrónico de contacto: contacto@pl-300-encyclopedia.com del sitio web.</p>

            <p className="mt-4"><strong>2. USUARIOS</strong></p>
            <p>El acceso y/o uso de este portal atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>

            <p className="mt-4"><strong>3. PROPIEDAD INTELECTUAL E INDUSTRIAL</strong></p>
            <p>El Sitio por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, etc.).</p>
            <p>Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de El Sitio.</p>
        </div>
    </div>
);

export const PrivacyPolicy = () => (
    <div className="space-y-6 animate-in fade-in duration-500 text-slate-300">
        <h1 className="text-3xl font-black text-white mb-6">Política de Privacidad</h1>
        <div className="prose prose-invert max-w-none">
            <p><strong>1. RESPONSABLE DEL TRATAMIENTO</strong></p>
            <p>Los datos de carácter personal que se pudieran recabar directamente del interesado serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad de PL-300 Encyclopedia.</p>

            <p className="mt-4"><strong>2. FINALIDAD</strong></p>
            <p>La finalidad del tratamiento de los datos corresponde a la gestión de las consultas realizadas por los usuarios y la mejora de su experiencia en el sitio web mediante el análisis de navegación (Google Analytics).</p>

            <p className="mt-4"><strong>3. LEGITIMACIÓN</strong></p>
            <p>El tratamiento de sus datos se realiza para el cumplimiento de obligaciones legales por parte del responsable, así como cuando la finalidad del tratamiento requiera su consentimiento, que habrá de ser prestado mediante una clara acción afirmativa.</p>

            <p className="mt-4"><strong>4. CONSERVACIÓN DE DATOS</strong></p>
            <p>Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de la finalidad.</p>
        </div>
    </div>
);

export const CookiesPolicy = () => (
    <div className="space-y-6 animate-in fade-in duration-500 text-slate-300">
        <h1 className="text-3xl font-black text-white mb-6">Política de Cookies</h1>
        <div className="prose prose-invert max-w-none">
            <p><strong>1. ¿QUÉ SON LAS COOKIES?</strong></p>
            <p>Una cookie es un fichero que se descarga en su ordenador al acceder a determinadas páginas web. Las cookies permiten a una página web, entre otras cosas, almacenar y recuperar información sobre los hábitos de navegación de un usuario o de su equipo y, dependiendo de la información que contengan y de la forma en que utilice su equipo, pueden utilizarse para reconocer al usuario.</p>

            <p className="mt-4"><strong>2. TIPOS DE COOKIES UTILIZADAS</strong></p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong>Cookies de análisis:</strong> Son aquéllas que bien tratadas por nosotros o por terceros (como Google Analytics), nos permiten cuantificar el número de usuarios y así realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio ofertado.</li>
                <li><strong>Cookies publicitarias:</strong> Son aquéllas que, tratadas por nosotros o por terceros (como Google AdSense), nos permiten gestionar de la forma más eficaz posible la oferta de los espacios publicitarios que hay en la página web.</li>
            </ul>

            <p className="mt-4"><strong>3. CÓMO BLOQUEAR O ELIMINAR LAS COOKIES</strong></p>
            <p>Puede usted permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones del navegador instalado en su ordenador (Chrome, Firefox, Safari, Edge, etc.).</p>
        </div>
    </div>
);
