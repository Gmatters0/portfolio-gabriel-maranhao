export interface Contato {
  whatsapp: string;
  whatsapp_link: string;
  email: string;
  linkedin: string;
  github: string;
}

export interface Habilidades {
  gestao_de_projetos: string[];
  ferramentas_de_gestao: string[];
  tecnico: string[];
  idiomas: string[];
  outras: string[];
}

export interface Pilar {
  titulo: string;
  descricao: string;
}

export interface Especializacao {
  area: string;
  detalhes: string;
}

export interface Experiencia {
  cargo: string;
  empresa: string;
  local: string;
  periodo: string;
  bullets: string[];
}

export interface LiderancaAtividade {
  cargo: string;
  organizacao: string;
  local: string;
  periodo: string;
  bullets: string[];
}

export interface Servico {
  nome: string;
  descricao: string;
}

export interface Projeto {
  nome: string;
  contexto: string;
  tecnologias: string[];
  descricao: string;
  url: string | null;
}

export interface Educacao {
  instituicao: string;
  curso: string;
  periodo: string;
  modalidade?: string;
  disciplinas_relevantes?: string[];
}

export interface PortfolioData {
  nome: string;
  headline: string;
  localizacao: string;
  contato: Contato;
  resumo: string;
  habilidades: Habilidades;
  pilares_de_atuacao: Pilar[];
  especializando_atualmente: Especializacao[];
  experiencias: Experiencia[];
  lideranca_e_atividades_academicas: LiderancaAtividade[];
  servicos: Servico[];
  projetos: Projeto[];
  educacao: Educacao[];
}
