/* ========================================
   DR. TERRITÓRIO - JAVASCRIPT CORRIGIDO v1.1
   WhatsApp e Formulários 100% Funcionais
   ======================================== */

// ========================================
// CONFIGURAÇÕES GLOBAIS - EDITE AQUI!
// ========================================
const CONFIG = {
    // IMPORTANTE: Coloque seu número real aqui (sem espaços ou traços)
    whatsapp: '5577999454598', // Formato: 55 + DDD + Número
    
    // Email para contato
    email: 'drterritorio@gmail.com',
    
    // Google Forms - Crie um e cole o link aqui
    googleFormUrl: 'https://forms.gle/SEU_FORM_AQUI',
    
    // Formspree - Cadastre-se grátis em formspree.io
    formspreeUrl: 'https://formspree.io/f/SEU_CODIGO',
    
    // Mensagens do sistema
    messages: {
        whatsappInfo: '📱 O WhatsApp será aberto com a mensagem pronta.\nApenas clique em ENVIAR!',
        formInfo: '📝 Vamos montar sua mensagem para o WhatsApp!',
        copied: '✅ Copiado! Cole no WhatsApp.'
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
    console.log('Dr. Território v1.1 - Carregado!');
    
    // Inicializar componentes
    initProfiles();
    initSmoothScroll();
    initFormValidation();
    updateWhatsAppLinks();
});

// ========================================
// ATUALIZAR TODOS OS LINKS DO WHATSAPP
// ========================================
function updateWhatsAppLinks() {
    // Atualizar todos os links de WhatsApp com o número correto
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        const href = link.getAttribute('href');
        const newHref = href.replace(/5511999999999/, CONFIG.whatsapp);
        link.setAttribute('href', newHref);
    });
}

// ========================================
// RENDERIZAÇÃO DOS PERFIS
// ========================================
function initProfiles() {
    const profilesGrid = document.getElementById('profilesGrid');
    if (!profilesGrid) return;
    
    profilesGrid.innerHTML = '';
    
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
// SELEÇÃO DE PERFIL COM WHATSAPP FUNCIONAL
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
                <button class="btn btn-primary" onclick="iniciarCadastroPerfil('${profileKey}')">
                    Testar Grátis Agora
                </button>
                <button class="btn btn-secondary" style="margin-left: 10px;" 
                        onclick="contatoWhatsAppPerfil('${profileKey}')">
                    💬 Falar no WhatsApp
                </button>
            </div>
        `;
    }
}

// ========================================
// WHATSAPP MELHORADO
// ========================================
function contatoWhatsAppPerfil(profileKey) {
    const profile = profilesData[profileKey];
    const mensagem = `🏛️ *DR. TERRITÓRIO*\n\n` +
                     `Olá! Eu sou ${profile.title} e gostaria de conhecer o Dr. Território.\n\n` +
                     `Tenho interesse especialmente em:\n` +
                     `${profile.services.slice(0, 3).map(s => `• ${s}`).join('\n')}\n\n` +
                     `Poderia me enviar mais informações?`;
    
    abrirWhatsApp(mensagem);
}

function abrirWhatsApp(mensagem) {
    // Informar o usuário
    alert(CONFIG.messages.whatsappInfo);
    
    // Formatar mensagem para URL
    const mensagemFormatada = encodeURIComponent(mensagem);
    
    // Abrir WhatsApp
    const url = `https://wa.me/${CONFIG.whatsapp}?text=${mensagemFormatada}`;
    window.open(url, '_blank');
}

// ========================================
// MODAL DE CADASTRO MELHORADO
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

