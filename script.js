// Utilize strict mode para melhor detecção de erros
'use strict';

const planetas = [
    { nome: 'Mercúrio', imagem: 'https://solarsystem.nasa.gov/system/stellar_items/image_files/2_feature_1600x900_mercury.jpg', descricao: 'O planeta mais próximo do Sol.', diametro: 4879, distanciaSol: 57.9, periodoOrbital: 88, temperaturaMedia: 167, numeroLuas: 0 },
    { nome: 'Vênus', imagem: 'https://solarsystem.nasa.gov/system/stellar_items/image_files/3_feature_1600x900_venus.jpg', descricao: 'Conhecido como o "gêmeo" da Terra.', diametro: 12104, distanciaSol: 108.2, periodoOrbital: 225, temperaturaMedia: 464, numeroLuas: 0 },
    { nome: 'Terra', imagem: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', descricao: 'Nosso planeta natal.', diametro: 12742, distanciaSol: 149.6, periodoOrbital: 365, temperaturaMedia: 15, numeroLuas: 1 },
    { nome: 'Marte', imagem: 'https://solarsystem.nasa.gov/system/stellar_items/image_files/6_mars.jpg', descricao: 'O "Planeta Vermelho".', diametro: 6779, distanciaSol: 227.9, periodoOrbital: 687, temperaturaMedia: -65, numeroLuas: 2 },
    { nome: 'Júpiter', imagem: 'https://solarsystem.nasa.gov/system/resources/detail_files/2486_stsci-h-p1936a_1800.jpg', descricao: 'O maior planeta do Sistema Solar.', diametro: 139820, distanciaSol: 778.5, periodoOrbital: 4333, temperaturaMedia: -110, numeroLuas: 79 },
    { nome: 'Saturno', imagem: 'https://solarsystem.nasa.gov/system/stellar_items/image_files/38_saturn_1600x900.jpg', descricao: 'Famoso por seus anéis.', diametro: 116460, distanciaSol: 1434.0, periodoOrbital: 10759, temperaturaMedia: -140, numeroLuas: 82 },
    { nome: 'Urano', imagem: 'https://solarsystem.nasa.gov/system/stellar_items/image_files/69_feature_1600x900_uranus_new.jpg', descricao: 'O planeta "deitado".', diametro: 50724, distanciaSol: 2871.0, periodoOrbital: 30687, temperaturaMedia: -195, numeroLuas: 27 },
    { nome: 'Netuno', imagem: 'https://solarsystem.nasa.gov/system/resources/detail_files/611_PIA01492.jpg', descricao: 'O planeta mais distante do Sol.', diametro: 49244, distanciaSol: 4495.0, periodoOrbital: 60190, temperaturaMedia: -200, numeroLuas: 14 }
];

const curiosidades = [
    'O Sol contém 99,86% da massa do Sistema Solar.',
    'Um dia em Vênus é mais longo que um ano em Vênus.',
    'Júpiter tem pelo menos 79 luas.',
    'Saturno tem uma densidade menor que a da água.',
    'Urano gira "de lado" em comparação com os outros planetas.'
];

function carregarPlanetas() {
    const listaPlanetas = document.getElementById('lista-planetas');
    listaPlanetas.innerHTML = '';
    planetas.forEach((planeta, index) => {
        const planetaHTML = `
            <div class="col">
                <div class="card h-100 planeta-card" data-planeta="${planeta.nome}">
                    <img src="placeholder.jpg" data-src="${planeta.imagem}" class="card-img-top lazy" alt="${planeta.nome}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${planeta.nome}</h5>
                        <p class="card-text flex-grow-1">${planeta.descricao}</p>
                        <button class="btn btn-primary btn-sm mais-info mt-auto" aria-label="Mais informações sobre ${planeta.nome}">Mais informações</button>
                    </div>
                </div>
            </div>
        `;
        listaPlanetas.innerHTML += planetaHTML;
    });

    // Implementar lazy loading para imagens
    const lazyImages = document.querySelectorAll('img.lazy');
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyLoadObserver.observe(img));

    // Adicionar event listeners para os botões "Mais informações"
    document.querySelectorAll('.mais-info').forEach(botao => {
        botao.addEventListener('click', mostrarDetalhes);
    });
}

function mostrarDetalhes(event) {
    let planetaNome;
    if (event.target.classList.contains('mais-info')) {
        planetaNome = event.target.closest('.planeta-card').dataset.planeta;
    } else {
        planetaNome = event.target.querySelector('.planeta-nome')?.textContent || event.target.textContent;
    }
    
    const planeta = planetas.find(p => p.nome === planetaNome);
    
    if (!planeta) {
        console.error('Planeta não encontrado:', planetaNome);
        return;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('planetaModal'));
    document.getElementById('planetaModalLabel').textContent = planeta.nome;
    document.getElementById('planetaModalBody').innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <img src="${planeta.imagem}" class="img-fluid mb-3" alt="${planeta.nome}">
            </div>
            <div class="col-md-6">
                <p>${planeta.descricao}</p>
                <ul class="list-unstyled">
                    <li><strong>Diâmetro:</strong> ${planeta.diametro.toLocaleString()} km</li>
                    <li><strong>Distância do Sol:</strong> ${planeta.distanciaSol.toLocaleString()} milhões km</li>
                    <li><strong>Período Orbital:</strong> ${planeta.periodoOrbital.toLocaleString()} dias terrestres</li>
                    <li><strong>Temperatura Média:</strong> ${planeta.temperaturaMedia}°C</li>
                    <li><strong>Número de Luas:</strong> ${planeta.numeroLuas}</li>
                </ul>
            </div>
        </div>
    `;
    modal.show();
}

function carregarCuriosidades() {
    const listaCuriosidades = document.getElementById('lista-curiosidades');
    listaCuriosidades.innerHTML = '';
    curiosidades.forEach(curiosidade => {
        const curiosidadeHTML = `<li class="list-group-item">${curiosidade}</li>`;
        listaCuriosidades.innerHTML += curiosidadeHTML;
    });
}

function fecharNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
    }
}

function inicializarApp() {
    carregarPlanetas();
    carregarCuriosidades();

    // Adicionar event listeners para os links da navbar
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', fecharNavbar);
    });

    // Adicionar smooth scrolling para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', inicializarApp);
