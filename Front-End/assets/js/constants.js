export const LongLorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tincidunt turpis non massa imperdiet, sit amet accumsan nisl gravida. Vestibulum pretium elit a libero molestie commodo. Vivamus finibus est vel eros feugiat blandit. Duis dapibus feugiat lectus, sit amet pharetra lacus ultrices eu. Fusce iaculis orci sit amet libero fringilla fermentum. Etiam a feugiat nisl. Vestibulum consectetur velit nec elit porta, at tristique est sollicitudin. In mi neque, tempus a nunc ut, sollicitudin scelerisque lacus. Ut eu euismod lacus, in bibendum lectus. Ut est nisi, sollicitudin quis lectus vitae, porttitor finibus justo. Morbi nec tortor ut est aliquet fermentum. Donec fringilla gravida fringilla. Vestibulum et magna commodo sapien accumsan mattis a sit amet eros. Nunc eget tincidunt lectus, nec tempus lectus. Pellentesque gravida venenatis justo eu facilisis. Aliquam eu dignissim metus, pellentesque consequat ligula.

Pellentesque feugiat porttitor leo vitae malesuada. Suspendisse porttitor libero vitae orci venenatis, ac auctor leo volutpat. Sed dapibus laoreet tempus. Vivamus malesuada quam enim, eu maximus ex vestibulum sed. Phasellus sodales nibh orci, id viverra ante aliquet sed. Suspendisse in quam vitae ex rhoncus vehicula quis id orci. Morbi convallis porta gravida. Donec volutpat hendrerit enim vel sagittis. In auctor tempus ornare. Etiam ut diam sit amet sapien eleifend molestie. Sed at elit in velit gravida pulvinar a eget lacus. Duis hendrerit at dolor non faucibus.

Vestibulum sagittis sollicitudin risus ac porttitor. Etiam nec nisl faucibus, egestas nulla a, rhoncus tellus. Pellentesque feugiat ultrices est vel bibendum. Praesent ante ante, tincidunt sed rhoncus vitae, tincidunt volutpat enim. In malesuada lorem eget tellus rhoncus luctus. Praesent ut congue purus, at sagittis leo. Aenean vel lectus vel risus laoreet rutrum. Quisque ullamcorper, felis in pharetra ultrices, elit justo feugiat risus, ac suscipit dui nunc a eros. Proin volutpat imperdiet bibendum. Aenean rhoncus mauris eget vulputate lacinia. Nunc at ex id mi feugiat facilisis posuere in nisl. Nam malesuada nibh vel nisl facilisis, eu pulvinar enim aliquet. Aenean vitae lacinia nunc. Morbi eleifend arcu fringilla ullamcorper porta. Suspendisse eu ultricies lacus, sed ornare felis. Nullam feugiat nunc in ultrices blandit.

Integer rhoncus purus vitae tincidunt auctor. Vestibulum id accumsan neque. Morbi ultrices, est nec imperdiet finibus, diam justo scelerisque turpis, ut finibus risus urna a sem. Nam massa velit, mattis quis convallis id, dignissim id enim. Cras nec orci aliquam, accumsan diam a, viverra odio. Suspendisse eleifend elit id lectus scelerisque eleifend. Fusce bibendum efficitur metus quis condimentum. Sed. 
`;

export const initiativeText = `

Queremos compartir una iniciativa ciudadana para revitalizar y embellecer nuestro querido parque central de San Pedro.

Te invitamos a participar activamente aportando ideas, manos voluntarias o donaciones para hacer realidad este proyecto.

👉 Comparte y comenta tus sugerencias o interés en colaborar.

¡Juntos podemos transformar nuestro parque! 🌱✨
`;

export const claimText = `

Vecinos y visitantes del Parque Central de Montes de Oca queremos expresar nuestra preocupación por el estado actual del parque, el cual presenta señales evidentes de descuido.

¡Queremos soluciones, no promesas!

#MontesDeOca #DenunciaCiudadana
`;

export const granEventoComunitarioText = `
🎉 ¡Gran Evento Comunitario! 🌟

¡Ven y disfruta con nosotros de un día lleno de diversión, actividades culturales, música en vivo, comida deliciosa y convivencia comunitaria! Un evento especial para celebrar juntos y fortalecer nuestros lazos como vecinos.

📍 Lugar: Parque Central  
📅 Fecha: Domingo 15 de marzo  
⏰ Hora: Desde las 10:00 a.m.

¡No te lo pierdas, te esperamos con toda tu familia!

#JuntosSomosComunidad #GranEventoComunitario #UnidosPorElBarrio
`;

export const newsData = [
    {
        id: 1,
        title: "Novedades para la Municipalidad",
        date: "10 Mar 2025",
        category: "Actualidad",
        image: "../../assets/img/news/img1.jpg",
        content: LongLorem,
        comments: [],
    },
    {
        id: 2,
        title: "🎉 ¡Gran Evento Comunitario! 🌟",
        date: "11 Mar 2025",
        category: "Eventos",
        image: "../../assets/img/news/img2.jpg",
        content: granEventoComunitarioText,
        comments: [],
    },
];

export const initiativeData = [
    {
        id: 1,
        title: " 🌳 ¡Embellezcamos juntos el Parque de Montes De Oca! 🌷",
        date: "11 Mar 2025",
        category: "Iniciativa Ciudadana",
        image: "../../assets/img/iniciatives/img5.jpg",
        content: initiativeText,
        comments: [],
    },
];

export const claimData = [
    {
        id: 1,
        title: "Denuncia sobre el estado del Parque Central de Montes de Oca",
        date: "12 Mar 2025",
        category: "Denuncia Ciudadana",
        image: "../../assets/img/claims/img1.jpg",
        content: claimText,
        comments: [],
    },
];

export const initiativeSelectors = {
    image: document.getElementById("initiative-detail-image"),
    date: document.getElementById("initiative-detail-date"),
    category: document.getElementById("initiative-detail-category"),
    title: document.getElementById("initiative-detail-title"),
    body: document.getElementById("initiative-detail-body"),
};

export const newsSelectors = {
    image: document.getElementById("detail-image"),
    date: document.getElementById("detail-date"),
    category: document.getElementById("detail-category"),
    title: document.getElementById("detail-title"),
    body: document.getElementById("detail-body"),
};
