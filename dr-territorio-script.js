/* ========================================
   DR. TERRITÓRIO - JAVASCRIPT FUNCIONAL
   Versão 1.0 - Funcionalidades Básicas
   ======================================== */

// ========================================
// CONFIGURAÇÕES GLOBAIS
// ========================================
const CONFIG = {
    whatsapp: '5577999454598', // Substitua pelo número real
    email: 'drterritorio@gmail.com',
    googleFormUrl: '', // Adicionar URL do Google Form quando criar
    
    // Mensagens padrão
    messages: {
        success: '✅ Enviado com sucesso!',
        error: '❌ Erro ao enviar. Tente novamente.',
        loading: '⏳ Enviando...'
    }
};

// ========================================
// DADOS DOS PERFIS PROFISSIONAIS
// ========================================
const profilesData = {
    advogado: {
        title: 'Advogado',
        icon: '⚖️',
        description: 'Recursos para Advogados',
        services: [
            'Petições REURB (Social e Específica)',
            'Modelos de Usucapião (Ordinário e Extraordinário)',
            'Inventário e Partilha Extrajudicial',
            'Verificação Dominial Completa',
            'Cálculo de Custas e Emolumentos',
            'Acompanhamento Processual Inteligente'
        ]
    },
    cartorio: {
        title: 'Cartório',
        icon: '📋',
        description: 'Ferramentas para Cartórios',
        services: [
            'Análise Automática de Documentos',
            'Verificação de Assinaturas e ART',
            'Geração de Atas e Certidões',
            'Modelos de Escrituras Públicas',
            'Controle de Protocolos',
            'Base Legal Atualizada (CNJ)'
        ]
    },
    despachante: {
        title: 'Despachante',
        icon: '📁',
        description: 'Soluções para Despachantes',
        services: [
            'Dossiê Completo REURB',
            'Checklist de Documentos',
            'Certidões Necessárias por Tipo',
            'Resposta a Exigências',
            'Controle de Protocolos',
            'Intermediação com Órgãos'
        ]
    },
    imobiliaria: {
        title: 'Imobiliária',
        icon: '🏢',
        description: 'Apoio para Imobiliárias',
        services: [
            'Checagem Documental para Venda',
            'Regularização de Imóveis',
            'Modelos de Contratos',
            'Due Diligence Imobiliária',
            'Relatórios para Clientes',
            'Integração com CRM'
        ]
    },
    agrimensor: {
        title: 'Agrimensor',
        icon: '📐',
        description: 'Recursos Técnicos',
        services: [
            'Requisitos Georreferenciamento INCRA',
            'Memorial Descritivo Padrão',
            'Planilha de Cálculo de Área',
            'ART/RRT Modelos',
            'Normas Técnicas Atualizadas',
            'Certificação SIGEF'
        ]
    },
    cidadao: {
        title: 'Cidadão',
        icon: '👤',
        description: 'Ajuda para Proprietários',
        services: [
            'Lista de Documentos Necessários',
            'Modelos de Requerimentos',
            'Passo a Passo Regularização',
            'Calculadora de Custos',
            'Orientações Básicas',
            'Contatos de Profissionais'
        ]
    }
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dr. Território - Carregado com sucesso!');
    
    // Inicializar componentes
    initProfiles();
    initSmoothScroll();
    initFormValidation();
});

// ========================================
// RENDERIZAÇÃO DOS PERFIS
// ========================================
function initProfiles() {
    const profilesGrid = document.getElementById('profilesGrid');
    if (!profilesGrid) return;
    
    // Limpar grid
    profilesGrid.innerHTML = '';
    
    // Renderizar cada perfil
    Object.keys(profilesData).forEach(key => {
        const profile = profilesData[key];
        const profileCard = createProfileCard(key, profile);
        profilesGrid.appendChild(profileCard);
    });
}