function iniciarCadastroPerfil(profileKey) {
    const profile = profilesData[profileKey];
    localStorage.setItem('perfilSelecionado', profileKey);
    abrirModalCadastro();
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modalCadastro');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// ========================================
// SELEÇÃO DE PLANOS COM WHATSAPP
// ========================================
function selecionarPlano(plano) {
    console.log('Plano selecionado:', plano);
    
    const mensagens = {
        gratis: `🏛️ *DR. TERRITÓRIO - PLANO GRÁTIS*\n\n` +
                `Quero começar com o plano GRÁTIS!\n\n` +
                `Por favor, me envie o acesso para:\n` +
                `• 3 documentos por mês\n` +
                `• Modelos básicos\n` +
                `• Acesso à comunidade`,
        
        pro: `🏛️ *DR. TERRITÓRIO - PLANO PROFISSIONAL*\n\n` +
             `Quero testar 7 DIAS GRÁTIS o plano PRO!\n\n` +
             `Tenho interesse em:\n` +
             `• Documentos ilimitados\n` +
             `• Todos os modelos\n` +
             `• Suporte prioritário\n` +
             `• Grupo VIP`,
        
        business: `🏛️ *DR. TERRITÓRIO - PLANO EMPRESARIAL*\n\n` +
                  `Preciso de informações sobre o plano EMPRESARIAL.\n\n` +
                  `Minha empresa precisa de:\n` +
                  `• Multi-usuários\n` +
                  `• API para integração\n` +
                  `• Suporte dedicado\n\n` +
                  `Por favor, entre em contato!`
    };
    
    abrirWhatsApp(mensagens[plano] || 'Quero conhecer os planos do Dr. Território');
}

// ========================================
// FORMULÁRIO PRINCIPAL - VERSÃO WHATSAPP
// ========================================
function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const nome = form.querySelector('#nome').value;
    const email = form.querySelector('#email').value;
    const whatsapp = form.querySelector('#whatsapp').value;
    const perfil = form.querySelector('#perfil').value;
    
    // Montar mensagem estruturada
    const mensagem = `🏛️ *CADASTRO DR. TERRITÓRIO*\n\n` +
                     `📝 *Dados do Cadastro:*\n\n` +
                     `*Nome:* ${nome}\n` +
                     `*Email:* ${email}\n` +
                     `*WhatsApp:* ${whatsapp}\n` +
                     `*Perfil:* ${perfil}\n\n` +
                     `Gostaria de começar o teste gratuito de 7 dias!\n\n` +
                     `Por favor, me envie as instruções de acesso.`;
    
    // Informar o usuário
    alert(CONFIG.messages.formInfo);
    
    // Abrir WhatsApp com a mensagem
    abrirWhatsApp(mensagem);
    
    // Limpar formulário
    form.reset();
    
    // Opcional: Salvar no localStorage para recuperar depois
    salvarDadosLocal({ nome, email, whatsapp, perfil });
}

function realizarCadastro(event) {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input, select');
    const dados = {};
    
    inputs.forEach(input => {
        if (input.name || input.id) {
            dados[input.name || input.id] = input.value;
        }
    });
    
    const mensagem = `🏛️ *NOVO CADASTRO - TESTE GRÁTIS*\n\n` +
                     `Acabei de me cadastrar no site!\n\n` +
                     `${Object.entries(dados).map(([key, value]) => `*${key}:* ${value}`).join('\n')}\n\n` +
                     `Aguardo o acesso para começar o teste de 7 dias.`;
    
    abrirWhatsApp(mensagem);
    fecharModal();
}

// ========================================
// FUNCIONALIDADES DEMONSTRATIVAS
// ========================================
function abrirCalculadora() {
    const resposta = confirm('🧮 Calculadora de Custos\n\nQuer receber uma planilha de cálculo personalizada no WhatsApp?');
    
    if (resposta) {
        const mensagem = `🏛️ *CALCULADORA DE CUSTOS*\n\n` +
                        `Preciso calcular os custos de regularização.\n\n` +
                        `Por favor, me envie a planilha de cálculo para:\n` +
                        `• Custas cartorárias\n` +
                        `• Emolumentos\n` +
                        `• Honorários estimados`;
        abrirWhatsApp(mensagem);
    }
}

