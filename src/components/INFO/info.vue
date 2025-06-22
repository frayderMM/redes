<template>
  <div class="container">
    <h1>📘 Fundamentos de Redes IP</h1>

    <q-separator class="q-my-md" />

    <!-- INTRODUCCIÓN -->
    <section>
      <h2>🌐 ¿Qué es una red IP?</h2>
      <p>
        Una red IP es un conjunto de dispositivos que se comunican entre sí usando el protocolo de Internet (IP). 
        Cada dispositivo se identifica por una dirección IP única dentro de esa red.
      </p>
    </section>

    <!-- DIRECCIÓN IP -->
    <section>
      <h2>🧭 Dirección IP</h2>
      <p>
        Una dirección IP (Internet Protocol) es un número único asignado a cada dispositivo en una red. Existen dos versiones:
      </p>
      <ul>
        <li><strong>IPv4:</strong> Formato de 32 bits (ej. 192.168.1.1), permite ~4.3 mil millones de direcciones.</li>
        <li><strong>IPv6:</strong> Formato de 128 bits (ej. 2001:0db8::1), permite 340 undecillones de direcciones.</li>
      </ul>
    </section>

    <!-- MÁSCARA DE RED -->
    <section>
      <h2>🎭 Máscara de Red</h2>
      <p>
        La máscara de red determina qué parte de una dirección IP identifica la red y qué parte identifica al host. Ejemplo:
      </p>
      <ul>
        <li>IP: 192.168.1.100</li>
        <li>Máscara: 255.255.255.0</li>
        <li>Red: 192.168.1.0</li>
        <li>Rango de hosts: 192.168.1.1 - 192.168.1.254</li>
        <li>Broadcast: 192.168.1.255</li>
      </ul>
    </section>

    <!-- CIDR -->
    <section>
      <h2>📏 Subneteo con CIDR</h2>
      <p>
        CIDR (Classless Inter-Domain Routing) permite especificar máscaras de longitud variable usando la notación /n.
        Esto permite dividir redes grandes en subredes más pequeñas de forma flexible.
      </p>
      <p>Ejemplo: 192.168.1.0/24 → 256 direcciones (254 válidas para hosts).</p>
    </section>

    <!-- VLSM -->
    <section>
      <h2>📐 Subneteo con VLSM</h2>
      <p>
        VLSM (Variable Length Subnet Mask) permite asignar máscaras diferentes a cada subred según su necesidad de hosts,
        optimizando el uso del espacio de direcciones.
      </p>
      <ul>
        <li>Primero se asigna a subredes más grandes.</li>
        <li>Se evitan solapamientos.</li>
        <li>Ideal para redes con estructuras jerárquicas.</li>
      </ul>
    </section>

    <!-- EJEMPLO DE SUBNETTING -->
    <section>
      <h2>📊 Ejemplo de Subnetting</h2>
      <p>Supongamos que necesitas dividir 192.168.1.0/24 en subredes para:</p>
      <ul>
        <li>Subred A: 100 hosts</li>
        <li>Subred B: 50 hosts</li>
        <li>Subred C: 25 hosts</li>
      </ul>
      <p>Se asignan tamaños de subred según VLSM: /25, /26, /27, etc.</p>
    </section>

    <!-- CLASES IP -->
    <section>
      <h2>🏷️ Clases de Direcciones IPv4</h2>
      <ul>
        <li><strong>Clase A:</strong> 1.0.0.0 - 126.255.255.255 (/8)</li>
        <li><strong>Clase B:</strong> 128.0.0.0 - 191.255.255.255 (/16)</li>
        <li><strong>Clase C:</strong> 192.0.0.0 - 223.255.255.255 (/24)</li>
        <li><strong>Clase D:</strong> 224.0.0.0 - 239.255.255.255 (Multicast)</li>
        <li><strong>Clase E:</strong> 240.0.0.0 - 255.255.255.255 (Reservado)</li>
      </ul>
    </section>

    <!-- IP PRIVADAS -->
    <section>
      <h2>🔐 Direcciones Privadas</h2>
      <p>Usadas en redes internas, no son enrutables por Internet:</p>
      <ul>
        <li>Clase A: 10.0.0.0 – 10.255.255.255</li>
        <li>Clase B: 172.16.0.0 – 172.31.255.255</li>
        <li>Clase C: 192.168.0.0 – 192.168.255.255</li>
      </ul>
    </section>

    <!-- ESPECIALES -->
    <section>
      <h2>⚠️ Direcciones Especiales</h2>
      <ul>
        <li><strong>0.0.0.0:</strong> Dirección por defecto/no configurada.</li>
        <li><strong>127.0.0.1:</strong> Loopback (localhost).</li>
        <li><strong>169.254.x.x:</strong> APIPA (autoasignada).</li>
        <li><strong>255.255.255.255:</strong> Broadcast limitado.</li>
      </ul>
    </section>

    <!-- MODELO OSI -->
    <section>
      <h2>🧱 Modelo OSI</h2>
      <ol>
        <li><strong>Capa 7:</strong> Aplicación</li>
        <li><strong>Capa 6:</strong> Presentación</li>
        <li><strong>Capa 5:</strong> Sesión</li>
        <li><strong>Capa 4:</strong> Transporte</li>
        <li><strong>Capa 3:</strong> Red</li>
        <li><strong>Capa 2:</strong> Enlace de datos</li>
        <li><strong>Capa 1:</strong> Física</li>
      </ol>
    </section>

    <!-- MODELO TCP/IP -->
    <section>
      <h2>🧪 Modelo TCP/IP</h2>
      <ul>
        <li><strong>Capa de Aplicación:</strong> HTTP, FTP, DNS</li>
        <li><strong>Capa de Transporte:</strong> TCP, UDP</li>
        <li><strong>Capa de Internet:</strong> IP, ICMP</li>
        <li><strong>Capa de Acceso:</strong> Ethernet, Wi-Fi</li>
      </ul>
    </section>
    <!-- CONVERSIÓN IPv4 ↔ IPv6 -->
    <section>
    <h2>🔁 Conversión entre IPv4 e IPv6</h2>

    <p>
        Aunque IPv4 e IPv6 son protocolos distintos, existen mecanismos de transición que permiten representar una dirección
        IPv4 dentro de una IPv6. Esta técnica es útil para garantizar compatibilidad durante la migración hacia IPv6.
    </p>

    <h3>📥 De IPv4 a IPv6</h3>
    <p>La conversión más común es a través de direcciones IPv4-mapeadas en IPv6:</p>
    <ul>
        <li><strong>Sintaxis:</strong> <code>::ffff:IPv4</code></li>
        <li><strong>Ejemplo:</strong> IPv4 <code>192.0.2.128</code> → IPv6 <code>::ffff:192.0.2.128</code></li>
        <li>También se puede representar en formato hexadecimal: <code>::ffff:c000:0280</code></li>
    </ul>

    <h3>📤 De IPv6 a IPv4</h3>
    <p>
        Solo es posible si la IPv6 está en formato mapeado (como <code>::ffff:x.x.x.x</code>).
        En ese caso, basta con extraer los últimos 4 octetos.
    </p>
    <ul>
        <li><strong>Ejemplo:</strong> IPv6 <code>::ffff:10.0.0.1</code> → IPv4 <code>10.0.0.1</code></li>
        <li>Si no es una dirección mapeada, no puede convertirse directamente a IPv4.</li>
    </ul>

    <h3>⚠️ Consideraciones</h3>
    <ul>
        <li>No todas las direcciones IPv6 tienen equivalente en IPv4.</li>
        <li>Las direcciones IPv6 son necesarias debido al agotamiento de IPv4.</li>
        <li>La mayoría de sistemas operativos modernos soportan ambos protocolos.</li>
    </ul>
    </section>
    <!-- TIPOS DE SUBREDES -->
    <section>
    <h2>🧩 Tipos de Subredes</h2>
    <h3>🔗 Punto a punto</h3>
    <p>Conecta solo dos dispositivos. Ideal para enlaces dedicados como troncales entre routers.</p>

    <h3>📣 Subredes de Broadcast</h3>
    <p>Permiten que un mensaje sea enviado a todos los dispositivos de la subred (usualmente terminan en .255).</p>

    <h3>🔁 Subredes Loopback</h3>
    <p>Reservadas para uso interno de un dispositivo. Por ejemplo, <code>127.0.0.1</code> en IPv4 permite probar conectividad local.</p>
    </section>

    <!-- DHCP VS IP ESTÁTICA -->
    <section>
    <h2>⚙️ DHCP vs IP Estática</h2>

    <h3>✅ Ventajas de DHCP</h3>
    <ul>
        <li>Configuración automática sin intervención manual.</li>
        <li>Ideal para redes grandes o dinámicas.</li>
    </ul>

    <h3>❌ Ventajas de IP Estática</h3>
    <ul>
        <li>Control total sobre la asignación de direcciones.</li>
        <li>Requiere mantenimiento manual y es propensa a errores.</li>
    </ul>

    <h3>🔄 ¿Cómo funciona el DHCP?</h3>
    <p>El cliente envía una solicitud y el servidor DHCP responde con una IP disponible, máscara, gateway y DNS.</p>
    </section>

    <!-- NAT -->
    <section>
    <h2>🌐 NAT (Network Address Translation)</h2>

    <h3>🛠️ Tipos de NAT</h3>
    <ul>
        <li><strong>Estático:</strong> Asigna 1:1 una IP interna a una IP pública.</li>
        <li><strong>Dinámico:</strong> Asigna cualquier IP pública disponible a una IP interna.</li>
        <li><strong>PAT (Overload):</strong> Multiples IPs internas comparten una sola IP pública con distintos puertos.</li>
    </ul>

    <p>🔄 Esto permite que muchos dispositivos accedan a Internet usando una única IP pública, esencial en hogares y empresas.</p>
    </section>

    <!-- ENRUTAMIENTO -->
    <section>
    <h2>🧭 Rutas y Enrutamiento</h2>

    <h3>🛣️ Rutas Estáticas</h3>
    <p>Definidas manualmente por el administrador. Son simples pero no se adaptan a cambios de red.</p>

    <h3>🔄 Rutas Dinámicas</h3>
    <p>Aprendidas automáticamente mediante protocolos. Se actualizan si cambia la topología.</p>

    <h3>📡 Protocolos de Enrutamiento</h3>
    <ul>
        <li><strong>RIP:</strong> Basado en saltos. Simple, pero lento.</li>
        <li><strong>OSPF:</strong> Usa el costo como métrica. Rápido y escalable.</li>
        <li><strong>BGP:</strong> Utilizado entre grandes redes (proveedores de Internet).</li>
    </ul>
    </section>

    <!-- MTU Y FRAGMENTACIÓN -->
    <section>
    <h2>📦 MTU y Fragmentación IP</h2>

    <p><strong>MTU</strong> (Unidad Máxima de Transmisión) define el tamaño máximo de un paquete que puede enviarse sin ser fragmentado.</p>
    <p>Si un paquete es más grande que la MTU, se divide (fragmenta) en partes. Esto puede:</p>
    <ul>
        <li>Reducir la eficiencia (más encabezados).</li>
        <li>Provocar pérdida si una parte se pierde.</li>
    </ul>
    <p>🔎 MTU típica de Ethernet: 1500 bytes.</p>
    </section>

    <!-- FIREWALL Y FILTRADO -->
    <section>
    <h2>🛡️ Firewall y Filtrado de IP</h2>

    <h3>🧱 Reglas básicas</h3>
    <p>Un firewall permite o bloquea tráfico según reglas definidas por el administrador.</p>

    <h3>🔍 Tipos de filtrado</h3>
    <ul>
        <li><strong>Por IP:</strong> Permite/bloquea dispositivos específicos.</li>
        <li><strong>Por puerto:</strong> Controla acceso a servicios como HTTP (puerto 80), SSH (22), etc.</li>
        <li><strong>Por protocolo:</strong> TCP, UDP, ICMP, etc.</li>
    </ul>
    </section>



    <q-separator class="q-my-xl" />
    <div class="q-mt-md text-caption text-center text-grey">
      © 2025 - Guía educativa de redes IP
    </div>
  </div>
</template>

<script>
export default {
  name: 'NetworkInfo'
};
</script>

<style scoped>
.container {
  max-width: 880px;
  margin: auto;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fcfcfc;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

h1 {
  font-size: 2rem;
  color: #3f51b5;
  text-align: center;
  margin-bottom: 1rem;
}

h2 {
  margin-top: 2rem;
  color: #3949ab;
  font-size: 1.4rem;
}

p {
  font-size: 1rem;
  margin-bottom: 1rem;
}

ul, ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.4rem;
}
</style>