function createProfileCard(key, profile) {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
        <div class="profile-icon">${profile.icon}</div>
        <div>${profile.title}</div>
    `;
    card.onclick = () => selectProfile(key);
    return card;
}

// ========================================
// SELEÇÃO DE PERFIL
// ========================================
function selectProfile(profileKey) {
    console.log('Perfil selecionado:', profileKey);
    
    // Remover classe active de todos
    document.querySelectorAll('.profile-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Adicionar classe active ao selecionado
    const cards = document.querySelectorAll('.profile-card');
    const selectedIndex = Object.keys(profilesData).indexOf(profileKey);
    if (cards[selectedIndex]) {
        cards[selectedIndex].classList.add('active');
    }
    
    // Atualizar resultado
    const profile = profilesData[profileKey];
    const demoResult = document.getElementById('demoResult');
    
    if (demoResult && profile) {
        demoResult.innerHTML = `
            <h3 style="color: #667eea; margin-bottom: 20px;">
                ${profile.icon} ${profile.description}
            </h3>
            <ul class="service-list">
                ${profile.services.map(service => `
                    <li>${service}</li>
                `).join('')}
            </ul>
            <div style="text-align: center; margin-top: 30px;">
                <button class="btn btn-primary" onclick="abrirModalCadastro()">
                    Testar Grátis Agora
                </button>
                <a href="https://wa.me/${CONFIG.whatsapp}?text=Olá! Sou ${profile.title} e quero conhecer o Dr. Território" 
                   class="btn btn-secondary" style="margin-left: 10px;" target="_blank">
                    Falar no WhatsApp
                </a>
            </div>
        `;
    }
}

// ========================================
// MODAL DE CADASTRO
// ========================================
function abrirModalCadastro() {
    const modal = document.getElementById('modalCadastro');
    if (modal) {
        modal.style.display = 'block';
    }
}

function fecharModal() {
    const modal = document.getElementById('modalCadastro');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalCadastro');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// SELEÇÃO DE PLANOS
// ========================================
function selecionarPlano(plano) {
    console.log('Plano selecionado:', plano);
    
    const mensagens = {
        gratis: 'Quero começar com o plano GRÁTIS do Dr. Território',
        pro: 'Quero testar 7 dias grátis o plano PROFISSIONAL do Dr. Território',
        business: 'Quero informações sobre o plano EMPRESARIAL do Dr. Território'
    };
    
    const mensagem = mensagens[plano] || 'Quero conhecer o Dr. Território';
    
    // Redirecionar para WhatsApp
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// ========================================
// FUNCIONALIDADES DEMONSTRATIVAS
// ========================================
function abrirCalculadora() {
    alert('🧮 Calculadora de Custos\n\nEsta funcionalidade estará disponível na versão completa!\n\nEnquanto isso, fale conosco no WhatsApp para um cálculo personalizado.');
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=Preciso calcular custos de regularização`, '_blank');
}

function mostrarLegislacao() {
    alert('📚 Base Legal\n\n• Lei 13.465/2017 (REURB)\n• Provimento CNJ 65/2017\n• Decreto 9.310/2018\n• Lei 6.015/1973\n\nPara acesso completo à base legal atualizada, assine o plano PRO!');
}

function gerarChecklist() {
    const tipo = prompt('Qual tipo de regularização?\n\n1 - REURB Social\n2 - REURB Específica\n3 - Usucapião\n4 - Inventário');
    
    if (tipo) {
        alert('📋 Checklist Personalizado\n\nSua lista de documentos será enviada por WhatsApp!');
        window.open(`https://wa.me/${CONFIG.whatsapp}?text=Quero o checklist de documentos para o tipo ${tipo}`, '_blank');
    }
}

// ========================================
// FORMULÁRIOS
// ========================================
function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        nome: form.querySelector('#nome').value,
        email: form.querySelector('#email').value,
        whatsapp: form.querySelector('#whatsapp').value,
        perfil: form.querySelector('#perfil').value
    };
    
    console.log('Dados do formulário:', formData);
    
    // Mostrar mensagem de sucesso
    alert(`${CONFIG.messages.success}\n\nObrigado ${formData.nome}!\n\nVocê receberá as instruções no WhatsApp e email cadastrados.`);
    
    // Enviar para WhatsApp
    const mensagem = `Novo cadastro Dr. Território!\n\nNome: ${formData.nome}\nEmail: ${formData.email}\nWhatsApp: ${formData.whatsapp}\nPerfil: ${formData.perfil}`;
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(mensagem)}`, '_blank');
    
    // Limpar formulário
    form.reset();
}

function realizarCadastro(event) {
    event.preventDefault();
    
    alert(`${CONFIG.messages.success}\n\nCadastro realizado!\nVocê receberá o acesso por WhatsApp.`);
    
    fecharModal();
    
    // Redirecionar para WhatsApp
    window.open(`https://wa.me/${CONFIG.whatsapp}?text=Acabei de fazer meu cadastro no site!`, '_blank');
}

// ========================================
// SCROLL SUAVE
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar header fixo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ========================================
// VALIDAÇÃO DE FORMULÁRIOS
// ========================================
function initFormValidation() {
    // Máscara para WhatsApp
    const whatsappInputs = document.querySelectorAll('input[type="tel"]');
    whatsappInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            
            e.target.value = value;
        });
    });
}

// ========================================
// ANALYTICS SIMPLES
// ========================================
function trackEvent(category, action, label) {
    console.log('Analytics:', { category, action, label });
    // Aqui você pode adicionar Google Analytics ou outro sistema
}

// ========================================
// UTILIDADES
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copiado para a área de transferência!');
    });
}

function shareOnWhatsApp() {
    const url = window.location.href;
    const text = 'Conheça o Dr. Território - IA para Regularização Fundiária';
    window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
}

// ========================================
// DETECTAR MOBILE
// ========================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar interface para mobile
if (isMobile()) {
    document.body.classList.add('mobile');
}

// ========================================
// EXPORTAR FUNÇÕES GLOBAIS
// ========================================
window.selectProfile = selectProfile;
window.abrirModalCadastro = abrirModalCadastro;
window.fecharModal = fecharModal;
window.selecionarPlano = selecionarPlano;
window.abrirCalculadora = abrirCalculadora;
window.mostrarLegislacao = mostrarLegislacao;
window.gerarChecklist = gerarChecklist;
window.enviarFormulario = enviarFormulario;
window.realizarCadastro = realizarCadastro;
window.scrollToSection = scrollToSection;

console.log('Dr. Território v1.0 - Todas as funções carregadas!');