function mostrarLegislacao() {
    const legislacao = `📚 *BASE LEGAL DO DR. TERRITÓRIO*\n\n` +
                       `• Lei 13.465/2017 (REURB)\n` +
                       `• Provimento CNJ 65/2017\n` +
                       `• Decreto 9.310/2018\n` +
                       `• Lei 6.015/1973\n` +
                       `• Lei 10.406/2002 (Código Civil)\n\n` +
                       `Para acesso completo e atualizado, assine o plano PRO!`;
    
    const opcao = confirm(legislacao + '\n\nDeseja receber a base legal completa no WhatsApp?');
    
    if (opcao) {
        abrirWhatsApp('Quero acesso à base legal completa e atualizada do Dr. Território');
    }
}

function gerarChecklist() {
    const tipos = {
        '1': 'REURB Social',
        '2': 'REURB Específica',
        '3': 'Usucapião',
        '4': 'Inventário',
        '5': 'Regularização de Loteamento'
    };
    
    const tipo = prompt(`📋 CHECKLIST DE DOCUMENTOS\n\nEscolha o tipo:\n\n${Object.entries(tipos).map(([k, v]) => `${k} - ${v}`).join('\n')}`);
    
    if (tipo && tipos[tipo]) {
        const mensagem = `🏛️ *CHECKLIST PERSONALIZADO*\n\n` +
                        `Preciso do checklist de documentos para:\n` +
                        `*${tipos[tipo]}*\n\n` +
                        `Por favor, me envie a lista completa e atualizada.`;
        
        abrirWhatsApp(mensagem);
    }
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
                const offsetTop = targetElement.offsetTop - 80;
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
// VALIDAÇÃO E FORMATAÇÃO
// ========================================
function initFormValidation() {
    // Formatar WhatsApp
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
// ARMAZENAMENTO LOCAL
// ========================================
function salvarDadosLocal(dados) {
    try {
        const cadastros = JSON.parse(localStorage.getItem('cadastros') || '[]');
        cadastros.push({
            ...dados,
            data: new Date().toISOString()
        });
        localStorage.setItem('cadastros', JSON.stringify(cadastros));
        console.log('Dados salvos localmente:', dados);
    } catch (e) {
        console.error('Erro ao salvar dados:', e);
    }
}

function recuperarDadosLocal() {
    try {
        return JSON.parse(localStorage.getItem('cadastros') || '[]');
    } catch (e) {
        return [];
    }
}

// ========================================
// UTILIDADES
// ========================================
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert(CONFIG.messages.copied);
    }).catch(() => {
        // Fallback para browsers antigos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert(CONFIG.messages.copied);
    });
}

function shareOnWhatsApp() {
    const url = window.location.href;
    const mensagem = `🏛️ *Conheça o DR. TERRITÓRIO*\n\n` +
                     `IA para Regularização Fundiária!\n\n` +
                     `✅ Petições REURB\n` +
                     `✅ Modelos de Usucapião\n` +
                     `✅ Cálculo de Custas\n` +
                     `✅ Base Legal Atualizada\n\n` +
                     `Teste GRÁTIS por 7 dias!\n\n` +
                     `${url}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(mensagem)}`, '_blank');
}

// ========================================
// DETECTAR MOBILE E AJUSTAR
// ========================================
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    document.body.classList.add('mobile');
    console.log('Modo mobile ativado');
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
window.contatoWhatsAppPerfil = contatoWhatsAppPerfil;
window.iniciarCadastroPerfil = iniciarCadastroPerfil;
window.abrirWhatsApp = abrirWhatsApp;
window.shareOnWhatsApp = shareOnWhatsApp;

console.log('====================================');
console.log('Dr. Território v1.1 - WhatsApp OK!');
console.log('Configure seu número na linha 10');
console.log('====================================');